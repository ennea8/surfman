import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getBlocksWithLimit(
  client: SurfmanClient,
  startSlot: number,
  limit: number,
  config?: { commitment?: string }
): Promise<number[]> {
  return client.request<[number, number, any?], number[]>(
    'getBlocksWithLimit',
    config ? [startSlot, limit, config] : [startSlot, limit]
  );
}
