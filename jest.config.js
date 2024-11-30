module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-document-picker|react-native-fs)/)',
  ],
  moduleNameMapper: {
    '^react-native-document-picker$': '<rootDir>/__mocks__/react-native-document-picker.ts',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
