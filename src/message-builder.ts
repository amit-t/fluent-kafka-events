import { ulid } from "ulid";
import type {
	BuilderConfig,
	KafkaMessage,
	MessageContext,
	MessageMeta,
	PropertyPath,
	ValidationError,
	Serializer,
} from "./interfaces";
import * as lodash from "lodash";
import { ERROR_MESSAGES, MESSAGE_CONSTRAINTS } from "./constants";

/**
 * MessageBuilder class for constructing Kafka messages in a fluent style
 *
 * @example
 * ```typescript
 * const builder = new MessageBuilder<UserCreatedPayload>({ pubId: 'user-service' });
 *
 * const message = builder
 *   .withContext({ action: 'user.created', corrId: requestId })
 *   .withPayload({ userId: '123', email: 'user@example.com' })
 *   .build();
 * ```
 */
export class MessageBuilder<T = Record<string, unknown>> {
	private _context: MessageContext;
	private _meta: MessageMeta = {};
	private _data: Partial<T> = {};
	private _validator?: (data: unknown) => ValidationError[] | null;
	private _serializer?: Serializer;
	private _config: BuilderConfig;

	/**
	 * Create a new message builder
	 *
	 * @param config Configuration for the builder
	 */
	constructor(config: BuilderConfig) {
		this._config = config;

		// Initialize context with pubId from config
		this._context = {
			pubId: config.pubId,
			action: "",
			corrId: "",
		};

		// Set up validator if schema provided
		if (config.validationSchema) {
			// Will be implemented when we add schema validation support
			// For now, validation will be a no-op
		}
	}

	/**
	 * Set context information for the message
	 *
	 * @param context Message context including action, correlation ID, etc.
	 * @returns The builder instance for method chaining
	 */
	withContext(context: Partial<MessageContext>): MessageBuilder<T> {
		this._context = { ...this._context, ...context };

		// If topicResolver is provided, use it to set the topic based on action
		if (this._config.topicResolver && context.action) {
			this._meta.topic = this._config.topicResolver(context.action);
		}

		return this;
	}

	/**
	 * Set metadata for the message
	 *
	 * @param meta Additional metadata for the message
	 * @returns The builder instance for method chaining
	 */
	withMeta(meta: MessageMeta): MessageBuilder<T> {
		this._meta = { ...this._meta, ...meta };
		return this;
	}

	/**
	 * Set the payload data for the message
	 *
	 * @param data The payload data
	 * @returns The builder instance for method chaining
	 */
	withPayload(data: Partial<T>): MessageBuilder<T> {
		this._data = { ...this._data, ...data };
		return this;
	}

	/**
	 * Set a specific property in the payload using a path
	 *
	 * @param path Path to the property (can be a dot-notation string or array)
	 * @param value Value to set at the specified path
	 * @returns The builder instance for method chaining
	 */
	set(path: PropertyPath, value: unknown): MessageBuilder<T> {
		lodash.set(this._data, path, value);
		return this;
	}

	/**
	 * Set a property in the payload only if the value is not undefined or null
	 *
	 * @param path Path to the property (can be a dot-notation string or array)
	 * @param value Value to set at the specified path
	 * @returns The builder instance for method chaining
	 */
	setIfDefined(path: PropertyPath, value: unknown): MessageBuilder<T> {
		if (value !== undefined && value !== null) {
			lodash.set(this._data, path, value);
		}
		return this;
	}

	/**
	 * Set a custom serializer for the message
	 *
	 * @param serializer A serializer object with serialize and deserialize methods
	 * @returns The builder instance for method chaining
	 */
	withSerializer(serializer: Serializer): MessageBuilder<T> {
		this._serializer = serializer;
		return this;
	}

	/**
	 * Validate the current message against the schema if provided
	 *
	 * @returns Array of validation errors, or null if valid
	 */
	validate(): ValidationError[] | null {
		// If no validator is set, consider message valid
		if (!this._validator) {
			return null;
		}

		return this._validator(this._data);
	}

	/**
	 * Build the complete Kafka message
	 *
	 * @returns The complete Kafka message object
	 * @throws Error if validation fails or required fields are missing
	 */
	build(): KafkaMessage<T> {
		// Check required fields
		if (!this._context.action) {
			throw new Error(ERROR_MESSAGES.MISSING_ACTION);
		}

		if (!this._context.corrId) {
			throw new Error(ERROR_MESSAGES.MISSING_CORRELATION_ID);
		}

		// Validate payload if validator exists
		const validationErrors = this.validate();
		if (validationErrors && validationErrors.length > 0) {
			throw new Error(`${ERROR_MESSAGES.VALIDATION_FAILED}: ${JSON.stringify(validationErrors)}`);
		}

		// Check message size constraints
		const serializedMessage = JSON.stringify({
			context: this._context,
			meta: this._meta,
			data: this._data,
		});

		if (serializedMessage.length > MESSAGE_CONSTRAINTS.MAX_MESSAGE_SIZE) {
			throw new Error(`Message size exceeds maximum allowed size of ${MESSAGE_CONSTRAINTS.MAX_MESSAGE_SIZE} bytes`);
		}

		// Generate a unique message ID using ULID
		const messageId = ulid();

		// Create the complete message
		return {
			context: this._context,
			meta: this._meta,
			messageId,
			data: this._data as T,
			timestamp: Date.now(),
		};
	}

	/**
	 * Serialize the message to JSON string
	 *
	 * @returns JSON string of the built message
	 */
	serialize(): string {
		const message = this.build();

		if (this._serializer) {
			return this._serializer.serialize(message);
		}

		return JSON.stringify(message);
	}

	/**
	 * Reset the builder to its initial state
	 *
	 * @returns The builder instance for method chaining
	 */
	reset(): MessageBuilder<T> {
		this._context = {
			pubId: this._config.pubId,
			action: "",
			corrId: "",
		};
		this._meta = {};
		this._data = {};

		return this;
	}
}
