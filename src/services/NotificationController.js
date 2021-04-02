import notifee, { AndroidBadgeIconType, AndroidColor, AndroidImportance } from '@notifee/react-native';

const FinishedDownloadNotification = async () => {
  await notifee.displayNotification({
    title: 'Download Completed',
    body: 'Your download is completed, press the button below to open gallery',
    android: {
      channelId: 'download-channel-id',
      importance: AndroidImportance.HIGH,
      actions: [
        {
          title: 'Gallery',
          pressAction: {
            id: 'gallery',
          },
        },
      ],
    },
  });
};

export { FinishedDownloadNotification };