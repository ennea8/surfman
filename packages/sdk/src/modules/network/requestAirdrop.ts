import type { SurfmanClient } from '../../client/SurfmanClient';

export async function requestAirdrop(
  client: SurfmanClient,
  pubkey: string,
  lamports: number,
  config?: { commitment?: string }
): Promise<string> {
  return client.request<[string, number, any?], string>(
    'requestAirdrop',
    config ? [pubkey, lamports, config] : [pubkey, lamports]
  );
}
