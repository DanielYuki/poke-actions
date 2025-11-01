/**
 * Message when an issue is opened
 * Mentions the issue creator as the one who "found" the Pokémon
 */
export function getOpenedMessage(issuerUsername: string): string {
  return `🌿 **@${issuerUsername} found a wild Pokémon!**`;
}

/**
 * Message when an issue is closed
 * Credits the closer as the one who caught the Pokémon
 */
export function getClosedMessage(
  closerUsername: string,
  pokemonName: string,
  spriteUrl: string
): string {
  return `🎉 **Congratulations @${closerUsername}!**\n\nYou caught **${pokemonName}**!\n\n![${pokemonName}](${spriteUrl})`;
}
