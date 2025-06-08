import { describe, it, expect } from 'vitest';

import { resolveCourseSchemaMapSchema } from '../src/course/utils';

import mockCourse from './mocks/courses/course-maple-hill.json';

import { SchemaMap } from '../src/models';
import { deepHydrate, resolveByIds, resolveKeyAndValueNames } from '../src/utils';

import { SmartLayout } from '../src/layout/models';

const schemaMap: SchemaMap = resolveCourseSchemaMapSchema(mockCourse);
const course = deepHydrate(schemaMap, mockCourse);

const smartLayoutsSchema = resolveByIds(course.smartLayouts, mockCourse);

const smartLayouts: SmartLayout[] = [];

smartLayoutsSchema.forEach(schema => {
  smartLayouts.push(resolveKeyAndValueNames(schema, mockCourse));
});

function isArrayOfNumbers(value: unknown): boolean {
  return Array.isArray(value) && value.every(v => typeof v === 'number');
}

describe('course exploration', () => {
  it('should contain courseDetail', () => {
    expect(course.courseDetail).toBeDefined();
  });

  it('should contain layouts', () => {
    expect(course.smartLayouts || course.classicLayouts).toBeDefined();
  });
});

describe('smartLayouts exploration', () => {
  it('returns smartLayouts IDs', () => {
    expect(Array.isArray(course.smartLayouts)).toBe(true);
    expect(isArrayOfNumbers(course.smartLayouts)).toBe(true);
  });

  it('resolves smartLayouts IDs', () => {
    expect(Array.isArray(smartLayoutsSchema)).toBe(true);
  });

  it('returns smartLayouts data', () => {
    expect(Array.isArray(smartLayouts)).toBe(true);
    expect(smartLayouts.length).toBeGreaterThan(0);
    expect(typeof smartLayouts[0]).toBe('object');
    expect(smartLayouts[0]).not.toBeNull();
  });

  it('should contain holes', () => {
    smartLayouts.forEach(layout => {
      expect(layout.holes).toBeDefined();
    });
  });
});
