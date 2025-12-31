#!/usr/bin/env node
import { Command } from 'commander';
import { createTimeTravelCommand } from './commands/cheatcodes/time-travel';
import { createSetAccountCommand } from './commands/cheatcodes/set-account';
import { createSetProgramAuthorityCommand } from './commands/cheatcodes/set-program-authority';
import { createPauseClockCommand } from './commands/cheatcodes/pause-clock';
import { createResumeClockCommand } from './commands/cheatcodes/resume-clock';
import { createGetLocalSignaturesCommand } from './commands/cheatcodes/get-local-signatures';
import { createSetTokenAccountCommand } from './commands/cheatcodes/set-token-account';
import { createResetAccountCommand } from './commands/cheatcodes/reset-account';
import { createResetNetworkCommand } from './commands/cheatcodes/reset-network';

const program = new Command();

program
  .name('surfman')
  .description('CLI tool for SurfPool RPC API interaction')
  .version('0.1.0');

program.addCommand(createTimeTravelCommand());
program.addCommand(createSetAccountCommand());
program.addCommand(createSetProgramAuthorityCommand());
program.addCommand(createPauseClockCommand());
program.addCommand(createResumeClockCommand());
program.addCommand(createGetLocalSignaturesCommand());
program.addCommand(createSetTokenAccountCommand());
program.addCommand(createResetAccountCommand());
program.addCommand(createResetNetworkCommand());

program.parse();
