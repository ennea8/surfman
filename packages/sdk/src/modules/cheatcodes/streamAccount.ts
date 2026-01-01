import type { SurfmanClient } from '../../client/SurfmanClient';
import type { StreamAccountConfig } from '../../types';

export async function streamAccount(
  client: SurfmanClient,
  pubkey: string,
  config?: StreamAccountConfig
): Promise<void> {
  return client.request<[string, StreamAccountConfig | undefined], void>(
    'surfnet_streamAccount',
    [pubkey, config]
  );
}
