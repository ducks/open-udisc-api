export interface CourseDetails {
  /// Unique internal ID string (non-numeric)
  _id: string;

  /// Course display name
  name: string;

  /// Short URL ID used in slugs (e.g., "LGWd")
  shortId: string;

  /// Numeric course ID used in other references
  courseId: number;

  /// Human-readable access info (e.g., "Members Only")
  accessTypeDescription?: string;

  /// Availability status (e.g., "available", "closed")
  availabilityStatus: string;

  /// Human-readable description of availability schedule
  availabilityTypeDescription?: string;

  /// Whether there are access restrictions (time/gate/membership)
  hasAvailabilityRestrictions: boolean;

  /// Whether the course has restrooms
  hasBathroom: boolean;

  /// Optional description of bathroom location(s)
  hasBathroomDescription?: string;

  /// Whether drinking water is available
  hasDrinkingWater: boolean;

  /// Whether the course is suitable for carts
  isCartFriendly: boolean;

  /// Whether dogs are allowed on the course
  isDogFriendly: boolean;

  /// Optional description of leash/pet policies
  isDogFriendlyDescription?: string;

  /// Whether the course is stroller friendly
  isStrollerFriendly: boolean;

  /// Any other associated fees (e.g., parking, facilities)
  otherFees: string;

  /// Land ownership/use type (e.g., "dedicated", "mixedUse")
  propertyType: string;

  /// Optional website or external course info
  website?: string;

  /// Whether the course uses permanent disc golf targets
  dedicatedTargets: boolean;

  /// Whether players are allowed to bring their own beverages
  byob: boolean;

  /// Whether the course is under construction or partially closed
  underConstruction: boolean;

  /// Number of playable holes in standard layout
  holeCount: number;

  /// Array of land use type IDs (e.g., public park, private, etc.)
  landType: number[];

  /// Course latitude in WGS84 decimal degrees
  latitude: number;

  /// Course longitude in WGS84 decimal degrees
  longitude: number;

  /// Schema map pointing to contact-related fields
  contactInfo: Record<string, number>;

  /// Schema map pointing to layout-related metadata
  layoutConfiguration: Record<string, number>;

  /// Schema map for location details (city/state/country/etc.)
  location: Record<string, number>;

  /// Schema map for weather or condition data
  conditions: Record<string, number>;

  /// Olson timezone string (e.g., "America/New_York")
  timezone: string;

  /// Country name (e.g., "United States")
  country: string;

  /// General accessibility status (e.g., "accessible", "notAccessible")
  accessibility: string;

  /// Whether smart layouts are enabled for this course
  isSmartLayoutEnabled: boolean;

  /// Target hardware type (e.g., "basket", "object", etc.)
  targetType: string;

  /// Descriptive string of the target hardware used
  targetTypeDescription?: string;

  /// Array of active target type IDs
  activeTargetTypes: number[];

  /// Array of active tee type IDs
  activeTeeTypes: number[];

  /// Average user rating for amenities (0–5 scale)
  amenitiesRating?: number;

  /// Average user rating for course design (0–5 scale)
  designRating?: number;

  /// Average user rating for scenery (0–5 scale)
  sceneryRating?: number;

  /// Average user rating for signage (0–5 scale)
  signageRating?: number;

  /// Average user rating for tees (0–5 scale)
  teeRating?: number;

  /// Average user rating for upkeep/maintenance (0–5 scale)
  upkeepRating?: number;

  /// Array of difficulty bin IDs for rating segmentation
  difficultyBins: number[];
}

export interface Course extends CourseDetails {
  /// User-friendly location name like "Charlotte, NC"
  locationText?: string;

  /// Status of the course (e.g., "Active", "Retired")
  status?: string;

  /// Display price, usually empty or a string like "$5"
  price?: string;

  /// Year the course was established
  yearEstablished?: number;

  /// Average user rating (1–5 stars)
  ratingAverage?: number;

  /// Number of user ratings
  ratingCount?: number;

  /// Long-form course description
  longDescription?: string;

  /// Short marketing-style summary
  headline?: string;

  /// US state or region name
  state?: string;

  /// City name, usually matches `locationText`
  city?: string;

  /// Slug used in URLs (e.g., "hornets-nest-park-LGWd")
  slug?: string;

  /// Access control (e.g., "everyone", "membersOnly")
  accessType?: string;

  /// State or region (may duplicate `state`)
  admin1Name?: string;

  /// UDisc’s world ranking score (0–100 scale)
  worldRankingsRating?: number;

  /// One of: "free", "payToPlay", "donation", etc.
  playFeeType?: string;

  /// Whether the course is on private land
  isLocationPrivate?: boolean;

  /// Schema map of photo metadata
  topPhoto?: Record<string, number>;

  /// Schema map for distance metadata
  distanceFromSelectedPlace?: Record<string, number>;

  /// Reference IDs for course "badges"
  badgesInfo?: number[];

  /// Optional status in current user's wishlist
  wishlistStatus?: string;
}
