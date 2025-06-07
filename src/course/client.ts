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

import { CourseDetails } from './models';

const baseUrl = 'https://udisc.com';

export async function fetchCourses(courseTerm: string) {
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

    const schemaMap: Record<string, unknown> = resolveCourseSchemaMapSchema(json);

    const courseDetailsSchema: Record<string, number> = schemaMap.courseDetail;

    console.log(courseDetailsSchema);

    const courseDetails: CourseDetails = resolveKeyAndValueNames<CourseDetails>(courseDetailsSchema, json);

    return courseDetails;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchCourseSmartLayouts(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const layouts: any[] = [];

    const json = await res.json();

    const schemaMap = resolveCourseSchemaMapSchema(json);

    const smartLayoutsSchema = resolveByIds(schemaMap.smartLayouts, json);

    smartLayoutsSchema.forEach((schema: any) => {
      layouts.push(resolveKeyAndValueNames(schema, json));
    });

    layouts.forEach(layout => {
      const holesDecoded: any[] = [];

      const holesSchema = resolveByIds(layout.holes, json);

      holesSchema.forEach((schema: any) => {
        holesDecoded.push(resolveKeyAndValueNames(schema, json));
      });

      layout.holes = holesDecoded;
    });

    return layouts;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
