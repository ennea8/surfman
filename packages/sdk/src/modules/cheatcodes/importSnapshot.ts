import { Buffer } from 'buffer';
import type { SurfmanClient } from '../../client/SurfmanClient';
import type {
  AccountSnapshot,
  ImportSnapshotOptions,
  SetAccountUpdate,
} from '../../types';
import { setAccount } from './setAccount';

function normalizeU64(value: number | string | undefined): number | string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Number.isSafeInteger(value)) {
    return value;
  }

  return BigInt(value.toFixed(0)).toString();
}

function normalizeAccountData(data: string): string {
  const isHex = /^[0-9a-fA-F]+$/.test(data) && data.length % 2 === 0;
  if (isHex) {
    return data.toLowerCase();
  }

  return Buffer.from(data, 'base64').toString('hex');
}

function buildAccountUpdate(snapshot: AccountSnapshot): SetAccountUpdate {
  const update: SetAccountUpdate = {
    lamports: normalizeU64(snapshot.lamports),
    owner: snapshot.owner,
    executable: snapshot.executable,
    rentEpoch: normalizeU64(snapshot.rentEpoch),
  };

  if (snapshot.data) {
    update.data = normalizeAccountData(snapshot.data);
  }

  return update;
}

export async function importSnapshot(
  client: SurfmanClient,
  snapshot: Record<string, AccountSnapshot>,
  options?: ImportSnapshotOptions
): Promise<void> {
  const entries = Object.entries(snapshot);
  const total = entries.length;

  if (total === 0) {
    return;
  }

  const concurrency = Math.max(1, Math.floor(options?.concurrency ?? 25));
  const workerCount = Math.min(concurrency, total);

  let cursor = 0;
  let processed = 0;

  const runWorker = async () => {
    while (true) {
      const nextIndex = cursor++;
      if (nextIndex >= total) {
        break;
      }

      const [pubkey, accountSnapshot] = entries[nextIndex];
      const update = buildAccountUpdate(accountSnapshot);
      await setAccount(client, pubkey, update);

      processed += 1;
      options?.onProgress?.({
        processed,
        total,
        pubkey,
      });
    }
  };

  await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
}
