import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TimeTravelResult } from '../../types';

export async function pauseClock(
  client: SurfmanClient
): Promise<TimeTravelResult> {
  return client.request<[], TimeTravelResult>('surfnet_pauseClock', []);
}
