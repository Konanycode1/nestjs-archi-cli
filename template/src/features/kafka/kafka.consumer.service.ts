// kafka-consumer.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { env } from 'config/env.validation';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(
  )
     {
    this.kafka = new Kafka({
      clientId: env.KAFKA_CLIENT_ID,
      brokers:Array.isArray(env.KAFKA_BROKERS) ? env.KAFKA_BROKERS : env.KAFKA_BROKERS.split(',')
    });

    this.consumer = this.kafka.consumer({
      groupId: env.KAFKA_CONSUMER_GROUP_ID,
      allowAutoTopicCreation: true,
    });
  }

  async onModuleInit() {
    try {
      await this.consumer.connect();
      this.logger.log('Kafka consumer connected');

      // S'abonner explicitement aux topics
      await this.consumer.subscribe({ 
        topics: ['test-kafka2', 'order_status_changed'],
        fromBeginning: false 
      });
      
      this.logger.log('Subscribed to topics: test-kafka2, order_status_changed');

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          this.logger.log(`Received message from topic: ${topic}, partition: ${partition}`);
          
          const messageValue = message.value?.toString();
          if (!messageValue) return;

          try {
            const parsedMessage = JSON.parse(messageValue);
            
            switch (topic) {
              case 'test-kafka2':
                this.handleTestKafka2(parsedMessage);
                break;
              case 'order_status_changed':
                await this.handleOrderStatusChanged(parsedMessage);
                break;
              default:
                this.logger.warn(`Unhandled topic: ${topic}`);
            }
          } catch (error) {
            this.logger.error(`Error processing message from topic ${topic}:`, error);
          }
        },
      });

      this.logger.log('Kafka consumer is running');
    } catch (error) {
      this.logger.error('Error starting Kafka consumer:', error);
    }
  }

  private handleTestKafka2(message: any) {
    this.logger.log('Message reçu du topic test-kafka2:', message);
  }

  private async handleOrderStatusChanged(message: any) {
    this.logger.log('Message reçu du topic order_status_changed:', message);
    
    try {
      // ajouter votre requete ici 
      this.logger.log('Response from delivery service:');
    } catch (error) {
      this.logger.error('Error in delivery service:', error);
    }
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.log('Kafka consumer disconnected');
  }
}