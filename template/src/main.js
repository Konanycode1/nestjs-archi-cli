import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { validationOptions } from 'utils/validation-option';
// import { LoggingInterceptor } from 'common/logger/logging.interceptor';
import { HttpExceptionFilter } from 'common/logger/error.logging';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { Transport } from '@nestjs/microservices';
import { env } from 'config/env.validation';
import { LoggingInterceptor } from 'nestjs-logging-interceptor';
async function bootstrap() {
    const logger = new Logger();
    const loggerLevels = process.env.NODE_ENV === 'testing'
        ? ['error', 'warn']
        : ['error', 'warn', 'log', 'debug', 'verbose'];
    const app = await NestFactory.create(AppModule);
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new HttpExceptionFilter(), new PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalPipes(new ValidationPipe(validationOptions));
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.setGlobalPrefix('api');
    app.connectMicroservice({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: env.KAFKA_CLIENT_ID, // ex: "projectA-client" ou "projectB-client"
                brokers: Array.isArray(env.KAFKA_BROKERS) ? env.KAFKA_BROKERS : env.KAFKA_BROKERS.split(','),
            },
            consumer: {
                groupId: env.KAFKA_CONSUMER_GROUP_ID,
                allowAutoTopicCreation: true,
                sessionTimeout: 30000,
                rebalanceTimeout: 60000,
                heartbeatInterval: 3000,
            },
            producerOnlyMode: false
        },
    });
    await app.startAllMicroservices();
    const nodeEnv = env.NODE_ENV;
    await app.listen(env.PORT ?? 3500, () => {
        logger.log(`Listening on port http://localhost:${env.PORT}`);
        // logger.log(`Docs on route http://localhost:${port}/${DOCS_ROUTE}`);
        logger.log(`Using NODE_ENV = ${nodeEnv}`);
        logger.log(`Timezone loading: ${process.env.TZ}`);
        logger.log(`Time: ${new Date().toLocaleString()}`);
    });
}
bootstrap();
