import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createSendTransactionCommand(): Command {
  const command = new Command('send-transaction')
    .description('Send a signed transaction')
    .requiredOption('--transaction <data>', 'Base64 encoded transaction')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--skip-preflight', 'Skip preflight checks', false)
    .option('--encoding <type>', 'Encoding type', 'base64')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = {
          skipPreflight: options.skipPreflight,
          encoding: options.encoding,
        };

        const signature = await client.network.sendTransaction(
          options.transaction,
          config
        );

        logger.success(`Transaction sent successfully!`);
        logger.log(`  Signature: ${signature}`);
      } catch (error) {
        logger.error(
          `Failed to send transaction: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
