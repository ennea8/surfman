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
