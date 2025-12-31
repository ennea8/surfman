import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createResetAccountCommand(): Command {
  const command = new Command('reset-account')
    .description('Reset an account to its initial state')
    .requiredOption('--pubkey <address>', 'Account public key')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option(
      '--include-owned',
      'Also reset accounts owned by this account',
      false
    )
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.includeOwned
          ? { includeOwnedAccounts: true }
          : undefined;

        await client.cheatcodes.resetAccount(options.pubkey, config);

        logger.success(`Account ${options.pubkey} reset successfully!`);
        if (options.includeOwned) {
          logger.log('  Owned accounts were also reset');
        }
      } catch (error) {
        logger.error(`Failed to reset account: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
