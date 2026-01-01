import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import chalk from 'chalk';

export function createGetStakeMinimumDelegationCommand(): Command {
  const command = new Command('get-stake-minimum-delegation')
    .description('Get minimum stake delegation amount')
    .option('--commitment <level>', 'Commitment level (processed, confirmed, finalized)')
    .option('--rpc <url>', 'RPC endpoint URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        
        const config: any = {};
        if (options.commitment) config.commitment = options.commitment;

        const lamports = await client.network.getStakeMinimumDelegation(
          Object.keys(config).length > 0 ? config : undefined
        );

        console.log(chalk.cyan('\n💰 Stake Minimum Delegation:\n'));
        console.log(chalk.bold('Lamports:'), chalk.yellow(lamports));
        console.log(chalk.bold('SOL:'), chalk.yellow((lamports / 1e9).toFixed(9)));
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  return command;
}
