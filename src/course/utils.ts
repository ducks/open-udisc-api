import { Course } from './models';
import { resolveKeyAndValueNames, resolveByIds, deepHydrate } from '../utils';
import { SmartHole, SmartLayout } from '../layout/models';
import { SchemaMap } from '../models';

function findCourseResultIndices(data: unknown[]): number[] {
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

export function extractCourses(data: unknown[]): Course[] {
  const schemaIndices = findCourseResultIndices(data);
  const courses: Course[] = [];

  for (const schemaIndex of schemaIndices) {
    const schema = data[schemaIndex] as Record<string, number>;
    if (typeof schema !== 'object' || Array.isArray(schema)) continue;

    const course: Course = {};

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
 * Resolves holes for a smart layout
 */
export function resolveHoles(layout: SmartLayout, data: unknown[]) {
  const holesDecoded: SmartHole[] = [];

  const holes: number[] = layout.holes;

  const holesSchema = resolveByIds<SchemaMap>(holes, data);

  holesSchema.forEach((schema) => {
    const hole: SmartHole = resolveKeyAndValueNames<SmartHole>(schema, data);
    const decodedHole = deepHydrate(hole, data);

    holesDecoded.push(decodedHole);
  });


  layout.holes = holesDecoded;
}
