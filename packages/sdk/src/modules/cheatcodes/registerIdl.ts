import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Idl } from '../../types';

export async function registerIdl(
  client: SurfmanClient,
  idl: Idl,
  slot?: number
): Promise<void> {
  return client.request<[Idl, number | undefined], void>(
    'surfnet_registerIdl',
    [idl, slot]
  );
}
