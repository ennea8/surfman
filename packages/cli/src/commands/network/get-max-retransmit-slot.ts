import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import chalk from 'chalk';

export function createGetMaxRetransmitSlotCommand(): Command {
  const command = new Command('get-max-retransmit-slot')
    .description('Get maximum retransmit slot')
    .option('--rpc <url>', 'RPC endpoint URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const slot = await client.network.getMaxRetransmitSlot();

        console.log(chalk.cyan('\n📡 Max Retransmit Slot:\n'));
        console.log(chalk.bold('Slot:'), chalk.yellow(slot));
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  return command;
}
