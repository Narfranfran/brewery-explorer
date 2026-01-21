// Optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/sample.test.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock global fetch for all tests
global.fetch = jest.fn();

// Mock console.error to suppress expected errors in tests
global.console = {
  ...console,
  error: jest.fn(),
};