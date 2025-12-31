import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createGetSupplyCommand(): Command {
  const command = new Command('get-supply')
    .description('Get current supply information')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--exclude-accounts', 'Exclude non-circulating accounts list', false)
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {
          excludeNonCirculatingAccountsList: options.excludeAccounts,
        };
        if (options.commitment) {
          config.commitment = options.commitment;
        }

        const supply = await client.scan.getSupply(config);

        const totalSOL = (supply.total / 1e9).toFixed(2);
        const circulatingSOL = (supply.circulating / 1e9).toFixed(2);
        const nonCirculatingSOL = (supply.nonCirculating / 1e9).toFixed(2);

        logger.success('Network Supply:');
        logger.log(`  Total: ${supply.total} lamports (${totalSOL} SOL)`);
        logger.log(`  Circulating: ${supply.circulating} lamports (${circulatingSOL} SOL)`);
        logger.log(`  Non-Circulating: ${supply.nonCirculating} lamports (${nonCirculatingSOL} SOL)`);
        
        if (!options.excludeAccounts && supply.nonCirculatingAccounts.length > 0) {
          logger.log(`\n  Non-Circulating Accounts: ${supply.nonCirculatingAccounts.length}`);
        }
      } catch (error) {
        logger.error(`Failed to get supply: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
