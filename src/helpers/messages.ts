// Issue Messages

export function getIssueOpenedMessage(username: string): string {
  return `🌿 **@${username} found a wild Pokémon!**`;
}

export function getIssueClosedMessage(
  username: string,
  pokemonName: string,
  spriteUrl: string
): string {
  return `🎉 **Congratulations @${username}!**\n\nYou caught **${pokemonName}**!\n\n![${pokemonName}](${spriteUrl})`;
}

// Pull Request Messages

export function getPROpenedMessage(username: string): string {
  return `🌿 **@${username} found a wild Pokémon!**`;
}

export function getPRMergedMessage(
  contributor: string,
  pokemonName: string,
  spriteUrl: string,
  merger: string
): string {
  return `🎉 **Congratulations @${contributor}!**\n\nYou caught **${pokemonName}**!\n\n![${pokemonName}](${spriteUrl})\n\n_Merged by @${merger}_`;
}

export function getPRClosedMessage(): string {
  return `💨 **The wild pokémon fled!**`;
}
