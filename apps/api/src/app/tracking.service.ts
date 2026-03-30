import { Injectable, Logger } from '@nestjs/common';
import { TrackingOrchestrator } from '@omnitrace/infrastructure';
import { MockJsonProvider, XmlProvider } from '@omnitrace/infrastructure';
import { OsrmProvider, RoutingService } from '@omnitrace/infrastructure';

@Injectable()
export class TrackingService {
  private readonly orchestrator: TrackingOrchestrator;
  private readonly routingService: RoutingService;
  private readonly logger = new Logger(TrackingService.name);

  constructor() {
    this.orchestrator = new TrackingOrchestrator();
    this.orchestrator.registerProvider(new MockJsonProvider());
    this.orchestrator.registerProvider(new XmlProvider());

    this.routingService = new RoutingService(new OsrmProvider());
  }

  async trackVehicle(patent: string) {
    this.logger.log(`Tracking vehicle with patent: ${patent}`);
    const results = await this.orchestrator.findByPatent(patent);

    const allPoints = results.flatMap((r) => r.points);
    const sortedPoints = allPoints.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    const route = await this.routingService.generateRouteFromTrackingPoints(
      sortedPoints
    );
    const geoJson = this.routingService.transformToGeoJson(sortedPoints);

    this.logger.log(`Found ${sortedPoints.length} tracking points for vehicle ${patent}`);
    return {
      patent,
      points: sortedPoints,
      route,
      geoJson,
      lastSighting:
        sortedPoints.length > 0 ? sortedPoints[sortedPoints.length - 1] : null,
    };
  }

  async trackPerson(rut: string) {
    this.logger.log(`Tracking person with RUT: ${rut}`);
    const results = await this.orchestrator.findByRut(rut);

    const allPoints = results.flatMap((r) => r.points);
    const sortedPoints = allPoints.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );

    const route = await this.routingService.generateRouteFromTrackingPoints(
      sortedPoints
    );
    const geoJson = this.routingService.transformToGeoJson(sortedPoints);

    return {
      rut,
      points: sortedPoints,
      route,
      geoJson,
      lastSighting:
        sortedPoints.length > 0 ? sortedPoints[sortedPoints.length - 1] : null,
    };
  }

  async getRoute(id: string, type: 'patent' | 'rut') {
    if (type === 'patent') {
      return await this.trackVehicle(id);
    } else {
      return await this.trackPerson(id);
    }
  }
}
