import PushNotification from 'react-native-push-notification';

const DownloadNotification = () => {
  PushNotification.localNotification({
    channelId: 'download-channel-id',
    title: 'Download Completed',
    message: 'Your download is completed',
    bigText: 'Your download is completed, press the button below to open gallery',
    playSound: true,
    soundName: 'default',
    actions: '["Gallery"]',
  });
};

export { DownloadNotification };