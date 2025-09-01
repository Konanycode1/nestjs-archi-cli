var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// kafka-consumer.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { env } from 'config/env.validation';
let ConsumerService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ConsumerService = _classThis = class {
        constructor(deliveryService) {
            this.deliveryService = deliveryService;
            this.logger = new Logger(ConsumerService.name);
            this.kafka = new Kafka({
                clientId: env.KAFKA_CLIENT_ID,
                brokers: Array.isArray(env.KAFKA_BROKERS) ? env.KAFKA_BROKERS : env.KAFKA_BROKERS.split(',')
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
                        if (!messageValue)
                            return;
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
                        }
                        catch (error) {
                            this.logger.error(`Error processing message from topic ${topic}:`, error);
                        }
                    },
                });
                this.logger.log('Kafka consumer is running');
            }
            catch (error) {
                this.logger.error('Error starting Kafka consumer:', error);
            }
        }
        handleTestKafka2(message) {
            this.logger.log('Message reçu du topic test-kafka2:', message);
        }
        async handleOrderStatusChanged(message) {
            this.logger.log('Message reçu du topic order_status_changed:', message);
            try {
                const response = await this.deliveryService.createDelivery(message);
                this.logger.log('Response from delivery service:', response);
            }
            catch (error) {
                this.logger.error('Error in delivery service:', error);
            }
        }
        async onModuleDestroy() {
            await this.consumer.disconnect();
            this.logger.log('Kafka consumer disconnected');
        }
    };
    __setFunctionName(_classThis, "ConsumerService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConsumerService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConsumerService = _classThis;
})();
export { ConsumerService };
