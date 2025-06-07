export interface Event {
  /// Unique internal ID
  id: string;

  /// Type of the event, e.g., "tournament" or "league"
  type: string;

  /// Full display name of the event
  name: string;

  /// Short slug/identifier used in URLs
  shortId?: string;

  /// Event start date in YYYY-MM-DD format
  startDate: string;

  /// Event end date, if available
  endDate?: string;

  /// Location info including course and coordinates
  location: EventLocation;

  /// Optional PDGA tournament info
  pdgaTournamentId?: number;
  pdgaEventUrl?: string;
  tiers?: string[];
  requirePdgaNumber?: boolean;

  /// Optional cover images
  coverPhotoUrl?: string;
  croppedCoverPhotoUrl?: string;
  coverPhotoThumbnailUrl?: string;

  /// Optional distance metric (likely in miles or km)
  distance?: number;

  /// Optional update timestamps
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  slug: string;
}

export interface EventDescription {
  /// UDisc internal unique event ID
  _id: string;

  /// Short slug/identifier for the event
  shortId: string;

  /// Type of event (e.g., "league", "tournament")
  eventType: string;

  /// Associated league ID, if it's a league event
  leagueId?: string;

  /// Legacy identifier, may be undefined
  legacyEventId?: string;

  /// Staff IDs or user references (by index)
  staff?: number[];

  /// Event name
  name: string;

  /// IANA timezone string for local time
  timezone: string;

  /// Cover image URL
  coverPhotoUrl?: string;

  /// Optional logo images
  logoUrl?: string;
  logoThumbnailUrl?: string;

  /// Event date range
  startDate: string;
  endDate?: string;

  /// Day(s) of the week the event occurs (likely numeric indices)
  daysOfWeek?: number[];

  /// Whether the event uses simplified league rules
  isSimpleLeagueEvent?: boolean;

  /// Raw approval object, needs further hydration
  approval?: Record<string, number>;

  /// Raw location schema map
  location: Record<string, number>;

  /// List of location references (by index)
  locations?: number[];

  /// Scoring configuration schema map
  scoring?: Record<string, number>;

  /// Registration settings schema map
  registration?: Record<string, number>;

  /// Placeholder for undefined pdga data
  pdgaTournament?: boolean;

  /// If the event was canceled, the date it occurred
  canceledAt?: boolean;
}


export interface EventLocation {
  /// Location ID
  id: string;

  /// Full location string (e.g., "Denver, CO")
  locationText: string;

  /// Coordinates as [longitude, latitude]
  coordinates: [number, number];

  /// Type of location, typically "course"
  locationType: string;

  /// UDisc internal course ID
  courseId?: string;

  /// Short course slug
  courseShortId?: string;

  /// Course name, if available
  courseName?: string;
}
