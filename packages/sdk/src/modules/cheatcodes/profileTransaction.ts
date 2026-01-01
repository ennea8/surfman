import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult, RpcResponse } from '../../types';

export async function profileTransaction(
  client: SurfmanClient,
  transactionData: string,
  tag?: string,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult> {
  const response = await client.request<[string, string | undefined, RpcProfileResultConfig | undefined], RpcResponse<UiKeyedProfileResult>>(
    'surfnet_profileTransaction',
    [transactionData, tag, config]
  );
  return response.value;
}
