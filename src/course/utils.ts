import { Course } from './models';
import { resolveKeyAndValueNames, resolveByIds, deepHydrate } from '../utils';
import { SmartHole } from '../layout/models';

function findCourseResultIndices(data: any[]): number[] {
  for (let i = 0; i < data.length; i++) {
    if (
      Array.isArray(data[i]) &&
      data[i].every((v: unknown) => typeof v === 'number') &&
      data[i - 1] === 'courseResults'
    ) {
      return data[i];
    }
  }
  throw new Error('Could not find courseResults array');
}

export function extractCourses(data: any[]): any[] {
  const schemaIndices = findCourseResultIndices(data);
  const courses: Course[] = [];

  for (const schemaIndex of schemaIndices) {
    const schema = data[schemaIndex] as Record<string, number>;
    if (typeof schema !== 'object' || Array.isArray(schema)) continue;

    const course: any = {};

    for (const [rawFieldKey, valueIndex] of Object.entries(schema)) {
      const fieldKeyIndex = parseInt(rawFieldKey.replace(/^_/, ''), 10);
      const fieldName = data[fieldKeyIndex];
      const value = data[valueIndex];

      if (typeof fieldName === 'string') {
        course[fieldName] = value;
      }
    }

    courses.push(course);
  }

  return courses;
}

/**
 * Resolves a schema map of schema maps for a Course
 */
export function resolveCourseSchemaMapSchema<T>(data: unknown[]): T {
  for (let i = 0; i < data.length - 2; i++) {
    const label = data[i];
    const pointerMap = data[i + 1] as Record<string, number>;
    const schemaMap = data[i + 2];

    if (
      label === 'routes/courses/$slug/index' &&
      typeof pointerMap === 'object' &&
      typeof schemaMap === 'object' &&
      Object.keys(pointerMap).length === 1
    ) {
      const pointerIndex = Object.values(pointerMap)[0];
      const referencedMap = data[pointerIndex];

      if (referencedMap && typeof referencedMap === 'object') {
        return resolveKeyAndValueNames<T>(referencedMap, data);
      }
    }
  }

  throw new Error('Could not resolve schema map schema for course');
}

/**
 * Resolves holes for a smart layout
 */
export function resolveHoles(layout, data) {
  const holesDecoded: SmartHole[] = [];

  const holes: number[] = layout.holes;

  const holesSchema = resolveByIds(holes, data);

  holesSchema.forEach((schema) => {
    const hole = resolveKeyAndValueNames(schema, data);
    const decodedHole = deepHydrate(hole, data);

    holesDecoded.push(decodedHole);
  });


  layout.holes = holesDecoded;
}
