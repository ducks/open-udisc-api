import {
  describe,
  expect,
  it,
} from 'vitest';

import { FairwayUtils } from '../src/fairway/FairwayUtils';
import { formatSearchCourses, formatSearchEvents } from '../src/formatters/search';

import mockCourses from './mocks/search/search-milo.json';
import { SearchResultCourse, SearchResultEvent } from '../src/search/models';

import mockEvents from './mocks/search/search-doubles-events.json';

const courses: SearchResultCourse[] = formatSearchCourses(mockCourses);

const events: SearchResultEvent[] = formatSearchEvents(mockEvents);

describe('searchCourses', () => {
  it('includes slugified name and shortId', () => {
    for (const course of courses) {
      const expectedSlug = `${FairwayUtils.slugify(course.name)}-${course.shortId}`;

      expect(course.slug).toBe(expectedSlug);
    }
  });
});

describe('searchEvents', () => {
  it('includes slugified name and shortId', () => {
    for (const event of events) {
      const expectedSlug = `${FairwayUtils.slugify(event.name)}-${event.shortId}`;

      expect(event.slug).toBe(expectedSlug);
    }
  });
});
