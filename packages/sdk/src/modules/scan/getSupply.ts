import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Supply, SupplyConfig } from '../../types';

export async function getSupply(
  client: SurfmanClient,
  config?: SupplyConfig
): Promise<Supply> {
  return client.request<[SupplyConfig?], Supply>(
    'getSupply',
    config ? [config] : []
  );
}
