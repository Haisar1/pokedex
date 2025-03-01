import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPks";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { Pokemon } from "../types/types.d";
import { waitFor } from "../utils/utils";
import pokeballIcon from "../assets/logo_Pokedex.svg";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';  

import styles from "./pokemons.module.css";


const Pokemons = () => {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      setIsLoading(true);
      await waitFor(1100); // Simulando tiempo de espera para la carga
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
      setIsLoading(false);
    };
    fetchAllPokemons();
  }, []);

  if (isLoading || pokemons.length === 0) {
    return <LoadingScreen />;
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  // Función para manejar el error de carga de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = pokeballIcon;
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <img
          src={pokeballIcon}
          alt="Pokeball"
          className={styles.pokeballIcon}
          loading="eager"
        />
        <Header query={query} setQuery={setQuery} />
      </div>
      <main className={styles.gridContainer}>
        {filteredPokemons.map((pokemon) => (
          <Link
            key={pokemon.id}
            className={styles.card}
            to={`/pokemons/${pokemon.name.toLowerCase()}`}
          >
            <LazyLoadImage
              className={styles.cardImage}
              src={pokemon.imgSrc}
              alt={pokemon.name}
              effect="blur" 
              placeholderSrc={pokeballIcon} 
              loading="lazy" 
              onError={handleImageError} 
            />
            <div className={styles.cardText}>
              <span>{pokemon.name}</span>
            </div>
          </Link>
        ))}
      </main>

      <Footer />
    </>
  );
};

export default Pokemons;
