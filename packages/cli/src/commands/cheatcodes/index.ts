import { Command } from 'commander';
import { createTimeTravelCommand } from './time-travel';
import { createSetAccountCommand } from './set-account';
import { createSetProgramAuthorityCommand } from './set-program-authority';
import { createPauseClockCommand } from './pause-clock';
import { createResumeClockCommand } from './resume-clock';
import { createGetLocalSignaturesCommand } from './get-local-signatures';
import { createSetTokenAccountCommand } from './set-token-account';
import { createResetAccountCommand } from './reset-account';
import { createResetNetworkCommand } from './reset-network';
import { createCloneProgramAccountCommand } from './clone-program-account';
import { createProfileTransactionCommand } from './profile-transaction';
import { createGetProfileResultsByTagCommand } from './get-profile-results-by-tag';
import { createSetSupplyCommand } from './set-supply';
import { createGetTransactionProfileCommand } from './get-transaction-profile';
import { createRegisterIdlCommand } from './register-idl';
import { createGetIdlCommand } from './get-idl';
import { createExportSnapshotCommand } from './export-snapshot';
import { createStreamAccountCommand } from './stream-account';
import { createGetStreamedAccountsCommand } from './get-streamed-accounts';
import { createGetSurfnetInfoCommand } from './get-surfnet-info';
import { createWriteProgramCommand } from './write-program';
import { createRegisterScenarioCommand } from './register-scenario';

export function createCheatcodesCommand(): Command {
  const command = new Command('cheatcodes')
    .description('SurfPool cheatcodes commands')
    .addCommand(createTimeTravelCommand())
    .addCommand(createSetAccountCommand())
    .addCommand(createSetProgramAuthorityCommand())
    .addCommand(createPauseClockCommand())
    .addCommand(createResumeClockCommand())
    .addCommand(createGetLocalSignaturesCommand())
    .addCommand(createSetTokenAccountCommand())
    .addCommand(createResetAccountCommand())
    .addCommand(createResetNetworkCommand())
    .addCommand(createCloneProgramAccountCommand())
    .addCommand(createProfileTransactionCommand())
    .addCommand(createGetProfileResultsByTagCommand())
    .addCommand(createSetSupplyCommand())
    .addCommand(createGetTransactionProfileCommand())
    .addCommand(createRegisterIdlCommand())
    .addCommand(createGetIdlCommand())
    .addCommand(createExportSnapshotCommand())
    .addCommand(createStreamAccountCommand())
    .addCommand(createGetStreamedAccountsCommand())
    .addCommand(createGetSurfnetInfoCommand())
    .addCommand(createWriteProgramCommand())
    .addCommand(createRegisterScenarioCommand());

  return command;
}
