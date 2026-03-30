import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  controllers: [AppController, TrackingController],
  providers: [AppService, TrackingService],
})
export class AppModule {}
