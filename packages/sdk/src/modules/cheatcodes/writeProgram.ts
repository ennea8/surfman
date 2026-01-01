import type { SurfmanClient } from '../../client/SurfmanClient';

export async function writeProgram(
  client: SurfmanClient,
  programId: string,
  data: string,
  offset: number,
  authority?: string
): Promise<void> {
  return client.request<[string, string, number, string | undefined], void>(
    'surfnet_writeProgram',
    [programId, data, offset, authority]
  );
}
