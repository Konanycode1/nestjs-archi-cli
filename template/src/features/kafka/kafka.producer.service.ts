// src/kafka/producer.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka, Producer } from 'kafkajs';
import { env } from 'config/env.validation';

@Injectable()
export class ProducerService implements OnModuleInit {
  private readonly logger = new Logger(ProducerService.name);

    private readonly kafka = new Kafka({
    clientId: env.KAFKA_CLIENT_ID,
    brokers: Array.isArray(env.KAFKA_BROKERS) ? env.KAFKA_BROKERS : env.KAFKA_BROKERS.split(','),
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
