import {
  describe,
  expect,
  it,
} from 'vitest';

import { formatEvents } from '../src/formatters/events';

import { FairwaySchemaMapExtractor } from '../src/fairway/FairwaySchemaMapExtractor';

import json from './mocks/events/events-all.json';

import prickly from './mocks/leagues/prickly-pines-course-tags-prickly-pines-course-tags-xARh2n.json';
import { FairwayUtils } from '../src/fairway/FairwayUtils';

const schema = FairwaySchemaMapExtractor.extract(prickly, 'routes/events/$slug/leaderboard');

const leaderboard = FairwayUtils.hydrateDeep(schema, prickly);

const events = formatEvents(json);

describe('getEvents', () => {
  it('has eventListing-like objects', () => {
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(event).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          eventType: expect.any(String),
          name: expect.any(String),
          shortId: expect.any(String),
          startDate: expect.any(String),
          endDate: expect.any(String),
          location: expect.any(Object),
          locations: expect.any(Array),
          daysOfWeek: expect.any(Array),
          distance: expect.any(Number),
        })
      );
    }
  });
});

describe('getEventLeaderboard($slug)', () => {
  it('gets round entry results', () => {
    const entries = leaderboard.roundEntryResults;

    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);

    //leaderboard.roundEntryResults.forEach(round => {
    //  console.dir(round, { depth: null, colors: true });
    //});
  });
});
