import * as core from '@actions/core';
import * as github from '@actions/github';
import { getRandomPokemon, getSpriteUrl } from './helpers/pokemon';
import { getOpenedMessage, getClosedMessage } from './helpers/messages';

async function run(): Promise<void> {
  try {
    // Get inputs
    const token = core.getInput('github_token', { required: true });
    const octokit = github.getOctokit(token);
    
    // Get event context
    const context = github.context;
    const issue = context.payload.issue;
    
    // Validate we're working with an issue event
    if (!issue) {
      core.setFailed('This action only works on issue events');
      return;
    }

    const issueNumber = issue.number;
    const repo = context.repo;
    const repoFullName = `${repo.owner}/${repo.repo}`;

    // Handle issue opened event
    if (context.payload.action === 'opened') {
      const issuerUsername = issue.user?.login;
      
      if (!issuerUsername) {
        core.warning('Could not determine issue creator username');
        return;
      }

      // Post "found a wild pokemon" comment
      await octokit.rest.issues.createComment({
        ...repo,
        issue_number: issueNumber,
        body: getOpenedMessage(issuerUsername)
      });
      
      core.info(`Posted opening comment on issue #${issueNumber} (found by @${issuerUsername})`);
    }
    
    // Handle issue closed event
    else if (context.payload.action === 'closed') {
      // Get who closed the issue (the catcher)
      const closerUsername = issue.closed_by?.login || context.actor;
      
      if (!closerUsername) {
        core.warning('Could not determine who closed the issue');
        return;
      }

      // Generate completely random pokemon
      const pokemon = getRandomPokemon();
      const spriteUrl = getSpriteUrl(pokemon.sprite, repoFullName);
      
      // Post congratulations comment with sprite
      await octokit.rest.issues.createComment({
        ...repo,
        issue_number: issueNumber,
        body: getClosedMessage(closerUsername, pokemon.name, spriteUrl)
      });
      
      core.info(`Posted closing comment on issue #${issueNumber} - @${closerUsername} caught ${pokemon.name}!`);
    }
    
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Action failed: ${error.message}`);
    } else {
      core.setFailed('Action failed with unknown error');
    }
  }
}

run();
