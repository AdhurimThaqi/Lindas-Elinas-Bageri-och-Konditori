import next from "eslint-config-next";

/**
 * Next.js 16 ships a flat ESLint config array directly, so we spread it in
 * rather than going through FlatCompat.
 */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
