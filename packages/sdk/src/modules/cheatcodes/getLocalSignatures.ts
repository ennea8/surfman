import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcLogsResponse, RpcResponse } from '../../types';

export async function getLocalSignatures(
  client: SurfmanClient,
  limit?: number
): Promise<RpcLogsResponse[]> {
  const response = await client.request<[number?], RpcResponse<RpcLogsResponse[]>>(
    'surfnet_getLocalSignatures',
    [limit]
  );
  return response.value;
}
