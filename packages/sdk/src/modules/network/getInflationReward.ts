import type { SurfmanClient } from '../../client/SurfmanClient';
import type { InflationReward } from '../../types';

export async function getInflationReward(
  client: SurfmanClient,
  addresses: string[],
  config?: { epoch?: number; commitment?: string; minContextSlot?: number }
): Promise<(InflationReward | null)[]> {
  return client.request<[string[], { epoch?: number; commitment?: string; minContextSlot?: number } | undefined], (InflationReward | null)[]>(
    'getInflationReward',
    [addresses, config]
  );
}
