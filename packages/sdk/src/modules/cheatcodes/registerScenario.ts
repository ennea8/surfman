import type { SurfmanClient } from '../../client/SurfmanClient';
import type { Scenario } from '../../types';

export async function registerScenario(
  client: SurfmanClient,
  scenario: Scenario,
  slot?: number
): Promise<void> {
  return client.request<[Scenario, number | undefined], void>(
    'surfnet_registerScenario',
    [scenario, slot]
  );
}
