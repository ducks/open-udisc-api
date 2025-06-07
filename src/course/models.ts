export interface CourseDetails {
  _id: string;
  name: string;
  shortId: string;
  courseId: number;

  accessTypeDescription: string;
  availabilityStatus: string;
  availabilityTypeDescription: string;
  hasAvailabilityRestrictions: boolean;

  hasBathroom: boolean;
  hasBathroomDescription?: string;
  hasDrinkingWater: boolean;
  isCartFriendly: boolean;
  isDogFriendly: boolean;
  isDogFriendlyDescription?: string;
  isStrollerFriendly: boolean;

  otherFees: string;
  propertyType: string;
  website?: string;

  dedicatedTargets: boolean;
  byob: boolean;
  underConstruction: boolean;

  holeCount: number;
  landType: number[];

  latitude: number;
  longitude: number;

  contactInfo: Record<string, number>; // schema-mapped
  layoutConfiguration: Record<string, number>; // schema-mapped
  location: Record<string, number>; // schema-mapped
  conditions: Record<string, number>; // schema-mapped

  timezone: string;
  country: string;
  accessibility: string;

  isSmartLayoutEnabled: boolean;
  targetType: string;
  targetTypeDescription?: string;
  activeTargetTypes: number[];
  activeTeeTypes: number[];

  amenitiesRating?: number;
  designRating?: number;
  sceneryRating?: number;
  signageRating?: number;
  teeRating?: number;
  upkeepRating?: number;

  difficultyBins: number[];
}

