import {
  extractJsonChunks,
  fullyHydrate,
  resolveByIds,
  resolveKeyAndValueNames,
  resolveSchemaMapSchema,
  slugify,
} from '../utils';
import {
  extractCourses,
  resolveHoles
} from './utils';

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

    const data: unknown[] = extractJsonChunks(text).flat();

    const courses = extractCourses(data);

    courses.forEach(course => {
      course.slug = `${slugify(course.name)}-${course.shortId}`;
    });

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

    const schemaMap: CourseSchemaMap = resolveSchemaMapSchema(json, 'routes/courses/$slug/index');

    const course: Course = fullyHydrate(schemaMap, json);

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
