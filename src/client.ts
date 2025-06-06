import {
  fetchCourseDetails,
  fetchCourses,
  fetchCourseSmartLayouts,
} from './course/client';

import { slugify } from './utils';

export class UDiscAPI {
  private readonly baseUrl = 'https://udisc.com';

  async getCourses(courseTerm: string): Promise<any[]> {
    fetchCourses(courseTerm);
  }

  async getCourseDetails(slug: string): Promise<any[]> {
    if (!slug) {
      throw new Error('Course slug is required');
    }

    fetchCourseDetails(slug);
  }

  async getCourseSmartLayouts(slug: string): Promise<any[]> {
    if (!slug) {
      throw new Error('Course slug is required');
    }

    fetchCourseSmartLayouts(slug);
  }

  async searchPlaces(term: string): Promise<any[]> {
    try {
      if (!term) {
        throw new Error('Search term is required');
      }

      const url = `${this.baseUrl}/api/places/search?limit=5&term=${term}`;

      const res = await fetch(url);

      const data: any[] = await res.json();

      return data;
    } catch (error) {
      console.log('Fetch failed:', error);
      throw new Error(`Fetch failed ${error}`);
    }
  }

  async searchCourses(term?: string): Promise<any[]> {
    try {
      if (!term) {
        throw new Error('Search term is required');
      }

      const url = `${this.baseUrl}/api/courses/search?limit=5&term=${term}`;

      const res = await fetch(url);

      const courses: any[] = await res.json();

      courses.forEach(course => {
        course.slug = `${slugify(course.name)}-${course.shortId}`;
      });

      return courses;
    } catch (error) {
      console.log('Fetch failed:', error);
      throw new Error(`Fetch failed ${error}`);
    }
  }
}
