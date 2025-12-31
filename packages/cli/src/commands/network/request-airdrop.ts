import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import { logger } from '../../utils/logger';

export function createRequestAirdropCommand(): Command {
  const command = new Command('request-airdrop')
    .description('Request an airdrop of lamports')
    .requiredOption('--pubkey <address>', 'Public key to airdrop to')
    .requiredOption('--lamports <amount>', 'Amount in lamports')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--commitment <level>', 'Commitment level')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);
        const lamports = parseInt(options.lamports);

        const config = options.commitment
          ? { commitment: options.commitment }
          : undefined;

        const signature = await client.network.requestAirdrop(
          options.pubkey,
          lamports,
          config
        );

        logger.success(`Airdrop requested successfully!`);
        logger.log(`  Signature: ${signature}`);
        logger.log(`  Amount: ${lamports} lamports`);
        logger.log(`  Recipient: ${options.pubkey}`);
      } catch (error) {
        logger.error(
          `Failed to request airdrop: ${(error as Error).message}`
        );
        process.exit(1);
      }
    });

  return command;
}
