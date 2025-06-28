import { describe, it, expect } from 'vitest';

import mockLeague from './mocks/leagues/default-leagues.json';
import mockLeaderboard from './mocks/leagues/leaderboard-w-scores.json';

import { SchemaMap } from '../src/models';
import {
  deepHydrate,
  resolveByIds,
  resolveSchemaMapSchema,
} from '../src/utils';


import { UDiscSchemaMap } from '../src/udisc/UDiscSchemaMap';
import { UDiscIndexHydrator } from '../src/udisc/UDiscIndexHydrator';
import { UDiscDataResolver } from '../src/udisc/UDiscDataResolver';

import { UDiscAPI } from '../src/index';

const udisc = new UDiscAPI();

const leaderboardSchemaMap: SchemaMap = UDiscSchemaMap.extract(
  mockLeaderboard,
  'routes/events/$slug/leaderboard'
);

const leaderboardResolver = new UDiscDataResolver(mockLeaderboard, leaderboardSchemaMap);

console.log(leaderboardSchemaMap);
//console.log(leaderboardResolver.resolveKeyValueMap('layout'));
console.log(leaderboardResolver.resolveByIds('rounds'));
const leaguesSchemaMap: SchemaMap = resolveSchemaMapSchema(mockLeague, 'routes/events/index');
const leagues = deepHydrate(leaguesSchemaMap, mockLeague);

const events = resolveByIds(leagues.events, mockLeague);

console.log(leaderboard);
// console.log(resolveKeyAndValueNames(leaderboard.eventListing.scoring, mockLeaderboard));
const rounds = resolveByIds(leaderboard.eventRounds, mockLeaderboard);

rounds.forEach(round => {
  // console.log(resolveKeyAndValueNames(round, mockLeaderboard));
});

describe('league exploration', async () => {

  it('lists leagues by ID', () => {
    expect(leagues.leaguesById).toBeDefined();
  });

  it('has league events', () => {
    expect(leagues.events).toBeDefined();
  });

  it('tests the actual endpoint', async () => {

     // await udisc.searchPastLeagueEvents();
  });


});
