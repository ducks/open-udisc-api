const baseUrl = 'https://udisc.com';

export async function fetchCoursesData(): Promise<string> {
  try {
    const res = await fetch(`${baseUrl}/courses.data?limit=5`);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const text = await res.text();

    return text;
  } catch (error) {
    console.log('Fetch failed:', error);
    throw new Error(`Fetch failed ${error}`);
  }
}

export async function fetchCourseData(slug: string): Promise<unknown[]> {
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}.data`);

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
