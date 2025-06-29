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

export enum EventQuickFilter {
  All = 'all',
  League = 'league',
  Tournament = 'tournament',
  Trending = 'trending',
  PDGA = 'pdga',
  Cleanup = 'course-cleanup',
  Glow = 'glow',
  Clinic = 'clinic',
  Women = 'women',
  Charity = 'charity'
}

/// Represents a location associated with an event
export interface EventLocation {
  /// Unique identifier for the location
  id: string;
  /// Coordinate point [longitude, latitude]
  coordinates: [number, number];
  /// Display-friendly text for the location
  locationText: string;
  /// Type of location (e.g., "course")
  locationType: string;
  /// ID of the course at the location
  courseId: string;
  /// Name of the course
  courseName: string;
  /// Short identifier for the course
  courseShortId: string;
  /// GeoJSON type, usually "Point"
  type?: string;
  /// Optional legacy timestamp fields
  createdAt?: unknown;
  updatedAt?: unknown;
  deletedAt?: unknown;
  previousId?: string;
}

/// Represents a fully hydrated event from the event listing
export interface HydratedEvent {
  /// Unique identifier for the event
  _id: string;
  /// Short, shareable identifier
  shortId: string;
  /// Type of event (e.g., "league" or "tournament")
  eventType: 'league' | 'tournament';
  /// Optional league ID if the event is part of a league
  leagueId?: string | number;
  /// Legacy event ID (often -5 if unused)
  legacyEventId?: number | null;
  /// Optional PDGA tournament ID (often -5 if unused)
  pdgaTournament?: number | null;
  /// Name/title of the event
  name: string;
  /// Main location object for the event
  location: EventLocation;
  /// Additional locations associated with the event
  locations: EventLocation[];
  /// Start date of the event in YYYY-MM-DD format
  startDate: string;
  /// End date of the event in YYYY-MM-DD format
  endDate: string;
  /// Days of the week the event occurs on (1–7 for Mon–Sun)
  daysOfWeek: number[];
  /// Optional URL for the cover photo
  coverPhotoUrl?: string | number;
  /// Optional URL for the cropped version of the cover photo
  croppedCoverPhotoUrl?: string | number;
  /// Optional thumbnail image URL for the cover photo
  coverPhotoThumbnailUrl?: string | number;
  /// Distance from a given point or location in meters
  distance?: number;
}

/// Represents a single hole score entry
export interface HoleScore {
  /// Status of the hole, e.g., 'complete'
  type: string;
  /// Penalty strokes incurred on the hole
  penalty: number;
  /// Score relative to par for this hole
  relativeScore: number;
  /// Total strokes recorded for the hole
  score: number;
  /// Raw throw count (can be -5 if missing)
  throws: number;
}

/// Summary stats across the full round
export interface RoundSummary {
  /// Fairways hit percentage or value
  fairway: number;
  /// Greens in regulation
  gir: number;
  /// Circle 1 putting percentage
  c1Putting: number;
  /// Circle 1x putting percentage
  c1xPutting: number;
  /// Circle 2 putting percentage
  c2Putting: number;
  /// Scramble success rate
  scramble: number;
  /// Penalty detail object or metric
  penalties: unknown;
  /// Distance of throw-ins made
  throwInDistance: number;
}

/// Statistics per hole, currently untyped
export interface HoleStat {
  [key: string]: unknown;
}

/// Detailed round statistics
export interface RoundStats {
  /// Aggregate round-level stats
  roundSummary: RoundSummary;
  /// Per-hole statistics
  holeStats: HoleStat[];
}

/// Represents a single player's round entry within an event
export interface EventRoundEntry {
  /// Unique ID of this round entry
  _id: string;
  /// Bag tag placement after the round (or -5 if not applicable)
  bagTagAfter: number;
  /// Order on the card
  cardSortOrder: number;
  /// Hash of the score data
  checksum: string;
  /// ID of the course layout used
  courseLayoutId: string;
  /// Total score for the round
  currentRoundScore: number;
  /// Cut line info or -5 if N/A
  cutInfo: number;
  /// Division played in, e.g., "GEN"
  division: string;
  /// Did not finish info
  dnfInfo: number;
  /// ID of the card this player was assigned to
  eventCardId: string;
  /// ID of the event entry
  eventEntryId: string;
  /// Index number of entry
  eventEntryIndex: number;
  /// Status of the event entry
  eventEntryState: string;
  /// ID of the event listing
  eventListingId: string;
  /// ID of the pool the event entry belongs to
  eventPoolId: string;
  /// ID of the registrant for the event
  eventRegistrantId: string;
  /// ID of the event round
  eventRoundId: string;
  /// Total score for the event
  eventScore: number;
  /// ISO country flag (or -5 if not available)
  flagIso: number;
  /// Player handicap
  handicap: number;
  /// Player's handicap-based ranking
  handicapRanking: number;
  /// Whether the handicap ranking is tied
  handicapRankingIsTie: boolean;
  /// Handicap-relative round score
  handicapRelativeRoundScore: number;
  /// Position in a handicap tiebreaker
  handicapTiebreakPosition: number;
  /// Scores for each hole
  holeScores: HoleScore[];
  /// Whether the round is complete
  isComplete: boolean;
  /// Legacy payout data (or -5 if not used)
  legacyPayout: number;
  /// Player name
  name: string;
  /// Handicap rank from the previous round
  previousHandicapRanking: number;
  /// Overall previous round rank
  previousRanking: number;
  /// Player's rank in this round
  ranking: number;
  /// Whether the rank is shared
  rankingIsTie: boolean;
  /// If the registrant has more than one entry
  registrantHasMultipleEventEntries: boolean;
  /// Event score relative to par
  relativeEventScore: number;
  /// Round score relative to par
  relativeRoundScore: number;
  /// Zero-based round index
  roundIndex: number;
  /// Round-level penalty
  roundPenalty: number;
  /// Round rating
  roundRating: number;
  /// Round scores (can include split scores)
  roundScores: number[];
  /// Detailed stats for the round
  roundStats: RoundStats;
  /// Last time this scorecard entry was updated
  scorecardEntryUpdatedAt: [string, number];
  /// Hole the player started on
  startingHoleIndex: number;
  /// Any score adjustment at the start
  startingScoreAdjustment: number;
  /// Tee time of the round
  teeTime: [string, number];
  /// Number of holes completed
  thruHoleCount: number;
  /// Tiebreak position (or -5 if N/A)
  tiebreakPosition: number;
  /// Timestamp of last update
  updatedAt: [string, number];
}


/// Represents an individual registrant in an event
export interface EventRegistrant {
  /// Unique ID of the registrant
  _id: string;
  /// Team registrant ID (if part of a team), or -5 if solo
  teamRegistrantId: string | number;
  /// Type of registrant (usually "solo_user")
  type: string;
  /// Display name of the registrant
  name: string;
  /// Whether the name has been overridden manually
  isNameOverridden: boolean;
  /// Internal user ID for the registrant
  registrantUserId: string;
  /// PDGA number if available, or -5 if unknown
  pdgaNumber: number;
  /// ID of the event listing the registrant is associated with
  eventListingId: string;
  /// UDisc username of the registrant
  username: string;
  /// Thumbnail image URL or -7 if missing
  thumbnailImage: string | number;
  /// Handicap value or -5 if not set
  handicap: number;
}
