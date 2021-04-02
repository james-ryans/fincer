import notifee, { AndroidBadgeIconType, AndroidColor, AndroidImportance } from '@notifee/react-native';

const FinishedDownloadNotification = () => {
  notifee.displayNotification({
    title: 'Download Completed',
    body: 'Your download is completed, press the button below to open gallery',
    android: {
      channelId: 'default-channel-id',
      importance: AndroidImportance.HIGH,
      badgeIconType: AndroidBadgeIconType.LARGE,
    }
  });
};

export { FinishedDownloadNotification };