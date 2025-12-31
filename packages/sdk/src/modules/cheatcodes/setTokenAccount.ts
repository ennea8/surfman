import type { SurfmanClient } from '../../client/SurfmanClient';
import type { TokenAccountUpdate } from '../../types';

export async function setTokenAccount(
  client: SurfmanClient,
  owner: string,
  mint: string,
  update: TokenAccountUpdate,
  tokenProgram?: string
): Promise<void> {
  return client.request<[string, string, TokenAccountUpdate, string?], void>(
    'surfnet_setTokenAccount',
    [owner, mint, update, tokenProgram]
  );
}
