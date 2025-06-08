import { Event } from './models';
import {
  deepHydrate,
  resolveSchemaMapSchema
} from '../utils';
import { SchemaMap } from '../models';


const baseUrl = 'https://udisc.com';

export async function fetchEvent(slug: string): Promise<Event> {
  try {
    const res = await fetch(`${baseUrl}/events/${slug}/about.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    const schemaMap: SchemaMap = resolveSchemaMapSchema(json, 'routes/events/$slug');

    const e: Event = deepHydrate(schemaMap, json);

    return e;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchEventSchedule(slug: string): Promise<Event> {
  try {
    const res = await fetch(`${baseUrl}/events/${slug}/schedule.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    const schemaMap: SchemaMap = resolveSchemaMapSchema(json, 'routes/events/$slug/schedule');

    const schedule = deepHydrate(schemaMap, json);

    return schedule;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
