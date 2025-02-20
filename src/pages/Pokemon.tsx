import { useNavigate, useParams } from "react-router-dom";
import pokeballSrc from "../assets/pokeball.png";
import corazon from "../assets/corazon.png";
import escudo from "../assets/escudo.png";
import espadas from "../assets/espadas.png";

import Footer from "../components/Footer";
import styles from "./pokemon.module.css";

import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/fetchPk";
import LoadingScreen from "../components/LoadingScreen";
import { PokemonDetails } from "../types/types";
import { waitFor } from "../utils/utils";

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPokemon() {
      setIsLoading(true);
      waitFor(1100);
      const fetchedPokemon = await fetchPokemon(name as string);
      setPokemon(fetchedPokemon);
      setIsLoading(false);
    }
    getPokemon();
  }, [name]);

  if (isLoading || !pokemon) {
    return <LoadingScreen />;
  }

  return (
    <>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={pokeballSrc} alt="pokeball" />
        Regresar
      </button>
      <div className={styles.pokedexContainer}>
        <div className={styles.pokedexScreen}>
          <main className={styles.pokemonInfo}>
            <div className={styles.pokemonTitle}>{name?.toUpperCase()}</div>
            <div>Nr. {pokemon?.id}</div>
            <div>
              <img
                className={styles.pokemonInfoImg}
                src={pokemon?.imgSrc}
                alt={pokemon?.name}
              />
            </div>
            <div className={styles.pokemonDetails}>
              <div className={styles.pokemonDetailCard}>
                <img src= {corazon} alt="Health Icon" />
                <div>Vida: {pokemon?.hp}</div>
              </div>
              <div className={styles.pokemonDetailCard}>
                <img src = {espadas} alt="Attack Icon" />
                <div>Attack: {pokemon?.attack}</div>
              </div>
              <div className={styles.pokemonDetailCard}>
                <img src={escudo} alt="Defense Icon" />
                <div>Defensa: {pokemon?.defense}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pokemon;
