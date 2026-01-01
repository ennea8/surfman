import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcResponse } from '../../types';

export async function getStakeMinimumDelegation(
  client: SurfmanClient,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<number> {
  const response = await client.request<
    [{ commitment?: string; minContextSlot?: number } | undefined],
    RpcResponse<number>
  >('getStakeMinimumDelegation', [config]);
  return response.value;
}
