import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountInfo, AccountInfoConfig, RpcResponse } from '../../types';

export async function getMultipleAccounts(
  client: SurfmanClient,
  pubkeys: string[],
  config?: AccountInfoConfig
): Promise<(AccountInfo | null)[]> {
  const response = await client.request<[string[], AccountInfoConfig?], RpcResponse<(AccountInfo | null)[]>>(
    'getMultipleAccounts',
    config ? [pubkeys, config] : [pubkeys]
  );
  return response.value;
}
