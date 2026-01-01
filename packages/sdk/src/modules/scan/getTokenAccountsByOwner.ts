import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, TokenAccountsFilter, AccountInfoConfig, RpcResponse } from '../../types';

export async function getTokenAccountsByOwner(
  client: SurfmanClient,
  owner: string,
  filter: TokenAccountsFilter,
  config?: AccountInfoConfig
): Promise<KeyedAccount[]> {
  const response = await client.request<[string, TokenAccountsFilter, AccountInfoConfig?], RpcResponse<KeyedAccount[]>>(
    'getTokenAccountsByOwner',
    config ? [owner, filter, config] : [owner, filter]
  );
  return response.value;
}
