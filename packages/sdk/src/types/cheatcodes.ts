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
