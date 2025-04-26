/**
 * Constants used throughout the library
 */

// Default configuration constants
export const DEFAULT_CONFIG = {
  KAFKA: {
    CLIENT_ID: 'fluent-kafka-events',
    CONNECTION_TIMEOUT: 30000,
    RETRY: {
      INITIAL_RETRY_MS: 300,
      MAX_RETRY_MS: 30000,
      RETRIES: 5,
      FACTOR: 0.2,
      MULTIPLIER: 2
    }
  },
  LOGGER: {
    LEVEL: 'info'
  }
};

// Message field constraints
export const MESSAGE_CONSTRAINTS = {
  MAX_MESSAGE_SIZE: 1048576, // 1MB in bytes
  MAX_KEY_LENGTH: 256,
  MAX_TOPIC_LENGTH: 249
};

// Common error messages
export const ERROR_MESSAGES = {
  MISSING_ACTION: 'Message action is required',
  MISSING_CORRELATION_ID: 'Correlation ID is required',
  MISSING_TOPIC: 'Message meta must contain a topic',
  VALIDATION_FAILED: 'Validation failed',
  CONNECTION_FAILED: 'Failed to connect to Kafka',
  PUBLISH_FAILED: 'Failed to publish message',
  INVALID_SCHEMA: 'Invalid schema provided'
};

// Event types that can be used with the library
export enum EventType {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  PROCESSED = 'processed',
  FAILED = 'failed',
  REQUESTED = 'requested',
  COMPLETED = 'completed'
}
