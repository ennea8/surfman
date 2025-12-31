import { SurfmanClient } from '../../client/SurfmanClient';
import { getProgramAccounts } from './getProgramAccounts';
import { getLargestAccounts, type LargestAccountsConfig } from './getLargestAccounts';
import { getSupply } from './getSupply';
import { getTokenLargestAccounts } from './getTokenLargestAccounts';
import { getTokenAccountsByOwner } from './getTokenAccountsByOwner';
import { getTokenAccountsByDelegate } from './getTokenAccountsByDelegate';
import type {
  KeyedAccount,
  ProgramAccountsConfig,
  AccountBalance,
  Supply,
  SupplyConfig,
  TokenAccountBalance,
  TokenAccountsFilter,
  AccountInfoConfig,
} from '../../types';

export class ScanModule {
  constructor(private client: SurfmanClient) {}

  async getProgramAccounts(
    programId: string,
    config?: ProgramAccountsConfig
  ): Promise<KeyedAccount[]> {
    return getProgramAccounts(this.client, programId, config);
  }

  async getLargestAccounts(
    config?: LargestAccountsConfig
  ): Promise<AccountBalance[]> {
    return getLargestAccounts(this.client, config);
  }

  async getSupply(config?: SupplyConfig): Promise<Supply> {
    return getSupply(this.client, config);
  }

  async getTokenLargestAccounts(
    mint: string,
    config?: { commitment?: string }
  ): Promise<TokenAccountBalance[]> {
    return getTokenLargestAccounts(this.client, mint, config);
  }

  async getTokenAccountsByOwner(
    owner: string,
    filter: TokenAccountsFilter,
    config?: AccountInfoConfig
  ): Promise<KeyedAccount[]> {
    return getTokenAccountsByOwner(this.client, owner, filter, config);
  }

  async getTokenAccountsByDelegate(
    delegate: string,
    filter: TokenAccountsFilter,
    config?: AccountInfoConfig
  ): Promise<KeyedAccount[]> {
    return getTokenAccountsByDelegate(this.client, delegate, filter, config);
  }
}
