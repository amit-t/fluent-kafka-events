import { describe, it, expect } from "vitest";
import { createValidator } from "../../../src/utils/validation";
import type { JSONSchemaType } from "ajv";

describe("Validation Utils", () => {
	interface TestSchema {
		id: string;
		email: string;
		age: number;
		tags?: string[];
	}

	const schema: JSONSchemaType<TestSchema> = {
		type: "object",
		properties: {
			id: { type: "string", minLength: 3 },
			email: { type: "string", format: "email" },
			age: { type: "number", minimum: 18 },
			tags: {
				type: "array",
				items: { type: "string" },
				nullable: true,
			},
		},
		required: ["id", "email", "age"],
		additionalProperties: false,
	};

	describe("createValidator", () => {
		it("should return null for valid data", () => {
			const validator = createValidator(schema);

			const valid: TestSchema = {
				id: "abc123",
				email: "test@example.com",
				age: 25,
				tags: ["tag1", "tag2"],
			};

			const result = validator(valid);
			expect(result).toBeNull();
		});

		it("should return validation errors for invalid data", () => {
			const validator = createValidator(schema);

			const invalid = {
				id: "ab", // too short
				email: "not-an-email",
				age: 16, // below minimum
				tags: [123], // wrong type
			};

			const result = validator(invalid);
			expect(result).not.toBeNull();
			expect(Array.isArray(result)).toBe(true);

			if (result) {
				expect(result.length).toBeGreaterThan(0);

				// Check specific error messages
				const idError = result.find((e) => e.field === "id");
				expect(idError).toBeDefined();

				const emailError = result.find((e) => e.field === "email");
				expect(emailError).toBeDefined();

				const ageError = result.find((e) => e.field === "age");
				expect(ageError).toBeDefined();
			}
		});

		it("should check for required fields", () => {
			const validator = createValidator(schema);

			const missingRequired = {
				id: "abc123",
				// missing email and age
			};

			const result = validator(missingRequired);
			expect(result).not.toBeNull();

			if (result) {
				const emailError = result.find((e) => e.message?.includes("email"));
				expect(emailError).toBeDefined();

				const ageError = result.find((e) => e.message?.includes("age"));
				expect(ageError).toBeDefined();
			}
		});

		it("should check for additional properties", () => {
			const validator = createValidator(schema);

			const withAdditional = {
				id: "abc123",
				email: "test@example.com",
				age: 25,
				extraField: "not allowed",
			};

			const result = validator(withAdditional);
			expect(result).not.toBeNull();

			if (result) {
				const additionalError = result.find(
					(e) =>
						e.message?.includes("additional") ||
						e.message?.includes("property") ||
						e.message?.includes("should not be valid"),
				);
				expect(additionalError).toBeDefined();
			}
		});
	});
});
