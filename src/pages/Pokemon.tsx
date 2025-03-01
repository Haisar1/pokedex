import { useNavigate, useParams } from "react-router-dom";
import pokeballSrc from "../assets/pokeball.png";
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
      await waitFor(1100);
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
        <div className={styles.pokemonInfo}>
          <div className={styles.pokemonLeft}>
            <div className={styles.colorButtonsContainer}>
              <div className={`${styles.colorButton} ${styles.pokemonBlue}`} />
              <div
                className={`${styles.colorButton} ${styles.pokemonYellow}`}
              />
              <div className={`${styles.colorButton} ${styles.pokemonGreen}`} />
            </div>

            <div className={styles.pokemonInfoImgWrapper}>
              <img
                className={styles.pokemonInfoImg}
                src={pokemon?.imgSrc}
                alt={pokemon?.name}
              />
            </div>

            <div className={styles.pokemonTitle}>{name?.toUpperCase()}</div>

            <div className={styles.pokemonRight}>
              <div className={styles.pokemonTerminalScreen}>
                <div className={styles.pokemonDetails}>
                  <p>
                    <strong>Especie:</strong> {pokemon?.species}
                  </p>
                  <p>
                    <strong>Tipo:</strong>
                  </p>
                  <ul>
                    {pokemon?.types.map((types, index) => (
                      <li key={index}>{types}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>Vida:</strong> {pokemon?.hp}
                  </p>
                  <p>
                    <strong>Ataque:</strong> {pokemon?.attack}
                  </p>
                  <p>
                    <strong>Defensa:</strong> {pokemon?.defense}
                  </p>
                  <p>
                    <strong>Habilidades:</strong>
                  </p>
                  <ul>
                    {pokemon?.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightsection}></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pokemon;
