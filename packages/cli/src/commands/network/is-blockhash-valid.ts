import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createIsBlockhashValidCommand(): Command {
  const command = new Command('is-blockhash-valid')
    .description('Check if a blockhash is still valid')
    .requiredOption('--blockhash <hash>', 'Blockhash to check')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const isValid = await client.network.isBlockhashValid(
          options.blockhash,
          config
        );

        if (isValid) {
          logger.success(`Blockhash ${options.blockhash} is VALID`);
        } else {
          logger.warn(`Blockhash ${options.blockhash} is EXPIRED`);
        }
      } catch (error) {
        logger.error(
          `Failed to check blockhash: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
