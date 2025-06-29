import { EventQuickFilter } from '../events/models';

const baseUrl = 'https://udisc.com';

export async function fetchEventsData(quickFilter: EventQuickFilter): Promise<unknown[]> {
  try {
    let url = `${baseUrl}/events.data?limit=5`;

    if (quickFilter) {
      url = `${url}&quickFilter=${quickFilter}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const json = await res.json();

    return json;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}
