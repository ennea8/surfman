import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetSignatureStatusesCommand(): Command {
  const command = new Command('get-signature-statuses')
    .description('Get the statuses of a list of signatures')
    .requiredOption('--signatures <sigs...>', 'Transaction signatures')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--search-history', 'Search transaction history', false)
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.searchHistory
          ? { searchTransactionHistory: true }
          : undefined;

        const statuses = await client.network.getSignatureStatuses(
          options.signatures,
          config
        );

        logger.success(`Retrieved ${statuses.length} signature status(es):`);
        statuses.forEach((status, index) => {
          const sig = options.signatures[index];
          logger.log(`\n${index + 1}. ${sig}`);
          
          if (status) {
            logger.log(`   Slot: ${status.slot}`);
            logger.log(`   Confirmations: ${status.confirmations ?? 'max'}`);
            logger.log(`   Status: ${status.err ? 'Failed' : 'Success'}`);
            if (status.confirmationStatus) {
              logger.log(`   Confirmation: ${status.confirmationStatus}`);
            }
            if (status.err) {
              logger.log(`   Error: ${JSON.stringify(status.err)}`);
            }
          } else {
            logger.log('   Status: Not found');
          }
        });
      } catch (error) {
        logger.error(
          `Failed to get signature statuses: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
