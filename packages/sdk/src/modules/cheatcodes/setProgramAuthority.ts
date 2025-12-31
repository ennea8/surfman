import type { SurfmanClient } from '../../client/SurfmanClient';

export async function setProgramAuthority(
  client: SurfmanClient,
  programId: string,
  newAuthority: string | null
): Promise<void> {
  return client.request<[string, string | null], void>(
    'surfnet_setProgramAuthority',
    [programId, newAuthority]
  );
}
