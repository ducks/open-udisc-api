import { CourseSchemaMap, HydratedCourse } from '../course/models';
import { UDiscSchemaMapExtractor } from '../udisc/UDiscSchemaMapExtractor';
import { UDiscUtils } from '../udisc/UDiscUtils';

export function formatCourse(data: unknown[]): HydratedCourse {
  const schemaMap: CourseSchemaMap = UDiscSchemaMapExtractor.extract(data, 'routes/courses/$slug/index');

  const course: HydratedCourse = UDiscUtils.hydrateDeep<HydratedCourse>(schemaMap, data);

  return course;
}
