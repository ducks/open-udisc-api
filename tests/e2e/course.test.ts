import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscClient } from '../../src/UDiscClient';

const udisc = new UDiscClient();

describe('getCourse e2e test', () => {
  it('returns valid Course', async () => {
    const mapleHill = await udisc.getCourse('maple-hill-lCej');

    console.log(mapleHill);
  });
});
