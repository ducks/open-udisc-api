import { describe, it, expect } from 'vitest';

import { resolveCourseSchemaMapSchema } from '../src/course/utils';

import mockCourse from './mocks/courses/course-maple-hill.json';

function isArrayOfNumbers(value: unknown): boolean {
  return Array.isArray(value) && value.every(v => typeof v === 'number');
}

describe('resolveCourseSchemaMapSchema', () => {
  it('resolves a course schema map into index-value map', () => {
    const schemaMap = resolveCourseSchemaMapSchema(mockCourse);

    expect(typeof schemaMap).toBe('object');
  });

  it('should contain arrays of numeric IDs', () => {
    const idArrays = [
      'badges',
      'classicLayouts',
      'events',
      'photos',
      'smartLayouts',
      'nearbyCourses',
      'nearbyStores',
    ];

    const schemaMap = resolveCourseSchemaMapSchema(mockCourse);

    for (const key of idArrays) {
      expect(Array.isArray(schemaMap[key])).toBe(true);
      expect(isArrayOfNumbers(schemaMap[key])).toBe(true);
    }
  });
});
