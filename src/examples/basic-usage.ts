// biome-ignore lint/style/useImportType: <explanation>
import { MessageBuilder, KafkaService, KafkaMessage } from "../index";
import { EventType } from "../constants";

// Define an interface for your message payload
interface UserCreatedPayload {
	userId: string;
	email: string;
	username: string;
	createdAt: string;
}

// Create a message builder with configuration
const builder = new MessageBuilder<UserCreatedPayload>({
	pubId: "user-service",
	// Optional topic resolver that maps actions to topics
	topicResolver: (action: string) => {
		const [domain, event] = action.split(".");
		return `${domain}-events`;
	},
});

// Build a message
const message = builder
	.withContext({
		action: `user.${EventType.CREATED}`,
		corrId: "123456789",
	})
	.withMeta({
		source: "user-api",
		version: "1.0",
	})
	.withPayload({
		userId: "usr_123456",
		email: "user@example.com",
		username: "johndoe",
		createdAt: new Date().toISOString(),
	})
	.build();

console.log("Built message:", JSON.stringify(message, null, 2));

// Example of publishing the message (not executed in this example)
async function publishMessage(
	message: KafkaMessage<UserCreatedPayload>,
): Promise<void> {
	// Initialize the Kafka service
	const kafkaService = new KafkaService({
		brokerUrls: ["localhost:9092"],
	});

	try {
		// Connect to Kafka
		await kafkaService.connect();

		// Publish the message
		if (message.meta.topic) {
			await kafkaService.publishBuiltMessage(message);
			console.log(`Published message with ID: ${message.messageId}`);
		} else {
			// If no topic is in the message meta, provide it explicitly
			await kafkaService.publish("user-events", message);
			console.log(
				`Published message with ID: ${message.messageId} to topic: user-events`,
			);
		}
	} catch (error) {
		console.error("Failed to publish message:", error);
	} finally {
		// Always disconnect when done
		await kafkaService.disconnect();
	}
}

// Example with JSON Schema validation
import { createValidator } from "../utils/validation";
import type { JSONSchemaType } from "ajv";

// Define a JSON schema for your payload
const userSchema: JSONSchemaType<UserCreatedPayload> = {
	type: "object",
	properties: {
		userId: { type: "string" },
		email: { type: "string", format: "email" },
		username: { type: "string", minLength: 3 },
		createdAt: { type: "string", format: "date-time" },
	},
	required: ["userId", "email", "username", "createdAt"],
	additionalProperties: false,
};

// Create a validator function
const validator = createValidator(userSchema);

// Use it to validate some data
const validData = {
	userId: "usr_123456",
	email: "user@example.com",
	username: "johndoe",
	createdAt: new Date().toISOString(),
};

const invalidData = {
	userId: "usr_123456",
	email: "not-an-email",
	username: "j", // too short
	createdAt: "not-a-date-time",
};

console.log("Valid data validation result:", validator(validData));
console.log("Invalid data validation result:", validator(invalidData));

// Example with nested data setting
const orderBuilder = new MessageBuilder<{
	order: {
		id: string;
		items: Array<{ itemId: string; quantity: number }>;
		customer: {
			id: string;
			name: string;
		};
	};
}>({
	pubId: "order-service",
});

const orderMessage = orderBuilder
	.withContext({
		action: "order.created",
		corrId: "987654321",
	})
	.withMeta({ topic: "order-events" })
	// Set the entire payload at once
	.withPayload({
		order: {
			id: "ord_123456",
			items: [{ itemId: "item_1", quantity: 2 }],
			customer: { id: "cust_1", name: "John Doe" },
		},
	})
	// Or set individual nested properties
	.set("order.items[1]", { itemId: "item_2", quantity: 1 })
	.set("order.customer.name", "John Smith")
	.build();

console.log("Order message:", JSON.stringify(orderMessage, null, 2));
