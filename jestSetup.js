import { jest } from "@jest/globals";
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('rn-fetch-blob');
jest.mock('react-native-firebase');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};

  return Reanimated;
});