export class FairwayDataFetcher {
  constructor(
    private readonly baseUrl: string = 'https://udisc.com/'
  ) {}

  async fetch(url: string): Promise<unknown[]> {
    url = `${this.baseUrl}${url}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch url "${url}": ${res.statusText}`);
    }

    const json = await res.json();

    if (!Array.isArray(json)) {
      throw new Error(`Expected array payload for url "${url}", got: ${typeof json}`);
    }

    return json;
  }
}
