import RNFetchBlob from "rn-fetch-blob";

const FetchMusicList = async () => {
  const musicDir = RNFetchBlob.fs.dirs.MusicDir;

  let data = [];
  await RNFetchBlob.fs.ls(musicDir)
    .then((res) => {
      data = res.map((item) => {
        let [artist, title] = item.split('-');
        title = title.split('.')[0].replace(/_/g, ' ');
        return {
          title,
          artist,
          id: 'file://' + musicDir + '/' + item,
          url: 'file://' + musicDir + '/' + item,
        };
      });
    });

  return data;
};

export default FetchMusicList;