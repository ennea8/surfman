import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createProfileTransactionCommand(): Command {
  const command = new Command('profile-transaction')
    .description('Profile a transaction to estimate compute units')
    .requiredOption('--transaction <base64>', 'Base64 encoded transaction data')
    .option('--tag <tag>', 'Optional tag for the transaction')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--depth <depth>', 'Profile depth (full or shallow)', 'full')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = {
          depth: options.depth as 'full' | 'shallow',
        };

        const result = await client.cheatcodes.profileTransaction(
          options.transaction,
          options.tag,
          config
        );

        logger.success('Transaction profiled successfully!');
        logger.log('\nProfile Result:');
        logger.log(`  UUID: ${result.uuid}`);
        if (result.signature) {
          logger.log(`  Signature: ${result.signature}`);
        }
        logger.log(`  Slot: ${result.slot}`);
        if (result.tag) {
          logger.log(`  Tag: ${result.tag}`);
        }
        if (result.computeUnitsConsumed) {
          logger.log(`  Compute Units: ${result.computeUnitsConsumed}`);
        }
        if (result.err) {
          logger.log(`  Error: ${JSON.stringify(result.err, null, 2)}`);
        }
        if (result.logs && result.logs.length > 0) {
          logger.log('\nLogs:');
          result.logs.forEach((log) => logger.log(`  ${log}`));
        }
      } catch (error) {
        logger.error(`Failed to profile transaction: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
