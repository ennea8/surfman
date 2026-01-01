import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult, UuidOrSignature, RpcResponse } from '../../types';

export async function getTransactionProfile(
  client: SurfmanClient,
  signatureOrUuid: UuidOrSignature,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult | null> {
  const response = await client.request<[UuidOrSignature, RpcProfileResultConfig | undefined], RpcResponse<UiKeyedProfileResult | null>>(
    'surfnet_getTransactionProfile',
    [signatureOrUuid, config]
  );
  return response.value;
}
