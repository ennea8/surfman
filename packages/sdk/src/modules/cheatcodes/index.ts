import { SurfmanClient } from '../../client/SurfmanClient';
import { timeTravel } from './timeTravel';
import { setAccount } from './setAccount';
import { setProgramAuthority } from './setProgramAuthority';
import { pauseClock } from './pauseClock';
import { resumeClock } from './resumeClock';
import { getLocalSignatures } from './getLocalSignatures';
import { setTokenAccount } from './setTokenAccount';
import { resetAccount } from './resetAccount';
import { resetNetwork } from './resetNetwork';
import type {
  TimeTravelConfig,
  TimeTravelResult,
  SetAccountUpdate,
  TokenAccountUpdate,
  ResetAccountConfig,
  RpcLogsResponse,
} from '../../types';

export class CheatcodesModule {
  constructor(private client: SurfmanClient) {}

  async timeTravel(config: TimeTravelConfig): Promise<TimeTravelResult> {
    return timeTravel(this.client, config);
  }

  async setAccount(pubkey: string, update: SetAccountUpdate): Promise<void> {
    return setAccount(this.client, pubkey, update);
  }

  async setProgramAuthority(
    programId: string,
    newAuthority: string | null
  ): Promise<void> {
    return setProgramAuthority(this.client, programId, newAuthority);
  }

  async pauseClock(): Promise<TimeTravelResult> {
    return pauseClock(this.client);
  }

  async resumeClock(): Promise<TimeTravelResult> {
    return resumeClock(this.client);
  }

  async getLocalSignatures(limit?: number): Promise<RpcLogsResponse[]> {
    return getLocalSignatures(this.client, limit);
  }

  async setTokenAccount(
    owner: string,
    mint: string,
    update: TokenAccountUpdate,
    tokenProgram?: string
  ): Promise<void> {
    return setTokenAccount(this.client, owner, mint, update, tokenProgram);
  }

  async resetAccount(
    pubkey: string,
    config?: ResetAccountConfig
  ): Promise<void> {
    return resetAccount(this.client, pubkey, config);
  }

  async resetNetwork(): Promise<void> {
    return resetNetwork(this.client);
  }
}
