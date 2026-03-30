import { TrackingPoint } from '../value-objects/TrackingPoint';

export interface PersonProps {
  rut: string;
  points: TrackingPoint[];
}

export class Person {
  readonly rut: string;
  private _points: TrackingPoint[];

  constructor(props: PersonProps) {
    this.rut = props.rut;
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

  static create(rut: string): Person {
    return new Person({ rut, points: [] });
  }
}
