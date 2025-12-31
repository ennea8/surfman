import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetFeeForMessageCommand(): Command {
  const command = new Command('get-fee-for-message')
    .description('Get the fee required for a message')
    .requiredOption('--message <data>', 'Base64 encoded message')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const fee = await client.network.getFeeForMessage(
          options.message,
          config
        );

        if (fee !== null) {
          logger.success(`Transaction fee: ${fee} lamports`);
          logger.log(`  In SOL: ${fee / 1_000_000_000} SOL`);
        } else {
          logger.warn('Could not determine fee (blockhash may be expired)');
        }
      } catch (error) {
        logger.error(`Failed to get fee: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
