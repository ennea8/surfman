import type { SurfmanClient } from '../../client/SurfmanClient';
import type {
  SimulateTransactionConfig,
  SimulateTransactionResult,
} from '../../types';

export async function simulateTransaction(
  client: SurfmanClient,
  transaction: string,
  config?: SimulateTransactionConfig
): Promise<SimulateTransactionResult> {
  return client.request<
    [string, SimulateTransactionConfig?],
    SimulateTransactionResult
  >('simulateTransaction', config ? [transaction, config] : [transaction]);
}
