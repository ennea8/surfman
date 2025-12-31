import type { SurfmanClient } from '../../client/SurfmanClient';

export interface SignatureForAddress {
  signature: string;
  slot: number;
  err: any | null;
  memo: string | null;
  blockTime?: number | null;
}

export interface SignaturesForAddressConfig {
  limit?: number;
  before?: string;
  until?: string;
  commitment?: string;
}

export async function getSignaturesForAddress(
  client: SurfmanClient,
  address: string,
  config?: SignaturesForAddressConfig
): Promise<SignatureForAddress[]> {
  return client.request<[string, SignaturesForAddressConfig?], SignatureForAddress[]>(
    'getSignaturesForAddress',
    config ? [address, config] : [address]
  );
}
