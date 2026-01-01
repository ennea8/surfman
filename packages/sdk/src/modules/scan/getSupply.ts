import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Supply, SupplyConfig, RpcResponse } from '../../types';

export async function getSupply(
  client: SurfmanClient,
  config?: SupplyConfig
): Promise<Supply> {
  const response = await client.request<[SupplyConfig?], RpcResponse<Supply>>(
    'getSupply',
    config ? [config] : []
  );
  return response.value;
}
