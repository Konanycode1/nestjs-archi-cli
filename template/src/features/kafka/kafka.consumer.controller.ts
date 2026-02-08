// src/kafka/consumer.service.ts
import {
  Controller,
  forwardRef,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { NotificationServiceSignale } from 'common/notification/notification.service';
import { DeliveryService } from 'features/delivery/core/use-case/delivery.service';

@Controller()
export class ConsumerController   {
   private readonly logger = new Logger(ConsumerController.name);
  constructor(
    @Inject(forwardRef(() => DeliveryService))
    private readonly deliveryService : DeliveryService,
    private readonly notificationService: NotificationServiceSignale
  ) {}
    @EventPattern('test-kafka2')
    handleMessage(@Payload() message: any) {
        console.log('Message reçu du topic Kafka:', message);
    }

    @EventPattern('order_status_changed')
    async handleOrderStatusChanged(@Payload() message: any, @Ctx() context: KafkaContext) {
       try {
        //   this.logger.log(`Message reçu du topic order_status_changed:`, message);
        //   this.logger.log(`Topic: ${context.getTopic()}, Partition: ${context.getPartition()}`);

          const parsed = Buffer.isBuffer(message)
            ? JSON.parse(message.toString())
            : typeof message === 'string'
            ? JSON.parse(message)
            : message;

          Promise.resolve().then(async () => {const response = await this.deliveryService.createDelivery(parsed);});
        //   this.logger.log('Response from delivery service:', response);
           const title = "nestjs-archi-cliture";
            const body = `Nouvelle commande disponible pour vous`;
            const imageUrl = ""
            const userIdList = [];
            await this.notificationService.sendNotificationPush({
            title,
            body,
            imageUrl,
            userIdList
            });
        } catch (error) {
          this.logger.error('Erreur lors du traitement du message order_status_changed:', error);
        }
    }
}
