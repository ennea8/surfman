import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetProfileResultsByTagCommand(): Command {
  const command = new Command('get-profile-results-by-tag')
    .description('Get all profiling results for a given tag')
    .requiredOption('--tag <tag>', 'Tag to retrieve profiling results for')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--depth <depth>', 'Profile depth (full or shallow)', 'shallow')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = {
          depth: options.depth as 'full' | 'shallow',
        };

        const results = await client.cheatcodes.getProfileResultsByTag(
          options.tag,
          config
        );

        if (!results || results.length === 0) {
          logger.log(`No profile results found for tag: ${options.tag}`);
          return;
        }

        logger.success(`Found ${results.length} profile result(s) for tag: ${options.tag}\n`);

        results.forEach((result, index) => {
          logger.log(`Profile ${index + 1}:`);
          logger.log(`  UUID: ${result.uuid}`);
          if (result.signature) {
            logger.log(`  Signature: ${result.signature}`);
          }
          logger.log(`  Slot: ${result.slot}`);
          if (result.computeUnitsConsumed) {
            logger.log(`  Compute Units: ${result.computeUnitsConsumed}`);
          }
          if (result.err) {
            logger.log(`  Error: ${JSON.stringify(result.err)}`);
          }
          logger.log('');
        });
      } catch (error) {
        logger.error(`Failed to get profile results: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
