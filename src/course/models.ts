export interface Course {
  accessType: string;
  availabilityType: string;
  city: string;
  countryCode: string;
  headline: string;
  isLocationPrivate: boolean;
  locationText: string;
  longDescription: string;
  playFeeType: string;
  price: string;
  ratingAverage: number;
  ratingCount: number;
  state: string;
  topPhoto: Record<string, any>;
  yearEstablished: number;
  _id: string;
  availabilityStatus: string;
  courseId: number;
  hasBathroom: boolean;
  hasDrinkingWater: boolean;
  holeCount: number;
  isCartFriendly: boolean;
  isDogFriendly: boolean;
  location: Record<string, any>;
  name: string;
  shortId: string;
}

export function createCourse(
  accessType: string,
  availabilityType: string,
  city: string,
  countryCode: string,
  headline: string,
  isLocationPrivate: boolean,
  locationText: string,
  longDescription: string,
  playFeeType: string,
  price: string,
  ratingAverage: number,
  ratingCount: number,
  state: string,
  topPhoto: Record<string, any>,
  yearEstablished: number,
  _id: string,
  availabilityStatus: string,
  courseId: number,
  hasBathroom: boolean,
  hasDrinkingWater: boolean,
  holeCount: number,
  isCartFriendly: boolean,
  isDogFriendly: boolean,
  location: Record<string, any>,
  name: string,
  shortId: string,
): Course {
  return {
    accessType,
    availabilityType,
    city,
    countryCode,
    headline,
    isLocationPrivate,
    locationText,
    longDescription,
    playFeeType,
    price,
    ratingAverage,
    ratingCount,
    state,
    topPhoto,
    yearEstablished,
    _id,
    availabilityStatus,
    courseId,
    hasBathroom,
    hasDrinkingWater,
    holeCount,
    isCartFriendly,
    isDogFriendly,
    location,
    name,
    shortId,
  };
}

export interface CourseDetail {
  accessTypeDescription: string;
  accessibility: string;
  activeTargetTypes: any[];
  activeTeeTypes: any[];
  amenitiesRating: number;
  availabilityTypeDescription: string;
  byob: boolean;
  conditions: Record<string, any>;
  contactInfo: Record<string, any>;
  country: string;
  dedicatedTargets: boolean;
  designRating: number;
  difficultyBins: any[];
  hasAvailabilityRestrictions: boolean;
  isPay: boolean;
  isSmartLayoutEnabled: boolean;
  landType: any[];
  latitude: number;
  layoutConfiguration: Record<string, any>;
  longitude: number;
  otherFees: string;
  propertyType: string;
  sceneryRating: number;
  signageRating: number;
  status: string;
  targetType: string;
  targetTypeDescription: string;
  teeRating: number;
  timezone: string;
  underConstruction: boolean;
  upkeepRating: number;
  website: string;
  _id: string;
  availabilityStatus: string;
  courseId: number;
  hasBathroom: boolean;
  hasDrinkingWater: boolean;
  holeCount: number;
  isCartFriendly: boolean;
  isDogFriendly: boolean;
  location: Record<string, any>;
  name: string;
  shortId: string;
}

export function createCourseDetail(
  accessTypeDescription: string,
  accessibility: string,
  activeTargetTypes: any[],
  activeTeeTypes: any[],
  amenitiesRating: number,
  availabilityTypeDescription: string,
  byob: boolean,
  conditions: Record<string, any>,
  contactInfo: Record<string, any>,
  country: string,
  dedicatedTargets: boolean,
  designRating: number,
  difficultyBins: any[],
  hasAvailabilityRestrictions: boolean,
  isPay: boolean,
  isSmartLayoutEnabled: boolean,
  landType: any[],
  latitude: number,
  layoutConfiguration: Record<string, any>,
  longitude: number,
  otherFees: string,
  propertyType: string,
  sceneryRating: number,
  signageRating: number,
  status: string,
  targetType: string,
  targetTypeDescription: string,
  teeRating: number,
  timezone: string,
  underConstruction: boolean,
  upkeepRating: number,
  website: string,
  _id: string,
  availabilityStatus: string,
  courseId: number,
  hasBathroom: boolean,
  hasDrinkingWater: boolean,
  holeCount: number,
  isCartFriendly: boolean,
  isDogFriendly: boolean,
  location: Record<string, any>,
  name: string,
  shortId: string,
): CourseDetail {
  return {
    accessTypeDescription,
    accessibility,
    activeTargetTypes,
    activeTeeTypes,
    amenitiesRating,
    availabilityTypeDescription,
    byob,
    conditions,
    contactInfo,
    country,
    dedicatedTargets,
    designRating,
    difficultyBins,
    hasAvailabilityRestrictions,
    isPay,
    isSmartLayoutEnabled,
    landType,
    latitude,
    layoutConfiguration,
    longitude,
    otherFees,
    propertyType,
    sceneryRating,
    signageRating,
    status,
    targetType,
    targetTypeDescription,
    teeRating,
    timezone,
    underConstruction,
    upkeepRating,
    website,
    _id,
    availabilityStatus,
    courseId,
    hasBathroom,
    hasDrinkingWater,
    holeCount,
    isCartFriendly,
    isDogFriendly,
    location,
    name,
    shortId,
  };
}

