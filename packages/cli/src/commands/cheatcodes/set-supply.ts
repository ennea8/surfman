import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createSetSupplyCommand(): Command {
  const command = new Command('set-supply')
    .description('Set or update network supply information')
    .option('--total <lamports>', 'Total supply in lamports')
    .option('--circulating <lamports>', 'Circulating supply in lamports')
    .option('--non-circulating <lamports>', 'Non-circulating supply in lamports')
    .option('--non-circulating-accounts <accounts...>', 'List of non-circulating account addresses')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const update: any = {};

        if (options.total) {
          update.total = parseInt(options.total);
        }
        if (options.circulating) {
          update.circulating = parseInt(options.circulating);
        }
        if (options.nonCirculating) {
          update.nonCirculating = parseInt(options.nonCirculating);
        }
        if (options.nonCirculatingAccounts) {
          update.nonCirculatingAccounts = options.nonCirculatingAccounts;
        }

        if (Object.keys(update).length === 0) {
          logger.error('No supply fields specified. Use --total, --circulating, etc.');
          process.exit(1);
        }

        await client.cheatcodes.setSupply(update);

        logger.success('Supply updated successfully!');
        logger.log('Updated fields:');
        Object.entries(update).forEach(([key, value]) => {
          logger.log(`  ${key}: ${value}`);
        });
      } catch (error) {
        logger.error(`Failed to set supply: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
