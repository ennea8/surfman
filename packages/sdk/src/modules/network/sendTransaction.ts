import type { SurfmanClient } from '../../client/SurfmanClient';
import type { SendTransactionConfig } from '../../types';

export async function sendTransaction(
  client: SurfmanClient,
  transaction: string,
  config?: SendTransactionConfig
): Promise<string> {
  return client.request<[string, SendTransactionConfig?], string>(
    'sendTransaction',
    config ? [transaction, config] : [transaction]
  );
}
