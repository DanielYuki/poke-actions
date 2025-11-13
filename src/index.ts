import * as core from '@actions/core';
import * as github from '@actions/github';
import { getRandomPokemon, getSpriteUrl } from './helpers/pokemon';
import {
  getIssueOpenedMessage,
  getIssueClosedMessage,
  getPROpenedMessage,
  getPRMergedMessage,
  getPRClosedMessage
} from './helpers/messages';

async function run(): Promise<void> {
  try {
    const token = core.getInput('github_token', { required: true });
    const octokit = github.getOctokit(token);
    const context = github.context;
    const repo = context.repo;
    const repoFullName = `${repo.owner}/${repo.repo}`;

    // Handle issue events
    if (context.eventName === 'issues') {
      const issue = context.payload.issue;
      
      if (!issue) {
        core.warning('Issue event triggered but no issue found in payload');
        return;
      }

      const issueNumber = issue.number;
      const action = context.payload.action;

      if (action === 'opened') {
        const username = issue.user?.login;
        
        if (!username) {
          core.warning('Could not determine issue creator username');
          return;
        }

        await octokit.rest.issues.createComment({
          ...repo,
          issue_number: issueNumber,
          body: getIssueOpenedMessage(username)
        });
        
        core.info(`Posted opening comment on issue #${issueNumber} (found by @${username})`);
      }
      
      else if (action === 'closed') {
        const username = issue.closed_by?.login || context.actor;
        
        if (!username) {
          core.warning('Could not determine who closed the issue');
          return;
        }

        const pokemon = getRandomPokemon();
        const spriteUrl = getSpriteUrl(pokemon.sprite, repoFullName);
        
        await octokit.rest.issues.createComment({
          ...repo,
          issue_number: issueNumber,
          body: getIssueClosedMessage(username, pokemon.name, spriteUrl)
        });
        
        core.info(`Issue #${issueNumber} closed - @${username} caught ${pokemon.name}!`);
      }
    }

    // Handle pull request events
    else if (context.eventName === 'pull_request') {
      const pr = context.payload.pull_request;
      
      if (!pr) {
        core.warning('Pull request event triggered but no PR found in payload');
        return;
      }

      const prNumber = pr.number;
      const action = context.payload.action;

      if (action === 'opened') {
        const username = pr.user?.login;
        
        if (!username) {
          core.warning('Could not determine PR author username');
          return;
        }

        await octokit.rest.issues.createComment({
          ...repo,
          issue_number: prNumber,
          body: getPROpenedMessage(username)
        });
        
        core.info(`Posted opening comment on PR #${prNumber} (opened by @${username})`);
      }
      
      else if (action === 'closed') {
        const author = pr.user?.login;
        
        if (!author) {
          core.warning('Could not determine PR author username');
          return;
        }

        if (pr.merged === true) {
          const merger = pr.merged_by?.login || context.actor;
          const pokemon = getRandomPokemon();
          const spriteUrl = getSpriteUrl(pokemon.sprite, repoFullName);
          
          await octokit.rest.issues.createComment({
            ...repo,
            issue_number: prNumber,
            body: getPRMergedMessage(author, pokemon.name, spriteUrl, merger)
          });
          
          core.info(`PR #${prNumber} merged - @${author} caught ${pokemon.name}! (merged by @${merger})`);
        } else {
          await octokit.rest.issues.createComment({
            ...repo,
            issue_number: prNumber,
            body: getPRClosedMessage()
          });
          
          core.info(`PR #${prNumber} closed without merge - The wild pokémon fled`);
        }
      }
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
