import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, TokenAccountsFilter, AccountInfoConfig, RpcResponse } from '../../types';

export async function getTokenAccountsByDelegate(
  client: SurfmanClient,
  delegate: string,
  filter: TokenAccountsFilter,
  config?: AccountInfoConfig
): Promise<KeyedAccount[]> {
  const response = await client.request<[string, TokenAccountsFilter, AccountInfoConfig?], RpcResponse<KeyedAccount[]>>(
    'getTokenAccountsByDelegate',
    config ? [delegate, filter, config] : [delegate, filter]
  );
  return response.value;
}
