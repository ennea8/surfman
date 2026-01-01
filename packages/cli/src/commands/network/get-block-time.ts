import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetBlockTimeCommand(): Command {
  const command = new Command('get-block-time')
    .description('Get estimated production time of a block')
    .requiredOption('--slot <number>', 'Slot number')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const slot = parseInt(options.slot);

        const blockTime = await client.network.getBlockTime(slot);

        if (blockTime !== null) {
          const date = new Date(blockTime * 1000);
          logger.success(`Block time for slot ${slot}:`);
          logger.log(`  Unix Timestamp: ${blockTime}`);
          logger.log(`  Date: ${date.toISOString()}`);
          logger.log(`  Local: ${date.toLocaleString()}`);
        } else {
          logger.warn(`No block time available for slot ${slot}`);
        }
      } catch (error) {
        logger.error(`Failed to get block time: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
