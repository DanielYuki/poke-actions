import pokemonData from '../data/pokemon.json';

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

/**
 * Get a completely random Pokémon from the available list
 */
export function getRandomPokemon(): Pokemon {
  const randomIndex = Math.floor(Math.random() * pokemonData.length);
  return pokemonData[randomIndex];
}

/**
 * Generate the URL for a sprite hosted on GitHub
 * Format: https://raw.githubusercontent.com/owner/repo/main/assets/sprites/pokemon/regular/001.png
 */
export function getSpriteUrl(spriteName: string, repo: string, branch: string = 'main'): string {
  return `https://raw.githubusercontent.com/${repo}/${branch}/assets/pokemon/${spriteName}`;
}
