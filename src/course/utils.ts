import { Course } from './models';
import { resolveKeyAndValueNames } from '../utils';


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
 * Searches for the schema map schema given a route key
 * Then resolves the schema object it points to.
 */
export function resolveCourseSchemaMapSchema(data: any[], routeKey = 'routes/courses/$slug/index') {
  for (let i = 0; i < data.length - 2; i++) {
    const label = data[i];
    const pointerMap = data[i + 1];
    const schemaMap = data[i + 2];

    if (
      label === routeKey &&
      typeof pointerMap === 'object' &&
      typeof schemaMap === 'object' &&
      Object.keys(pointerMap).length === 1
    ) {
      const pointerIndex = Object.values(pointerMap)[0];
      const referencedMap = data[pointerIndex];

      if (typeof referencedMap === 'object') {
        return resolveKeyAndValueNames(referencedMap, data);
      }
    }
  }

  throw new Error(`Could not resolve schema map schema for route ${routeKey}`);
}
