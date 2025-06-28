import { UDiscUtils } from '../udisc/UDiscUtils';
import { SearchResultCourse, SearchResultEvent } from '../search/models';

export function formatSearchCourses(courses: SearchResultCourse[]): SearchResultCourse[] {
  courses.forEach(course => {
    course.slug = `${UDiscUtils.slugify(course.name)}-${course.shortId}`;
  });

  return courses;
}

export function formatSearchEvents(events: SearchResultEvent[]): SearchResultEvent[] {
  events.forEach((event: SearchResultEvent) => {
    event.slug = `${UDiscUtils.slugify(event.name)}-${event.shortId}`;
  });

  return events;
}
