import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetBlockCommitmentCommand(): Command {
  const command = new Command('get-block-commitment')
    .description('Get commitment information for a block')
    .requiredOption('--slot <number>', 'Block slot number')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const slot = parseInt(options.slot);

        const commitment = await client.accounts.getBlockCommitment(slot);

        logger.success(`Block commitment for slot ${slot}:`);
        logger.log(`  Total Stake: ${commitment.totalStake}`);
        if (commitment.commitment) {
          const nonZeroLevels = commitment.commitment
            .map((count, level) => ({ level, count }))
            .filter((item) => item.count > 0);
          
          if (nonZeroLevels.length > 0) {
            logger.log(`  Commitment levels:`);
            nonZeroLevels.forEach(({ level, count }) => {
              logger.log(`    Level ${level}: ${count} votes`);
            });
          } else {
            logger.log(`  No commitment votes recorded`);
          }
        } else {
          logger.log(`  No commitment data available`);
        }
      } catch (error) {
        logger.error(
          `Failed to get block commitment: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
