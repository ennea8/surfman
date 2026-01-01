import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createTimeTravelCommand(): Command {
  const command = new Command('time-travel')
    .description('Time travel to a specific epoch, slot, or timestamp')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--epoch <number>', 'Absolute epoch number')
    .option('--slot <number>', 'Absolute slot number')
    .option('--timestamp <number>', 'Absolute timestamp (microseconds)')
    .option('--relative <time>', 'Relative time (e.g., +1d, +1w, +12h, +30m)')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        let config: any = {};

        if (options.epoch) {
          config.absoluteEpoch = parseInt(options.epoch);
        } else if (options.slot) {
          config.absoluteSlot = parseInt(options.slot);
        } else if (options.timestamp) {
          config.absoluteTimestamp = parseInt(options.timestamp);
        } else if (options.relative) {
          const timeStr = options.relative;
          let secondsToAdd = 0;

          if (timeStr.endsWith('d')) {
            secondsToAdd = parseInt(timeStr.slice(0, -1)) * 24 * 60 * 60;
          } else if (timeStr.endsWith('w')) {
            secondsToAdd = parseInt(timeStr.slice(0, -1)) * 7 * 24 * 60 * 60;
          } else if (timeStr.endsWith('h')) {
            secondsToAdd = parseInt(timeStr.slice(0, -1)) * 60 * 60;
          } else if (timeStr.endsWith('m')) {
            secondsToAdd = parseInt(timeStr.slice(0, -1)) * 60;
          } else if (timeStr.endsWith('s')) {
            secondsToAdd = parseInt(timeStr.slice(0, -1));
          } else {
            throw new Error('Invalid time format. Use: +1d, +1w, +1h, +30m, +60s');
          }

          const currentTimestamp = Date.now();
          config.absoluteTimestamp = currentTimestamp + secondsToAdd * 1000;
        } else {
          const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
          config.absoluteTimestamp = Date.now() + oneWeekInMilliseconds;
          logger.info('No time specified, defaulting to +1 week');
        }

        const result = await client.cheatcodes.timeTravel(config);

        logger.success('Time travel successful!');
        logger.log(`  Absolute Slot: ${result.absoluteSlot}`);
        logger.log(`  Epoch: ${result.epoch}`);
        logger.log(`  Slot Index: ${result.slotIndex}`);
        logger.log(`  Slots in Epoch: ${result.slotsInEpoch}`);
        if (result.blockHeight) {
          logger.log(`  Block Height: ${result.blockHeight}`);
        }
      } catch (error) {
        logger.error(`Failed to time travel: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
