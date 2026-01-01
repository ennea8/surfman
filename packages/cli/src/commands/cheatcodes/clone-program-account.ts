import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createCloneProgramAccountCommand(): Command {
  const command = new Command('clone-program-account')
    .description('Clone a program account from one program ID to another')
    .requiredOption('--source <address>', 'Source program ID')
    .requiredOption('--destination <address>', 'Destination program ID')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        await client.cheatcodes.cloneProgramAccount(
          options.source,
          options.destination
        );

        logger.success(`Program cloned successfully!`);
        logger.log(`Source: ${options.source}`);
        logger.log(`Destination: ${options.destination}`);
      } catch (error) {
        logger.error(`Failed to clone program account: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
