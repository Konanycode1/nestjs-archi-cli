import { PrismaClient } from "@prisma/client";
export class DatabaseConfig extends PrismaClient {
    async onModuleInit() {
        await this.$connect();
        console.log("Database connected successfully 🔌🔌");
    }
    async onModuleDestroy() {
        await this.$disconnect();
        console.log("Database disconnected successfully ✂️✂️");
    }
}
