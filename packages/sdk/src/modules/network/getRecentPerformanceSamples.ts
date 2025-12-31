import type { SurfmanClient } from '../../client/SurfmanClient';
import type { PerformanceSample } from '../../types';

export async function getRecentPerformanceSamples(
  client: SurfmanClient,
  limit?: number
): Promise<PerformanceSample[]> {
  return client.request<[number?], PerformanceSample[]>(
    'getRecentPerformanceSamples',
    limit !== undefined ? [limit] : []
  );
}
