module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { presets: ["module:metro-react-native-babel-preset"] }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|@expo|expo-modules-core|@unimodules|unimodules|firebase|@firebase|expo-font|expo-splash-screen)",
  ],
  moduleNameMapper: {
    '\\.ttf$': '<rootDir>/__mocks__/fileMock.js',
  },
};
