import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountBalance, RpcResponse } from '../../types';

export interface LargestAccountsConfig {
  commitment?: string;
  filter?: 'circulating' | 'nonCirculating';
}

export async function getLargestAccounts(
  client: SurfmanClient,
  config?: LargestAccountsConfig
): Promise<AccountBalance[]> {
  const response = await client.request<[LargestAccountsConfig?], RpcResponse<AccountBalance[]>>(
    'getLargestAccounts',
    config ? [config] : []
  );
  return response.value;
}
