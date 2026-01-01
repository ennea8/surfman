import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetTokenAccountsByDelegateCommand(): Command {
  const command = new Command('get-token-accounts-by-delegate')
    .description('Get token accounts delegated to an address')
    .requiredOption('--delegate <address>', 'Delegate address')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--mint <address>', 'Filter by token mint')
    .option('--program-id <address>', 'Filter by program ID')
    .option('--encoding <type>', 'Data encoding', 'jsonParsed')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        if (!options.mint && !options.programId) {
          logger.error('Must specify either --mint or --program-id filter');
          process.exit(1);
        }

        const filter = options.mint
          ? { mint: options.mint }
          : { programId: options.programId };

        const config = {
          encoding: options.encoding,
        };

        const accounts = await client.scan.getTokenAccountsByDelegate(
          options.delegate,
          filter,
          config
        );

        logger.success(`Found ${accounts.length} delegated account(s) for ${options.delegate}:`);
        accounts.forEach((acc, index) => {
          logger.log(`\n${index + 1}. ${acc.pubkey}`);
          logger.log(`   Lamports: ${acc.account.lamports}`);
          logger.log(`   Owner: ${acc.account.owner}`);
        });
      } catch (error) {
        logger.error(
          `Failed to get delegated accounts: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
