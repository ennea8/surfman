import type { SurfmanClient } from '../../client/SurfmanClient';
import type { GetStreamedAccountsResponse, RpcResponse } from '../../types';

export async function getStreamedAccounts(
  client: SurfmanClient
): Promise<GetStreamedAccountsResponse> {
  const response = await client.request<[], RpcResponse<GetStreamedAccountsResponse>>(
    'surfnet_getStreamedAccounts',
    []
  );
  return response.value;
}
