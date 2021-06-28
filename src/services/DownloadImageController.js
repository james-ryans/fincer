import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
import {FinishedDownloadNotification} from './NotificationController';

const checkPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Storage Permission Required',
      message: 'App needs access to your storage to download Photos',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const download = async (data) => {
  let date = new Date();
  let image_URL = data.imageURI;
  let ext = getExtention(image_URL);
  ext = '.' + ext[0];
  if (ext.slice(-1) == '?') {
    ext = ext.slice(0, -1);
  }
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      // notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'File downloaded',
    },
  };

  RNFetchBlob.config(options)
    .fetch('GET', image_URL)
    .then((res) => {
      console.log('The file saved to', res.path());
      FinishedDownloadNotification();
    });
};

const getExtention = (filename) => {
  return /[.]/.exec(filename) ? /[^.]+[?|$]/.exec(filename) : undefined;
};

const DownloadImage = async (data) => {
  try {
    let permissionGranted = await checkPermission();
    if (permissionGranted) {
      download(data);
    }
  } catch (err) {
    console.warn(err);
  }
};

export default DownloadImage;
