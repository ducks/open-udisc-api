import { describe, it, expect } from 'vitest';
import { FairwaySchemaMapExtractor } from '../src/fairway/FairwaySchemaMapExtractor';

import json from './mocks/courses/pier-park-GN0G.json';

describe('FairwaySchemaMapExtractor', () => {
  it('extracts a schema map from a route key and raw array', () => {

    const schema = FairwaySchemaMapExtractor.extract(json, 'routes/courses/$slug');

    expect(schema).toEqual({
      slug: 'pier-park-GN0G',
      course: {
        _69: 70,
        _71: 72,
        _73: 74,
        _75: 76,
        _77: 78,
        _79: 80,
        _81: 82,
        _83: 84,
        _85: 86,
        _87: 88,
        _89: 21,
        _90: 91,
        _92: 93,
        _94: 95,
        _96: 97,
        _98: 99,
        _100: 101,
        _102: 103,
        _104: 103,
        _105: 103,
        _106: 103,
        _107: 108,
        _109: 110,
        _117: 118,
        _119: 120,
        _138: 7,
        _139: -5
      },
      isUserAmbassador: false,
      playCount: 0,
      courseUserStatus: undefined
    });
  });

  it('throws if the route key is not found', () => {
    const raw = ['some', 'other', 'keys'];

    expect(() =>
      FairwaySchemaMapExtractor.extract(raw, 'routes/courses/$slug')
    ).toThrow('Could not resolve schema map schema for route routes/courses/$slug');
  });

  it('throws if the schema object is not valid', () => {
    const raw = ['routes/courses/$slug', 'not an object'];

    expect(() =>
      FairwaySchemaMapExtractor.extract(raw, 'routes/courses/$slug')
    ).toThrow('Could not resolve schema map schema for route routes/courses/$slug');
  });
});

