export interface CoordinatesProps {
  latitude: number;
  longitude: number;
}

export class Coordinates {
  readonly latitude: number;
  readonly longitude: number;

  constructor(props: CoordinatesProps) {
    if (props.latitude < -90 || props.latitude > 90) {
      throw new Error('Invalid latitude');
    }
    if (props.longitude < -180 || props.longitude > 180) {
      throw new Error('Invalid longitude');
    }
    this.latitude = props.latitude;
    this.longitude = props.longitude;
  }

  static create(props: CoordinatesProps): Coordinates {
    return new Coordinates(props);
  }
}
