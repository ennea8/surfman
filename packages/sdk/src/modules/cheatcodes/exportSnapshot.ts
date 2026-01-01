import type { SurfmanClient } from '../../client/SurfmanClient';
import type { ExportSnapshotConfig, AccountSnapshot, RpcResponse } from '../../types';

export async function exportSnapshot(
  client: SurfmanClient,
  config?: ExportSnapshotConfig
): Promise<Record<string, AccountSnapshot>> {
  const response = await client.request<[ExportSnapshotConfig | undefined], RpcResponse<Record<string, AccountSnapshot>>>(
    'surfnet_exportSnapshot',
    [config]
  );
  return response.value;
}
