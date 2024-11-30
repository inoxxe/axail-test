// jest.setup.js
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['en'],
    },
  };
  RN.NativeModules.RNDocumentPicker = {};
  return RN;
});

jest.mock('react-native-document-picker', () => ({
  __esModule: true,
  pick: {
    mockResolvedValueOnce: value => {
      return Promise.resolve(value);
    },
  },
  isCancel: jest.fn(),
  isInProgress: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  __esModule: true,
  RNFS: {
    readFile: {
      mockResolvedValueOnce: value => {
        return Promise.resolve(value);
      },
    },
  },
}));
