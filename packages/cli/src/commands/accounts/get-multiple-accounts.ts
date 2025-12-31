import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetMultipleAccountsCommand(): Command {
  const command = new Command('get-multiple-accounts')
    .description('Get information for multiple accounts')
    .requiredOption('--pubkeys <addresses...>', 'Account public keys')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--encoding <type>', 'Data encoding', 'base64')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {
          encoding: options.encoding,
        };

        if (options.commitment) {
          config.commitment = options.commitment;
        }

        const accounts = await client.accounts.getMultipleAccounts(
          options.pubkeys,
          config
        );

        logger.success(`Retrieved ${accounts.length} account(s):`);
        accounts.forEach((account, index) => {
          const pubkey = options.pubkeys[index];
          logger.log(`\n${index + 1}. ${pubkey}`);
          
          if (account) {
            logger.log(`   Lamports: ${account.lamports}`);
            logger.log(`   Owner: ${account.owner}`);
            logger.log(`   Executable: ${account.executable}`);
          } else {
            logger.log('   Status: Account not found');
          }
        });
      } catch (error) {
        logger.error(
          `Failed to get accounts: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
