import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetLatestBlockhashCommand(): Command {
  const command = new Command('get-latest-blockhash')
    .description('Get the latest blockhash')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const result = await client.network.getLatestBlockhash(config);

        logger.success('Latest blockhash retrieved:');
        logger.log(`  Blockhash: ${result.blockhash}`);
        logger.log(`  Last Valid Block Height: ${result.lastValidBlockHeight}`);
      } catch (error) {
        logger.error(
          `Failed to get latest blockhash: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
