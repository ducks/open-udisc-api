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

export interface SearchResultEvent {
  /// Unique internal event ID
  _id: string;

  /// Event name as shown in listings
  name: string;

  /// Event type, usually "league" or "tournament"
  eventType: 'league' | 'tournament' | string;

  /// Short public ID used in URLs (e.g. /events/foo-xyz123)
  shortId: string;

  /// Legacy event ID from older systems (nullable)
  legacyEventId: string | null;

  /// Score used by UDisc to rank in autocomplete results
  autocompleteScore: number;

  /// Location metadata for where the event is held
  location: {
    /// Unique location ID
    id: string;

    /// Location type, typically "course"
    locationType: string;

    /// Course ID this event is associated with
    courseId: string;

    /// Full course name
    courseName: string;

    /// Short course ID (used in URLs)
    courseShortId: string;

    /// Human-readable location string (e.g., "Portland, OR")
    locationText: string;

    /// GeoJSON type, typically "Point"
    type: 'Point' | string;

    /// Latitude/longitude coordinates as [lon, lat]
    coordinates: [number, number];
  };

  slug: string;
}
