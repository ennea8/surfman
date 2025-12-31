import type { SurfmanClient } from '../../client/SurfmanClient';
import type { SetAccountUpdate } from '../../types';

export async function setAccount(
  client: SurfmanClient,
  pubkey: string,
  update: SetAccountUpdate
): Promise<void> {
  return client.request<[string, SetAccountUpdate], void>(
    'surfnet_setAccount',
    [pubkey, update]
  );
}
