import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscClient } from '../../src/UDiscClient';
import { EventQuickFilter } from '../../src/events/models';

const udisc = new UDiscClient();

describe('getEvents e2e test', () => {
  it('gets all events', async () => {
    const events = await udisc.getEvents(EventQuickFilter.All);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('gets league events', async () => {
    const events = await udisc.getEvents(EventQuickFilter.League);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(event).toHaveProperty('eventType', 'league');
    }
  });

  it('gets tournament events', async () => {
    const events = await udisc.getEvents(EventQuickFilter.Tournament);

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(event).toHaveProperty('eventType', 'tournament');
    }
  });
});
