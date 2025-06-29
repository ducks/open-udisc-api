import { fetchCourseData } from './fetchers/courses';
import { Course, HydratedCourse } from './course/models';

// Models
import { EventQuickFilter } from './events/models';
import { HydratedEvent } from './events/models';

// Fetchers
import { fetchCoursesData } from './fetchers/courses';
import { fetchSearchCourses, fetchSearchEvents } from './fetchers/search';
import { fetchEventsData } from './fetchers/events';

// Formatters
import { formatSearchCourses, formatSearchEvents } from './formatters/search';
import { SearchResultCourse, SearchResultEvent } from './search/models';
import { formatCourse } from './formatters/course';
import { formatEvents } from './formatters/events';

import { UDiscUtils } from './udisc/UDiscUtils';

export class UDiscClient {
  // Courses
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

  // Search
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

  // Events
  async getEvents(quickFilter: EventQuickFilter): Promise<HydratedEvent[]> {
    const data = await fetchEventsData(quickFilter);

    const events = formatEvents(data);

    return events;
  }
}
