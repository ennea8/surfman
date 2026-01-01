import type { SurfmanClient } from '../../client/SurfmanClient';

export async function cloneProgramAccount(
  client: SurfmanClient,
  sourceProgramId: string,
  destinationProgramId: string
): Promise<void> {
  return client.request<[string, string], void>(
    'surfnet_cloneProgramAccount',
    [sourceProgramId, destinationProgramId]
  );
}
