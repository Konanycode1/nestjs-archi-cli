
import { forwardRef, Module } from '@nestjs/common';
import { ConsumerController } from 'features/kafka/kafka.consumer.controller';
import { ConsumerService } from 'features/kafka/kafka.consumer.service';
import { ProducerService } from 'features/kafka/kafka.producer.service';
import { NotificationModule } from 'common/notification/notification.module';

@Module({
  imports: [
    NotificationModule
  ],
  providers: [ProducerService],
  controllers: [ConsumerController],
  exports: [ProducerService]
})
export class KafkaModule {}
