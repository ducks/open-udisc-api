export interface Hole {
  basket: Basket;
  description: string;
  distance: number;
  doglegs: any[];
  holeDistance: HoleDistance;
  holeId: string;
  isTemporary: boolean;
  name: string;
  notes: string;
  par: number;
  pathConfigurationId: string;
  status: string;
  targetPosition: TargetPosition;
  teePad: TeePad;
  teePosition: TeePosition;
  teeSign: TeeSign;
}

export interface TeePosition {
  isTemporary: boolean;
  latitude: number;
  longitude: number;
  notes: string;
  status: string;
  teePositionId: string;
  teePositionLabels: any[];  // could be string[] or number[]
  teeSign: TeeSign;
  teeType: TeeType;
}

export interface TargetPosition {
  isTemporary: boolean;
  latitude: number;
  longitude: number;
  status: string;
  targetPositionId: string;
  targetPositionLabels: any[];  // could refine
  targetType: TargetType;
}

export interface TeeType {
  status: string;
  teeType: string;
  teeTypeId: string;
}

export interface TargetType {
  basketModel: string;
  color: string;
  name: string;
  status: string;
  targetTypeId: string;
  type: string;
}

export interface TeeSign {
  imageUrl: string;
  optimizedUrl: string;
}

export interface TeePad {
  latitude: number;
  longitude: number;
}

export interface Basket {
  latitude: number;
  longitude: number;
}

export interface HoleDistance {
  feet: number;
  meters: number;
}
