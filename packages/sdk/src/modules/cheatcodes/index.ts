import { SurfmanClient } from '../../client/SurfmanClient';
import { timeTravel } from './timeTravel';
import { setAccount } from './setAccount';
import { setProgramAuthority } from './setProgramAuthority';
import type {
  TimeTravelConfig,
  TimeTravelResult,
  SetAccountUpdate,
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
}
