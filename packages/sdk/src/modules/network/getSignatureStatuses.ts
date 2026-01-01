import type { SurfmanClient } from '../../client/SurfmanClient';
import type { SignatureStatus, RpcResponse } from '../../types';

export async function getSignatureStatuses(
  client: SurfmanClient,
  signatures: string[],
  config?: { searchTransactionHistory?: boolean }
): Promise<(SignatureStatus | null)[]> {
  const response = await client.request<[string[], any?], RpcResponse<(SignatureStatus | null)[]>>(
    'getSignatureStatuses',
    config ? [signatures, config] : [signatures]
  );
  return response.value;
}
