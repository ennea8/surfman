import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetIdlCommand(): Command {
  const command = new Command('get-idl')
    .description('Get the registered IDL for a program')
    .requiredOption('--program-id <address>', 'Program ID')
    .option('--slot <slot>', 'Slot at which to query the IDL')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const slot = options.slot ? parseInt(options.slot) : undefined;
        const idl = await client.cheatcodes.getIdl(options.programId, slot);

        if (!idl) {
          logger.log(`No IDL found for program: ${options.programId}`);
          return;
        }

        logger.success('IDL found!');
        logger.log('\nIDL:');
        logger.log(JSON.stringify(idl, null, 2));
      } catch (error) {
        logger.error(`Failed to get IDL: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
