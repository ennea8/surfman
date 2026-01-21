import { readFileSync } from 'fs';
import { Command } from 'commander';
import { Surfman } from '@surfman/sdk';
import type { AccountSnapshot, SnapshotImportProgress } from '@surfman/sdk';
import { logger } from '../../utils/logger';

interface ImportSnapshotCliOptions {
  input: string;
  rpc: string;
  concurrency?: string;
}

const U64_PREFIX = '__u64__';
const MAX_SAFE_BIGINT = BigInt(Number.MAX_SAFE_INTEGER);
const MAX_U64 = BigInt('18446744073709551615');

function encodeU64Like(value: number | string | undefined): number | string | undefined {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'string') {
    if (value.startsWith(U64_PREFIX)) {
      return value;
    }

    if (/^-?\d+$/.test(value)) {
      const bigValue = BigInt(value);
      if (bigValue > MAX_U64) {
        return `${U64_PREFIX}${MAX_U64.toString()}`;
      }
      if (bigValue > MAX_SAFE_BIGINT) {
        return `${U64_PREFIX}${bigValue.toString()}`;
      }
      return Number(value);
    }

    return value;
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  if (Number.isSafeInteger(value)) {
    return value;
  }

  const bigValue = BigInt(Math.trunc(value));
  if (bigValue > MAX_U64) {
    return `${U64_PREFIX}${MAX_U64.toString()}`;
  }
  if (bigValue > MAX_SAFE_BIGINT) {
    return `${U64_PREFIX}${bigValue.toString()}`;
  }
  return Number(bigValue);
}

function prepareSnapshot(snapshot: Record<string, AccountSnapshot>): Record<string, AccountSnapshot> {
  Object.values(snapshot).forEach((account) => {
    const mutableAccount = account as AccountSnapshot & Record<string, unknown>;
    mutableAccount.lamports = encodeU64Like(account.lamports) as number | string;
    mutableAccount.rentEpoch = encodeU64Like(account.rentEpoch) as number | string;
  });

  return snapshot;
}

function parseConcurrency(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function createImportSnapshotCommand(): Command {
  const command = new Command('import-snapshot')
    .description('Apply an exported snapshot to the local Surfnet environment')
    .requiredOption('--input <path>', 'Snapshot JSON file path')
    .option('--rpc <url>', 'RPC URL', 'http://localhost:8899')
    .option('--concurrency <number>', 'Parallel account updates (default: 25)')
    .action(async (options: ImportSnapshotCliOptions) => {
      try {
        const client = new Surfman(options.rpc);
        const filePath = options.input;

        const fileContents = readFileSync(filePath, 'utf-8');
        const parsedSnapshot = JSON.parse(fileContents) as Record<string, AccountSnapshot>;
        const snapshot = prepareSnapshot(parsedSnapshot);
        const totalAccounts = Object.keys(snapshot).length;

        if (totalAccounts === 0) {
          logger.warn('Snapshot is empty. Nothing to import.');
          return;
        }

        const concurrency = parseConcurrency(options.concurrency);
        let lastLogged = 0;

        await client.cheatcodes.importSnapshot(snapshot, {
          concurrency,
          onProgress: ({ processed, total, pubkey }: SnapshotImportProgress) => {
            if (processed === total || processed - lastLogged >= 50) {
              logger.log(`  Imported ${processed}/${total} accounts (last: ${pubkey})`);
              lastLogged = processed;
            }
          },
        });

        logger.success('Snapshot imported successfully!');
        logger.log(`  Accounts: ${totalAccounts}`);
        logger.log(`  Source: ${filePath}`);
      } catch (error) {
        logger.error(`Failed to import snapshot: ${(error as Error).message}`);
        process.exit(1);
      }
    });

  return command;
}
