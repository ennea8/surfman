import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Block, BlockConfig } from '../../types';

export async function getBlock(
  client: SurfmanClient,
  slot: number,
  config?: BlockConfig
): Promise<Block | null> {
  return client.request<[number, BlockConfig?], Block | null>(
    'getBlock',
    config ? [slot, config] : [slot]
  );
}
