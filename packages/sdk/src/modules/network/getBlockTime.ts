import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getBlockTime(
  client: SurfmanClient,
  slot: number
): Promise<number | null> {
  return client.request<[number], number | null>('getBlockTime', [slot]);
}
