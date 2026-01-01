import type { SurfmanClient } from '../../client/SurfmanClient';
import type { GetSurfnetInfoResponse } from '../../types';

export async function getSurfnetInfo(
  client: SurfmanClient
): Promise<GetSurfnetInfoResponse> {
  return client.request<[], GetSurfnetInfoResponse>(
    'surfnet_getSurfnetInfo',
    []
  );
}
