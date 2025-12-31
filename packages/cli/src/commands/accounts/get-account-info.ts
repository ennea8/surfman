import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetAccountInfoCommand(): Command {
  const command = new Command('get-account-info')
    .description('Get detailed information about an account')
    .requiredOption('--pubkey <address>', 'Account public key')
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

        const account = await client.accounts.getAccountInfo(
          options.pubkey,
          config
        );

        if (!account) {
          logger.warn(`Account not found: ${options.pubkey}`);
          return;
        }

        logger.success(`Account Info for ${options.pubkey}:`);
        logger.log(`  Lamports: ${account.lamports}`);
        logger.log(`  Owner: ${account.owner}`);
        logger.log(`  Executable: ${account.executable}`);
        logger.log(`  Rent Epoch: ${account.rentEpoch}`);
        if (account.space !== undefined) {
          logger.log(`  Space: ${account.space} bytes`);
        }
        if (account.data) {
          logger.log(`  Data: ${JSON.stringify(account.data).substring(0, 100)}...`);
        }
      } catch (error) {
        logger.error(
          `Failed to get account info: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
