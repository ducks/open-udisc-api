import {
  describe,
  expect,
  it,
} from 'vitest';

import json from './mocks/courses/pier-park-GN0G.json';
import { formatCourse } from '../src/formatters/course';

const fullCourse = formatCourse(json);

describe('courseDetails', () => {
  it('has top level fields - id, shortId, name, layoutConfiguration', () => {
    expect(fullCourse.courseDetail._id).toBeDefined();
    expect(fullCourse.courseDetail.shortId).toBeDefined();
    expect(fullCourse.courseDetail.name).toBeDefined();
    expect(fullCourse.courseDetail.layoutConfiguration).toBeDefined();
  });
});

describe('formatCourse', () => {
  it('formats a Course from raw data', () => {
    console.log(fullCourse);
  });
});
