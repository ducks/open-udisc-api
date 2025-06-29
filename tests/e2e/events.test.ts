import {
  describe,
  expect,
  it,
} from 'vitest';

import { FairwayClient } from '../../src/FairwayClient';
import { EventQuickFilter } from '../../src/events/models';

const fairway = new FairwayClient();

describe.skip('getEvents e2e test', () => {
  it('gets all events', async () => {
    const events = await fairway.getEvents(EventQuickFilter.All);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('gets league events', async () => {
    const events = await fairway.getEvents(EventQuickFilter.League);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(event).toHaveProperty('eventType', 'league');
    }
  });

  it('gets tournament events', async () => {
    const events = await fairway.getEvents(EventQuickFilter.Tournament);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(event).toHaveProperty('eventType', 'tournament');
    }
  });
});

describe.skip('getEventLeaderboard e2e test', () => {
  it('gets event results', async () => {
    const eventResults = await fairway.getEventLeaderboard(
      'prickly-pines-course-tags-prickly-pines-course-tags-xARh2n'
    );

    console.log(eventResults);
  });
});
