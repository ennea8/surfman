import type { SurfmanClient } from '../../client/SurfmanClient';

export interface PrioritizationFee {
  slot: number;
  prioritizationFee: number;
}

export async function getRecentPrioritizationFees(
  client: SurfmanClient,
  addresses?: string[]
): Promise<PrioritizationFee[]> {
  return client.request<[string[]?], PrioritizationFee[]>(
    'getRecentPrioritizationFees',
    addresses ? [addresses] : []
  );
}
