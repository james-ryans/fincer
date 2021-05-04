import Sound from 'react-native-sound';

const PlayInitSound = () => {
  var fincer = new Sound('fincer.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }

    fincer.play((success) => {
      if (success) {
        console.log('successfully played the sound');
      }
  
      fincer.release();
    });
  });
};

export default PlayInitSound;