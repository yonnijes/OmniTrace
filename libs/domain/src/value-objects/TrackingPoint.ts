export interface TrackingPointProps {
  latitude: number;
  longitude: number;
  timestamp: Date;
  providerId: string;
  rawSource: string;
  accuracy?: number;
  speed?: number;
}

export class TrackingPoint {
  readonly latitude: number;
  readonly longitude: number;
  readonly timestamp: Date;
  readonly providerId: string;
  readonly rawSource: string;
  readonly accuracy?: number;
  readonly speed?: number;

  constructor(props: TrackingPointProps) {
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.timestamp = props.timestamp;
    this.providerId = props.providerId;
    this.rawSource = props.rawSource;
    this.accuracy = props.accuracy;
    this.speed = props.speed;
  }

  static create(props: TrackingPointProps): TrackingPoint {
    return new TrackingPoint(props);
  }
}
