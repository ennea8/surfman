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
import { createGetLatestBlockhashCommand } from './commands/network/get-latest-blockhash';
import { createGetBlockCommand } from './commands/network/get-block';
import { createGetTransactionCommand } from './commands/network/get-transaction';
import { createSendTransactionCommand } from './commands/network/send-transaction';
import { createGetClusterNodesCommand } from './commands/network/get-cluster-nodes';
import { createRequestAirdropCommand } from './commands/network/request-airdrop';
import { createGetBlocksCommand } from './commands/network/get-blocks';
import { createGetSignaturesForAddressCommand } from './commands/network/get-signatures-for-address';
import { createIsBlockhashValidCommand } from './commands/network/is-blockhash-valid';
import { createGetFeeForMessageCommand } from './commands/network/get-fee-for-message';
import { createGetRecentPrioritizationFeesCommand } from './commands/network/get-recent-prioritization-fees';
import { createGetBlockTimeCommand } from './commands/network/get-block-time';
import { createGetBlocksWithLimitCommand } from './commands/network/get-blocks-with-limit';
import { createGetFirstAvailableBlockCommand } from './commands/network/get-first-available-block';
import { createMinimumLedgerSlotCommand } from './commands/network/minimum-ledger-slot';
import { createGetSignatureStatusesCommand } from './commands/network/get-signature-statuses';
import { createSimulateTransactionCommand } from './commands/network/simulate-transaction';
import { createGetRecentPerformanceSamplesCommand } from './commands/network/get-recent-performance-samples';

const program = new Command();

program
  .name('surfman')
  .description('CLI tool for SurfPool RPC API interaction')
  .version('0.1.0');

// Cheatcodes
program.addCommand(createTimeTravelCommand());
program.addCommand(createSetAccountCommand());
program.addCommand(createSetProgramAuthorityCommand());
program.addCommand(createPauseClockCommand());
program.addCommand(createResumeClockCommand());
program.addCommand(createGetLocalSignaturesCommand());
program.addCommand(createSetTokenAccountCommand());
program.addCommand(createResetAccountCommand());
program.addCommand(createResetNetworkCommand());

// Network
program.addCommand(createGetLatestBlockhashCommand());
program.addCommand(createGetBlockCommand());
program.addCommand(createGetTransactionCommand());
program.addCommand(createSendTransactionCommand());
program.addCommand(createGetClusterNodesCommand());
program.addCommand(createRequestAirdropCommand());
program.addCommand(createGetBlocksCommand());
program.addCommand(createGetSignaturesForAddressCommand());
program.addCommand(createIsBlockhashValidCommand());
program.addCommand(createGetFeeForMessageCommand());
program.addCommand(createGetRecentPrioritizationFeesCommand());
program.addCommand(createGetBlockTimeCommand());
program.addCommand(createGetBlocksWithLimitCommand());
program.addCommand(createGetFirstAvailableBlockCommand());
program.addCommand(createMinimumLedgerSlotCommand());
program.addCommand(createGetSignatureStatusesCommand());
program.addCommand(createSimulateTransactionCommand());
program.addCommand(createGetRecentPerformanceSamplesCommand());

program.parse();
