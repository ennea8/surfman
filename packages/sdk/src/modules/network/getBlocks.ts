import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getBlocks(
  client: SurfmanClient,
  startSlot: number,
  endSlot?: number,
  config?: { commitment?: string }
): Promise<number[]> {
  return client.request<[number, number?, any?], number[]>(
    'getBlocks',
    endSlot !== undefined
      ? config
        ? [startSlot, endSlot, config]
        : [startSlot, endSlot]
      : [startSlot]
  );
}
