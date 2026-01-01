import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetBlocksCommand(): Command {
  const command = new Command('get-blocks')
    .description('Get list of confirmed blocks between two slots')
    .requiredOption('--start-slot <number>', 'Start slot (inclusive)')
    .option('--end-slot <number>', 'End slot (exclusive)')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const startSlot = parseInt(options.startSlot);
        const endSlot = options.endSlot ? parseInt(options.endSlot) : undefined;

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const blocks = await client.network.getBlocks(startSlot, endSlot, config);

        logger.success(`Found ${blocks.length} confirmed block(s):`);
        if (blocks.length > 0) {
          logger.log(`  First: ${blocks[0]}`);
          logger.log(`  Last: ${blocks[blocks.length - 1]}`);
          if (blocks.length <= 20) {
            logger.log(`  All slots: ${blocks.join(', ')}`);
          } else {
            logger.log(`  (showing first and last only, total: ${blocks.length})`);
          }
        }
      } catch (error) {
        logger.error(`Failed to get blocks: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
