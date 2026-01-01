import { SurfmanClient } from '../../client/SurfmanClient';
import { getLatestBlockhash } from './getLatestBlockhash';
import { getBlock } from './getBlock';
import { getBlockTime } from './getBlockTime';
import { getFirstAvailableBlock } from './getFirstAvailableBlock';
import { minimumLedgerSlot } from './minimumLedgerSlot';
import { getTransaction } from './getTransaction';
import { getSignatureStatuses } from './getSignatureStatuses';
import { sendTransaction } from './sendTransaction';
import { simulateTransaction } from './simulateTransaction';
import { getClusterNodes } from './getClusterNodes';
import { getRecentPerformanceSamples } from './getRecentPerformanceSamples';
import { requestAirdrop } from './requestAirdrop';
import { getBlocks } from './getBlocks';
import { getBlocksWithLimit } from './getBlocksWithLimit';
import {
  getSignaturesForAddress,
  type SignatureForAddress,
  type SignaturesForAddressConfig,
} from './getSignaturesForAddress';
import { isBlockhashValid } from './isBlockhashValid';
import { getFeeForMessage } from './getFeeForMessage';
import {
  getRecentPrioritizationFees,
  type PrioritizationFee,
} from './getRecentPrioritizationFees';
import { getInflationReward } from './getInflationReward';
import { getMaxRetransmitSlot } from './getMaxRetransmitSlot';
import { getMaxShredInsertSlot } from './getMaxShredInsertSlot';
import { getStakeMinimumDelegation } from './getStakeMinimumDelegation';
import type {
  BlockhashResult,
  Block,
  BlockConfig,
  TransactionResult,
  TransactionConfig,
  SignatureStatus,
  SendTransactionConfig,
  SimulateTransactionConfig,
  SimulateTransactionResult,
  ClusterNode,
  PerformanceSample,
  InflationReward,
} from '../../types';

export class NetworkModule {
  constructor(private client: SurfmanClient) {}

  async getLatestBlockhash(config?: {
    commitment?: string;
    minContextSlot?: number;
  }): Promise<BlockhashResult> {
    return getLatestBlockhash(this.client, config);
  }

  async getBlock(
    slot: number,
    config?: BlockConfig
  ): Promise<Block | null> {
    return getBlock(this.client, slot, config);
  }

  async getBlockTime(slot: number): Promise<number | null> {
    return getBlockTime(this.client, slot);
  }

  async getFirstAvailableBlock(): Promise<number> {
    return getFirstAvailableBlock(this.client);
  }

  async minimumLedgerSlot(): Promise<number> {
    return minimumLedgerSlot(this.client);
  }

  async getTransaction(
    signature: string,
    config?: TransactionConfig
  ): Promise<TransactionResult | null> {
    return getTransaction(this.client, signature, config);
  }

  async getSignatureStatuses(
    signatures: string[],
    config?: { searchTransactionHistory?: boolean }
  ): Promise<(SignatureStatus | null)[]> {
    return getSignatureStatuses(this.client, signatures, config);
  }

  async sendTransaction(
    transaction: string,
    config?: SendTransactionConfig
  ): Promise<string> {
    return sendTransaction(this.client, transaction, config);
  }

  async simulateTransaction(
    transaction: string,
    config?: SimulateTransactionConfig
  ): Promise<SimulateTransactionResult> {
    return simulateTransaction(this.client, transaction, config);
  }

  async getClusterNodes(): Promise<ClusterNode[]> {
    return getClusterNodes(this.client);
  }

  async getRecentPerformanceSamples(
    limit?: number
  ): Promise<PerformanceSample[]> {
    return getRecentPerformanceSamples(this.client, limit);
  }

  async requestAirdrop(
    pubkey: string,
    lamports: number,
    config?: { commitment?: string }
  ): Promise<string> {
    return requestAirdrop(this.client, pubkey, lamports, config);
  }

  async getBlocks(
    startSlot: number,
    endSlot?: number,
    config?: { commitment?: string }
  ): Promise<number[]> {
    return getBlocks(this.client, startSlot, endSlot, config);
  }

  async getBlocksWithLimit(
    startSlot: number,
    limit: number,
    config?: { commitment?: string }
  ): Promise<number[]> {
    return getBlocksWithLimit(this.client, startSlot, limit, config);
  }

  async getSignaturesForAddress(
    address: string,
    config?: SignaturesForAddressConfig
  ): Promise<SignatureForAddress[]> {
    return getSignaturesForAddress(this.client, address, config);
  }

  async isBlockhashValid(
    blockhash: string,
    config?: { commitment?: string; minContextSlot?: number }
  ): Promise<boolean> {
    return isBlockhashValid(this.client, blockhash, config);
  }

  async getFeeForMessage(
    message: string,
    config?: { commitment?: string }
  ): Promise<number | null> {
    return getFeeForMessage(this.client, message, config);
  }

  async getRecentPrioritizationFees(
    addresses?: string[]
  ): Promise<PrioritizationFee[]> {
    return getRecentPrioritizationFees(this.client, addresses);
  }

  async getInflationReward(
    addresses: string[],
    config?: { epoch?: number; commitment?: string; minContextSlot?: number }
  ): Promise<(InflationReward | null)[]> {
    return getInflationReward(this.client, addresses, config);
  }

  async getMaxRetransmitSlot(): Promise<number> {
    return getMaxRetransmitSlot(this.client);
  }

  async getMaxShredInsertSlot(): Promise<number> {
    return getMaxShredInsertSlot(this.client);
  }

  async getStakeMinimumDelegation(
    config?: { commitment?: string; minContextSlot?: number }
  ): Promise<number> {
    return getStakeMinimumDelegation(this.client, config);
  }
}
