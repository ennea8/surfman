import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetProgramAccountsCommand(): Command {
  const command = new Command('get-program-accounts')
    .description('Get all accounts owned by a program')
    .requiredOption('--program-id <address>', 'Program public key')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--encoding <type>', 'Data encoding', 'base64')
    .option('--with-context', 'Include context in response', false)
    .option('--data-size <number>', 'Filter by data size')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {
          encoding: options.encoding,
          withContext: options.withContext,
        };

        if (options.dataSize) {
          config.filters = [{ dataSize: parseInt(options.dataSize) }];
        }

        const accounts = await client.scan.getProgramAccounts(
          options.programId,
          config
        );

        logger.success(`Found ${accounts.length} account(s) owned by ${options.programId}:`);
        
        if (accounts.length > 0) {
          accounts.slice(0, 10).forEach((acc, index) => {
            logger.log(`\n${index + 1}. ${acc.pubkey}`);
            logger.log(`   Lamports: ${acc.account.lamports}`);
            logger.log(`   Owner: ${acc.account.owner}`);
          });

          if (accounts.length > 10) {
            logger.log(`\n... and ${accounts.length - 10} more accounts`);
          }
        }
      } catch (error) {
        logger.error(
          `Failed to get program accounts: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
