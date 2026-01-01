# Surfman

A comprehensive SDK and CLI tool for interacting with SurfPool RPC APIs.

## Features

- 🎯 **SDK Library** - Type-safe SDK for programmatic API interaction
- ⚡ **CLI Tool** - Command-line interface for quick operations
- 🌐 **Web UI** - Browser-based interface (coming soon)
- 🔌 **WebSocket Support** - Real-time state updates (planned)

## Architecture

Surfman is built as a monorepo using pnpm workspaces:

- **@surfman/sdk** - Core SDK library for programmatic use
- **@surfman/cli** - CLI tool for command-line operations
- **@surfman/web** - Web UI (coming soon)

## Supported APIs

### Cheatcodes Module (22/22 APIs) ✅ COMPLETE
- ✅ `surfnet_timeTravel` - Time manipulation
- ✅ `surfnet_setAccount` - Account modification
- ✅ `surfnet_setProgramAuthority` - Program authority management
- ✅ `surfnet_pauseClock` - Pause clock
- ✅ `surfnet_resumeClock` - Resume clock
- ✅ `surfnet_getLocalSignatures` - Get recent signatures
- ✅ `surfnet_setTokenAccount` - Token account updates
- ✅ `surfnet_resetAccount` - Reset account
- ✅ `surfnet_resetNetwork` - Reset network
- ✅ `surfnet_cloneProgramAccount` - Clone program accounts
- ✅ `surfnet_profileTransaction` - Profile transactions for compute units
- ✅ `surfnet_getProfileResultsByTag` - Get profiling results by tag
- ✅ `surfnet_setSupply` - Configure network supply
- ✅ `surfnet_getTransactionProfile` - Get transaction profile by signature/UUID
- ✅ `surfnet_registerIdl` - Register program IDL
- ✅ `surfnet_getActiveIdl` - Get registered IDL
- ✅ `surfnet_exportSnapshot` - Export account snapshots
- ✅ `surfnet_streamAccount` - Stream accounts from data source
- ✅ `surfnet_getStreamedAccounts` - Get all streamed accounts
- ✅ `surfnet_getSurfnetInfo` - Get Surfnet network information
- ✅ `surfnet_writeProgram` - Write program data in chunks
- ✅ `surfnet_registerScenario` - Register scenarios with account overrides

### Network Health Module (22/22 APIs) ✅ COMPLETE
- ✅ `getLatestBlockhash` - Get latest blockhash
- ✅ `getBlock` - Get block details
- ✅ `getBlocks` - Get confirmed blocks
- ✅ `getBlocksWithLimit` - Get blocks with limit
- ✅ `getBlockTime` - Get block timestamp
- ✅ `getFirstAvailableBlock` - Get first available block
- ✅ `minimumLedgerSlot` - Get minimum ledger slot
- ✅ `getTransaction` - Get transaction details
- ✅ `getSignatureStatuses` - Get signature statuses
- ✅ `getSignaturesForAddress` - Get address transaction history
- ✅ `sendTransaction` - Send transaction
- ✅ `simulateTransaction` - Simulate transaction
- ✅ `isBlockhashValid` - Validate blockhash
- ✅ `getFeeForMessage` - Get transaction fee
- ✅ `getRecentPrioritizationFees` - Get recent priority fees
- ✅ `getClusterNodes` - Get cluster node info
- ✅ `getRecentPerformanceSamples` - Get performance samples
- ✅ `requestAirdrop` - Request SOL airdrop
- ✅ `getInflationReward` - Get inflation rewards
- ✅ `getMaxRetransmitSlot` - Get max retransmit slot
- ✅ `getMaxShredInsertSlot` - Get max shred insert slot
- ✅ `getStakeMinimumDelegation` - Get minimum stake delegation

### Accounts Data Module (5/5 APIs) ✅ COMPLETE
- ✅ `getAccountInfo` - Get account details
- ✅ `getMultipleAccounts` - Batch account query
- ✅ `getBlockCommitment` - Get block commitment
- ✅ `getTokenAccountBalance` - Get token balance
- ✅ `getTokenSupply` - Get token supply

### Accounts Scan Module (6/6 APIs) ✅ COMPLETE
- ✅ `getProgramAccounts` - Get program-owned accounts
- ✅ `getLargestAccounts` - Get top accounts by balance
- ✅ `getSupply` - Get network supply info
- ✅ `getTokenLargestAccounts` - Get largest token holders
- ✅ `getTokenAccountsByOwner` - Get token accounts by owner
- ✅ `getTokenAccountsByDelegate` - Get delegated token accounts

## Installation

### Install CLI globally
```bash
npm install -g surfman
```

### Install SDK in your project
```bash
npm install @surfman/sdk
```

## Quick Start

### CLI Usage

**Development (run directly from source):**
```bash
# Time travel forward 1 week
pnpm cli time-travel --relative +1w

# Set account data
pnpm cli set-account --pubkey <ADDRESS> --lamports 1000000

# Set program authority
pnpm cli set-program-authority --program-id <ID> --new-authority <ADDRESS>
```

**Production (after installing globally):**
```bash
npm install -g surfman

surfman time-travel --relative +1w
surfman set-account --pubkey <ADDRESS> --lamports 1000000
surfman set-program-authority --program-id <ID> --new-authority <ADDRESS>
```

### SDK Usage
```typescript
import { Surfman } from '@surfman/sdk';

const client = new Surfman('http://localhost:8899');

// Cheatcodes - Time Control
await client.cheatcodes.timeTravel({ absoluteEpoch: 100 });
await client.cheatcodes.pauseClock();
await client.cheatcodes.resumeClock();

// Cheatcodes - Account Management
await client.cheatcodes.setAccount(pubkey, { lamports: 1000000 });
await client.cheatcodes.setTokenAccount(owner, mint, { amount: 1000 });
await client.cheatcodes.resetAccount(pubkey);
await client.cheatcodes.resetNetwork();

// Cheatcodes - Advanced Features
await client.cheatcodes.cloneProgramAccount(sourceProgram, destProgram);
await client.cheatcodes.profileTransaction(txData, 'my-tag');
await client.cheatcodes.setSupply({ total: 1000000000 });
await client.cheatcodes.registerIdl(idl);
const snapshot = await client.cheatcodes.exportSnapshot();
await client.cheatcodes.writeProgram(programId, hexData, offset);

// Network Health
const blockhash = await client.network.getLatestBlockhash();
const block = await client.network.getBlock(1000);
const tx = await client.network.getTransaction(signature);
const signature = await client.network.sendTransaction(txData);

// Accounts Data
const account = await client.accounts.getAccountInfo(pubkey);
const accounts = await client.accounts.getMultipleAccounts([pubkey1, pubkey2]);
const balance = await client.accounts.getTokenAccountBalance(tokenAccount);

// Accounts Scan
const programAccounts = await client.scan.getProgramAccounts(programId);
const largestAccounts = await client.scan.getLargestAccounts();
const supply = await client.scan.getSupply();
const tokenHolders = await client.scan.getTokenLargestAccounts(mint);
const ownerTokens = await client.scan.getTokenAccountsByOwner(owner, { mint });

// Set account
await client.cheatcodes.setAccount('pubkey', {
  lamports: 1000000,
  data: 'hex-data'
});
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run in development mode
pnpm dev

# Run tests
pnpm test
```

## Documentation

Full documentation available at: https://docs.surfpool.run/rpc/surfnet

## License

MIT
