import { Kafka, Producer, ProducerRecord, Message as KafkaJsMessage } from 'kafkajs';
import { KafkaConfig, KafkaMessage, PublishSettings } from '../interfaces';
import { getLogger } from '../utils/get-logger';

const logger = getLogger('KafkaService');

/**
 * Service for interacting with Kafka
 */
export class KafkaService {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private isConnected = false;

  /**
   * Create a new KafkaService instance
   * 
   * @param config Kafka configuration
   */
  constructor(private config: KafkaConfig) {
    this.kafka = new Kafka({
      clientId: config.clientId || 'fluent-kafka-events',
      brokers: Array.isArray(config.brokerUrls) ? config.brokerUrls : [config.brokerUrls],
      connectionTimeout: config.connectionTimeout || 30000,
      retry: {
        initialRetryTime: config.retry?.initialRetryMS || 300,
        maxRetryTime: config.retry?.maxRetryMS || 30000,
        retries: config.retry?.retries || 5,
        factor: config.retry?.factor || 0.2,
        multiplier: config.retry?.multiplier || 2,
      },
      // IAM authentication would be added here if required
    });
  }

  /**
   * Connect to Kafka and create a producer
   */
  public async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      this.producer = this.kafka.producer();
      await this.producer.connect();
      this.isConnected = true;
      logger.info('Connected to Kafka');
    } catch (error) {
      logger.error('Failed to connect to Kafka', error);
      throw new Error(`Failed to connect to Kafka: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Disconnect from Kafka
   */
  public async disconnect(): Promise<void> {
    if (!this.isConnected || !this.producer) return;

    try {
      await this.producer.disconnect();
      this.isConnected = false;
      this.producer = null;
      logger.info('Disconnected from Kafka');
    } catch (error) {
      logger.error('Error disconnecting from Kafka', error);
      throw new Error(`Failed to disconnect from Kafka: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Publish a message to Kafka
   * 
   * @param topic The Kafka topic to publish to
   * @param message The message to publish
   * @param settings Optional publish settings (partition, key)
   * @returns Promise resolving to the result of the send operation
   */
  public async publish<T>(
    topic: string, 
    message: KafkaMessage<T>, 
    settings: PublishSettings = {}
  ): Promise<void> {
    if (!this.isConnected || !this.producer) {
      await this.connect();
    }

    const kafkaMessage: KafkaJsMessage = {
      value: JSON.stringify(message),
      key: settings.key || message.messageId,
      headers: {
        messageId: message.messageId,
        timestamp: String(message.timestamp)
      }
    };

    const record: ProducerRecord = {
      topic,
      messages: [kafkaMessage],
    };

    if (settings.partition !== undefined) {
      record.partition = settings.partition;
    }

    try {
      await this.producer!.send(record);
      logger.info(`Message published to ${topic}`, { messageId: message.messageId });
    } catch (error) {
      logger.error(`Failed to publish message to ${topic}`, error);
      throw new Error(`Failed to publish message: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Convenience method to publish a message built from the MessageBuilder
   * 
   * @param message The message to publish
   * @param settings Optional publish settings
   * @returns Promise resolving to the result of the send operation
   * @throws Error if the message doesn't have a topic in its meta
   */
  public async publishBuiltMessage<T>(
    message: KafkaMessage<T>,
    settings: PublishSettings = {}
  ): Promise<void> {
    if (!message.meta.topic) {
      throw new Error('Message meta must contain a topic');
    }

    return this.publish(message.meta.topic, message, settings);
  }
}
