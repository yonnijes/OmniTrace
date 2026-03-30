import { ITrackingProvider, TrackingResult, getConfig } from '@omnitrace/domain';
import { Logger } from '@nestjs/common';

export class TrackingOrchestrator {
  private readonly providers: ITrackingProvider[] = [];
  private readonly timeout: number;
  private readonly logger = new Logger(TrackingOrchestrator.name);

  constructor() {
    const config = getConfig();
    this.timeout = config.PROVIDER_TIMEOUT;
  }

  registerProvider(provider: ITrackingProvider): void {
    this.logger.log(`Registering tracking provider: ${provider.providerId}`);
    this.providers.push(provider);
  }

  async findByPatent(patent: string): Promise<TrackingResult[]> {
    this.logger.log(`Executing search by patent: ${patent} across ${this.providers.length} providers`);
    const promises = this.providers.map((provider) =>
      this.executeWithTimeout(
        provider.findByPatent(patent),
        provider.providerId
      )
    );

    const results = await Promise.allSettled(promises);

    return this.processResults(results);
  }

  async findByRut(rut: string): Promise<TrackingResult[]> {
    this.logger.log(`Executing search by RUT: ${rut} across ${this.providers.length} providers`);
    const promises = this.providers.map((provider) =>
      this.executeWithTimeout(provider.findByRut(rut), provider.providerId)
    );

    const results = await Promise.allSettled(promises);

    return this.processResults(results);
  }

  private async executeWithTimeout<T>(
    promise: Promise<T>,
    providerId: string
  ): Promise<T> {
    let timeoutId: NodeJS.Timeout;

    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Provider ${providerId} timed out`));
      }, this.timeout);
    });

    try {
      const result = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timeoutId!);
      this.logger.debug?.(`Provider ${providerId} responded successfully`);
      return result;
    } catch (error: any) {
      clearTimeout(timeoutId!);
      this.logger.error(`Error executing provider ${providerId}: ${error.message}`);
      throw error;
    }
  }

  private processResults(
    results: PromiseSettledResult<TrackingResult>[]
  ): TrackingResult[] {
    const fulfilled = results
      .filter(
        (result): result is PromiseFulfilledResult<TrackingResult> =>
          result.status === 'fulfilled'
      )
      .map((result) => result.value);

    const consolidated = fulfilled.filter((result) => result.points.length > 0 || result.error);

    this.logger.log(`Search completed: ${fulfilled.length} successful responses, ${consolidated.length} providers with relevant data`);
    return consolidated;
  }
}
