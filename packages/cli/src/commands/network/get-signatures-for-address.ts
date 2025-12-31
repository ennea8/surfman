import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetSignaturesForAddressCommand(): Command {
  const command = new Command('get-signatures-for-address')
    .description('Get confirmed signatures for transactions involving an address')
    .requiredOption('--address <pubkey>', 'Account address')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--limit <number>', 'Maximum number of signatures', '10')
    .option('--before <signature>', 'Start searching backwards from this signature')
    .option('--until <signature>', 'Search until this signature')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {
          limit: parseInt(options.limit),
        };

        if (options.before) config.before = options.before;
        if (options.until) config.until = options.until;

        const signatures = await client.network.getSignaturesForAddress(
          options.address,
          config
        );

        logger.success(`Found ${signatures.length} signature(s):`);
        signatures.forEach((sig, index) => {
          logger.log(`\n${index + 1}. ${sig.signature}`);
          logger.log(`   Slot: ${sig.slot}`);
          logger.log(`   Status: ${sig.err ? 'Failed' : 'Success'}`);
          if (sig.blockTime) {
            logger.log(
              `   Time: ${new Date(sig.blockTime * 1000).toISOString()}`
            );
          }
          if (sig.memo) {
            logger.log(`   Memo: ${sig.memo}`);
          }
        });
      } catch (error) {
        logger.error(
          `Failed to get signatures: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
