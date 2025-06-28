import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscDataResolver } from '../src/udisc/UDiscDataResolver';

describe('UDiscDataResolver', () => {
  it('resolveKeyValueMap decodes indexed object correctly', () => {

    const raw = ['id', 'value', 'ignored'];
    const schema = {
      testMap: {
        _0: 1,
      }
    };

    const resolver = new UDiscDataResolver(raw, schema);
    const result = resolver.get('testMap');

    expect(result).toEqual({ id: 'value' });
  });
});
