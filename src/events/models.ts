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
