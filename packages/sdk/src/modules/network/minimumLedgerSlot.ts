import type { SurfmanClient } from '../../client/SurfmanClient';

export async function minimumLedgerSlot(
  client: SurfmanClient
): Promise<number> {
  return client.request<[], number>('minimumLedgerSlot', []);
}
