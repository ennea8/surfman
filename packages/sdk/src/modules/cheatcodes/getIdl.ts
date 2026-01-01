import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Idl, RpcResponse } from '../../types';

export async function getIdl(
  client: SurfmanClient,
  programId: string,
  slot?: number
): Promise<Idl | null> {
  const response = await client.request<[string, number | undefined], RpcResponse<Idl | null>>(
    'surfnet_getActiveIdl',
    [programId, slot]
  );
  return response.value;
}
