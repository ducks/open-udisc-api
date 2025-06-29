import { CourseSchemaMap, HydratedCourse } from '../course/models';
import { FairwaySchemaMapExtractor } from '../fairway/FairwaySchemaMapExtractor';
import { FairwayUtils } from '../fairway/FairwayUtils';

export function formatCourse(data: unknown[]): HydratedCourse {
  const schemaMap: CourseSchemaMap = FairwaySchemaMapExtractor.extract(data, 'routes/courses/$slug/index');

  const course: HydratedCourse = FairwayUtils.hydrateDeep<HydratedCourse>(schemaMap, data);

  return course;
}
