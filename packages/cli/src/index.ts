#!/usr/bin/env node
import { Command } from 'commander';
import { createTimeTravelCommand } from './commands/cheatcodes/time-travel';
import { createSetAccountCommand } from './commands/cheatcodes/set-account';
import { createSetProgramAuthorityCommand } from './commands/cheatcodes/set-program-authority';

const program = new Command();

program
  .name('surfman')
  .description('CLI tool for SurfPool RPC API interaction')
  .version('0.1.0');

program.addCommand(createTimeTravelCommand());
program.addCommand(createSetAccountCommand());
program.addCommand(createSetProgramAuthorityCommand());

program.parse();
