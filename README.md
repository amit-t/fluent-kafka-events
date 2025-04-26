# Fluent Kafka Events

[![npm version](https://img.shields.io/npm/v/fluent-kafka-events.svg)](https://www.npmjs.com/package/fluent-kafka-events)

A TypeScript library for standardising building and publishing Kafka messages with a fluent API.

## Features

- 🔀 **Fluent Builder API**: Chain methods to construct Kafka messages with a clean, readable syntax
- 🔍 **TypeScript Support**: Full TypeScript definitions and generic payload typing
- ✅ **Validation**: Optional JSON Schema validation of message payloads
- 📦 **Serialization**: Support for custom serializers
- 🔄 **Kafka Integration**: Ready-to-use Kafka producer service

## Installation

Install from [npm](https://www.npmjs.com/package/fluent-kafka-events):

```bash
pnpm add fluent-kafka-events
```

## Quick Start

```typescript
import { MessageBuilder, KafkaService } from 'fluent-kafka-events';

// Define your message payload type
interface UserCreatedPayload {
  userId: string;
  email: string;
  createdAt: string;
}

// Create a message builder
const builder = new MessageBuilder<UserCreatedPayload>({
  pubId: 'user-service',
  // Optional topic resolver - converts actions to Kafka topics
  topicResolver: (action) => `${action.split('.')[0]}-events`
});

// Build a message
const message = builder
  .withContext({
    action: 'user.created',
    corrId: '123456789'
  })
  .withPayload({
    userId: 'usr_123',
    email: 'user@example.com',
    createdAt: new Date().toISOString()
  })
  .build();

// Publish to Kafka
async function publishMessage() {
  const kafka = new KafkaService({
    brokerUrls: ['kafka:9092']
  });
  
  await kafka.connect();
  await kafka.publishBuiltMessage(message);
  await kafka.disconnect();
}
```

## Message Builder API

### Creating a Builder

```typescript
// Simple builder
const builder = new MessageBuilder<YourPayloadType>({
  pubId: 'your-service-id'
});

// With topic resolver
const builder = new MessageBuilder<YourPayloadType>({
  pubId: 'your-service-id',
  topicResolver: (action) => `${action.split('.')[0]}-events`
});

// With schema validation
import { JSONSchemaType } from 'ajv';

const schema: JSONSchemaType<YourPayloadType> = {
  type: 'object',
  properties: {
    // Your schema here
  },
  required: ['id', 'name'],
  additionalProperties: false
};

const builder = new MessageBuilder<YourPayloadType>({
  pubId: 'your-service-id',
  validationSchema: schema
});
```

### Builder Methods

#### withContext(context)

Sets the context information for the message.

```typescript
builder.withContext({
  action: 'user.created',
  corrId: '123456789',
  // Any additional context fields
});
```

#### withMeta(meta)

Sets metadata for the message.

```typescript
builder.withMeta({
  topic: 'user-events',
  source: 'user-api',
  version: '1.0'
});
```

#### withPayload(data)

Sets the payload data for the message.

```typescript
builder.withPayload({
  userId: 'usr_123',
  email: 'user@example.com'
});
```

#### set(path, value)

Sets a specific property in the payload using a path.

```typescript
builder.set('userId', 'usr_123');
builder.set('user.address.city', 'New York');
builder.set('items[0].quantity', 5);
```

#### setIfDefined(path, value)

Sets a property only if the value is not undefined or null.

```typescript
builder.setIfDefined('optionalField', maybeUndefined);
```

#### withSerializer(serializer)

Sets a custom serializer for the message.

```typescript
builder.withSerializer({
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data)
});
```

#### validate()

Validates the current message against the schema if provided.

```typescript
const errors = builder.validate();
if (errors) {
  console.error('Validation failed:', errors);
}
```

#### build()

Builds the complete Kafka message.

```typescript
const message = builder.build();
```

#### reset()

Resets the builder to its initial state.

```typescript
builder.reset();
```

## Kafka Service API

### Creating a Service

```typescript
const kafkaService = new KafkaService({
  brokerUrls: ['kafka:9092'],
  clientId: 'your-client-id',
  connectionTimeout: 30000,
  retry: {
    initialRetryMS: 300,
    maxRetryMS: 30000,
    retries: 5
  }
});
```

### Methods

#### connect()

Connects to Kafka and creates a producer.

```typescript
await kafkaService.connect();
```

#### disconnect()

Disconnects from Kafka.

```typescript
await kafkaService.disconnect();
```

#### publish(topic, message, settings)

Publishes a message to a specific Kafka topic.

```typescript
await kafkaService.publish('user-events', message, {
  partition: 0,
  key: 'user-123'
});
```

#### publishBuiltMessage(message, settings)

Publishes a message built from the MessageBuilder using the topic from the message's meta.

```typescript
await kafkaService.publishBuiltMessage(message);
```

## Schema Validation

The library provides JSON Schema validation using Ajv:

```typescript
import { createValidator } from 'fluent-kafka-events';
import { JSONSchemaType } from 'ajv';

// Define your schema
const userSchema: JSONSchemaType<UserPayload> = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    email: { type: 'string', format: 'email' },
    age: { type: 'number', minimum: 18 }
  },
  required: ['userId', 'email'],
  additionalProperties: false
};

// Create a validator
const validator = createValidator(userSchema);

// Validate data
const errors = validator(data);
if (errors) {
  console.error('Validation failed:', errors);
}
```

## License

MIT
