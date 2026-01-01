import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getStakeMinimumDelegation(
  client: SurfmanClient,
  config?: { commitment?: string; minContextSlot?: number }
): Promise<number> {
  const response = await client.request<
    [{ commitment?: string; minContextSlot?: number } | undefined],
    { context: { slot: number }; value: number }
  >('getStakeMinimumDelegation', [config]);
  return response.value;
}
