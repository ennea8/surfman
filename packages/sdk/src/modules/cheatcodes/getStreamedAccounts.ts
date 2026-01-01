import type { SurfmanClient } from '../../client/SurfmanClient';
import type { GetStreamedAccountsResponse } from '../../types';

export async function getStreamedAccounts(
  client: SurfmanClient
): Promise<GetStreamedAccountsResponse> {
  return client.request<[], GetStreamedAccountsResponse>(
    'surfnet_getStreamedAccounts',
    []
  );
}
