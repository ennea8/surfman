import type { SurfmanClient } from '../../client/SurfmanClient';

export async function resetNetwork(client: SurfmanClient): Promise<void> {
  return client.request<[], void>('surfnet_resetNetwork', []);
}
