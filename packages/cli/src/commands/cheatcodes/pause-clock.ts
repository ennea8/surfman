import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createPauseClockCommand(): Command {
  const command = new Command('pause-clock')
    .description('Pause the Surfnet clock (freeze time progression)')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const result = await client.cheatcodes.pauseClock();

        logger.success('Clock paused successfully!');
        logger.log(`  Absolute Slot: ${result.absoluteSlot}`);
        logger.log(`  Epoch: ${result.epoch}`);
        logger.log(`  Slot Index: ${result.slotIndex}`);
        logger.log(`  Slots in Epoch: ${result.slotsInEpoch}`);
        if (result.blockHeight) {
          logger.log(`  Block Height: ${result.blockHeight}`);
        }
      } catch (error) {
        logger.error(`Failed to pause clock: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
