/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Linking, LogBox } from 'react-native';
import invokeApp from 'react-native-invoke-app';
import { StackActions } from '@react-navigation/routers';

import * as RootNavigation from './src/RootNavigation';

LogBox.ignoreAllLogs();

// pembuatan channel "download-channel-id" dan "profile-channel-id"
notifee.createChannel({
  id: 'download-channel-id',
  name: 'Downloads',
  vibration: true,
  importance: AndroidImportance.HIGH,
  badge: true,
});

notifee.createChannel({
  id: 'profile-channel-id',
  name: 'Profiles',
  vibration: true,
  importance: AndroidImportance.HIGH,
  badge: true,
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    invokeApp();
    RootNavigation.resetToProfile();
  }

  if (type === EventType.ACTION_PRESS && pressAction.id === 'gallery') {
    Linking.openURL('content://media/internal/images/media');
    notifee.cancelNotification(notification.id);
  }
})

AppRegistry.registerComponent(appName, () => App);
