export interface SearchResultPlace {
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

export interface SearchResultCourse {
  _id: string;
  name: string;
  locationText: string;
  courseId: number;
  shortId: string;
  ratingAverage: number;
  ratingCount: number;
  highlights: Record<string, unknown>[]; // or more specific if you ever decode it
  searchScore: number;
  autocompleteScore: number;
  slug: string;
}

export enum QuickFilter {
  League = 'league',
}
