import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscClient } from '../../src/UDiscClient';

const udisc = new UDiscClient();

describe('search courses e2e test', () => {
  it('returns valid SearchCourseResults', async () => {
    const courses = await udisc.searchCourses('hornet');

    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);

    for (const course of courses) {
      // Required fields
      expect(typeof course._id).toBe('string');
      expect(typeof course.name).toBe('string');
      expect(typeof course.locationText).toBe('string');
      expect(typeof course.courseId).toBe('number');
      expect(typeof course.shortId).toBe('string');
      expect(typeof course.slug).toBe('string');

      expect(Array.isArray(course.highlights)).toBe(true);

      // Optional fields
      if ('ratingAverage' in course) {
        expect(typeof course.ratingAverage).toBe('number');
      }

      if ('ratingCount' in course) {
        expect(typeof course.ratingCount).toBe('number');
      }

      if ('searchScore' in course) {
        expect(typeof course.searchScore).toBe('number');
      }

      if ('autocompleteScore' in course) {
        expect(typeof course.autocompleteScore).toBe('number');
      }
    }
  });
});
