import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { ValidationError } from '../interfaces';

/**
 * Create a validator function for the given JSON schema
 * 
 * @param schema JSON Schema to validate against
 * @returns A function that validates data against the schema and returns validation errors
 */
export function createValidator<T>(schema: JSONSchemaType<T>) {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  
  const validate = ajv.compile(schema);
  
  return (data: unknown): ValidationError[] | null => {
    const valid = validate(data);
    
    if (valid) {
      return null;
    }
    
    // Convert Ajv errors to our ValidationError format
    return (validate.errors || []).map(error => {
      const field = error.instancePath.replace(/^\//, '');
      
      return {
        message: error.message || 'Invalid data',
        field: field || undefined,
        value: field ? data && typeof data === 'object' ? (data as any)[field] : undefined : data
      };
    });
  };
}
