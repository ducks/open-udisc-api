import {
  fullyHydrate,
  resolveByIds,
  resolveKeyAndValueNames,
  resolveSchemaMapSchema,
} from '../utils';
import {
  resolveHoles
} from './utils';

import { UDiscUtils } from '../udisc/UDiscUtils';

import { Course, CourseSchemaMap } from './models';
import { SmartLayout } from '../layout/models';
import { SchemaMap } from '../models';

const baseUrl = 'https://udisc.com';

export async function fetchCourses(courseTerm: string): Promise<Course[]> {
  try {
    const res = await fetch(`${baseUrl}/courses.data?limit=5&courseTerm=${courseTerm}`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const text = await res.text();

    const data: unknown[] = UDiscUtils.extractJsonChunks(text).flat();

    const courses = UDiscUtils.extractCourses(data);

    return courses;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchCourse(slug: string): Promise<Course> {
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    const schemaMap: CourseSchemaMap = resolveSchemaMapSchema<CourseSchemaMap>(json, 'routes/courses/$slug/index');

    const course: Course = fullyHydrate<Course>(schemaMap, json);

    return course;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchCourseSmartLayouts(slug: string): Promise<SmartLayout[]> {
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const layouts: SmartLayout[] = [];

    const json = await res.json();

    const schemaMap: CourseSchemaMap = resolveSchemaMapSchema(json, 'routes/courses/$slug/index');

    const smartLayouts: number[] = schemaMap.smartLayouts;

    const smartLayoutsSchema = resolveByIds<SchemaMap>(smartLayouts, json);

    smartLayoutsSchema.forEach((schema) => {
      layouts.push(resolveKeyAndValueNames(schema, json));
    });

    layouts.forEach((layout: SmartLayout) => {
      resolveHoles(layout, json);
    });

    return layouts;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
