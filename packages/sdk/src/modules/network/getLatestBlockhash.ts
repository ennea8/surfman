import type { SurfmanClient } from '../../client/SurfmanClient';
import type { BlockhashResult } from '../../types';

export async function getLatestBlockhash(
  client: SurfmanClient,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<BlockhashResult> {
  return client.request<[any?], BlockhashResult>(
    'getLatestBlockhash',
    config ? [config] : []
  );
}
