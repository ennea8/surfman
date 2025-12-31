import type { SurfmanClient } from '../../client/SurfmanClient';

export async function getFeeForMessage(
  client: SurfmanClient,
  message: string,
  config?: { commitment?: string }
): Promise<number | null> {
  return client.request<[string, any?], number | null>(
    'getFeeForMessage',
    config ? [message, config] : [message]
  );
}
