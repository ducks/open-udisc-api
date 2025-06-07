import {
  extractJsonChunks,
  resolveByIds,
  resolveKeyAndValueNames,
  slugify,
} from '../utils';
import {
  extractCourses,
  resolveCourseSchemaMapSchema,
} from './utils';

import { Course, CourseDetails, CourseSchemaMap } from './models';
import { SmartHole, SmartLayout } from '../layout/models';
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

export async function fetchCourseDetails(slug: string): Promise<CourseDetails> {
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    const schemaMap: CourseSchemaMap = resolveCourseSchemaMapSchema(json);

    const courseDetailsSchema: SchemaMap = schemaMap.courseDetail;

    const courseDetails: CourseDetails = resolveKeyAndValueNames<CourseDetails>(courseDetailsSchema, json);

    return courseDetails;
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

    const schemaMap: CourseSchemaMap = resolveCourseSchemaMapSchema(json);

    const smartLayouts: number[] = schemaMap.smartLayouts;

    const smartLayoutsSchema = resolveByIds<SchemaMap>(smartLayouts, json);

    smartLayoutsSchema.forEach((schema) => {
      layouts.push(resolveKeyAndValueNames(schema, json));
    });

    layouts.forEach((layout: SmartLayout) => {
      const holesDecoded: SmartHole[] = [];

      const holes: number[] = layout.holes;

      const holesSchema = resolveByIds<SchemaMap>(holes, json);

      holesSchema.forEach((schema) => {
        holesDecoded.push(resolveKeyAndValueNames(schema, json));
      });

      layout.holes = holesDecoded;
    });

    console.log(layouts);

    return layouts;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
