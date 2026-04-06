import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// Next.js
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Prettier
import prettier from "eslint-plugin-prettier/recommended";

import unicorn from "eslint-plugin-unicorn";
import sonarjs from "eslint-plugin-sonarjs";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
	eslint.configs.recommended,

	// Strict TypeScript config
	...tseslint.configs.strict,

	// Next.js core vitals
	...nextVitals,
	...nextTs,

	prettier,

	{
		plugins: {
			unicorn,
			sonarjs,
			"unused-imports": unusedImports,
		},
		rules: {
			"prettier/prettier": [
				"error",
				{
					useTabs: true,
					tabWidth: 4,
				},
			],

			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/consistent-type-imports": "error",
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "off",
			"react/jsx-uses-vars": "error",
			"react/prop-types": "off",

			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

			"unicorn/prefer-node-protocol": "error",
			"unicorn/prefer-object-from-entries": "error",

			"sonarjs/cognitive-complexity": ["warn", 15],
			"sonarjs/no-duplicate-string": "error",

			"jsx-a11y/alt-text": "error",
			"jsx-a11y/anchor-is-valid": "error",
			"jsx-a11y/aria-activedescendant-has-tabindex": "error",
			"jsx-a11y/aria-props": "error",
			"jsx-a11y/aria-role": "error",
			"jsx-a11y/aria-unsupported-elements": "error",
			"jsx-a11y/click-events-have-key-events": "error",
			"jsx-a11y/heading-has-content": "error",
			"jsx-a11y/html-has-lang": "error",
			"jsx-a11y/iframe-has-title": "error",
			"jsx-a11y/img-redundant-alt": "error",
			"jsx-a11y/interactive-supports-focus": "error",
			"jsx-a11y/label-has-associated-control": "error",
			"jsx-a11y/lang": "error",
			"jsx-a11y/no-access-key": "error",
			"jsx-a11y/no-distracting-elements": "error",
			"jsx-a11y/no-noninteractive-element-interactions": "error",
			"jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
			"jsx-a11y/no-noninteractive-tabindex": "error",
			"jsx-a11y/role-has-required-aria-props": "error",
			"jsx-a11y/role-supports-aria-props": "error",
			"jsx-a11y/scope": "error",
			"jsx-a11y/tabindex-no-positive": "error",

			"no-debugger": "warn",
		},
	},

	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
