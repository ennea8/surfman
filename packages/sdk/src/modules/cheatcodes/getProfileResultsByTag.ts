import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult } from '../../types';

export async function getProfileResultsByTag(
  client: SurfmanClient,
  tag: string,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult[] | null> {
  return client.request<[string, RpcProfileResultConfig | undefined], UiKeyedProfileResult[] | null>(
    'surfnet_getProfileResultsByTag',
    [tag, config]
  );
}
