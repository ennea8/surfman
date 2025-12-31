import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getFirstAvailableBlock(
  client: SurfmanClient
): Promise<number> {
  return client.request<[], number>('getFirstAvailableBlock', []);
}
