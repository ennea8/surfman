import type { SurfmanClient } from '../../client/SurfmanClient';
import type { RpcResponse } from '../../types';

export async function getFeeForMessage(
  client: SurfmanClient,
  message: string,
  config?: { commitment?: string }
): Promise<number | null> {
  const response = await client.request<[string, any?], RpcResponse<number | null>>(
    'getFeeForMessage',
    config ? [message, config] : [message]
  );
  return response.value;
}
