import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createResumeClockCommand(): Command {
  const command = new Command('resume-clock')
    .description('Resume the Surfnet clock (restart time progression)')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const result = await client.cheatcodes.resumeClock();

        logger.success('Clock resumed successfully!');
        logger.log(`  Absolute Slot: ${result.absoluteSlot}`);
        logger.log(`  Epoch: ${result.epoch}`);
        logger.log(`  Slot Index: ${result.slotIndex}`);
        logger.log(`  Slots in Epoch: ${result.slotsInEpoch}`);
        if (result.blockHeight) {
          logger.log(`  Block Height: ${result.blockHeight}`);
        }
      } catch (error) {
        logger.error(`Failed to resume clock: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
