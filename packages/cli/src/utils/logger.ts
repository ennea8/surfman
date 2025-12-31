import chalk from 'chalk';

export const logger = {
  info: (message: string) => console.log(chalk.blue('ℹ'), message),
  success: (message: string) => console.log(chalk.green('✓'), message),
  error: (message: string) => console.error(chalk.red('✗'), message),
  warn: (message: string) => console.warn(chalk.yellow('⚠'), message),
  log: (message: string) => console.log(message),
};
