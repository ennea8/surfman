import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createMinimumLedgerSlotCommand(): Command {
  const command = new Command('minimum-ledger-slot')
    .description('Get the minimum slot that the node has information about')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const slot = await client.network.minimumLedgerSlot();

        logger.success(`Minimum ledger slot:`);
        logger.log(`  Slot: ${slot}`);
      } catch (error) {
        logger.error(
          `Failed to get minimum ledger slot: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
