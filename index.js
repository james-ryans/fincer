/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { AndroidImportance } from '@notifee/react-native';

notifee.createChannel({
  id: 'default-channel-id',
  name: 'Downloads',
  vibration: true,
  importance: AndroidImportance.HIGH,
  badge: true,
});

AppRegistry.registerComponent(appName, () => App);
