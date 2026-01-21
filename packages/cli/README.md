# surfman

CLI tool for SurfPool RPC API interaction - Command-line interface for Solana local development and testing.

[![npm version](https://img.shields.io/npm/v/surfman.svg)](https://www.npmjs.com/package/surfman)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 📖 **[SurfPool Documentation](https://docs.surfpool.run/)** - Learn more about SurfPool's local development environment

## Features

- ⚡ **55 Commands**: Comprehensive CLI for core Surfpool APIs (Network, Accounts, Cheatcodes, Scan)
- 🔧 **Testing Tools**: Time travel, account manipulation, profiling, snapshots
- 🌐 **Network Queries**: Blocks, transactions, fees, cluster info, staking
- 📦 **Account Tools**: Query accounts, tokens, balances
- 📊 **Analytics**: Scan program accounts, find largest holders
- 🎨 **Beautiful Output**: Colorful, well-formatted terminal output
- 📖 **Dual Help**: `-h` for common commands, `--help` for complete list

## Installation

```bash
npm install -g surfman
```

## Quick Start

```bash
# Check version
surfman --version

# Show help
surfman -h              # Frequently used commands
surfman --help          # Complete command list

# Time travel (testing)
surfman time-travel --relative +1w

# Request airdrop
surfman request-airdrop --pubkey <ADDRESS> --amount 10

# Get account info
surfman get-account-info --pubkey <ADDRESS>

# Get latest blockhash
surfman get-latest-blockhash
```

## Command Categories

### 🔧 Testing & Development (22 commands)

**Time Control:**
```bash
surfman time-travel --absolute-epoch 100
surfman time-travel --relative +1w
surfman pause-clock
surfman resume-clock
```

**Account Manipulation:**
```bash
surfman set-account --pubkey <ADDR> --lamports 1000000
surfman set-token-account --owner <ADDR> --mint <MINT> --amount 100
surfman reset-account --pubkey <ADDR>
surfman stream-account --pubkey <ADDR>
surfman get-streamed-accounts
```

**Program Management:**
```bash
surfman clone-program-account --source <ID> --destination <ID>
surfman set-program-authority --program-id <ID> --new-authority <ADDR>
surfman write-program --program-id <ID> --data-file program.so
```

**Transaction Profiling:**
```bash
surfman profile-transaction --transaction <BASE64> --tag my-test
surfman get-transaction-profile --id <UUID_OR_SIG>
surfman get-profile-results-by-tag --tag my-test
```

**IDL Management:**
```bash
surfman register-idl --idl-file program.json
surfman get-idl --program-id <ID>
```

**Snapshots & Scenarios:**
```bash
surfman export-snapshot --output snapshot.json
surfman import-snapshot --input snapshot.json [--concurrency 50]
surfman register-scenario --scenario-file scenario.json
```

**Network Management:**
```bash
surfman reset-network
surfman get-local-signatures
surfman set-supply --total 1000000000
surfman get-surfnet-info
```

### 🌐 Network Operations (22 commands)

**Block Queries:**
```bash
surfman get-latest-blockhash
surfman get-block --slot 1000
surfman get-block-time --slot 1000
surfman get-blocks --start-slot 1000 --end-slot 2000
surfman get-blocks-with-limit --start-slot 1000 --limit 100
surfman get-first-available-block
surfman minimum-ledger-slot
surfman get-max-retransmit-slot
surfman get-max-shred-insert-slot
```

**Transaction Operations:**
```bash
surfman get-transaction --signature <SIG>
surfman send-transaction --data <TX_DATA>
surfman simulate-transaction --data <TX_DATA>
surfman get-signature-statuses --signatures <SIG1,SIG2>
surfman get-signatures-for-address --address <ADDR>
```

**Network Info & Fees:**
```bash
surfman is-blockhash-valid --blockhash <HASH>
surfman get-fee-for-message --message <MSG>
surfman get-recent-prioritization-fees
surfman get-cluster-nodes
surfman get-recent-performance-samples
surfman request-airdrop --pubkey <ADDR> --amount 1
surfman get-inflation-reward --addresses <ADDR1,ADDR2>
surfman get-stake-minimum-delegation
```

### 📦 Account Queries (5 commands)

```bash
surfman get-account-info --pubkey <ADDR>
surfman get-multiple-accounts --pubkeys <ADDR1,ADDR2>
surfman get-token-account-balance --address <ADDR>
surfman get-token-supply --mint <MINT>
surfman get-block-commitment --slot 1000
```

### 📊 Scan & Analytics (6 commands)

**Batch Queries:**
```bash
surfman get-program-accounts --program-id <ID> --data-size 165
surfman get-largest-accounts --filter circulating
surfman get-supply --exclude-accounts
```

**Token Distribution:**
```bash
surfman get-token-largest-accounts --mint <MINT>
surfman get-token-accounts-by-owner --owner <ADDR> --mint <MINT>
surfman get-token-accounts-by-delegate --delegate <ADDR> --program-id <ID>
```

## Common Use Cases

### Testing Smart Contracts

```bash
# Time travel to future epoch
surfman time-travel --relative +1d

# Set up test account with SOL
surfman set-account --pubkey <TEST_ADDR> --lamports 10000000000

# Run your tests...

# Reset when done
surfman reset-network
```

### Token Analysis

```bash
# Get total supply
surfman get-supply

# Find largest token holders
surfman get-token-largest-accounts --mint <TOKEN_MINT>

# Check specific wallet tokens
surfman get-token-accounts-by-owner --owner <WALLET> --mint <TOKEN_MINT>
```

### Transaction Monitoring

```bash
# Get recent transaction history
surfman get-signatures-for-address --address <ADDR> --limit 10

# Check transaction details
surfman get-transaction --signature <SIG>

# Check signature status
surfman get-signature-statuses --signatures <SIG1,SIG2>
```

### Program Account Scanning

```bash
# Find all accounts owned by a program
surfman get-program-accounts --program-id <PROGRAM_ID>

# Filter by data size
surfman get-program-accounts --program-id <PROGRAM_ID> --data-size 165
```

## Options

Most commands support:
- `--rpc <url>` - Custom RPC endpoint (default: http://localhost:8899)
- `--commitment <level>` - Commitment level (finalized, confirmed, processed)
- `--encoding <type>` - Data encoding (base58, base64, jsonParsed)

## Configuration

Set default RPC endpoint:
```bash
export SURFMAN_RPC_URL=http://localhost:8899
```

## SDK Package

For programmatic usage in TypeScript/JavaScript:

```bash
npm install @surfman/sdk
```

```typescript
import { Surfman } from '@surfman/sdk';

const client = new Surfman('http://localhost:8899');
await client.cheatcodes.timeTravel({ relativeEpoch: 1 });
```

## Documentation

- [SurfPool Documentation](https://docs.surfpool.run/) - Official SurfPool docs
- [GitHub Repository](https://github.com/ennea8/surfman)
- [SDK Package](https://www.npmjs.com/package/@surfman/sdk)
- [Report Issues](https://github.com/ennea8/surfman/issues)

## Help

```bash
# Quick view (common commands)
surfman -h

# Complete command list
surfman --help

# Command-specific help
surfman <command> --help
```

## License

MIT
