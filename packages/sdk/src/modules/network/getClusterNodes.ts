import type { SurfmanClient } from '../../client/SurfmanClient';
import type { ClusterNode } from '../../types';

export async function getClusterNodes(
  client: SurfmanClient
): Promise<ClusterNode[]> {
  return client.request<[], ClusterNode[]>('getClusterNodes', []);
}
