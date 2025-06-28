import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscSchemaMapExtractor } from '../src/udisc/UDiscSchemaMapExtractor';
import { UDiscUtils } from '../src/udisc/UDiscUtils';

import json from './mocks/events/events-all.json';

const schema = UDiscSchemaMapExtractor.extract(json, 'routes/events/index');

const { events } = UDiscUtils.hydrateDeep(schema, json);

describe('events', () => {
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
