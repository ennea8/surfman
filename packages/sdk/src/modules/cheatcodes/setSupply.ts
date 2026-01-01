import type { SurfmanClient } from '../../client/SurfmanClient';
import type { SupplyUpdate } from '../../types';

export async function setSupply(
  client: SurfmanClient,
  update: SupplyUpdate
): Promise<void> {
  return client.request<[SupplyUpdate], void>(
    'surfnet_setSupply',
    [update]
  );
}
