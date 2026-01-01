import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';
import { readFileSync } from 'fs';

export function createRegisterIdlCommand(): Command {
  const command = new Command('register-idl')
    .description('Register an IDL for a program')
    .requiredOption('--idl-file <path>', 'Path to IDL JSON file')
    .option('--slot <slot>', 'Slot at which to register the IDL')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const idlContent = readFileSync(options.idlFile, 'utf-8');
        const idl = JSON.parse(idlContent);

        const slot = options.slot ? parseInt(options.slot) : undefined;

        await client.cheatcodes.registerIdl(idl, slot);

        logger.success('IDL registered successfully!');
        logger.log(`  Program: ${idl.address}`);
        logger.log(`  Name: ${idl.metadata.name}`);
        logger.log(`  Version: ${idl.metadata.version}`);
        if (slot) {
          logger.log(`  Slot: ${slot}`);
        }
      } catch (error) {
        logger.error(`Failed to register IDL: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
