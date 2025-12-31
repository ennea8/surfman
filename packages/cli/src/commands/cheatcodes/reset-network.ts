import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createResetNetworkCommand(): Command {
  const command = new Command('reset-network')
    .description('Reset the entire Surfnet network to initial state')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--confirm', 'Confirm network reset (required)', false)
    .action(async (options) => {
      try {
        if (!options.confirm) {
          logger.error(
            'Network reset requires confirmation. Use --confirm flag.'
          );
          logger.warn(
            'Warning: This will reset ALL accounts and state in the network!'
          );
          process.exit(1);
        }

        const client = new Surfman(options.rpc);

        logger.warn('Resetting network...');
        await client.cheatcodes.resetNetwork();

        logger.success('Network reset successfully!');
        logger.log('All accounts and state have been cleared.');
      } catch (error) {
        logger.error(`Failed to reset network: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
