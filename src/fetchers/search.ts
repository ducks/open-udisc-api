import { Place } from '../place/models';
import { SearchResultCourse, SearchResultEvent } from '../search/models';

const baseUrl = 'https://udisc.com';

export async function fetchSearchPlaces(term: string): Promise<Place[]> {
  try {
    if (!term) {
      throw new Error('Search term is required');
    }

    const url = `${baseUrl}/api/places/search?limit=5&term=${term}`;

    const res = await fetch(url);

    const data: Place[] = await res.json();

    return data;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchSearchCourses(term: string): Promise<SearchResultCourse[]> {
  try {
    if (!term) {
      throw new Error('Search term is required');
    }

    const url = `${baseUrl}/api/courses/search?limit=5&term=${term}`;

    const res = await fetch(url);

    const courses: SearchResultCourse[] = await res.json();

    return courses;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchSearchEvents(term: string): Promise<SearchResultEvent[]> {
    try {
      if (!term) {
        throw new Error('Search term is required');
      }

      const url = `${baseUrl}/api/eventListings/search?limit=5&term=${term}`;

      const res = await fetch(url);

      const events: SearchResultEvent[] = await res.json();

      return events;
    } catch (error) {
      console.log('Fetch failed:', error);
      throw new Error(`Fetch failed ${error}`);
    }
  }
