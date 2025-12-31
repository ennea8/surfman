import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetTokenLargestAccountsCommand(): Command {
  const command = new Command('get-token-largest-accounts')
    .description('Get largest holders of a specific token')
    .requiredOption('--mint <address>', 'Token mint address')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const accounts = await client.scan.getTokenLargestAccounts(
          options.mint,
          config
        );

        logger.success(`Top ${accounts.length} holders of token ${options.mint}:`);
        accounts.forEach((acc, index) => {
          logger.log(`\n${index + 1}. ${acc.address}`);
          logger.log(`   Amount: ${acc.amount} (${acc.uiAmountString})`);
          logger.log(`   Decimals: ${acc.decimals}`);
        });
      } catch (error) {
        logger.error(
          `Failed to get token largest accounts: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
