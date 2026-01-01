import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult, RpcResponse } from '../../types';

export async function getProfileResultsByTag(
  client: SurfmanClient,
  tag: string,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult[] | null> {
  const response = await client.request<[string, RpcProfileResultConfig | undefined], RpcResponse<UiKeyedProfileResult[] | null>>(
    'surfnet_getProfileResultsByTag',
    [tag, config]
  );
  return response.value;
}
