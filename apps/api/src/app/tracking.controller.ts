import { Controller, Get, Param, Query, Inject } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  @Get('vehicle/:patent')
  async getVehicleRoute(@Param('patent') patent: string) {
    this.logger.info(`Received request for vehicle patent: ${patent}`);
    return await this.trackingService.trackVehicle(patent);
  }

  @Get('person/:rut')
  async getPersonRoute(@Param('rut') rut: string) {
    this.logger.info(`Received request for person RUT: ${rut}`);
    return await this.trackingService.trackPerson(rut);
  }

  @Get('route/:id')
  async getRoute(
    @Param('id') id: string,
    @Query('type') type: 'patent' | 'rut'
  ) {
    this.logger.info(`Received request for route ID: ${id}, type: ${type}`);
    return await this.trackingService.getRoute(id, type);
  }
}
