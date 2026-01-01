import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetTransactionProfileCommand(): Command {
  const command = new Command('get-transaction-profile')
    .description('Get transaction profile by signature or UUID')
    .requiredOption('--id <signatureOrUuid>', 'Transaction signature or UUID')
    .option('--type <type>', 'ID type (signature or uuid)', 'signature')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--depth <depth>', 'Profile depth (full or shallow)', 'full')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = {
          depth: options.depth as 'full' | 'shallow',
        };

        const signatureOrUuid = options.type === 'uuid'
          ? { Uuid: options.id }
          : { Signature: options.id };

        const result = await client.cheatcodes.getTransactionProfile(
          signatureOrUuid,
          config
        );

        if (!result) {
          logger.log(`No profile found for ${options.type}: ${options.id}`);
          return;
        }

        logger.success('Profile found!');
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
        logger.error(`Failed to get transaction profile: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
