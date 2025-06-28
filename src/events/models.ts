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

export interface EventParticipant {
  /// Unique ID for this event registration
  _id: string;

  /// Username of the participant (UDisc)
  username: string;

  /// Display name of the participant
  name: string;

  /// PDGA number, if available
  pdgaNumber?: number;

  /// UDisc user ID
  registrantUserId: string;

  /// Event-specific player ID (may be unused)
  registrantPlayerId?: string;

  /// League team ID (if this is a team-based registration)
  teamRegistrantId?: string;

  /// Solo or team registration
  type: 'solo_user' | 'team_user';

  /// Event listing ID this registration is tied to
  eventListingId: string;

  /// Division for competition (e.g. MPO, MA1, FA40)
  division: string;

  /// The event pool this player is grouped into
  eventPoolId: string;

  /// UDisc subscription status
  proSubscriptionStatus: 'none' | 'subscribed' | 'one_time_purchase' | 'expired' | 'past_due';

  /// Optional thumbnail image filename or URL fragment
  thumbnailImage?: string;

  /// Internal versioning used by UDisc
  version: number;

  /// Registration timestamp, UDisc-style date
  createdAt: [ 'D', number ];

  /// Registration status is a schema map
  registrationStatus: Record<string, number>;
}

export interface EventListing {
  /// Unique internal ID for the event listing
  _id: string;

  /// Type of event (e.g. "tournament", "league")
  eventType: string;

  /// Name of the event
  name: string;

  /// Optional PDGA tournament ID or reference
  pdgaTournament?: string | null;

  /// Schema-mapped location object (lat/lon, etc.)
  location: Record<string, number>;

  /// Additional location references
  locations: number[];

  /// ISO start date (YYYY-MM-DD)
  startDate: string;

  /// ISO end date (YYYY-MM-DD)
  endDate: string;

  /// Array of numeric references to days of the week
  daysOfWeek: number[];

  /// Optional cropped cover image URL
  croppedCoverPhotoUrl?: string | null;

  /// Optional thumbnail for cover photo
  coverPhotoThumbnailUrl?: string | null;

  /// Optional full-size cover photo URL
  coverPhotoUrl?: string | null;

  /// Optional associated league ID
  leagueId?: string | null;

  /// Short identifier for linking/viewing
  shortId: string;

  /// Optional deprecated event ID
  legacyEventId?: string | null;

  /// Distance in meters or miles from search location
  distance: number;
}
