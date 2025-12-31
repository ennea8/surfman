import type { SurfmanClient } from '../../client/SurfmanClient';
import type { ResetAccountConfig } from '../../types';

export async function resetAccount(
  client: SurfmanClient,
  pubkey: string,
  config?: ResetAccountConfig
): Promise<void> {
  return client.request<[string, ResetAccountConfig?], void>(
    'surfnet_resetAccount',
    [pubkey, config]
  );
}
