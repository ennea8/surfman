import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';

export function createGetSurfnetInfoCommand(): Command {
  const command = new Command('get-surfnet-info')
    .description('Get Surfnet network information')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const info = await client.cheatcodes.getSurfnetInfo();

        logger.success('Surfnet Info:\n');
        logger.log('Runbook Executions:');
        
        if (info.runbookExecutions.length === 0) {
          logger.log('  No runbook executions found.');
        } else {
          info.runbookExecutions.forEach((execution, index) => {
            logger.log(`\n${index + 1}. Runbook: ${execution.runbookId}`);
            logger.log(`   Started At: ${new Date(execution.startedAt * 1000).toISOString()}`);
            if (execution.completedAt) {
              logger.log(`   Completed At: ${new Date(execution.completedAt * 1000).toISOString()}`);
            } else {
              logger.log(`   Status: Running`);
            }
          });
        }
      } catch (error) {
        logger.error(`Failed to get Surfnet info: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
