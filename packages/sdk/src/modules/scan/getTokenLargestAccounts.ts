import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAccountBalance } from '../../types';

export async function getTokenLargestAccounts(
  client: SurfmanClient,
  mint: string,
  config?: { commitment?: string }
): Promise<TokenAccountBalance[]> {
  return client.request<[string, any?], TokenAccountBalance[]>(
    'getTokenLargestAccounts',
    config ? [mint, config] : [mint]
  );
}
