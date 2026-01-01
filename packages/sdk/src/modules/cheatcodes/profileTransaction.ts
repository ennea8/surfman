import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult } from '../../types';

export async function profileTransaction(
  client: SurfmanClient,
  transactionData: string,
  tag?: string,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult> {
  return client.request<[string, string | undefined, RpcProfileResultConfig | undefined], UiKeyedProfileResult>(
    'surfnet_profileTransaction',
    [transactionData, tag, config]
  );
}
