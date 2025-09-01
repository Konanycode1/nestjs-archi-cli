import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseConfig } from 'config/db';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true
        }),
    ],
    controllers: [],
    providers: [DatabaseConfig],
    exports: [DatabaseConfig],
})
export class DbModule {}
