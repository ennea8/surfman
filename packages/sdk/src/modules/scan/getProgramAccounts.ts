import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, ProgramAccountsConfig, RpcResponse } from '../../types';

export async function getProgramAccounts(
  client: SurfmanClient,
  programId: string,
  config?: ProgramAccountsConfig
): Promise<KeyedAccount[]> {
  const response = await client.request<
    [string, ProgramAccountsConfig?],
    RpcResponse<KeyedAccount[]>
  >('getProgramAccounts', config ? [programId, config] : [programId]);
  
  return response.value;
}
