import type { SurfmanClient } from '../../client/SurfmanClient';
import type { EpochInfo } from '../../types';

export async function getEpochInfo(client: SurfmanClient): Promise<EpochInfo> {
  return client.request<[], EpochInfo>('getEpochInfo', []);
}
