import type { SurfmanClient } from '../../client/SurfmanClient';

export async function isBlockhashValid(
  client: SurfmanClient,
  blockhash: string,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<boolean> {
  return client.request<[string, any?], boolean>(
    'isBlockhashValid',
    config ? [blockhash, config] : [blockhash]
  );
}
