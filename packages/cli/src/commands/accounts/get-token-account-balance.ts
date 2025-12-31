import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetTokenAccountBalanceCommand(): Command {
  const command = new Command('get-token-account-balance')
    .description('Get token balance of a token account')
    .requiredOption('--pubkey <address>', 'Token account public key')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const balance = await client.accounts.getTokenAccountBalance(
          options.pubkey,
          config
        );

        if (!balance) {
          logger.warn(`No token balance found for ${options.pubkey}`);
          return;
        }

        logger.success(`Token account balance for ${options.pubkey}:`);
        logger.log(`  Amount: ${balance.amount}`);
        logger.log(`  Decimals: ${balance.decimals}`);
        logger.log(`  UI Amount: ${balance.uiAmount ?? 'N/A'}`);
        logger.log(`  UI Amount String: ${balance.uiAmountString}`);
      } catch (error) {
        logger.error(
          `Failed to get token balance: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
