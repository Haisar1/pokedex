import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Footer from "../components/Footer";
import "leaflet/dist/leaflet.css";
import styles from './maps.module.css';

import bulbasaur from "../assets/bulbasaur.gif";
import squirtle from "../assets/squirtle.gif";
import charmander from "../assets/charmander.gif";
import pokeball from "../assets/pokeball.png";

const Maps = () => {
  const position: [number, number] = [-2.1895, -79.8896];
  const navigate = useNavigate();

  const pokemonLocations = [
    { id: 1, name: 'Bulbasaur (Planta)', position: [-2.192, -79.889], type: 'planta' },
    { id: 2, name: 'Charmander (Fuego)', position: [-2.180, -79.885], type: 'fuego' },
    { id: 3, name: 'Squirtle (Agua)', position: [-2.175, -79.870], type: 'agua' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'planta':
        return new L.Icon({
          iconUrl: bulbasaur,
          iconSize: [32, 32],
        });
      case 'fuego':
        return new L.Icon({
          iconUrl: charmander,
          iconSize: [32, 32],
        });
      case 'agua':
        return new L.Icon({
          iconUrl: squirtle,
          iconSize: [32, 32],
        });
      default:
        return new L.Icon({
          iconUrl: pokeball,
          iconSize: [32, 32],
        });
    }
  };

  return (
    <>
      <div className={styles.pokedexWrapper}>
        <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
          <img className={styles.pokeballImg} src={pokeball} alt="pokeball" />
          regresar
        </button>

        <div className={styles.pokedexContainer}>
          <div className={styles.pokedexScreen}>
            <MapContainer
              center={position}
              zoom={12}
              scrollWheelZoom={false}
              className={styles.mapContainer}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {pokemonLocations.map(pokemon => (
                <Marker
                  key={pokemon.id}
                  position={pokemon.position as [number, number]}
                  icon={getIcon(pokemon.type)}
                >
                  <Popup>{pokemon.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className={styles.pokedexButton}>
            <img src={pokeball} alt="Pokeball" />
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default Maps;
