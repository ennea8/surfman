import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getMaxShredInsertSlot(
  client: SurfmanClient
): Promise<number> {
  return client.request<[], number>('getMaxShredInsertSlot', []);
}
