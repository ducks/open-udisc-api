import { SchemaMap } from '../models';

export interface CourseDetail {
  /// UDisc course ID (numeric)
  courseId: number;

  /// Name of the course (e.g. "Pier Park")
  name: string;

  /// City or region name (e.g. "Portland, OR")
  locationText: string;

  /// Geographic latitude
  latitude: number;

  /// Geographic longitude
  longitude: number;

  /// Whether the course is private
  isPrivate: boolean;

  /// Whether this course supports smart layouts
  hasSmartLayouts: boolean;

  /// Whether this course uses UDisc Pro path mapping
  hasPathConfig: boolean;

  /// Whether this course has event layouts
  hasEventLayouts: boolean;

  /// Whether this course has been retired
  isRetired: boolean;

  /// True if the course can be edited by UDisc community
  isEditable: boolean;

  /// Whether the course is location-hidden or suppressed
  isHidden: boolean;

  /// Whether this is a test/demo course
  isTestCourse: boolean;

  /// Full textual description of the course
  description: string;

  /// Directions or instructions for finding the course
  directions: string;

  /// Tags or category labels for the course
  tags: string[];

  /// Number of holes listed at the course
  holeCount: number;

  /// Number of layouts listed for the course
  layoutCount: number;

  /// Number of reviews submitted
  ratingCount: number;

  /// Average rating (e.g. 4.6)
  ratingAverage: number;

  /// List of UDisc badge IDs associated with the course
  badgeIds: number[];

  /// Whether the course is verified by UDisc
  isVerified: boolean;

  /// Who owns or maintains the course
  managingOrg: string;

  /// Whether the course has been marked permanently closed
  isPermanentlyClosed: boolean;

  /// Time the course was last updated (ISO string)
  lastUpdated: string;

  /// Distance units used on this course
  distanceUnit: 'feet' | 'meters';

  /// Region or administrative division (e.g. "Multnomah County")
  region: string;

  /// Country code (e.g. "US")
  countryCode: string;

  /// State or province code (e.g. "OR")
  stateCode: string;

  /// Count of unique players
  playerCount: number;

  /// Count of total rounds submitted
  roundCount: number;

  /// Photo or banner image URL (may be relative or full)
  photoUrl?: string;

  /// Extra metadata not yet typed (e.g. sponsor info, amenities)
  [key: string]: unknown;
}

export interface NormalizedCourseTraffic {
  /// Estimated round time range in hours
  typicalRoundLength: {
    /// Minimum time to complete a round
    lowerBound: number;

    /// Maximum time to complete a round
    upperBound: number;
  };
}

export interface Course {
  /// Unique internal ID for the course
  _id: string;

  /// Year the course was established
  yearEstablished: number;

  /// Long-form description of the course, including features and layout
  longDescription: string;

  /// Number of playable holes on the course
  holeCount: number;

  /// Average user rating (0–5)
  ratingAverage: number;

  /// Numeric course ID used across UDisc
  courseId: number;

  /// Public display name of the course
  name: string;

  /// Textual location (usually city + state)
  locationText: string;

  /// Total number of ratings submitted
  ratingCount: number;

  /// Marketing headline for the course
  headline: string;

  /// Optional price or fee string (often empty)
  price: string;

  /// Two-letter ISO country code
  countryCode: string;

  /// Full state name
  state: string;

  /// City name
  city: string;

  /// Who can play this course
  accessType: 'everyone' | string;

  /// Availability status of the course
  availabilityStatus: 'available' | string;

  /// Availability type (e.g. seasonal or year-round)
  availabilityType: 'yearRound' | string;

  /// Whether restrooms are available
  hasBathroom: boolean;

  /// Whether drinking water is available
  hasDrinkingWater: boolean;

  /// Whether the course is cart-friendly
  isCartFriendly: boolean;

  /// Whether dogs are allowed
  isDogFriendly: boolean;

  /// Type of play fee (e.g. free, pay-to-play)
  playFeeType: 'free' | string;

  /// Location schema map (lat/lon, etc.)
  location: Record<string, number>;

  /// Short unique ID used in URLs
  shortId: string;

  /// Schema-mapped image object for the top photo
  topPhoto: Record<string, number>;

  /// Whether the location is private or restricted
  isLocationPrivate: boolean;

  /// Optional reason for limited access (if any)
  limitedAccessReason?: string | null;

  /// Internal slug
  slug: string;
}



/// Represents a decoded schema section mapping logical groups to schema maps or record pointers
export interface CourseSchemaMap {
  /// Schema map for the course detail object
  courseDetail: SchemaMap;

  /// Schema map for normalized course traffic (e.g., historical player activity)
  normalizedCourseTraffic: NormalizedCourseTraffic;

  /// Array of record indices pointing to smart layout objects
  smartLayouts: number[];

  /// Array of record indices pointing to legacy/classic layouts
  classicLayouts: number[];

  /// Array of record indices pointing to review records
  reviews: number[];

  /// Array of record indices pointing to photo records
  photos: number[];

  /// Array of record indices pointing to nearby course summaries
  nearbyCourses: number[];

  /// Array of record indices pointing to nearby store records
  nearbyStores: number[];

  /// Array of record indices pointing to events associated with this course
  events: number[];

  /// Array of record indices pointing to badges (if any)
  badges: number[];

  /// May be undefined if no average layout stats are present
  globalLayoutAverages?: number[] | undefined;

  /// Login context for the current user ("loggedOut", "loggedIn", etc.)
  userStatus: string;
}

export interface HydratedCourse {
  /// Metadata and descriptive info about the course
  courseDetail: CourseDetail;

  /// Summary of traffic and activity on the course (e.g. players, rounds)
  normalizedCourseTraffic: Record<string, unknown>;

  /// List of fully hydrated smart layouts (e.g. 18-hole, 9-hole variations)
  smartLayouts: SmartLayout[];

  /// List of classic layouts (usually empty or legacy)
  classicLayouts: unknown[];

  /// Array of course reviews, ordered by recency
  reviews: unknown[];

  /// Array of course photos (images, maps, signage, etc.)
  photos: unknown[];

  /// Nearby courses (may include basic metadata or IDs only)
  nearbyCourses: unknown[];

  /// Nearby stores with disc golf gear
  nearbyStores: unknown[];

  /// Upcoming or past events at the course (e.g. leagues, tournaments)
  events: unknown[];

  /// Badges or awards associated with the course (e.g. "Top 100")
  badges: unknown[];

  /// Aggregate stats for all layouts (e.g. average par, distance)
  globalLayoutAverages: unknown | null;

  /// Whether the user is logged in or not
  userStatus: 'loggedOut' | 'loggedIn' | string;
}


export interface SmartLayout {
  /// UDisc's internal smart layout ID, e.g. "smart_layout_134383"
  _id: string;

  /// Numeric layout ID (used in URLs or API identifiers)
  layoutId: number;

  /// ID of the course this layout belongs to
  courseId: number;

  /// Type of layout (usually "smart")
  type: string;

  /// Human-readable name of the layout
  name: string;

  /// Layout description/details, typically marketing copy
  details: string;

  /// Layout status (e.g. "active", "retired", etc.)
  status: 'active' | string;

  /// List of hydrated holes in this layout
  holes: Hole[];

  /// True if this layout is part of an event
  isEvent: boolean;

  /// Determines layout display priority
  sortIndex: number;

  /// True if the layout is marked private
  isPrivate: boolean;

  /// True if the layout is considered a safari layout
  isSafari: boolean;

  /// Status label (possibly same as `status`)
  layoutStatus: string;

  /// ISO timestamp of last update
  lastUpdated: string;

  /// Total par for this layout
  par: number;

  /// UUID or internal ID for the path config used in this layout
  pathConfiguration: string;

  /// Distance unit used for display
  distanceUnit: 'feet' | 'meters';

  /// Shortest typical hole length in meters
  typicalHoleLengthLowerMeters: number;

  /// Longest typical hole length in meters
  typicalHoleLengthUpperMeters: number;

  /// Total floors climbed during this layout (for fitness stats)
  floorsAscended: number;

  /// Total floors descended during this layout
  floorsDescended: number;

  /// Number of rounds played in the last 30 days
  playCount30: number;

  /// Estimated step count for the full layout
  stepCount: number;

  /// Estimated total time to play the layout (minutes?)
  time: number;

  /// Elevation level impact (can be negative or null)
  level: number | null;

  /// Projected round rating for playing this layout at par
  parRoundRating: number;

  /// Total layout distance in both feet and meters
  holeDistance: {
    feet: number;
    meters: number;
  };
}

export interface Hole {
  /// Unique ID for this hole (e.g. "ZLue")
  holeId: string;

  /// ID for the path configuration used for this hole
  pathConfigurationId: string;

  /// Human-readable name or label (e.g. "Hole 1")
  name: string;

  /// Hole number (e.g. 1–18)
  holeNumber: number;

  /// The hole's par value (e.g. 3, 4)
  par: number;

  /// Distance from tee to basket (e.g. 350)
  distance: number;

  /// ID for the tee pad used on this hole
  teePadId: string;

  /// ID for the basket (target) used on this hole
  basketId: string;

  /// Whether the hole is marked as a safari hole
  isSafari: boolean;

  /// Geometry and position of the tee pad
  teePad: PositionData;

  /// Geometry and position of the basket/target
  basket: PositionData;

  /// Overall location geometry of the hole (e.g. center path)
  hole: PositionData;

  /// Geometry of the tee sign
  teeSign?: PositionData;

  /// Geometry of the next tee connector (if any)
  nextTeeConnector?: PositionData;

  /// Optional array of doglegs on the hole
  doglegs?: PositionData[];

  /// Optional notes or text about the hole
  notes?: string;
}

export interface PositionData {
  /// Latitude in decimal degrees
  latitude: number;

  /// Longitude in decimal degrees
  longitude: number;

  /// Elevation in meters
  elevation?: number;

  /// Optional display name
  name?: string;

  /// Optional internal ID
  id?: string;
}
