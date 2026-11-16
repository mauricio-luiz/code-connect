import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    env: { JWT_SECRET: 'test-secret-test-secret-test-secret-123' },
    root: './',
    include: ['**/*.e2e-spec.ts'],
  },
});
