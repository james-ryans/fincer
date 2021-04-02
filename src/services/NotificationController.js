import notifee, { AndroidBadgeIconType, AndroidColor, AndroidImportance, AndroidStyle } from '@notifee/react-native';

const FinishedDownloadNotification = async () => {
  await notifee.displayNotification({
    title: '<p style="color: #000080"><b>Download Completed</b></p> &#128229;',
    android: {
      channelId: 'download-channel-id',
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
      style: {
        type: AndroidStyle.BIGTEXT,
        text: 'Your download is completed, press the <b>gallery</b> button below to open gallery &#128071;&#128071;&#128071;',
      },
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

const FinishedCreateProfileNotification = async () => {
  await notifee.displayNotification({
    title: '<p style="color: #009900"><b>Create/Update Profile Success</b></p>',
    android: {
      channelId: 'profile-channel-id',
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
      style: {
        type: AndroidStyle.BIGTEXT,
        text: 'Create or update profile success! Other user can now see your <b>profile</b> &#127881!'
      },
    },
  });
};

const FinishedDeleteProfileNotification = async () => {
  await notifee.displayNotification({
    title: '<p style="color: #FF0000"><b>Profile Deleted</b></p>',
    body: '<p style="color: #FF9999">Your profile is fully deleted now.</p>',
    android: {
      channelId: 'profile-channel-id',
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
    },
  });
}

export { FinishedDownloadNotification, FinishedCreateProfileNotification, FinishedDeleteProfileNotification };