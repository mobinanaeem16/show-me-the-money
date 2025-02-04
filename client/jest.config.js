module.exports = {
  preset: "ts-jest", // Use ts-jest for TypeScript files
  testEnvironment: "jsdom", // For React components (if using React)
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files with ts-jest
    "^.+\\.js$": "babel-jest", // Transform JavaScript files with babel-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  testMatch: ["**/src/**/*.test.tsx"], // Path to your test files
};
