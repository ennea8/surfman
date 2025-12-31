import type { SurfmanClient } from '../../client/SurfmanClient';
import type { AccountInfo, AccountInfoConfig } from '../../types';

export async function getAccountInfo(
  client: SurfmanClient,
  pubkey: string,
  config?: AccountInfoConfig
): Promise<AccountInfo | null> {
  return client.request<[string, AccountInfoConfig?], AccountInfo | null>(
    'getAccountInfo',
    config ? [pubkey, config] : [pubkey]
  );
}
