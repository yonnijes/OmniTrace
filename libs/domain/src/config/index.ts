import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // Server
  PORT: z.coerce.number().default(3000),
  API_URL: z.string().url().default('http://localhost:3000'),

  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TTL: z.coerce.number().default(3600),

  // Routing
  OSRM_URL: z.string().url().default('https://osrm.org'),

  // Timeouts
  PROVIDER_TIMEOUT: z.coerce.number().default(5000),
});

export type EnvConfig = z.infer<typeof envSchema>;

let config: EnvConfig | null = null;

export function loadConfig(): EnvConfig {
  if (config) return config;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment configuration:');
    console.error(result.error.format());
    process.exit(1);
  }

  config = result.data;

  console.log('✅ Environment configuration loaded successfully');
  console.log(`   Node Env: ${config.NODE_ENV}`);
  console.log(`   Server Port: ${config.PORT}`);
  console.log(`   Redis: ${config.REDIS_HOST}:${config.REDIS_PORT}`);
  console.log(`   OSRM: ${config.OSRM_URL}`);

  return config;
}

export function getConfig(): EnvConfig {
  if (!config) {
    return loadConfig();
  }
  return config;
}
