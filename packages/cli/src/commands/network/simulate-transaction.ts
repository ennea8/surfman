import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createSimulateTransactionCommand(): Command {
  const command = new Command('simulate-transaction')
    .description('Simulate a transaction without committing it')
    .requiredOption('--transaction <data>', 'Base64 encoded transaction')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--sig-verify', 'Enable signature verification', true)
    .option('--commitment <level>', 'Commitment level')
    .option('--encoding <type>', 'Encoding type', 'base64')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const config: any = {
          sigVerify: options.sigVerify,
          encoding: options.encoding,
        };

        if (options.commitment) {
          config.commitment = options.commitment;
        }

        const result = await client.network.simulateTransaction(
          options.transaction,
          config
        );

        if (result.err) {
          logger.error('Transaction simulation failed:');
          logger.log(JSON.stringify(result.err, null, 2));
        } else {
          logger.success('Transaction simulation successful!');
        }

        if (result.logs && result.logs.length > 0) {
          logger.log('\nLogs:');
          result.logs.forEach((log) => logger.log(`  ${log}`));
        }

        if (result.unitsConsumed) {
          logger.log(`\nCompute units consumed: ${result.unitsConsumed}`);
        }

        if (result.accounts) {
          logger.log(`\nAccounts modified: ${result.accounts.length}`);
        }

        if (result.returnData) {
          logger.log(`\nReturn data: ${JSON.stringify(result.returnData)}`);
        }
      } catch (error) {
        logger.error(
          `Failed to simulate transaction: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
