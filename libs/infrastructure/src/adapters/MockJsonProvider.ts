import {
  ITrackingProvider,
  TrackingResult,
  TrackingPoint,
} from '@omnitrace/domain';
import { Logger } from '@nestjs/common';

interface TrackingPointDto {
  latitude: number;
  longitude: number;
  timestamp: string;
  providerId: string;
  rawSource: string;
  accuracy?: number;
  speed?: number;
}

export class MockJsonProvider implements ITrackingProvider {
  readonly providerId = 'mock-json';
  readonly providerName = 'Mock JSON Provider';
  private readonly logger = new Logger(MockJsonProvider.name);

  private readonly mockData: Record<string, TrackingPointDto[]> = {
    ABCD12: [
      {
        latitude: -33.4489,
        longitude: -70.6693,
        timestamp: '2023-10-25T10:00:00Z',
        providerId: 'mock-json',
        rawSource: 'Mock JSON Provider',
        accuracy: 10,
        speed: 50,
      },
      {
        latitude: -33.45,
        longitude: -70.66,
        timestamp: '2023-10-25T10:15:00Z',
        providerId: 'mock-json',
        rawSource: 'Mock JSON Provider',
        accuracy: 10,
        speed: 45,
      },
    ],
    '12345678-9': [
      {
        latitude: -33.46,
        longitude: -70.65,
        timestamp: '2023-10-25T11:00:00Z',
        providerId: 'mock-json',
        rawSource: 'Mock JSON Provider',
        accuracy: 15,
      },
    ],
  };

  async findByPatent(patent: string): Promise<TrackingResult> {
    this.logger.debug?.(`Searching by patent in Mock JSON: ${patent}`);
    await this.delay(500);
    const normalizedPatent = patent.toUpperCase();
    const points = this.mockData[normalizedPatent] || [];

    const result = {
      providerId: this.providerId,
      points: points.map((p) =>
        TrackingPoint.create({
          ...p,
          timestamp: new Date(p.timestamp),
        })
      ),
    };

    this.logger.debug?.(`Found ${result.points.length} points for patent: ${patent}`);
    return result;
  }

  async findByRut(rut: string): Promise<TrackingResult> {
    this.logger.debug?.(`Searching by RUT in Mock JSON: ${rut}`);
    await this.delay(500);
    const normalizedRut = rut.replace(/\./g, '').toLowerCase();
    const points = this.mockData[normalizedRut] || [];

    const result = {
      providerId: this.providerId,
      points: points.map((p) =>
        TrackingPoint.create({
          ...p,
          timestamp: new Date(p.timestamp),
        })
      ),
    };

    this.logger.debug?.(`Found ${result.points.length} points for RUT: ${rut}`);
    return result;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
