// Helper functions for handling pokemon data

import pokemonData from "../data/pokemon.json";

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

/**
 * Get a completely random Pokémon from the available list
 */
// TODO: Future - add rarity tiers for special Pokemon
export function getRandomPokemon(): Pokemon {
  const randomIndex = Math.floor(Math.random() * pokemonData.length);
  return pokemonData[randomIndex];
}

/**
 * ? Might pull images from a dedicated repo or database in the future
 * Format: https://raw.githubusercontent.com/owner/repo/main/assets/pokemon/001.png
 */
export function getSpriteUrl(spriteName: string): string {
  return `https://raw.githubusercontent.com/DanielYuki/poke-actions/main/assets/pokemon/${spriteName}`;
}
