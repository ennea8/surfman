import type { SurfmanClient } from '../../client/SurfmanClient';
import type { GetSurfnetInfoResponse, RpcResponse } from '../../types';

export async function getSurfnetInfo(
  client: SurfmanClient
): Promise<GetSurfnetInfoResponse> {
  const response = await client.request<[], RpcResponse<GetSurfnetInfoResponse>>(
    'surfnet_getSurfnetInfo',
    []
  );
  return response.value;
}
