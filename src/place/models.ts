export interface Place {
  _id: string;
  type: string;
  slug: string;
  name: string;
  country?: string;
  countryCode?: string;
  admin1?: string;
  city?: string;
  location?: [number, number];
  score?: number;
  fullLocationText?: string;
  highlights?: unknown[];
  autocompleteScore?: number;
}
