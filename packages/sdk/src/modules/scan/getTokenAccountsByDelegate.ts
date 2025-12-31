import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, TokenAccountsFilter, AccountInfoConfig } from '../../types';

export async function getTokenAccountsByDelegate(
  client: SurfmanClient,
  delegate: string,
  filter: TokenAccountsFilter,
  config?: AccountInfoConfig
): Promise<KeyedAccount[]> {
  return client.request<[string, TokenAccountsFilter, AccountInfoConfig?], KeyedAccount[]>(
    'getTokenAccountsByDelegate',
    config ? [delegate, filter, config] : [delegate, filter]
  );
}
