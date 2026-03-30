import { TrackingPoint, getConfig } from '@omnitrace/domain';
import { Logger } from '@nestjs/common';

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface RouteResult {
  geometry: any;
  distance: number;
  duration: number;
}

export interface IRoutingProvider {
  providerId: string;
  calculateRoute(
    origin: RoutePoint,
    destination: RoutePoint
  ): Promise<RouteResult>;
  calculateRouteFromPoints(points: TrackingPoint[]): Promise<RouteResult>;
}

export class OsrmProvider implements IRoutingProvider {
  readonly providerId = 'osrm';
  private readonly baseUrl: string;
  private readonly logger = new Logger(OsrmProvider.name);

  constructor() {
    const config = getConfig();
    this.baseUrl = config.OSRM_URL;
  }

  async calculateRoute(
    origin: RoutePoint,
    destination: RoutePoint
  ): Promise<RouteResult> {
    const url = `${this.baseUrl}/routed-bike/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `OSRM fetch failed with status ${response.status}: ${errorText.substring(
            0,
            100
          )}`
        );
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        this.logger.error(
          `Failed to parse OSRM JSON response: ${text.substring(0, 100)}`
        );
        throw new Error('OSRM response was not valid JSON');
      }

      if (data.code !== 'Ok') {
        throw new Error(`OSRM error: ${data.message || data.code}`);
      }

      const route = data.routes[0];
      return {
        geometry: route.geometry,
        distance: route.distance,
        duration: route.duration,
      };
    } catch (error: any) {
      this.logger.error(`OSRM error reaching ${url}: ${error.message}`);
      throw error;
    }
  }

  async calculateRouteFromPoints(
    points: TrackingPoint[]
  ): Promise<RouteResult> {
    if (points.length < 2) {
      throw new Error('At least 2 points are required to calculate a route');
    }

    const coordinates = points
      .map((p) => `${p.longitude},${p.latitude}`)
      .join(';');

    const url = `${this.baseUrl}/routed-bike/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `OSRM fetch failed with status ${response.status}: ${errorText.substring(
            0,
            100
          )}`
        );
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        this.logger.error(`Failed to parse OSRM JSON response: ${text.substring(0, 100)}`);
        throw new Error('OSRM response was not valid JSON');
      }

      if (data.code !== 'Ok') {
        throw new Error(`OSRM error: ${data.message || data.code}`);
      }

      const route = data.routes[0];
      return {
        geometry: route.geometry,
        distance: route.distance,
        duration: route.duration,
      };
    } catch (error: any) {
      this.logger.error(`OSRM error reaching ${url}: ${error.message}`);
      throw error;
    }
  }
}
