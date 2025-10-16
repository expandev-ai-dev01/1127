/**
 * @summary Global test setup
 * @description Configuration and utilities for test environment
 */

import { config } from '@/config';

/**
 * @summary Setup test environment
 */
export function setupTestEnvironment(): void {
  process.env.NODE_ENV = 'test';
  process.env.DB_NAME = 'todolist_test';
}

/**
 * @summary Teardown test environment
 */
export function teardownTestEnvironment(): void {
  // Cleanup logic
}

beforeAll(() => {
  setupTestEnvironment();
});

afterAll(() => {
  teardownTestEnvironment();
});
