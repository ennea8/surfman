import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createNowCommand(): Command {
  const command = new Command('now')
    .description('Show current network slot, epoch, and timestamp')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const epochInfo = await client.network.getEpochInfo();
        const blockTime = await client.network.getBlockTime(epochInfo.absoluteSlot);
        const timestampMs = (blockTime ?? Math.floor(Date.now() / 1000)) * 1000;
        const epochProgress = epochInfo.slotsInEpoch
          ? (epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100
          : undefined;

        logger.success('Current Network State:\n');
        logger.log(`  Slot: ${epochInfo.absoluteSlot}`);
        logger.log(`  Epoch: ${epochInfo.epoch}`);
        logger.log(`  Slot Index: ${epochInfo.slotIndex}/${epochInfo.slotsInEpoch}`);
        if (epochProgress !== undefined) {
          logger.log(`  Epoch Progress: ${epochProgress.toFixed(2)}%`);
        }
        logger.log(`  Block Height: ${epochInfo.blockHeight ?? 'Unknown'}`);
        logger.log(`  Transactions (Epoch): ${epochInfo.transactionCount ?? 'Unknown'}`);
        logger.log(`  Time: ${new Date(timestampMs).toISOString()}`);
      } catch (error) {
        logger.error(`Failed to fetch network state: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
