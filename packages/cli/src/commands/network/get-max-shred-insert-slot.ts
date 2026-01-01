import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import chalk from 'chalk';

export function createGetMaxShredInsertSlotCommand(): Command {
  const command = new Command('get-max-shred-insert-slot')
    .description('Get maximum shred insert slot')
    .option('--rpc <url>', 'RPC endpoint URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const slot = await client.network.getMaxShredInsertSlot();

        console.log(chalk.cyan('\n📥 Max Shred Insert Slot:\n'));
        console.log(chalk.bold('Slot:'), chalk.yellow(slot));
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  return command;
}
