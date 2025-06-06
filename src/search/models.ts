export interface _Place {
  _id: string;
  name: string;
  type: string;
  slug: string;
  country: string;
  countryCode: string;
  admin1?: string;
  city?: string;
  fullLocationText: string;
  location: number[]; // [lng, lat]
  score: number;
  autocompleteScore: number;
}
