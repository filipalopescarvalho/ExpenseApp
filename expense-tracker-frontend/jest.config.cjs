module.exports = {
  testEnvironment: "jsdom",               
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",      
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", 
  },
  testMatch: ["**/?(*.)+(test|spec).(js|jsx)"],
};
