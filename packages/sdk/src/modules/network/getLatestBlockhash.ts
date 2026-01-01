import type { SurfmanClient } from '../../client/SurfmanClient';
import type { BlockhashResult, RpcResponse } from '../../types';

export async function getLatestBlockhash(
  client: SurfmanClient,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<BlockhashResult> {
  const response = await client.request<[any?], RpcResponse<BlockhashResult>>(
    'getLatestBlockhash',
    config ? [config] : []
  );
  return response.value;
}
