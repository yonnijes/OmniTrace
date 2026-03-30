import { z } from 'zod';

export const TrackingPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timestamp: z.string().datetime(),
  providerId: z.string(),
  rawSource: z.string(),
  accuracy: z.number().optional(),
  speed: z.number().optional(),
});

export const TrackingResponseSchema = z.object({
  providerId: z.string(),
  points: z.array(TrackingPointSchema),
  error: z.string().optional(),
});

export type TrackingPointDto = z.infer<typeof TrackingPointSchema>;
export type TrackingResponseDto = z.infer<typeof TrackingResponseSchema>;
