/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Linking } from 'react-native';

notifee.createChannel({
  id: 'download-channel-id',
  name: 'Downloads',
  vibration: true,
  importance: AndroidImportance.HIGH,
  badge: true,
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    const initialNotification = notifee.getInitialNotification();
    console.log('notification caused app to open', initialNotification.notification);
    console.log('press action used to open the app', initialNotification.pressAction);
  }

  if (type === EventType.ACTION_PRESS && pressAction.id === 'gallery') {
    Linking.openURL('content://media/internal/images/media');
  }
})

AppRegistry.registerComponent(appName, () => App);
