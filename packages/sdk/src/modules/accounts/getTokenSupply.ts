import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAmount, RpcResponse } from '../../types';

export async function getTokenSupply(
  client: SurfmanClient,
  mint: string,
  config?: { commitment?: string }
): Promise<TokenAmount> {
  const response = await client.request<[string, any?], RpcResponse<TokenAmount>>(
    'getTokenSupply',
    config ? [mint, config] : [mint]
  );
  return response.value;
}
