import { readFileSync } from 'fs';

import {
  describe,
  expect,
  it,
} from 'vitest';

import { FairwayUtils } from '../src/fairway/FairwayUtils';

const brokenJson = readFileSync('./tests/mocks/courses/courses.json', 'utf-8');

const json: unknown[] = FairwayUtils.extractJsonChunks(brokenJson).flat();

const courses = FairwayUtils.extractCourses(json);

describe('courses', () => {
 it('contains valid course-like objects', () => {
    for (const course of courses) {
      expect(course).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          holeCount: expect.any(Number),
          shortId: expect.any(String),
        })
      );
    }
  });

  it('has unique course IDs', () => {
    const ids = courses.map((c) => c.courseId);
    const unique = new Set(ids);

    expect(unique.size).toBe(ids.length);
  });

  it('includes slugified name and shortId', () => {
    for (const course of courses) {
      const expectedSlug = `${FairwayUtils.slugify(course.name)}-${course.shortId}`;

      expect(course.slug).toBe(expectedSlug);
    }
  });
});
