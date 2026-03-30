import { TrackingPoint } from '../value-objects/TrackingPoint';

export interface VehicleProps {
  patent: string;
  points: TrackingPoint[];
}

export class Vehicle {
  readonly patent: string;
  private _points: TrackingPoint[];

  constructor(props: VehicleProps) {
    this.patent = props.patent;
    this._points = [...props.points];
    this.sortPointsByTimestamp();
  }

  private sortPointsByTimestamp(): void {
    this._points.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  get points(): TrackingPoint[] {
    return [...this._points];
  }

  get lastSighting(): TrackingPoint | undefined {
    if (this._points.length === 0) {
      return undefined;
    }
    return this._points[this._points.length - 1];
  }

  addPoint(point: TrackingPoint): void {
    this._points.push(point);
    this.sortPointsByTimestamp();
  }

  static create(patent: string): Vehicle {
    return new Vehicle({ patent, points: [] });
  }
}
