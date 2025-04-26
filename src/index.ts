/**
 * Fluent Kafka Events Library
 *
 * A TypeScript library for building and publishing Kafka messages using a fluent API.
 */
// Main classes
export { MessageBuilder } from "./message-builder";
export { KafkaService } from "./services/kafka.service";

// Utils
export { createValidator } from "./utils/validation";
export { logger } from "./utils/get-logger";

// Types
export {
	KafkaMessage,
	MessageContext,
	MessageMeta,
	BuilderConfig,
	PublishSettings,
	KafkaConfig,
	PropertyPath,
	ValidationError,
	Serializer,
} from "./interfaces";
