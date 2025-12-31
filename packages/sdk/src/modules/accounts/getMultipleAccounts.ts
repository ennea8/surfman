import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountInfo, AccountInfoConfig } from '../../types';

export async function getMultipleAccounts(
  client: SurfmanClient,
  pubkeys: string[],
  config?: AccountInfoConfig
): Promise<(AccountInfo | null)[]> {
  return client.request<[string[], AccountInfoConfig?], (AccountInfo | null)[]>(
    'getMultipleAccounts',
    config ? [pubkeys, config] : [pubkeys]
  );
}
