import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAmount } from '../../types';

export async function getTokenAccountBalance(
  client: SurfmanClient,
  pubkey: string,
  config?: { commitment?: string }
): Promise<TokenAmount | null> {
  return client.request<[string, any?], TokenAmount | null>(
    'getTokenAccountBalance',
    config ? [pubkey, config] : [pubkey]
  );
}
