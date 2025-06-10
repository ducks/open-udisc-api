import { describe, it, expect } from 'vitest';

import { resolveCourseSchemaMapSchema, resolveHoles } from '../src/course/utils';

import mockCourse from './mocks/courses/course-maple-hill.json';
import mockLeaderboard from './mocks/courses/evergreen-leaderboard.json';

import { SchemaMap } from '../src/models';
import { deepHydrate, fullyHydrate, resolveByIds, resolveKeyAndValueNames } from '../src/utils';

import { SmartLayout, SmartHole } from '../src/layout/models';

const courseSchemaMap: SchemaMap = resolveCourseSchemaMapSchema(mockCourse);
const course = deepHydrate(courseSchemaMap, mockCourse);

const smartLayoutsSchema = resolveByIds(course.smartLayouts, mockCourse);

const smartLayouts: SmartLayout[] = smartLayoutsSchema.map(schema =>
  resolveKeyAndValueNames(schema, mockCourse)
);

smartLayouts.forEach(layout => {
  resolveHoles(layout, mockCourse);
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

  it('has layout names and holes with pars', () => {
    smartLayouts.forEach(layout => {
      expect(layout.name).toBeDefined();
      expect(Array.isArray(layout.holes)).toBe(true);

      layout.holes.forEach(hole => {
        expect(typeof hole.par).toBe('number');
        expect(hole.par).toBeGreaterThan(1);
      });
    });
  });
});

describe('smartHole exploration', () => {
  it('has tee and target positions', () => {
    smartLayouts.forEach(layout => {
      layout.holes.forEach(hole => {
        expect(hole.teePosition).toBeDefined();
        expect(hole.targetPosition).toBeDefined();
      });
    });
  });

  it('has target name and manufacturer', () => {
    smartLayouts.forEach(layout => {
      layout.holes.forEach(hole => {
        const target = resolveKeyAndValueNames(hole.targetPosition.targetType, mockCourse);
        const model = resolveKeyAndValueNames(target.basketModel, mockCourse);
        expect(model.basketModelId).toBeDefined();
        expect(model.name).toBeDefined();
        expect(model.manufacturer).toBeDefined();
      });
    });
  });
});
