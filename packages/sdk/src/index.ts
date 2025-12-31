import { SurfmanClient } from './client/SurfmanClient';
import { CheatcodesModule } from './modules/cheatcodes';
import { NetworkModule } from './modules/network';
import { AccountsModule } from './modules/accounts';
import type { RpcClientConfig } from './types';

export class Surfman {
  public cheatcodes: CheatcodesModule;
  public network: NetworkModule;
  public accounts: AccountsModule;

  private client: SurfmanClient;

  constructor(config: string | RpcClientConfig) {
    this.client = new SurfmanClient(config);
    this.cheatcodes = new CheatcodesModule(this.client);
    this.network = new NetworkModule(this.client);
    this.accounts = new AccountsModule(this.client);
  }

  getClient(): SurfmanClient {
    return this.client;
  }
}

export { SurfmanClient } from './client/SurfmanClient';
export * from './types';
export * from './modules';
