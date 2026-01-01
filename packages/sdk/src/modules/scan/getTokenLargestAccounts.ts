import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAccountBalance, RpcResponse } from '../../types';

export async function getTokenLargestAccounts(
  client: SurfmanClient,
  mint: string,
  config?: { commitment?: string }
): Promise<TokenAccountBalance[]> {
  const response = await client.request<[string, any?], RpcResponse<TokenAccountBalance[]>>(
    'getTokenLargestAccounts',
    config ? [mint, config] : [mint]
  );
  return response.value;
}
