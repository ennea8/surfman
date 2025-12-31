import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetLargestAccountsCommand(): Command {
  const command = new Command('get-largest-accounts')
    .description('Get the 20 largest accounts by lamport balance')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--filter <type>', 'Filter type (circulating/nonCirculating)')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {};
        if (options.filter) {
          config.filter = options.filter;
        }
        if (options.commitment) {
          config.commitment = options.commitment;
        }

        const accounts = await client.scan.getLargestAccounts(
          Object.keys(config).length > 0 ? config : undefined
        );

        logger.success(`Top ${accounts.length} largest accounts:`);
        accounts.forEach((acc, index) => {
          const sol = (acc.lamports / 1e9).toFixed(4);
          logger.log(`${index + 1}. ${acc.address}`);
          logger.log(`   Balance: ${acc.lamports} lamports (${sol} SOL)\n`);
        });
      } catch (error) {
        logger.error(
          `Failed to get largest accounts: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
