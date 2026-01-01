import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import chalk from 'chalk';

export function createGetInflationRewardCommand(): Command {
  const command = new Command('get-inflation-reward')
    .description('Get inflation rewards for a list of addresses')
    .requiredOption('--addresses <addresses>', 'Comma-separated list of addresses')
    .option('--epoch <epoch>', 'Epoch to query (default: current epoch)', parseInt)
    .option('--commitment <level>', 'Commitment level (processed, confirmed, finalized)')
    .option('--rpc <url>', 'RPC endpoint URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const addresses = options.addresses.split(',').map((addr: string) => addr.trim());
        
        const config: any = {};
        if (options.epoch !== undefined) config.epoch = options.epoch;
        if (options.commitment) config.commitment = options.commitment;

        const rewards = await client.network.getInflationReward(
          addresses,
          Object.keys(config).length > 0 ? config : undefined
        );

        console.log(chalk.cyan('\n📊 Inflation Rewards:\n'));
        rewards.forEach((reward, index) => {
          console.log(chalk.bold(`Address ${index + 1}: ${addresses[index]}`));
          if (reward) {
            console.log(`  Epoch: ${chalk.yellow(reward.epoch)}`);
            console.log(`  Effective Slot: ${chalk.yellow(reward.effectiveSlot)}`);
            console.log(`  Amount: ${chalk.green(reward.amount)} lamports`);
            console.log(`  Post Balance: ${chalk.green(reward.postBalance)} lamports`);
            if (reward.commission !== null && reward.commission !== undefined) {
              console.log(`  Commission: ${chalk.yellow(reward.commission)}%`);
            }
          } else {
            console.log(chalk.gray('  No reward received'));
          }
          console.log();
        });
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  return command;
}
