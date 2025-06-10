import { describe, it, expect } from 'vitest';

import { UDiscAPI } from '../src/client';

const udisc = new UDiscAPI();

describe('getCourse', async () => {
  console.log(await udisc.getCourse('pier-park-GN0G'));
});
