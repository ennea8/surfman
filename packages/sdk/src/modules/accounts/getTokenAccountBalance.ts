import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAmount, RpcResponse } from '../../types';

export async function getTokenAccountBalance(
  client: SurfmanClient,
  pubkey: string,
  config?: { commitment?: string }
): Promise<TokenAmount | null> {
  const response = await client.request<[string, any?], RpcResponse<TokenAmount | null>>(
    'getTokenAccountBalance',
    config ? [pubkey, config] : [pubkey]
  );
  return response.value;
}
