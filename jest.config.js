const {defaults} = require("jest-config");

module.exports = {
  bail: true,
  preset: "ts-jest",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx", "scss"],
  testEnvironment: "jsdom",
  roots: ["src"],
  testMatch: ["<rootDir>/src/**/?(*.)test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
  transform: {
    //"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
