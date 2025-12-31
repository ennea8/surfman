import { Command } from 'commander';
import { createTimeTravelCommand } from './time-travel';
import { createSetAccountCommand } from './set-account';
import { createSetProgramAuthorityCommand } from './set-program-authority';

export function createCheatcodesCommand(): Command {
  const command = new Command('cheatcodes')
    .description('SurfPool cheatcodes commands')
    .addCommand(createTimeTravelCommand())
    .addCommand(createSetAccountCommand())
    .addCommand(createSetProgramAuthorityCommand());

  return command;
}
