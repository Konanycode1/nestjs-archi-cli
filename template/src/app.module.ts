import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpModule } from '@nestjs/axios';
import { DbModule } from 'config/db.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'common/logger/logging.interceptor';
import { KafkaModule } from 'features/kafka/kafka.module';
import { UsersModule } from 'features/user/user.module';
import { AuthModule } from 'common/auth/auth.module';
import { HttpClientModule } from 'common/http/http-client.module';
import { NodemailerModule } from 'common/nodemailer/nodemailer.module';

@Module({
  imports: [
      PrismaModule.forRoot({
      isGlobal:true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    DbModule,
    KafkaModule,
    UsersModule,
    AuthModule,
    NodemailerModule

  ],
  controllers: [AppController],
  providers: [
    AppService,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    // await this.superAdminSeeder.seedRoler();

    // This method can be used for any initialization logic if needed
  }
}
