import {
  fetchCourse,
  fetchCourses,
  fetchCourseSmartLayouts,
} from './course/client';

import { slugify } from './utils';

import { Place } from './place/models';
import { Course } from './course/models';
import { Event, EventParticipant } from './events/models';
import {
  fetchEvent,
  fetchEventSchedule,
  fetchEventParticipants
} from './events/client';

export class UDiscAPI {
  private readonly baseUrl = 'https://udisc.com';

  async getCourses(courseTerm: string): Promise<Course[]> {
    return fetchCourses(courseTerm);
  }

  async getCourse(slug: string): Promise<Course> {
    if (!slug) {
      throw new Error('Course slug is required');
    }

    return fetchCourse(slug);
  }

  async getCourseSmartLayouts(slug: string): Promise<any[]> {
    if (!slug) {
      throw new Error('Course slug is required');
    }

    return fetchCourseSmartLayouts(slug);
  }

  async getEvent(slug: string): Promise<Event> {
    if (!slug) {
      throw new Error('Event slug is required');
    }

    return fetchEvent(slug);
  }

  async getEventSchedule(slug: string): Promise<Event> {
    if (!slug) {
      throw new Error('Event slug is required');
    }

    return fetchEventSchedule(slug);
  }

  async getEventParticipants(slug: string): Promise<EventParticipant> {
    if (!slug) {
      throw new Error('Event slug is required');
    }

    return fetchEventParticipants(slug);
  }

  async searchPlaces(term: string): Promise<Place[]> {
    try {
      if (!term) {
        throw new Error('Search term is required');
      }

      const url = `${this.baseUrl}/api/places/search?limit=5&term=${term}`;

      const res = await fetch(url);

      const data: Place[] = await res.json();

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

  async searchEvents(term: string): Promise<Event[]> {
    try {
      if (!term) {
        throw new Error('Search term is required');
      }

      const url = `${this.baseUrl}/api/eventListings/search?limit=5&term=${term}`;

      const res = await fetch(url);

      const events: Event[] = await res.json();

      events.forEach((event: Event) => {
        event.slug = `${slugify(event.name)}-${event.shortId}`;
      });

      return events;
    } catch (error) {
      console.log('Fetch failed:', error);
      throw new Error(`Fetch failed ${error}`);
    }
  }
}
