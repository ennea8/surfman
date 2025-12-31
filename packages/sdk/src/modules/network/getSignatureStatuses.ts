import type { SurfmanClient } from '../../client/SurfmanClient';
import type { SignatureStatus } from '../../types';

export async function getSignatureStatuses(
  client: SurfmanClient,
  signatures: string[],
  config?: { searchTransactionHistory?: boolean }
): Promise<(SignatureStatus | null)[]> {
  return client.request<[string[], any?], (SignatureStatus | null)[]>(
    'getSignatureStatuses',
    config ? [signatures, config] : [signatures]
  );
}
