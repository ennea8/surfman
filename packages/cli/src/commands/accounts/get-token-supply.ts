import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetTokenSupplyCommand(): Command {
  const command = new Command('get-token-supply')
    .description('Get total supply of a token')
    .requiredOption('--mint <address>', 'Token mint address')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const supply = await client.accounts.getTokenSupply(
          options.mint,
          config
        );

        logger.success(`Token supply for mint ${options.mint}:`);
        logger.log(`  Total Supply: ${supply.amount}`);
        logger.log(`  Decimals: ${supply.decimals}`);
        logger.log(`  UI Amount: ${supply.uiAmount ?? 'N/A'}`);
        logger.log(`  UI Amount String: ${supply.uiAmountString}`);
      } catch (error) {
        logger.error(
          `Failed to get token supply: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
