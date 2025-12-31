import type { SurfmanClient } from '../../client/SurfmanClient';
import type { KeyedAccount, ProgramAccountsConfig } from '../../types';

export async function getProgramAccounts(
  client: SurfmanClient,
  programId: string,
  config?: ProgramAccountsConfig
): Promise<KeyedAccount[]> {
  const result = await client.request<
    [string, ProgramAccountsConfig?],
    KeyedAccount[] | { context: any; value: KeyedAccount[] }
  >('getProgramAccounts', config ? [programId, config] : [programId]);

  if (result && typeof result === 'object' && 'value' in result) {
    return result.value;
  }
  return result as KeyedAccount[];
}
