import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountInfo, AccountInfoConfig, RpcResponse } from '../../types';

export async function getAccountInfo(
  client: SurfmanClient,
  pubkey: string,
  config?: AccountInfoConfig
): Promise<AccountInfo | null> {
  const response = await client.request<[string, AccountInfoConfig?], RpcResponse<AccountInfo | null>>(
    'getAccountInfo',
    config ? [pubkey, config] : [pubkey]
  );
  return response.value;
}
