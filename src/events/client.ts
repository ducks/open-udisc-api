import { Event } from './models';
import {
    deepHydrate,
  resolveKeyAndValueNames,
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

    const eventSchema: SchemaMap = schemaMap.eventListing;

    const event: Event = resolveKeyAndValueNames<Event>(eventSchema, json);

    const e: Event = deepHydrate(event, json);

    //console.log(e);

    return e;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
