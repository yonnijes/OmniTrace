import { TrackingPoint } from '@omnitrace/domain';
import { IRoutingProvider, RouteResult } from './adapters/OsrmProvider';
import { Logger } from '@nestjs/common';

export class RoutingService {
  private readonly logger = new Logger(RoutingService.name);

  constructor(private readonly routingProvider: IRoutingProvider) {}

  async generateRouteFromTrackingPoints(
    points: TrackingPoint[]
  ): Promise<RouteResult> {
    this.logger.log(`Generating route for ${points.length} points`);
    const sortedPoints = [...points].sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    if (sortedPoints.length === 0) {
      throw new Error('No tracking points provided');
    }

    if (sortedPoints.length === 1) {
      return {
        geometry: {
          type: 'LineString',
          coordinates: [[sortedPoints[0].longitude, sortedPoints[0].latitude]],
        },
        distance: 0,
        duration: 0,
      };
    }

    const result = await this.routingProvider.calculateRouteFromPoints(sortedPoints);
    this.logger.debug?.(`Route calculated: distance=${result.distance}m, duration=${result.duration}s`);
    return result;
  }

  transformToGeoJson(points: TrackingPoint[]): any {
    this.logger.debug?.(`Transforming ${points.length} points to GeoJSON`);
    const features = points.map((point, index) => ({
      type: 'Feature' as const,
      properties: {
        timestamp: point.timestamp.toISOString(),
        providerId: point.providerId,
        rawSource: point.rawSource,
        accuracy: point.accuracy,
        speed: point.speed,
        order: index,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [point.longitude, point.latitude],
      },
    }));

    return {
      type: 'FeatureCollection',
      features,
    };
  }
}
