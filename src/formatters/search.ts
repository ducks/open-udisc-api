import { UDiscUtils } from '../udisc/UDiscUtils';
import { SearchResultCourse } from '../search/models';

export function formatSearchCourses(courses: SearchResultCourse[]): SearchResultCourse[] {
  courses.forEach(course => {
    course.slug = `${UDiscUtils.slugify(course.name)}-${course.shortId}`;
  });

  return courses;
}
