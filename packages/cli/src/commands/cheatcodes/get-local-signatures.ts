import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetLocalSignaturesCommand(): Command {
  const command = new Command('get-local-signatures')
    .description('Get recent local transaction signatures')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--limit <number>', 'Maximum number of signatures to return', '50')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const limit = parseInt(options.limit);

        const signatures = await client.cheatcodes.getLocalSignatures(limit);

        logger.success(`Retrieved ${signatures.length} signature(s):`);
        signatures.forEach((sig, index) => {
          logger.log(`\n${index + 1}. Signature: ${sig.signature}`);
          logger.log(`   Slot: ${sig.slot}`);
          logger.log(`   Error: ${sig.err ? JSON.stringify(sig.err) : 'None'}`);
          if (sig.logs && sig.logs.length > 0) {
            logger.log(`   Logs: ${sig.logs.length} line(s)`);
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
