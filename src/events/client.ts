import { Event, EventParticipant } from './models';
import {
  deepHydrate,
  resolveByIds,
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

    const event: Event = deepHydrate(schemaMap, json);

    console.log(event);

    return event;
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

export async function fetchEventParticipants(slug: string): Promise<EventParticipant[]> {
  try {
    const res = await fetch(`${baseUrl}/events/${slug}/participants.data`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    const schemaMap: SchemaMap = resolveSchemaMapSchema(json, 'routes/events/$slug/participants');

    const event = deepHydrate(schemaMap, json);

    const registrants = resolveByIds(event.confirmedUserRegistrants, json);

    const participants: EventParticipant[] = [];

    registrants.forEach(registrant => {
      participants.push(resolveKeyAndValueNames(registrant, json));
    });

    return participants;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
