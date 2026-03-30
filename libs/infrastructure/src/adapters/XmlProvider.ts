import { ITrackingProvider, TrackingResult, TrackingPoint } from '@omnitrace/domain';
import { XMLParser } from 'fast-xml-parser';
import { Logger } from '@nestjs/common';

export class XmlProvider implements ITrackingProvider {
  readonly providerId = 'xml-provider';
  readonly providerName = 'XML Provider';
  private readonly logger = new Logger(XmlProvider.name);

  private readonly parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
  }

  async findByPatent(patent: string): Promise<TrackingResult> {
    // Simulate fetching XML data from external API
    const xmlData = this.getMockXmlData(patent);

    try {
      this.logger.debug?.(`Parsing XML for patent: ${patent}`);
      const parsed = this.parser.parse(xmlData);
      const points = this.mapXmlToTrackingPoints(parsed);
      return { providerId: this.providerId, points };
    } catch (error: any) {
      this.logger.error(`Failed to parse XML for patent ${patent}: ${error.message}`);
      return {
        providerId: this.providerId,
        points: [],
        error: `Failed to parse XML: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  }

  async findByRut(rut: string): Promise<TrackingResult> {
    // Similar implementation for RUT
    const xmlData = this.getMockXmlData(rut);

    try {
      this.logger.debug?.(`Parsing XML for RUT: ${rut}`);
      const parsed = this.parser.parse(xmlData);
      const points = this.mapXmlToTrackingPoints(parsed);
      return { providerId: this.providerId, points };
    } catch (error: any) {
      this.logger.error(`Failed to parse XML for RUT ${rut}: ${error.message}`);
      return {
        providerId: this.providerId,
        points: [],
        error: `Failed to parse XML: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  }

  private mapXmlToTrackingPoints(parsed: any): TrackingPoint[] {
    // Mapping logic from XML structure to TrackingPoint
    // This is a simplified example
    const track = parsed?.root?.track;
    if (!track) return [];

    const points = Array.isArray(track.point) ? track.point : [track.point];

    return points.map((p: any) =>
      TrackingPoint.create({
        latitude: parseFloat(p.latitude || p.lat),
        longitude: parseFloat(p.longitude || p.lng || p.lon),
        timestamp: new Date(p.timestamp || p.time),
        providerId: this.providerId,
        rawSource: this.providerName,
        accuracy: p.accuracy ? parseFloat(p.accuracy) : undefined,
        speed: p.speed ? parseFloat(p.speed) : undefined,
      })
    );
  }

  private getMockXmlData(id: string): string {
    return `
      <root>
        <track>
          <point>
            <latitude>-33.4489</latitude>
            <longitude>-70.6693</longitude>
            <timestamp>2023-10-25T12:00:00Z</timestamp>
            <accuracy>10</accuracy>
            <speed>50</speed>
          </point>
          <point>
            <latitude>-33.4500</latitude>
            <longitude>-70.6600</longitude>
            <timestamp>2023-10-25T12:15:00Z</timestamp>
            <accuracy>10</accuracy>
            <speed>45</speed>
          </point>
        </track>
      </root>
    `;
  }
}
