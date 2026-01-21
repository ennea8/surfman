export interface BlockhashResult {
  blockhash: string;
  lastValidBlockHeight: number;
}

export interface BlockConfig {
  encoding?: 'json' | 'jsonParsed' | 'base58' | 'base64';
  transactionDetails?: 'full' | 'signatures' | 'none';
  rewards?: boolean;
  commitment?: string;
  maxSupportedTransactionVersion?: number;
}

export interface Block {
  blockhash: string;
  previousBlockhash: string;
  parentSlot: number;
  transactions?: any[];
  signatures?: string[];
  rewards?: any[];
  blockTime?: number | null;
  blockHeight?: number | null;
}

export interface EpochInfo {
  absoluteSlot: number;
  blockHeight: number | null;
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  transactionCount: number | null;
}

export interface TransactionConfig {
  encoding?: 'json' | 'jsonParsed' | 'base58' | 'base64';
  commitment?: string;
  maxSupportedTransactionVersion?: number;
}

export interface TransactionResult {
  slot: number;
  transaction: any;
  blockTime?: number | null;
  meta?: any;
}

export interface SignatureStatus {
  slot: number;
  confirmations: number | null;
  err: any | null;
  confirmationStatus?: 'processed' | 'confirmed' | 'finalized';
}

export interface PerformanceSample {
  slot: number;
  numTransactions: number;
  numSlots: number;
  samplePeriodSecs: number;
  numNonVoteTransactions?: number;
}

export interface ClusterNode {
  pubkey: string;
  gossip?: string | null;
  tpu?: string | null;
  rpc?: string | null;
  version?: string | null;
  featureSet?: number | null;
  shredVersion?: number | null;
}

export interface SendTransactionConfig {
  skipPreflight?: boolean;
  preflightCommitment?: string;
  encoding?: 'base58' | 'base64';
  maxRetries?: number;
  minContextSlot?: number;
}

export interface SimulateTransactionConfig {
  commitment?: string;
  sigVerify?: boolean;
  replaceRecentBlockhash?: boolean;
  minContextSlot?: number;
  encoding?: 'base58' | 'base64';
  accounts?: {
    encoding: string;
    addresses: string[];
  };
}

export interface SimulateTransactionResult {
  err: any | null;
  logs: string[] | null;
  accounts?: any[] | null;
  unitsConsumed?: number;
  returnData?: any | null;
}

export interface AccountInfo {
  lamports: number;
  owner: string;
  data: any;
  executable: boolean;
  rentEpoch: number;
  space?: number;
}

export interface AccountInfoConfig {
  encoding?: 'base58' | 'base64' | 'base64+zstd' | 'jsonParsed';
  dataSlice?: {
    offset: number;
    length: number;
  };
  commitment?: string;
  minContextSlot?: number;
}

export interface BlockCommitment {
  commitment: number[] | null;
  totalStake: number;
}

export interface TokenAmount {
  amount: string;
  decimals: number;
  uiAmount: number | null;
  uiAmountString: string;
}

export interface ProgramAccountsConfig {
  filters?: Array<
    | { dataSize: number }
    | { memcmp: { offset: number; bytes: string } }
  >;
  encoding?: 'base58' | 'base64' | 'base64+zstd' | 'jsonParsed';
  withContext?: boolean;
  commitment?: string;
  minContextSlot?: number;
}

export interface KeyedAccount {
  pubkey: string;
  account: AccountInfo;
}

export interface AccountBalance {
  address: string;
  lamports: number;
}

export interface SupplyConfig {
  commitment?: string;
  excludeNonCirculatingAccountsList?: boolean;
}

export interface Supply {
  total: number;
  circulating: number;
  nonCirculating: number;
  nonCirculatingAccounts: string[];
}

export interface TokenAccountBalance {
  address: string;
  amount: string;
  decimals: number;
  uiAmount: number | null;
  uiAmountString: string;
}

export type TokenAccountsFilter =
  | { mint: string }
  | { programId: string };

export interface InflationReward {
  epoch: number;
  effectiveSlot: number;
  amount: number;
  postBalance: number;
  commission?: number | null;
}
