import { SurfmanClient } from '../../client/SurfmanClient';
import { getAccountInfo } from './getAccountInfo';
import { getMultipleAccounts } from './getMultipleAccounts';
import { getBlockCommitment } from './getBlockCommitment';
import { getTokenAccountBalance } from './getTokenAccountBalance';
import { getTokenSupply } from './getTokenSupply';
import type {
  AccountInfo,
  AccountInfoConfig,
  BlockCommitment,
  TokenAmount,
} from '../../types';

export class AccountsModule {
  constructor(private client: SurfmanClient) {}

  async getAccountInfo(
    pubkey: string,
    config?: AccountInfoConfig
  ): Promise<AccountInfo | null> {
    return getAccountInfo(this.client, pubkey, config);
  }

  async getMultipleAccounts(
    pubkeys: string[],
    config?: AccountInfoConfig
  ): Promise<(AccountInfo | null)[]> {
    return getMultipleAccounts(this.client, pubkeys, config);
  }

  async getBlockCommitment(slot: number): Promise<BlockCommitment> {
    return getBlockCommitment(this.client, slot);
  }

  async getTokenAccountBalance(
    pubkey: string,
    config?: { commitment?: string }
  ): Promise<TokenAmount | null> {
    return getTokenAccountBalance(this.client, pubkey, config);
  }

  async getTokenSupply(
    mint: string,
    config?: { commitment?: string }
  ): Promise<TokenAmount> {
    return getTokenSupply(this.client, mint, config);
  }
}
