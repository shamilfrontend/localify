module.exports = {
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/$1',
    '^~/(.*)$': '<rootDir>/client/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['<rootDir>/**/*.test.(ts|tsx|js)'],
  testURL: 'http://localhost/',
  setupFiles: ['./jestSetup.js'],
  coverageDirectory: '<rootDir>/client/tests/unit/coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/client/components/**/*.vue',
    '<rootDir>/client/layouts/**/*.vue',
    '<rootDir>/client/pages/**/*.vue',
    '<rootDir>/client/common/helpers/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 10.0,
      functions: 20.0,
      lines: 30.0
    }
  }
}
