import { Command } from 'commander';
import { Surfman } from 'surfman-sdk';
import { logger } from '../../utils/logger';
import { readFileSync } from 'fs';

export function createRegisterScenarioCommand(): Command {
  const command = new Command('register-scenario')
    .description('Register a scenario with account overrides')
    .requiredOption('--scenario-file <path>', 'Path to scenario JSON file')
    .option('--slot <slot>', 'Base slot for relative slot offsets')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .action(async (options) => {
      try {
        const client = new Surfman(options.rpc);

        const scenarioContent = readFileSync(options.scenarioFile, 'utf-8');
        const scenario = JSON.parse(scenarioContent);

        const slot = options.slot ? parseInt(options.slot) : undefined;

        await client.cheatcodes.registerScenario(scenario, slot);

        logger.success('Scenario registered successfully!');
        logger.log(`  ID: ${scenario.id}`);
        logger.log(`  Name: ${scenario.name}`);
        logger.log(`  Overrides: ${scenario.overrides.length}`);
        if (scenario.tags && scenario.tags.length > 0) {
          logger.log(`  Tags: ${scenario.tags.join(', ')}`);
        }
        if (slot) {
          logger.log(`  Base Slot: ${slot}`);
        }
      } catch (error) {
        logger.error(`Failed to register scenario: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
