import type { SurfmanClient } from '../../client/SurfmanClient';
import type { ExportSnapshotConfig, AccountSnapshot } from '../../types';

export async function exportSnapshot(
  client: SurfmanClient,
  config?: ExportSnapshotConfig
): Promise<Record<string, AccountSnapshot>> {
  return client.request<[ExportSnapshotConfig | undefined], Record<string, AccountSnapshot>>(
    'surfnet_exportSnapshot',
    [config]
  );
}
