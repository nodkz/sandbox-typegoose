module.exports = {
  roots: ["<rootDir>/src"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      isolatedModules: true,
      diagnostics: false
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: ["**/__tests__/**/*-test.(ts|js)"],
  testEnvironment: "node"
};
