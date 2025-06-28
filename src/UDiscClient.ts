import { fetchCourseData } from './fetchers/courses';
import { Course, HydratedCourse } from './course/models';

// Fetchers
import { fetchCoursesData } from './fetchers/courses';
import { fetchSearchCourses } from './fetchers/search';
import { formatCourse } from './formatters/course';

// Formatters
import { formatSearchCourses } from './formatters/search';
import { SearchResultCourse } from './search/models';

import { UDiscUtils } from './udisc/UDiscUtils';

export class UDiscClient {
  async getCourses(): Promise<Course[]> {
    const rawData = await fetchCoursesData();
    const json: unknown[] = UDiscUtils.extractJsonChunks(rawData).flat();

    const courses = UDiscUtils.extractCourses(json);

    return courses;
  }

  async getCourse(slug: string): Promise<HydratedCourse> {
    if (!slug) {
      throw new Error('Course slug is required');
    }

    const data: unknown[] = await fetchCourseData(slug);

    const course: HydratedCourse = formatCourse(data);

    return course;
  }

  async searchCourses(query: string): Promise<SearchResultCourse[]> {
    const data: SearchResultCourse[] = await fetchSearchCourses(query);

    const courses = formatSearchCourses(data);

    return courses;
  }
}
