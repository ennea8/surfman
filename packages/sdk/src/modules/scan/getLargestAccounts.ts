import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountBalance } from '../../types';

export interface LargestAccountsConfig {
  commitment?: string;
  filter?: 'circulating' | 'nonCirculating';
}

export async function getLargestAccounts(
  client: SurfmanClient,
  config?: LargestAccountsConfig
): Promise<AccountBalance[]> {
  return client.request<[LargestAccountsConfig?], AccountBalance[]>(
    'getLargestAccounts',
    config ? [config] : []
  );
}
