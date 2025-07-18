module.exports = {
  preset: 'ts-jest', 
  testEnvironment: 'node', 
  testMatch: ['**/*.test.ts'], 
  collectCoverageFrom: [ 
    './src/**/*.{ts,js}',
    '!./src/server.ts' 
  ],
};