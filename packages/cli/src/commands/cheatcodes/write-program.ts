import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';
import { readFileSync } from 'fs';

export function createWriteProgramCommand(): Command {
  const command = new Command('write-program')
    .description('Write program data at a specified offset')
    .requiredOption('--program-id <address>', 'Program ID')
    .option('--data <hex>', 'Hex-encoded program data')
    .option('--data-file <path>', 'Path to binary file containing program data')
    .option('--offset <offset>', 'Byte offset at which to write data', '0')
    .option('--authority <address>', 'Program authority')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        let dataHex: string;

        if (options.data) {
          dataHex = options.data;
        } else if (options.dataFile) {
          const buffer = readFileSync(options.dataFile);
          dataHex = buffer.toString('hex');
        } else {
          logger.error('Either --data or --data-file must be specified');
          process.exit(1);
        }

        const offset = parseInt(options.offset);
        const authority = options.authority || undefined;

        await client.cheatcodes.writeProgram(
          options.programId,
          dataHex,
          offset,
          authority
        );

        logger.success('Program data written successfully!');
        logger.log(`  Program ID: ${options.programId}`);
        logger.log(`  Offset: ${offset}`);
        logger.log(`  Data length: ${dataHex.length / 2} bytes`);
        if (authority) {
          logger.log(`  Authority: ${authority}`);
        }
      } catch (error) {
        logger.error(`Failed to write program: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
