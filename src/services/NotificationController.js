import notifee, { TimestampTrigger, TriggerType, AndroidBadgeIconType, AndroidColor, AndroidImportance, AndroidStyle } from '@notifee/react-native';

const FinishedDownloadNotification = async () => {
  await notifee.displayNotification({
    title: '<p><b>Download Completed</b></p>',
    android: {
      channelId: 'download-channel-id',
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
      style: {
        type: AndroidStyle.BIGTEXT,
        text: 'Your download is completed, press the <b>gallery</b> button below to open gallery.',
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

const ReminderTimerNotification = async (hour, minute) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + Math.max(30, hour * 3600 + minute * 60) * 1000,
  };

  await notifee.createTriggerNotification({
    title: '<p><b>Reminder Create/Update Profile</b></p>',
    body: 'Maybe you should try create/update your profile again now.',
    android: {
      channelId: 'profile-channel-id',
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
    },
  }, trigger);
};

export { 
  FinishedDownloadNotification, 
  FinishedCreateProfileNotification, 
  FinishedDeleteProfileNotification,
  ReminderTimerNotification,
};