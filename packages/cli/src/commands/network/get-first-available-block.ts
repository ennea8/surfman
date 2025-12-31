import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetFirstAvailableBlockCommand(): Command {
  const command = new Command('get-first-available-block')
    .description('Get the slot of the lowest confirmed block')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const slot = await client.network.getFirstAvailableBlock();

        logger.success(`First available block:`);
        logger.log(`  Slot: ${slot}`);
      } catch (error) {
        logger.error(
          `Failed to get first available block: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
