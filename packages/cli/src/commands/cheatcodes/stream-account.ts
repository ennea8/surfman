import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createStreamAccountCommand(): Command {
  const command = new Command('stream-account')
    .description('Stream an account from the data source')
    .requiredOption('--pubkey <address>', 'Account public key')
    .option('--include-owned', 'Include owned accounts')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.includeOwned
          ? { includeOwnedAccounts: true }
          : undefined;

        await client.cheatcodes.streamAccount(options.pubkey, config);

        logger.success(`Account streaming initiated!`);
        logger.log(`  Account: ${options.pubkey}`);
        if (options.includeOwned) {
          logger.log(`  Include owned accounts: true`);
        }
      } catch (error) {
        logger.error(`Failed to stream account: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
