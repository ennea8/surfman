import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetBlocksWithLimitCommand(): Command {
  const command = new Command('get-blocks-with-limit')
    .description('Get confirmed blocks starting at a slot with a limit')
    .requiredOption('--start-slot <number>', 'Start slot (inclusive)')
    .requiredOption('--limit <number>', 'Maximum number of blocks')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const startSlot = parseInt(options.startSlot);
        const limit = parseInt(options.limit);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const blocks = await client.network.getBlocksWithLimit(
          startSlot,
          limit,
          config
        );

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
