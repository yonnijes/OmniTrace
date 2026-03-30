/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { loadConfig } from '@omnitrace/domain';

async function bootstrap() {
  // Load and validate environment configuration
  const config = loadConfig();

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  await app.listen(config.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${config.PORT}/${globalPrefix}`
  );
}

bootstrap();
