import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**"],
		coverage: {
			reporter: ["text", "json", "html"],
			exclude: ["**/*.config.ts", "**/interfaces/**", "src/examples/**"],
		},
		include: ["**/*.spec.ts"],
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
