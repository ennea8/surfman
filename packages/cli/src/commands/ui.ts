import { Command } from 'commander';
import chalk from 'chalk';
import { startWebServer } from '../server/index.js';
import { exec } from 'child_process';

export function createUiCommand(): Command {
  const command = new Command('ui')
    .description('Start Surfman Web UI')
    .option('-p, --port <port>', 'Port to run the web server on', '3000')
    .option('--rpc <url>', 'RPC endpoint URL', 'http://localhost:8899')
    .option('--no-open', 'Do not automatically open browser')
    .action(async (options) => {
      const port = parseInt(options.port);
      const rpcUrl = options.rpc;
      const shouldOpen = options.open !== false;

      console.log(chalk.cyan('\n🌊 Starting Surfman Web UI...\n'));
      console.log(chalk.gray(`  Port: ${chalk.white(port)}`));
      console.log(chalk.gray(`  RPC:  ${chalk.white(rpcUrl)}`));
      console.log();

      try {
        await startWebServer({
          port,
          rpcUrl,
          openBrowser: shouldOpen,
        });

        const url = `http://localhost:${port}`;
        console.log(chalk.green('✓ Web UI started successfully!\n'));
        console.log(chalk.bold('  Local:   ') + chalk.cyan(url));
        console.log();
        console.log(chalk.gray('  Press Ctrl+C to stop\n'));

        if (shouldOpen) {
          const command = process.platform === 'darwin' ? 'open' : 
                         process.platform === 'win32' ? 'start' : 'xdg-open';
          exec(`${command} ${url}`);
        }

        process.on('SIGINT', () => {
          console.log(chalk.yellow('\n\n👋 Shutting down Surfman Web UI...\n'));
          process.exit(0);
        });
      } catch (error: any) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  return command;
}
