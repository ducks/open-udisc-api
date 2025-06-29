import { FairwayUtils } from '../fairway/FairwayUtils';
import { SearchResultCourse, SearchResultEvent } from '../search/models';

export function formatSearchCourses(courses: SearchResultCourse[]): SearchResultCourse[] {
  courses.forEach(course => {
    course.slug = `${FairwayUtils.slugify(course.name)}-${course.shortId}`;
  });

  return courses;
}

export function formatSearchEvents(events: SearchResultEvent[]): SearchResultEvent[] {
  events.forEach((event: SearchResultEvent) => {
    event.slug = `${FairwayUtils.slugify(event.name)}-${event.shortId}`;
  });

  return events;
}
