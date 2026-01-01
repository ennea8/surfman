export interface TimeTravelConfig {
  absoluteEpoch?: number;
  absoluteSlot?: number;
  absoluteTimestamp?: number;
}

export interface TimeTravelResult {
  absoluteSlot: number;
  blockHeight: number | null;
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  transactionCount: number | null;
}

export interface SetAccountUpdate {
  data?: string;
  executable?: boolean;
  lamports?: number;
  owner?: string;
  rentEpoch?: number;
}

export interface SetProgramAuthorityParams {
  programId: string;
  newAuthority: string | null;
}

export interface TokenAccountUpdate {
  amount?: number;
  delegate?: SetSomeAccount;
  state?: string;
  delegatedAmount?: number;
  closeAuthority?: SetSomeAccount;
}

export interface SetSomeAccount {
  Account?: string;
  NoAccount?: boolean;
}

export interface ResetAccountConfig {
  includeOwnedAccounts?: boolean;
}

export interface RpcLogsResponse {
  signature: string;
  err: any | null;
  slot: number;
  logs?: string[];
}

export interface SupplyUpdate {
  total?: number;
  circulating?: number;
  nonCirculating?: number;
  nonCirculatingAccounts?: string[];
}

export interface RpcProfileResultConfig {
  encoding?: string;
  depth?: 'full' | 'shallow';
}

export interface UiKeyedProfileResult {
  uuid: string;
  signature?: string;
  slot: number;
  tag?: string;
  computeUnitsConsumed?: number;
  err?: any;
  logs?: string[];
  preState?: any;
  postState?: any;
}

export interface Idl {
  address: string;
  metadata: {
    name: string;
    version: string;
    spec: string;
    description?: string;
  };
  instructions: any[];
  accounts: any[];
  types: any[];
  events?: any[];
  errors?: any[];
  constants?: any[];
  state?: any;
}

export interface ExportSnapshotConfig {
  includeParsedAccounts?: boolean;
  filter?: {
    includeProgramAccounts?: boolean;
    includeAccounts?: string[];
    excludeAccounts?: string[];
  };
  scope?: {
    network?: boolean;
    preTransaction?: string;
  };
}

export interface AccountSnapshot {
  lamports: number;
  owner: string;
  executable: boolean;
  rentEpoch: number;
  data: string;
}

export interface StreamAccountConfig {
  includeOwnedAccounts?: boolean;
}

export interface GetStreamedAccountsResponse {
  accounts: string[];
}

export interface GetSurfnetInfoResponse {
  runbookExecutions: Array<{
    startedAt: number;
    completedAt?: number;
    runbookId: string;
  }>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  overrides: OverrideInstance[];
  tags: string[];
}

export interface OverrideInstance {
  id: string;
  templateId: string;
  values: Record<string, any>;
  scenarioRelativeSlot: number;
  label?: string;
  enabled: boolean;
  fetchBeforeUse: boolean;
  account: AccountAddress;
}

export interface AccountAddress {
  pubkey?: string;
  pda?: {
    programId: string;
    seeds: any[];
  };
}

export type UuidOrSignature = 
  | { Uuid: string }
  | { Signature: string };
