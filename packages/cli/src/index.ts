#!/usr/bin/env node
import { Command } from 'commander';
import { createCheatcodesCommand } from './commands/cheatcodes';

const program = new Command();

program
  .name('surfman')
  .description('CLI tool for SurfPool RPC API interaction')
  .version('0.1.0');

program.addCommand(createCheatcodesCommand());

program.parse();
