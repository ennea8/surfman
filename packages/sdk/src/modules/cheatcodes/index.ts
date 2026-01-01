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
import { cloneProgramAccount } from './cloneProgramAccount';
import { profileTransaction } from './profileTransaction';
import { getProfileResultsByTag } from './getProfileResultsByTag';
import { setSupply } from './setSupply';
import { getTransactionProfile } from './getTransactionProfile';
import { registerIdl } from './registerIdl';
import { getIdl } from './getIdl';
import { exportSnapshot } from './exportSnapshot';
import { streamAccount } from './streamAccount';
import { getStreamedAccounts } from './getStreamedAccounts';
import { getSurfnetInfo } from './getSurfnetInfo';
import { writeProgram } from './writeProgram';
import { registerScenario } from './registerScenario';
import type {
  TimeTravelConfig,
  TimeTravelResult,
  SetAccountUpdate,
  TokenAccountUpdate,
  ResetAccountConfig,
  RpcLogsResponse,
  SupplyUpdate,
  RpcProfileResultConfig,
  UiKeyedProfileResult,
  UuidOrSignature,
  Idl,
  ExportSnapshotConfig,
  AccountSnapshot,
  StreamAccountConfig,
  GetStreamedAccountsResponse,
  GetSurfnetInfoResponse,
  Scenario,
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

  async cloneProgramAccount(
    sourceProgramId: string,
    destinationProgramId: string
  ): Promise<void> {
    return cloneProgramAccount(this.client, sourceProgramId, destinationProgramId);
  }

  async profileTransaction(
    transactionData: string,
    tag?: string,
    config?: RpcProfileResultConfig
  ): Promise<UiKeyedProfileResult> {
    return profileTransaction(this.client, transactionData, tag, config);
  }

  async getProfileResultsByTag(
    tag: string,
    config?: RpcProfileResultConfig
  ): Promise<UiKeyedProfileResult[] | null> {
    return getProfileResultsByTag(this.client, tag, config);
  }

  async setSupply(update: SupplyUpdate): Promise<void> {
    return setSupply(this.client, update);
  }

  async getTransactionProfile(
    signatureOrUuid: UuidOrSignature,
    config?: RpcProfileResultConfig
  ): Promise<UiKeyedProfileResult | null> {
    return getTransactionProfile(this.client, signatureOrUuid, config);
  }

  async registerIdl(idl: Idl, slot?: number): Promise<void> {
    return registerIdl(this.client, idl, slot);
  }

  async getIdl(programId: string, slot?: number): Promise<Idl | null> {
    return getIdl(this.client, programId, slot);
  }

  async exportSnapshot(
    config?: ExportSnapshotConfig
  ): Promise<Record<string, AccountSnapshot>> {
    return exportSnapshot(this.client, config);
  }

  async streamAccount(
    pubkey: string,
    config?: StreamAccountConfig
  ): Promise<void> {
    return streamAccount(this.client, pubkey, config);
  }

  async getStreamedAccounts(): Promise<GetStreamedAccountsResponse> {
    return getStreamedAccounts(this.client);
  }

  async getSurfnetInfo(): Promise<GetSurfnetInfoResponse> {
    return getSurfnetInfo(this.client);
  }

  async writeProgram(
    programId: string,
    data: string,
    offset: number,
    authority?: string
  ): Promise<void> {
    return writeProgram(this.client, programId, data, offset, authority);
  }

  async registerScenario(scenario: Scenario, slot?: number): Promise<void> {
    return registerScenario(this.client, scenario, slot);
  }
}
