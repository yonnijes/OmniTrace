import { TrackingPoint } from '../value-objects/TrackingPoint';

export interface TrackingResult {
  providerId: string;
  points: TrackingPoint[];
  error?: string;
}

export interface ITrackingProvider {
  readonly providerId: string;
  readonly providerName: string;

  findByPatent(patent: string): Promise<TrackingResult>;
  findByRut(rut: string): Promise<TrackingResult>;
}
