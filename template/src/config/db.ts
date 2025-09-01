import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";



export interface DatabaseConfig {
    ping(): Promise<void>;
}


export class DatabaseConfig  extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    
    async onModuleInit() {
        await this.$connect();
        console.log("Database connected successfully 🔌🔌");
      }
    
      async onModuleDestroy() {
        await this.$disconnect();
        console.log("Database disconnected successfully ✂️✂️");
      }
}