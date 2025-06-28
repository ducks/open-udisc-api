import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscUtils } from '../src/udisc/UDiscUtils';
import { formatSearchCourses } from '../src/formatters/search';

import mockCourses from './mocks/search/search-milo.json';
import { SearchResultCourse } from '../src/search/models';

const courses: SearchResultCourse[] = formatSearchCourses(mockCourses);

describe('searchCourses', () => {
  it('includes slugified name and shortId', () => {
    for (const course of courses) {
      const expectedSlug = `${UDiscUtils.slugify(course.name)}-${course.shortId}`;

      expect(course.slug).toBe(expectedSlug);
    }
  });
});
