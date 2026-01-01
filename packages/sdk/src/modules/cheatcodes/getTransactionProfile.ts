import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcProfileResultConfig, UiKeyedProfileResult, UuidOrSignature } from '../../types';

export async function getTransactionProfile(
  client: SurfmanClient,
  signatureOrUuid: UuidOrSignature,
  config?: RpcProfileResultConfig
): Promise<UiKeyedProfileResult | null> {
  return client.request<[UuidOrSignature, RpcProfileResultConfig | undefined], UiKeyedProfileResult | null>(
    'surfnet_getTransactionProfile',
    [signatureOrUuid, config]
  );
}
