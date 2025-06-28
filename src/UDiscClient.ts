import { fetchCourseData } from './fetchers/courses';
import { Course, HydratedCourse } from './course/models';

// Fetchers
import { fetchCoursesData } from './fetchers/courses';
import { fetchSearchCourses, fetchSearchEvents } from './fetchers/search';
import { formatCourse } from './formatters/course';

// Formatters
import { formatSearchCourses, formatSearchEvents } from './formatters/search';
import { SearchResultCourse, SearchResultEvent } from './search/models';

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

  async searchEvents(query: string): Promise<SearchResultEvent[]> {
    const data: SearchResultEvent[] = await fetchSearchEvents(query);

    const events = formatSearchEvents(data);

    return events;
  }
}
