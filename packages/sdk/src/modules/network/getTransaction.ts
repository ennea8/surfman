import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TransactionResult, TransactionConfig } from '../../types';

export async function getTransaction(
  client: SurfmanClient,
  signature: string,
  config?: TransactionConfig
): Promise<TransactionResult | null> {
  return client.request<[string, TransactionConfig?], TransactionResult | null>(
    'getTransaction',
    config ? [signature, config] : [signature]
  );
}
