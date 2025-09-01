import { Module } from "@nestjs/common";
import { NotificationServiceSignale } from "common/notification/notification.service";

@Module({
    providers: [
        NotificationServiceSignale
    ],
    exports: [
        NotificationServiceSignale
    ]
})
export class NotificationModule {}