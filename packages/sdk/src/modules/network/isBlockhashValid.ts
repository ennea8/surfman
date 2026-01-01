import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcResponse } from '../../types';

export async function isBlockhashValid(
  client: SurfmanClient,
  blockhash: string,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<boolean> {
  const response = await client.request<[string, any?], RpcResponse<boolean>>(
    'isBlockhashValid',
    config ? [blockhash, config] : [blockhash]
  );
  return response.value;
}
