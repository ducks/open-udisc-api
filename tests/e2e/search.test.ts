import {
  describe,
  expect,
  it,
} from 'vitest';

import { UDiscClient } from '../../src/UDiscClient';

const udisc = new UDiscClient();

describe.skip('search courses e2e test', () => {
  it('returns valid SearchResultCourses', async () => {
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

describe.skip('search events e2e test', () => {
  it('returns valid SearchResultEvents', async () => {

    const events = await udisc.searchEvents('doubles');

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);

    for (const event of events) {
      expect(typeof event._id).toBe('string');
      expect(typeof event.name).toBe('string');
      expect(typeof event.eventType).toBe('string');
      expect(typeof event.shortId).toBe('string');

      expect(event.legacyEventId === null || typeof event.legacyEventId === 'string').toBe(true);
      expect(typeof event.autocompleteScore).toBe('number');

      const loc = event.location;
      expect(typeof loc.id).toBe('string');
      expect(typeof loc.courseId).toBe('string');
      expect(typeof loc.courseName).toBe('string');
      expect(typeof loc.courseShortId).toBe('string');
      expect(typeof loc.locationText).toBe('string');
      expect(typeof loc.locationType).toBe('string');
      expect(loc.type).toBe('Point');
      expect(Array.isArray(loc.coordinates)).toBe(true);
      expect(loc.coordinates.length).toBe(2);
      expect(typeof loc.coordinates[0]).toBe('number');
      expect(typeof loc.coordinates[1]).toBe('number');
    }

  }, 10_000);
});
