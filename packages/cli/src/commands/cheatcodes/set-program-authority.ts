import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createSetProgramAuthorityCommand(): Command {
  const command = new Command('set-program-authority')
    .description('Set or remove program upgrade authority')
    .requiredOption('--program-id <address>', 'Program ID')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--new-authority <address>', 'New authority address')
    .option('--remove-authority', 'Remove authority (make program immutable)')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        let newAuthority: string | null;

        if (options.removeAuthority) {
          newAuthority = null;
          logger.info('Removing program authority (making immutable)');
        } else if (options.newAuthority) {
          newAuthority = options.newAuthority;
          logger.info(`Setting new authority to: ${newAuthority}`);
        } else {
          logger.error('Must specify either --new-authority or --remove-authority');
          process.exit(1);
        }

        await client.cheatcodes.setProgramAuthority(
          options.programId,
          newAuthority
        );

        logger.success(`Program authority updated successfully!`);
        logger.log(`  Program ID: ${options.programId}`);
        logger.log(`  New Authority: ${newAuthority ?? 'null (removed)'}`);
      } catch (error) {
        logger.error(
          `Failed to set program authority: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
