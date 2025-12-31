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
