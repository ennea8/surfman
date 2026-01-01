import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getMaxRetransmitSlot(
  client: SurfmanClient
): Promise<number> {
  return client.request<[], number>('getMaxRetransmitSlot', []);
}
