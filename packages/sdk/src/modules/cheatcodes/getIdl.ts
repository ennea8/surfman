import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Idl } from '../../types';

export async function getIdl(
  client: SurfmanClient,
  programId: string,
  slot?: number
): Promise<Idl | null> {
  return client.request<[string, number | undefined], Idl | null>(
    'surfnet_getActiveIdl',
    [programId, slot]
  );
}
