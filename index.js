/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: "download-channel-id",
    channelName: "Download",
    channelDescription: "A channel to categorise downloads",
    soundName: "default",
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    
    if (notification.action === "Gallery") {
      try {
        Linking.openURL('content://media/internal/images/media');
      } catch (e) {
        console.warn(e.message);
      }
    }
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
