import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetStreamedAccountsCommand(): Command {
  const command = new Command('get-streamed-accounts')
    .description('Get all streamed accounts')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const result = await client.cheatcodes.getStreamedAccounts();

        if (!result.accounts || result.accounts.length === 0) {
          logger.log('No streamed accounts found.');
          return;
        }

        logger.success(`Found ${result.accounts.length} streamed account(s):\n`);
        result.accounts.forEach((account, index) => {
          logger.log(`${index + 1}. ${account}`);
        });
      } catch (error) {
        logger.error(`Failed to get streamed accounts: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
