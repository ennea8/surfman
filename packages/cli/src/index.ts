import { Command } from 'commander';
import chalk from 'chalk';
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
import { createGetAccountInfoCommand } from './commands/accounts/get-account-info';
import { createGetMultipleAccountsCommand } from './commands/accounts/get-multiple-accounts';
import { createGetBlockCommitmentCommand } from './commands/accounts/get-block-commitment';
import { createGetTokenAccountBalanceCommand } from './commands/accounts/get-token-account-balance';
import { createGetTokenSupplyCommand } from './commands/accounts/get-token-supply';
import { createGetProgramAccountsCommand } from './commands/scan/get-program-accounts';
import { createGetLargestAccountsCommand } from './commands/scan/get-largest-accounts';
import { createGetSupplyCommand } from './commands/scan/get-supply';
import { createGetTokenLargestAccountsCommand } from './commands/scan/get-token-largest-accounts';
import { createGetTokenAccountsByOwnerCommand } from './commands/scan/get-token-accounts-by-owner';
import { createGetTokenAccountsByDelegateCommand } from './commands/scan/get-token-accounts-by-delegate';

const program = new Command();

// Check for --help to show complete list
const isFullHelp = process.argv.includes('--help');
const isShortHelp = process.argv.includes('-h');

// Handle --help flag to show complete command list
if (isFullHelp) {
  console.log(chalk.bold.cyan('\n🌊 Surfman CLI - Complete Command List\n'));
  
  console.log(chalk.bold.yellow('📦 Account Queries (5 commands):\n'));
  console.log(`  ${chalk.yellow('get-account-info')}             Get detailed account information`);
  console.log(`  ${chalk.yellow('get-multiple-accounts')}        Batch query multiple accounts`);
  console.log(`  ${chalk.yellow('get-token-account-balance')}    Get token account balance`);
  console.log(`  ${chalk.yellow('get-token-supply')}             Get total token supply`);
  console.log(`  ${chalk.yellow('get-block-commitment')}         Get block commitment data\n`);
  
  console.log(chalk.bold.blue('🌐 Network Operations (18 commands):\n'));
  console.log(chalk.dim('  Block Queries:'));
  console.log(`  ${chalk.blue('get-latest-blockhash')}         Get the latest blockhash`);
  console.log(`  ${chalk.blue('get-block')}                     Get block information by slot`);
  console.log(`  ${chalk.blue('get-block-time')}                Get block production time`);
  console.log(`  ${chalk.blue('get-blocks')}                    Get list of confirmed blocks`);
  console.log(`  ${chalk.blue('get-blocks-with-limit')}         Get blocks with limit`);
  console.log(`  ${chalk.blue('get-first-available-block')}     Get first available block`);
  console.log(`  ${chalk.blue('minimum-ledger-slot')}           Get minimum ledger slot\n`);
  
  console.log(chalk.dim('  Transaction Operations:'));
  console.log(`  ${chalk.blue('get-transaction')}               Get transaction details`);
  console.log(`  ${chalk.blue('get-signature-statuses')}        Get signature statuses`);
  console.log(`  ${chalk.blue('get-signatures-for-address')}    Get address transaction history`);
  console.log(`  ${chalk.blue('send-transaction')}              Send a signed transaction`);
  console.log(`  ${chalk.blue('simulate-transaction')}          Simulate transaction execution\n`);
  
  console.log(chalk.dim('  Network Info & Fees:'));
  console.log(`  ${chalk.blue('is-blockhash-valid')}            Check if blockhash is valid`);
  console.log(`  ${chalk.blue('get-fee-for-message')}           Get fee for a message`);
  console.log(`  ${chalk.blue('get-recent-prioritization-fees')} Get recent priority fees`);
  console.log(`  ${chalk.blue('get-cluster-nodes')}             Get cluster node information`);
  console.log(`  ${chalk.blue('get-recent-performance-samples')} Get performance samples`);
  console.log(`  ${chalk.blue('request-airdrop')}               Request lamports airdrop\n`);
  
  console.log(chalk.bold.magenta('🔧 Testing & Development (9 commands):\n'));
  console.log(chalk.dim('  Time Control:'));
  console.log(`  ${chalk.magenta('time-travel')}                  Time travel to epoch/slot/timestamp`);
  console.log(`  ${chalk.magenta('pause-clock')}                  Pause the network clock`);
  console.log(`  ${chalk.magenta('resume-clock')}                 Resume the network clock\n`);
  
  console.log(chalk.dim('  Account Manipulation:'));
  console.log(`  ${chalk.magenta('set-account')}                  Modify account data/lamports/owner`);
  console.log(`  ${chalk.magenta('set-token-account')}            Update token account properties`);
  console.log(`  ${chalk.magenta('reset-account')}                Reset account to initial state\n`);
  
  console.log(chalk.dim('  Network Management:'));
  console.log(`  ${chalk.magenta('reset-network')}                Reset entire network state`);
  console.log(`  ${chalk.magenta('get-local-signatures')}         Get recent local signatures`);
  console.log(`  ${chalk.magenta('set-program-authority')}        Set/remove program authority\n`);
  
  console.log(chalk.bold.green('📊 Scan & Analytics (6 commands):\n'));
  console.log(chalk.dim('  Batch Queries:'));
  console.log(`  ${chalk.green('get-program-accounts')}          Get all accounts owned by a program`);
  console.log(`  ${chalk.green('get-largest-accounts')}          Get top 20 accounts by balance`);
  console.log(`  ${chalk.green('get-supply')}                    Get network supply information\n`);
  
  console.log(chalk.dim('  Token Distribution:'));
  console.log(`  ${chalk.green('get-token-largest-accounts')}    Get largest token holders`);
  console.log(`  ${chalk.green('get-token-accounts-by-owner')}   Get token accounts by owner`);
  console.log(`  ${chalk.green('get-token-accounts-by-delegate')} Get delegated token accounts\n`);
  
  console.log(chalk.bold.cyan('📊 Summary:\n'));
  console.log(`  Total Commands: ${chalk.bold('38')}`);
  console.log(`  Account Queries: ${chalk.yellow('5')}`);
  console.log(`  Network Operations: ${chalk.blue('18')}`);
  console.log(`  Testing & Development: ${chalk.magenta('9')}`);
  console.log(`  Scan & Analytics: ${chalk.green('6')}\n`);
  
  console.log(chalk.gray('💡 Use ') + chalk.cyan('surfman <command> --help') + chalk.gray(' for detailed options\n'));
  process.exit(0);
}

program
  .name('surfman')
  .description('CLI tool for SurfPool RPC API interaction')
  .version('0.1.0');

// Custom help configuration
program.configureHelp({
  formatHelp: (cmd, helper) => {
    const termWidth = helper.padWidth(cmd, helper);
    const helpWidth = helper.helpWidth || 80;

    let output = '';
    
    // Title
    output += chalk.bold.cyan('\n🌊 Surfman CLI\n\n');
    output += chalk.gray('CLI tool for SurfPool RPC API interaction\n\n');

    // Usage
    output += chalk.bold('Usage:\n');
    output += `  $ surfman ${chalk.yellow('<command>')} ${chalk.gray('[options]')}\n\n`;

    // Options
    output += chalk.bold('Options:\n');
    output += `  -V, --version    ${chalk.gray('Output the version number')}\n`;
    output += `  -h               ${chalk.gray('Display frequently used commands (quick view)')}\n`;
    output += `  --help           ${chalk.gray('Display all commands grouped by module')}\n\n`;

    // Frequently Used Commands
    output += chalk.bold.green('⭐ Frequently Used:\n');
    output += `  ${chalk.cyan('get-account-info')}             ${chalk.gray('Get account information')}\n`;
    output += `  ${chalk.cyan('get-latest-blockhash')}         ${chalk.gray('Get latest blockhash')}\n`;
    output += `  ${chalk.cyan('send-transaction')}             ${chalk.gray('Send a transaction')}\n`;
    output += `  ${chalk.cyan('request-airdrop')}              ${chalk.gray('Request SOL airdrop')}\n`;
    output += `  ${chalk.cyan('time-travel')}                  ${chalk.gray('Time travel for testing')}\n\n`;

    // Account Queries
    output += chalk.bold.yellow('📦 Account Queries:\n');
    output += `  ${chalk.yellow('get-account-info')}             Get detailed account information\n`;
    output += `  ${chalk.yellow('get-multiple-accounts')}        Batch query multiple accounts\n`;
    output += `  ${chalk.yellow('get-token-account-balance')}    Get token account balance\n`;
    output += `  ${chalk.yellow('get-token-supply')}             Get total token supply\n`;
    output += `  ${chalk.yellow('get-block-commitment')}         Get block commitment data\n\n`;

    // Network Operations
    output += chalk.bold.blue('🌐 Network Operations:\n');
    output += `  ${chalk.blue('get-latest-blockhash')}         Get the latest blockhash\n`;
    output += `  ${chalk.blue('get-block')}                     Get block by slot\n`;
    output += `  ${chalk.blue('get-transaction')}               Get transaction details\n`;
    output += `  ${chalk.blue('send-transaction')}              Send a signed transaction\n`;
    output += `  ${chalk.blue('simulate-transaction')}          Simulate transaction execution\n`;
    output += `  ${chalk.blue('get-signatures-for-address')}    Get address transaction history\n`;
    output += `  ${chalk.blue('request-airdrop')}               Request lamports airdrop\n`;
    output += `  ${chalk.blue('get-cluster-nodes')}             Get cluster node info\n\n`;

    // Testing & Development (Cheatcodes)
    output += chalk.bold.magenta('🔧 Testing & Development:\n');
    output += `  ${chalk.magenta('time-travel')}                  Time travel to epoch/slot\n`;
    output += `  ${chalk.magenta('pause-clock')}                  Pause network clock\n`;
    output += `  ${chalk.magenta('resume-clock')}                 Resume network clock\n`;
    output += `  ${chalk.magenta('set-account')}                  Modify account data\n`;
    output += `  ${chalk.magenta('set-token-account')}            Update token account\n`;
    output += `  ${chalk.magenta('reset-account')}                Reset account state\n`;
    output += `  ${chalk.magenta('reset-network')}                Reset entire network\n`;
    output += `  ${chalk.magenta('set-program-authority')}        Set program authority\n\n`;

    // Additional Commands
    output += chalk.bold.gray('📋 Additional Commands:\n');
    output += chalk.gray('  get-blocks, get-block-time, is-blockhash-valid,\n');
    output += chalk.gray('  get-fee-for-message, get-signature-statuses,\n');
    output += chalk.gray('  get-recent-prioritization-fees, and more...\n\n');

    // Footer
    output += chalk.gray('💡 Tips:\n');
    output += chalk.gray('   Use ') + chalk.cyan('surfman --help') + chalk.gray(' to see all 38 commands grouped by module\n');
    output += chalk.gray('   Use ') + chalk.cyan('surfman <command> --help') + chalk.gray(' for detailed command options\n');
    output += chalk.gray('📖 Documentation: ') + chalk.cyan('https://github.com/your-repo/surfman\n');

    return output;
  },
});

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

// Accounts
program.addCommand(createGetAccountInfoCommand());
program.addCommand(createGetMultipleAccountsCommand());
program.addCommand(createGetBlockCommitmentCommand());
program.addCommand(createGetTokenAccountBalanceCommand());
program.addCommand(createGetTokenSupplyCommand());

// Scan
program.addCommand(createGetProgramAccountsCommand());
program.addCommand(createGetLargestAccountsCommand());
program.addCommand(createGetSupplyCommand());
program.addCommand(createGetTokenLargestAccountsCommand());
program.addCommand(createGetTokenAccountsByOwnerCommand());
program.addCommand(createGetTokenAccountsByDelegateCommand());

program.parse();
