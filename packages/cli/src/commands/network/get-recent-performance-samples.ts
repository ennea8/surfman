import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetRecentPerformanceSamplesCommand(): Command {
  const command = new Command('get-recent-performance-samples')
    .description('Get recent performance samples')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--limit <number>', 'Maximum number of samples', '10')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const limit = parseInt(options.limit);

        const samples = await client.network.getRecentPerformanceSamples(limit);

        logger.success(`Retrieved ${samples.length} performance sample(s):`);
        samples.forEach((sample, index) => {
          logger.log(`\n${index + 1}. Slot ${sample.slot}`);
          logger.log(`   Transactions: ${sample.numTransactions}`);
          logger.log(`   Slots: ${sample.numSlots}`);
          logger.log(`   Sample Period: ${sample.samplePeriodSecs}s`);
          if (sample.numNonVoteTransactions !== undefined) {
            logger.log(
              `   Non-vote Transactions: ${sample.numNonVoteTransactions}`
            );
          }
          const tps = (
            sample.numTransactions / sample.samplePeriodSecs
          ).toFixed(2);
          logger.log(`   TPS: ${tps}`);
        });
      } catch (error) {
        logger.error(
          `Failed to get performance samples: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
