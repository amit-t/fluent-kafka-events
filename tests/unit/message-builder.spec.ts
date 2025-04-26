import { describe, it, expect, beforeEach } from 'vitest';
import { MessageBuilder } from '../../src/message-builder';
import { ERROR_MESSAGES } from '../../src/constants';

describe('MessageBuilder', () => {
  interface TestPayload {
    id: string;
    name: string;
    value: number;
    nested?: {
      field: string;
    };
  }

  let builder: MessageBuilder<TestPayload>;
  
  beforeEach(() => {
    builder = new MessageBuilder<TestPayload>({
      pubId: 'test-service',
      topicResolver: (action) => `${action.split('.')[0]}-events`
    });
  });

  describe('withContext', () => {
    it('should set context values', () => {
      const context = {
        action: 'test.created',
        corrId: '123'
      };
      
      builder.withContext(context);
      const message = builder.build();
      
      expect(message.context.action).toBe(context.action);
      expect(message.context.corrId).toBe(context.corrId);
      expect(message.context.pubId).toBe('test-service');
    });

    it('should use topicResolver to set topic', () => {
      builder.withContext({ action: 'test.created', corrId: '123' });
      const message = builder.build();
      
      expect(message.meta.topic).toBe('test-events');
    });
  });

  describe('withMeta', () => {
    it('should set meta values', () => {
      const meta = {
        source: 'test-source',
        version: '1.0'
      };
      
      builder.withContext({ action: 'test.created', corrId: '123' })
        .withMeta(meta);
      
      const message = builder.build();
      
      expect(message.meta.source).toBe(meta.source);
      expect(message.meta.version).toBe(meta.version);
    });
  });

  describe('withPayload', () => {
    it('should set payload data', () => {
      const payload: TestPayload = {
        id: '123',
        name: 'Test',
        value: 42
      };
      
      builder.withContext({ action: 'test.created', corrId: '123' })
        .withPayload(payload);
      
      const message = builder.build();
      
      expect(message.data).toEqual(payload);
    });
  });

  describe('set', () => {
    it('should set a specific path in the payload', () => {
      builder.withContext({ action: 'test.created', corrId: '123' })
        .set('id', '123')
        .set('name', 'Test')
        .set('value', 42);
      
      const message = builder.build();
      
      expect(message.data.id).toBe('123');
      expect(message.data.name).toBe('Test');
      expect(message.data.value).toBe(42);
    });

    it('should set nested paths', () => {
      builder.withContext({ action: 'test.created', corrId: '123' })
        .set('nested', { field: 'nested-value' });
      
      const message = builder.build();
      
      expect(message.data.nested?.field).toBe('nested-value');
    });

    it('should override existing values', () => {
      builder.withContext({ action: 'test.created', corrId: '123' })
        .withPayload({ id: '123', name: 'Original', value: 42 })
        .set('name', 'Updated');
      
      const message = builder.build();
      
      expect(message.data.name).toBe('Updated');
    });
  });

  describe('setIfDefined', () => {
    it('should set values that are defined', () => {
      builder.withContext({ action: 'test.created', corrId: '123' })
        .setIfDefined('id', '123')
        .setIfDefined('name', 'Test');
      
      const message = builder.build();
      
      expect(message.data.id).toBe('123');
      expect(message.data.name).toBe('Test');
    });

    it('should not set values that are undefined', () => {
      builder.withContext({ action: 'test.created', corrId: '123' })
        .withPayload({ id: '123', name: 'Test', value: 42 })
        .setIfDefined('name', undefined)
        .setIfDefined('value', null);
      
      const message = builder.build();
      
      expect(message.data.name).toBe('Test');
      expect(message.data.value).toBe(42);
    });
  });

  describe('build', () => {
    it('should generate a complete message with all required fields', () => {
      const message = builder
        .withContext({ action: 'test.created', corrId: '123' })
        .withPayload({ id: '123', name: 'Test', value: 42 })
        .build();
      
      expect(message.context.pubId).toBe('test-service');
      expect(message.context.action).toBe('test.created');
      expect(message.context.corrId).toBe('123');
      expect(message.data.id).toBe('123');
      expect(message.data.name).toBe('Test');
      expect(message.data.value).toBe(42);
      expect(message.messageId).toBeDefined();
      expect(message.timestamp).toBeDefined();
      expect(message.meta.topic).toBe('test-events');
    });

    it('should throw an error if action is missing', () => {
      builder.withContext({ corrId: '123' });
      
      expect(() => builder.build()).toThrow(ERROR_MESSAGES.MISSING_ACTION);
    });

    it('should throw an error if correlation ID is missing', () => {
      builder.withContext({ action: 'test.created' });
      
      expect(() => builder.build()).toThrow(ERROR_MESSAGES.MISSING_CORRELATION_ID);
    });
  });

  describe('reset', () => {
    it('should reset all builder state', () => {
      builder
        .withContext({ action: 'test.created', corrId: '123' })
        .withPayload({ id: '123', name: 'Test', value: 42 })
        .reset();
      
      // After reset, it should throw because action and corrId are missing
      expect(() => builder.build()).toThrow(ERROR_MESSAGES.MISSING_ACTION);
      
      // Build a new message after reset
      const message = builder
        .withContext({ action: 'new.action', corrId: '456' })
        .withPayload({ id: '456', name: 'New', value: 100 })
        .build();
      
      expect(message.context.action).toBe('new.action');
      expect(message.context.corrId).toBe('456');
      expect(message.data.id).toBe('456');
    });
  });
});
