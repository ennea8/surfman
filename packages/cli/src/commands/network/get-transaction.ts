import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetTransactionCommand(): Command {
  const command = new Command('get-transaction')
    .description('Get transaction details by signature')
    .requiredOption('--signature <sig>', 'Transaction signature')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--encoding <type>', 'Encoding type', 'json')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = {
          encoding: options.encoding,
        };

        const tx = await client.network.getTransaction(
          options.signature,
          config
        );

        if (!tx) {
          logger.warn(`Transaction not found: ${options.signature}`);
          return;
        }

        logger.success(`Transaction ${options.signature}:`);
        logger.log(`  Slot: ${tx.slot}`);
        if (tx.blockTime) {
          logger.log(
            `  Block Time: ${new Date(tx.blockTime * 1000).toISOString()}`
          );
        }
        if (tx.meta) {
          logger.log(`  Status: ${tx.meta.err ? 'Failed' : 'Success'}`);
          if (tx.meta.err) {
            logger.log(`  Error: ${JSON.stringify(tx.meta.err)}`);
          }
        }
      } catch (error) {
        logger.error(
          `Failed to get transaction: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
