import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAmount } from '../../types';

export async function getTokenSupply(
  client: SurfmanClient,
  mint: string,
  config?: { commitment?: string }
): Promise<TokenAmount> {
  return client.request<[string, any?], TokenAmount>(
    'getTokenSupply',
    config ? [mint, config] : [mint]
  );
}
