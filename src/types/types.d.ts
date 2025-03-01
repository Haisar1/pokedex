export type Pokemon = {
  name: string;
  id: string;
  imgSrc: string;
};

export type PokemonDetails = {
  name: string;
  id: number;
  imgSrc: string;
  hp: number;
  attack: number;
  defense: number;
  species: string;
  abilities: string[];
  types: string[];
};
