import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetRecentPrioritizationFeesCommand(): Command {
  const command = new Command('get-recent-prioritization-fees')
    .description('Get recent prioritization fees')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--addresses <addresses...>', 'Account addresses to filter by')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const fees = await client.network.getRecentPrioritizationFees(
          options.addresses
        );

        logger.success(`Retrieved ${fees.length} fee sample(s):`);
        
        if (fees.length > 0) {
          const avgFee =
            fees.reduce((sum, f) => sum + f.prioritizationFee, 0) / fees.length;
          const maxFee = Math.max(...fees.map((f) => f.prioritizationFee));
          const minFee = Math.min(...fees.map((f) => f.prioritizationFee));

          logger.log(`\nSummary:`);
          logger.log(`  Average Fee: ${avgFee.toFixed(2)} micro-lamports`);
          logger.log(`  Max Fee: ${maxFee} micro-lamports`);
          logger.log(`  Min Fee: ${minFee} micro-lamports`);

          logger.log(`\nRecent samples (newest first):`);
          fees.slice(0, 10).forEach((fee, index) => {
            logger.log(
              `  ${index + 1}. Slot ${fee.slot}: ${fee.prioritizationFee} micro-lamports`
            );
          });
        }
      } catch (error) {
        logger.error(
          `Failed to get prioritization fees: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
