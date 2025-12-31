import type { SurfmanClient } from '../../client/SurfmanClient';
import type { BlockCommitment } from '../../types';

export async function getBlockCommitment(
  client: SurfmanClient,
  slot: number
): Promise<BlockCommitment> {
  return client.request<[number], BlockCommitment>('getBlockCommitment', [
    slot,
  ]);
}
