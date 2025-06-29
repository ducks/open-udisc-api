import {
  describe,
  expect,
  it,
} from 'vitest';

import { FairwayDataResolver } from '../src/fairway/FairwayDataResolver';

describe('FairwayDataResolver', () => {
  it('resolveKeyValueMap decodes indexed object correctly', () => {

    const raw = ['id', 'value', 'ignored'];
    const schema = {
      testMap: {
        _0: 1,
      }
    };

    const resolver = new FairwayDataResolver(raw, schema);
    const result = resolver.get('testMap');

    expect(result).toEqual({ id: 'value' });
  });
});
