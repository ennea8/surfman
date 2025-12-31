import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TimeTravelConfig, TimeTravelResult } from '../../types';

export async function timeTravel(
  client: SurfmanClient,
  config: TimeTravelConfig
): Promise<TimeTravelResult> {
  return client.request<[TimeTravelConfig], TimeTravelResult>(
    'surfnet_timeTravel',
    [config]
  );
}
