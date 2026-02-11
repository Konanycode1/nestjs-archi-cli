import z from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3400),
    DATABASE_URL:  z
    .string()
    .url({ message: 'DATABASE_URL is required' }),
    JWT_SECRET: z.string({message: 'JWT_SECRET is required'}),
    JWT_EXPIRES_IN: z.string({message: 'JWT_EXPIRES_IN is required'}).default('1h'),
    JWT_REFRESH_SECRET: z.string({message: 'JWT_REFRESH_SECRET is required'}),
    JWT_REFRESH_EXPIRES_IN: z.string({message: 'JWT_REFRESH_EXPIRES_IN is required'}).default('30d'),
    KAFKA_CLIENT_ID: z.string({
        message: 'KAFKA_CLIENT_ID is required',
    }),
    KAFKA_BROKERS: z.string({
        message: 'KAFKA_BROKERS is required, specify as a comma-separated list',
    }),
    KAFKA_CONSUMER_GROUP_ID: z.string({
        message: 'KAFKA_CONSUMER_GROUP_ID is required',
    }),
    ONESIGNAL_APP_ID: z.string({message: 'ONESIGNAL_APP_ID is required'}),
    ONESIGNAL_API_KEY: z.string({message: 'ONESIGNAL_API_KEY is required'}),
    ONESIGNAL_CHANNEL_ID: z.string({message: 'ONESIGNAL_CHANNEL_ID is required'}),
    ONESIGNAL_API_URL: z.string({message: 'ONESIGNAL_REST_API_URL is required'}),

    });

export const env = envSchema.parse(process.env);
