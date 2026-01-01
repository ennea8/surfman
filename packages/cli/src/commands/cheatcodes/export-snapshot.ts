import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';
import { writeFileSync } from 'fs';

export function createExportSnapshotCommand(): Command {
  const command = new Command('export-snapshot')
    .description('Export a snapshot of all accounts')
    .option('--output <path>', 'Output file path', 'snapshot.json')
    .option('--include-parsed', 'Include parsed account data')
    .option('--include-programs', 'Include program accounts')
    .option('--include-accounts <accounts...>', 'Specific accounts to include')
    .option('--exclude-accounts <accounts...>', 'Specific accounts to exclude')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {};

        if (options.includeParsed) {
          config.includeParsedAccounts = true;
        }

        if (options.includePrograms || options.includeAccounts || options.excludeAccounts) {
          config.filter = {};
          
          if (options.includePrograms) {
            config.filter.includeProgramAccounts = true;
          }
          if (options.includeAccounts) {
            config.filter.includeAccounts = options.includeAccounts;
          }
          if (options.excludeAccounts) {
            config.filter.excludeAccounts = options.excludeAccounts;
          }
        }

        const snapshot = await client.cheatcodes.exportSnapshot(config);

        writeFileSync(options.output, JSON.stringify(snapshot, null, 2));

        const accountCount = Object.keys(snapshot).length;
        logger.success(`Snapshot exported successfully!`);
        logger.log(`  Accounts: ${accountCount}`);
        logger.log(`  Output: ${options.output}`);
      } catch (error) {
        logger.error(`Failed to export snapshot: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
