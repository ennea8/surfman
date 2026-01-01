import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createSetTokenAccountCommand(): Command {
  const command = new Command('set-token-account')
    .description('Set or update token account properties')
    .requiredOption('--owner <address>', 'Token account owner address')
    .requiredOption('--mint <address>', 'Token mint address')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--amount <number>', 'Token amount')
    .option('--delegate <address>', 'Delegate address (use "none" to clear)')
    .option('--state <state>', 'Account state (initialized, frozen, etc.)')
    .option('--delegated-amount <number>', 'Delegated amount')
    .option(
      '--close-authority <address>',
      'Close authority address (use "none" to clear)'
    )
    .option('--token-program <address>', 'Token program address')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const update: any = {};

        if (options.amount) {
          update.amount = parseInt(options.amount);
        }
        if (options.delegate) {
          if (options.delegate.toLowerCase() === 'none') {
            update.delegate = { NoAccount: true };
          } else {
            update.delegate = { Account: options.delegate };
          }
        }
        if (options.state) {
          update.state = options.state;
        }
        if (options.delegatedAmount) {
          update.delegatedAmount = parseInt(options.delegatedAmount);
        }
        if (options.closeAuthority) {
          if (options.closeAuthority.toLowerCase() === 'none') {
            update.closeAuthority = { NoAccount: true };
          } else {
            update.closeAuthority = { Account: options.closeAuthority };
          }
        }

        if (Object.keys(update).length === 0) {
          logger.error('No update fields specified');
          process.exit(1);
        }

        await client.cheatcodes.setTokenAccount(
          options.owner,
          options.mint,
          update,
          options.tokenProgram
        );

        logger.success('Token account updated successfully!');
        logger.log(`  Owner: ${options.owner}`);
        logger.log(`  Mint: ${options.mint}`);
        logger.log('Updated fields:');
        Object.entries(update).forEach(([key, value]) => {
          logger.log(`  ${key}: ${JSON.stringify(value)}`);
        });
      } catch (error) {
        logger.error(
          `Failed to set token account: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
