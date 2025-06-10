import { SchemaMap } from '../models';

export interface CourseDetail {
  /// Internal course document ID
  _id: string;

  /// Numeric course ID
  courseId: number;

  /// Display name of the course
  name: string;

  /// Shortened course identifier
  shortId: string;

  /// Number of holes on the course
  holeCount: number;

  /// Latitude of the course center
  latitude: number;

  /// Longitude of the course center
  longitude: number;

  /// Status of the course (e.g. "Active")
  status: string;

  /// Website URL for the course, if available
  website?: string;

  /// Whether the course requires a fee to play
  isPay: boolean;

  /// Country the course is located in
  country: string;

  /// Availability status (e.g. "available")
  availabilityStatus: string;

  /// Land type IDs (schema-mapped)
  landType: number[];

  /// Target type identifier (e.g. "basket")
  targetType: string;

  /// Description of the targets (e.g. "DISCatcher Pro (28 chains)")
  targetTypeDescription: string;

  /// Whether there are bathrooms available
  hasBathroom: boolean;

  /// Whether there is drinking water available
  hasDrinkingWater: boolean;

  /// Whether the course is cart-friendly
  isCartFriendly: boolean;

  /// Whether the course allows dogs
  isDogFriendly: boolean;

  /// Property type (e.g. "mixedUse")
  propertyType: string;

  /// Current conditions at the course
  conditions: {
    /// Condition type (e.g. "good")
    type: string;

    /// Optional details about conditions
    details?: string;

    /// Username of the last person to update conditions
    updatedByUsername: string;

    /// Timestamp of the last update
    updatedAt: string;
  };

  /// GeoJSON-style location object
  location: {
    type: 'Point';
    coordinates: [number, number];
  };

  /// Active target type IDs (schema-mapped)
  activeTargetTypes: number[];

  /// Active tee type IDs (schema-mapped)
  activeTeeTypes: number[];

  /// Layout-related configuration metadata
  layoutConfiguration: {
    /// Label IDs for tee positions
    teePositionLabels: number[];

    /// Label IDs for target positions
    targetPositionLabels: number[];

    /// Target type IDs (schema-mapped)
    targetTypes: number[];

    /// Tee type IDs (schema-mapped)
    teeTypes: number[];

    /// Timestamps when reviews were completed
    initialReviewCompletedOn: string[];

    /// Overrides the reported hole count
    holeCountOverride: number;
  };

  /// Timezone for the course
  timezone: string;

  /// Whether smart layouts are enabled for this course
  isSmartLayoutEnabled: boolean;

  /// Describes seasonal or conditional layout availability
  availabilityTypeDescription: string;

  /// Aggregated amenities rating
  amenitiesRating: number;

  /// Aggregated design rating
  designRating: number;

  /// Aggregated scenery rating
  sceneryRating: number;

  /// Aggregated signage rating
  signageRating: number;

  /// Aggregated tee condition rating
  teeRating: number;

  /// Aggregated maintenance/upkeep rating
  upkeepRating: number;

  /// Describes how to access the course
  accessTypeDescription: string;

  /// Accessibility type (e.g. "notAccessible")
  accessibility: string;

  /// Additional accessibility description
  accessibilityDescription: string;

  /// Whether alcohol is allowed (BYOB)
  byob: boolean;

  /// Whether the course uses dedicated targets
  dedicatedTargets: boolean;

  /// Whether any availability restrictions apply
  hasAvailabilityRestrictions: boolean;

  /// Description of any other fees
  otherFees: string;

  /// Whether the course is under construction
  underConstruction: boolean;

  /// Description of dog policy
  isDogFriendlyDescription: string;

  /// Whether the course is stroller-friendly
  isStrollerFriendly: boolean;

  /// Description of stroller accessibility
  isStrollerFriendlyDescription: string;

  /// Difficulty bin IDs (schema-mapped)
  difficultyBins: number[];
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
  /// Main course metadata
  courseDetail: CourseDetail;

  /// Estimated round time info
  normalizedCourseTraffic: NormalizedCourseTraffic;

  /// Smart layout IDs (schema-mapped)
  smartLayouts: number[];

  /// Classic layouts (not expanded)
  classicLayouts: Record<string, unknown>;

  /// Review IDs (schema-mapped)
  reviews: number[];

  /// Photo IDs (schema-mapped)
  photos: number[];

  /// Nearby courses (not expanded)
  nearbyCourses: Record<string, unknown>;

  /// Nearby store IDs (schema-mapped)
  nearbyStores: number[];

  /// Event IDs held at this course
  events: number[];

  /// Badge IDs (schema-mapped)
  badges: number[];

  /// Aggregated layout stats (may be null or missing)
  globalLayoutAverages?: unknown;

  /// Auth status of current user
  userStatus: 'loggedOut' | 'loggedIn';
}


/// Represents a decoded schema section mapping logical groups to schema maps or record pointers
export interface CourseSchemaMap {
  /// Schema map for the course detail object
  courseDetail: SchemaMap;

  /// Schema map for normalized course traffic (e.g., historical player activity)
  normalizedCourseTraffic: SchemaMap;

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
