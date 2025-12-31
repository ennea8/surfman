import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createSetAccountCommand(): Command {
  const command = new Command('set-account')
    .description('Modify account data, lamports, owner, etc.')
    .requiredOption('--pubkey <address>', 'Account public key')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--data <hex>', 'Account data (hex string)')
    .option('--lamports <amount>', 'Account lamports')
    .option('--owner <address>', 'Account owner')
    .option('--executable', 'Mark account as executable')
    .option('--rent-epoch <epoch>', 'Rent epoch')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const update: any = {};

        if (options.data) {
          update.data = options.data;
        }
        if (options.lamports) {
          update.lamports = parseInt(options.lamports);
        }
        if (options.owner) {
          update.owner = options.owner;
        }
        if (options.executable) {
          update.executable = true;
        }
        if (options.rentEpoch) {
          update.rentEpoch = parseInt(options.rentEpoch);
        }

        if (Object.keys(update).length === 0) {
          logger.error('No update fields specified. Use --data, --lamports, --owner, etc.');
          process.exit(1);
        }

        await client.cheatcodes.setAccount(options.pubkey, update);

        logger.success(`Account ${options.pubkey} updated successfully!`);
        logger.log('Updated fields:');
        Object.entries(update).forEach(([key, value]) => {
          logger.log(`  ${key}: ${value}`);
        });
      } catch (error) {
        logger.error(`Failed to set account: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
