import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetBlockCommand(): Command {
  const command = new Command('get-block')
    .description('Get block information by slot')
    .requiredOption('--slot <number>', 'Slot number')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--encoding <type>', 'Encoding type', 'json')
    .option('--rewards', 'Include rewards', false)
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const slot = parseInt(options.slot);

        const config = {
          encoding: options.encoding,
          rewards: options.rewards,
        };

        const block = await client.network.getBlock(slot, config);

        if (!block) {
          logger.warn(`No block found at slot ${slot}`);
          return;
        }

        logger.success(`Block at slot ${slot}:`);
        logger.log(`  Blockhash: ${block.blockhash}`);
        logger.log(`  Previous Blockhash: ${block.previousBlockhash}`);
        logger.log(`  Parent Slot: ${block.parentSlot}`);
        if (block.blockTime) {
          logger.log(
            `  Block Time: ${new Date(block.blockTime * 1000).toISOString()}`
          );
        }
        if (block.blockHeight !== null && block.blockHeight !== undefined) {
          logger.log(`  Block Height: ${block.blockHeight}`);
        }
        if (block.transactions) {
          logger.log(`  Transactions: ${block.transactions.length}`);
        }
      } catch (error) {
        logger.error(`Failed to get block: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
