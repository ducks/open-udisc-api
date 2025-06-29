import { HydratedEvent } from '../events/models';
import { UDiscSchemaMapExtractor } from '../udisc/UDiscSchemaMapExtractor';
import { UDiscUtils } from '../udisc/UDiscUtils';

export function formatEvents(data: unknown[]): HydratedEvent[] {
  const schemaMap = UDiscSchemaMapExtractor.extract(data, 'routes/events/index');

  const events: HydratedEvent[] = UDiscUtils.hydrateDeep<HydratedEvent[]>(schemaMap, data);

  return events.events;
}
