/**
 * Type definitions for Kafka messages and builder configurations
 */

// Base message context type
export interface MessageContext {
  pubId: string;
  action: string;
  corrId: string | number;
  [key: string]: any;
}

// Base message meta type
export interface MessageMeta {
  topic?: string;
  [key: string]: any;
}

// The complete Kafka message structure
export interface KafkaMessage<T = any> {
  context: MessageContext;
  meta: MessageMeta;
  messageId: string;
  data: T;
  timestamp: number;
}

// Configuration for the message builder
export interface BuilderConfig {
  pubId: string;
  validationSchema?: any;
  topicResolver?: (action: string) => string;
}

// Kafka publish settings
export interface PublishSettings {
  partition?: number;
  key?: string;
  [key: string]: any;
}

// Kafka configuration
export interface KafkaConfig {
  brokerUrls: string | string[];
  clientId?: string;
  connectionTimeout?: number;
  retry?: {
    initialRetryMS?: number;
    maxRetryMS?: number;
    retries?: number;
    factor?: number;
    multiplier?: number;
  };
  iamAuth?: {
    region: string;
  };
}

// Property path type for nested object access
export type PropertyPath = string | number | symbol | Array<string | number | symbol>;

// Error interface for validation errors
export interface ValidationError {
  message: string;
  field?: string;
  value?: any;
}

// Custom serializer interface
export interface Serializer {
  serialize: (data: any) => string;
  deserialize: (data: string) => any;
}
