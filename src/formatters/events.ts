import { EventRoundEntry, HydratedEvent } from '../events/models';
import { FairwaySchemaMapExtractor } from '../fairway/FairwaySchemaMapExtractor';
import { FairwayUtils } from '../fairway/FairwayUtils';

export function formatEvents(data: unknown[]): HydratedEvent[] {
  const schemaMap = FairwaySchemaMapExtractor.extract(data, 'routes/events/index');

  const events: HydratedEvent[] = FairwayUtils.hydrateDeep<HydratedEvent[]>(schemaMap, data);

  return events.events;
}

export function formatEventLeaderboard(data: unknown[]): EventRoundEntry[] {
  const schemaMap = FairwaySchemaMapExtractor.extract(data, 'routes/events/$slug/leaderboard');

  const eventResults: EventRoundEntry[] = FairwayUtils.hydrateDeep<EventRoundEntry[]>(schemaMap, data);

  return eventResults;
}
