import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcLogsResponse } from '../../types';

export async function getLocalSignatures(
  client: SurfmanClient,
  limit?: number
): Promise<RpcLogsResponse[]> {
  return client.request<[number?], RpcLogsResponse[]>(
    'surfnet_getLocalSignatures',
    [limit]
  );
}
