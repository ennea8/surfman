import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, TokenAccountsFilter, AccountInfoConfig } from '../../types';

export async function getTokenAccountsByOwner(
  client: SurfmanClient,
  owner: string,
  filter: TokenAccountsFilter,
  config?: AccountInfoConfig
): Promise<KeyedAccount[]> {
  return client.request<[string, TokenAccountsFilter, AccountInfoConfig?], KeyedAccount[]>(
    'getTokenAccountsByOwner',
    config ? [owner, filter, config] : [owner, filter]
  );
}
