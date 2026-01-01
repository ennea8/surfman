# surfman-sdk

TypeScript SDK for SurfPool RPC API interaction - A powerful toolkit for Solana local development and testing.

[![npm version](https://img.shields.io/npm/v/surfman-sdk.svg)](https://www.npmjs.com/package/surfman-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 📖 **[SurfPool Documentation](https://docs.surfpool.run/)** - Learn more about SurfPool's local development environment

## Features

- 🔧 **Cheatcodes**: Time travel, account manipulation, network control
- 🌐 **Network APIs**: Block queries, transactions, fees, cluster info
- 📦 **Account APIs**: Account info, token balances, batch queries
- 📊 **Scan & Analytics**: Program accounts, largest holders, supply metrics
- 💪 **Type-safe**: Full TypeScript support with comprehensive type definitions
- ⚡ **Easy to use**: Simple, intuitive API design

## Installation

```bash
npm install surfman-sdk
```

## Quick Start

```typescript
import { Surfman } from 'surfman-sdk';

// Initialize client
const client = new Surfman('http://localhost:8899');

// Cheatcodes - Time travel by epoch
await client.cheatcodes.timeTravel({ 
  absoluteEpoch: 100 
});

// Time travel to specific timestamp
await client.cheatcodes.timeTravel({
  absoluteTimestamp: Math.floor(Date.now() / 1000) + 86400  // +1 day
});

// Set or remove program authority
await client.cheatcodes.setProgramAuthority(
  'program-id',
  'new-authority-pubkey'  // or null to remove authority
);

// Network - Get latest blockhash
const blockhash = await client.network.getLatestBlockhash();

// Network - Send transaction
const signature = await client.network.sendTransaction(txData);

// Accounts - Get account info
const account = await client.accounts.getAccountInfo(pubkey);

// Scan - Get program accounts
const accounts = await client.scan.getProgramAccounts(programId, {
  filters: [{ dataSize: 165 }]
});

// Scan - Get largest accounts
const largest = await client.scan.getLargestAccounts();
```

## API Modules

### Cheatcodes (9 APIs)

Time travel and network manipulation for testing:

```typescript
// Time control
await client.cheatcodes.timeTravel({ relativeSlots: 100 });
await client.cheatcodes.pauseClock();
await client.cheatcodes.resumeClock();

// Account manipulation
await client.cheatcodes.setAccount(pubkey, options);
await client.cheatcodes.setTokenAccount(account, options);
await client.cheatcodes.resetAccount(pubkey);

// Network management
await client.cheatcodes.resetNetwork();
await client.cheatcodes.setProgramAuthority(programId, newAuthority);
const sigs = await client.cheatcodes.getLocalSignatures();
```

### Network (18 APIs)

Comprehensive network and transaction APIs:

```typescript
// Block queries
const blockhash = await client.network.getLatestBlockhash();
const block = await client.network.getBlock(slot);
const blocks = await client.network.getBlocks(startSlot, endSlot);

// Transactions
const tx = await client.network.getTransaction(signature);
const sig = await client.network.sendTransaction(txData);
const result = await client.network.simulateTransaction(tx);

// Network info
const nodes = await client.network.getClusterNodes();
const fees = await client.network.getRecentPrioritizationFees();
const isValid = await client.network.isBlockhashValid(blockhash);
```

### Accounts (5 APIs)

Account and token data queries:

```typescript
// Account queries
const account = await client.accounts.getAccountInfo(pubkey);
const accounts = await client.accounts.getMultipleAccounts([pubkey1, pubkey2]);

// Token queries
const balance = await client.accounts.getTokenAccountBalance(tokenAccount);
const supply = await client.accounts.getTokenSupply(mint);
const commitment = await client.accounts.getBlockCommitment(slot);
```

### Scan & Analytics (6 APIs)

Batch queries and network statistics:

```typescript
// Program accounts
const accounts = await client.scan.getProgramAccounts(programId, {
  filters: [{ dataSize: 165 }],
  encoding: 'base64'
});

// Supply and distribution
const supply = await client.scan.getSupply();
const largest = await client.scan.getLargestAccounts();
const holders = await client.scan.getTokenLargestAccounts(mint);

// Token accounts
const owned = await client.scan.getTokenAccountsByOwner(owner, { mint });
const delegated = await client.scan.getTokenAccountsByDelegate(delegate, { mint });
```

## Configuration

```typescript
// String URL
const client = new Surfman('http://localhost:8899');

// Or with config object
const client = new Surfman({
  url: 'http://localhost:8899',
  timeout: 30000,
  // ... other RPC config options
});
```

## Use Cases

### Testing Smart Contracts

```typescript
// Set up test environment - move forward 1 week
const oneWeekInSlots = 7 * 24 * 60 * 60 * 2;  // ~7 days
await client.cheatcodes.timeTravel({ relativeSlots: oneWeekInSlots });

// Fund test account
await client.cheatcodes.setAccount(testAccount, {
  lamports: 10_000_000_000
});

// Change program authority for testing
await client.cheatcodes.setProgramAuthority(
  programId,
  testAuthority
);

// Run your tests
// ...

// Clean up
await client.cheatcodes.resetNetwork();
```

### Token Analytics

```typescript
// Get token distribution
const supply = await client.scan.getSupply();
const largestHolders = await client.scan.getTokenLargestAccounts(mint);

// Analyze holder concentration
const top10Percentage = largestHolders
  .slice(0, 10)
  .reduce((sum, holder) => sum + holder.uiAmount, 0) / supply.circulating;
```

### Program Account Scanning

```typescript
// Find all token accounts for a specific mint
const accounts = await client.scan.getProgramAccounts(TOKEN_PROGRAM_ID, {
  filters: [
    { dataSize: 165 },
    { memcmp: { offset: 0, bytes: mintAddress } }
  ]
});
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import { 
  Surfman, 
  AccountInfo, 
  BlockInfo,
  TransactionResponse 
} from 'surfman-sdk';
```

## CLI Companion

For command-line usage, install the companion CLI tool:

```bash
npm install -g surfman
surfman --help
```

## Documentation

- [SurfPool Documentation](https://docs.surfpool.run/) - Official SurfPool docs
- [GitHub Repository](https://github.com/ennea8/surfman)
- [CLI Tool](https://www.npmjs.com/package/surfman)
- [Report Issues](https://github.com/ennea8/surfman/issues)

## License

MIT
