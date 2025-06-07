export interface SmartLayout {
  /// Unique layout ID (non-numeric string)
  _id: string;

  /// Numeric layout ID (likely primary ID used in references)
  layoutId: number;

  /// Course this layout belongs to
  courseId: number;

  /// Human-readable name of the layout (e.g., "Gold - 18 Holes")
  name: string;

  /// Optional tee level classification (e.g., "white", "blue", "gold")
  level?: string;

  /// Short descriptive paragraph about the layout
  details: string;

  /// Current status of the layout (e.g., "active")
  status: string;

  /// Number of holes in the layout; array of hole objects
  holes: SmartHole[]; // Replace `unknown` with a `SmartHole` type once defined

  /// Total number of floors (levels) climbed across the layout
  floorsAscended: number;

  /// Total number of floors (levels) descended across the layout
  floorsDescended: number;

  /// Number of times this layout has been played in the past 30 days
  playCount30: number;

  /// Sort index used to determine display order
  sortIndex: number;

  /// Total average number of steps to complete the layout
  stepCount: number;

  /// Average time to complete the layout in minutes (can include decimals)
  time: number;

  /// Whether this layout has valid tee/basket combinations
  areLayoutSelectionsValid: boolean;

  /// Type of layout (likely always "smart" for this interface)
  type: 'smart';

  /// Text bin categorizing overall length (e.g., "long", "very-long")
  lengthBin: string;

  /// Lower bound for typical hole length in meters
  typicalHoleLengthLowerMeters: number;

  /// Upper bound for typical hole length in meters
  typicalHoleLengthUpperMeters: number;

  /// Estimated round rating for shooting par
  parRoundRating: number;

  /// Difficulty bucket (e.g., "challenging", "very-challenging")
  difficultyBin: string;

  /// Technicality bucket (e.g., "technical", "highly-technical")
  technicalityBin: string;

  /// Schema map for total layout distance (e.g., meters or feet)
  holeDistance: Record<string, number>;
}

export interface SmartHole {
  /// Unique identifier for this hole configuration
  holeId: string;

  /// ID for the path configuration (tee/basket layout)
  pathConfigurationId: string;

  /// Human-readable hole number or label (e.g., "1", "A", "18")
  name: string;

  /// Current status of the hole (usually "active")
  status: string;

  /// Par for the hole (e.g., 3, 4, 5)
  par: number;

  /// Distance in meters from tee to target
  distance: number;

  /// Whether this hole is temporary (e.g., event-only)
  isTemporary: boolean;

  /// Optional description text for the hole
  description?: string;

  /// Optional notes (e.g., OB rules, mandos, etc.)
  notes?: string;

  /// Raw schema-mapped tee position object
  teePosition: Record<string, number>;

  /// Raw schema-mapped target (basket) position object
  targetPosition: Record<string, number>;

  /// Array of IDs representing dogleg segments (optional)
  doglegs?: number[];

  /// Raw schema-mapped tee pad geometry
  teePad: Record<string, number>;

  /// Raw schema-mapped basket geometry
  basket: Record<string, number>;

  /// Raw schema-mapped hole distance info (e.g., feet/meters)
  holeDistance: Record<string, number>;
}
