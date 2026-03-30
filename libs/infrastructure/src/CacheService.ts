import Redis from 'ioredis';
import { getConfig } from '@omnitrace/domain';
import { Logger } from '@nestjs/common';

export class CacheService {
  private readonly client: Redis;
  private readonly defaultTtl: number;
  private readonly logger = new Logger(CacheService.name);

  constructor() {
    const config = getConfig();
    this.defaultTtl = config.REDIS_TTL;
    this.client = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_PASSWORD,
      lazyConnect: true,
    });
  }

  async connect(): Promise<void> {
    this.logger.log('Connecting to Redis');
    await this.client.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    this.logger.debug?.(`Fetching key from cache: ${key}`);
    const data = await this.client.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    const expiration = ttl || this.defaultTtl;
    this.logger.debug?.(`Setting key in cache: ${key} (TTL: ${expiration}s)`);
    await this.client.setex(key, expiration, serialized);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}
