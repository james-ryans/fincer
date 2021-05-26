import { file } from '@babel/types';
import * as React from 'react';
import { ToastAndroid } from 'react-native';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, ScrollView, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const NotesScreen = (props) => {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [notes, setNotes] = React.useState([]);
  const [storage, setStorage] = React.useState('internal');

  React.useEffect(() => {
    getNotes('internal');
  }, []);

  const checkPermission = async () => {
    const requests = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    return requests['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      && requests['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED;
  };

  const getNotes = async (place) => {
    const granted = place === 'internal' ? true : await checkPermission();
    if (!granted) return;

    const notesDir = place === 'internal'
      ? RNFetchBlob.fs.dirs.DocumentDir + '/notes'
      : RNFetchBlob.fs.dirs.SDCardApplicationDir + '/files/notes';

    await RNFetchBlob.fs.isDir(notesDir)
      .then((isDir) => {
        if (!isDir) RNFetchBlob.fs.mkdir(notesDir);
      });

    await RNFetchBlob.fs.ls(notesDir)
      .then((files) => {
        var txtFiles = [];
        for (const file of files) {
          if (file.endsWith('.txt')) txtFiles.push(file);
        }

        setNotes(txtFiles);
        setStorage(place.charAt(0).toUpperCase() + place.slice(1));
      });
  };

  const resetText = () => {
    setText('');
    setTitle('');
  };

  const saveText = async (place) => {
    const granted = place === 'internal' ? true : await checkPermission();
    if (!granted) return;

    if (!title) {
      alert('Filename must not empty!');
      return;
    }

    const notesDir = place === 'internal'
      ? RNFetchBlob.fs.dirs.DocumentDir + '/notes'
      : RNFetchBlob.fs.dirs.SDCardApplicationDir + '/files/notes';

    await RNFetchBlob.fs.isDir(notesDir)
      .then((isDir) => {
        if (!isDir) RNFetchBlob.fs.mkdir(notesDir);
      });

    await RNFetchBlob.fs.writeFile(notesDir + '/' + title + '.txt', text, 'utf8');
    const stats = await RNFetchBlob.fs.stat(notesDir + '/' + title + '.txt');
    ToastAndroid.show(`Save Note ${title}.txt with ${stats.size} byte(s)!`, ToastAndroid.SHORT);
  };

  const titleChangeHandler = (curTitle) => {
    if (curTitle.match(/^[a-z0-9_]*$/i)) {
      setTitle(curTitle);
    }
  };

  const readFile = async (filename) => {
    const granted = storage === 'Internal' ? true : await checkPermission();
    if (!granted) return;

    const notesDir = storage === 'Internal'
      ? RNFetchBlob.fs.dirs.DocumentDir + '/notes'
      : RNFetchBlob.fs.dirs.SDCardApplicationDir + '/files/notes';

    await RNFetchBlob.fs.readFile(notesDir + '/' + filename)
      .then((data) => {
        setText(data);
        setTitle(filename.replace('.txt', ''));
        ToastAndroid.show('Get Note ' + filename + '!', ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.title}>Note</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Nama File'
          placeholderTextColor='#4F4F4F'
          onChangeText={titleChangeHandler}
          value={title}/>
        <TextInput
          multiline={true}
          style={{...styles.textInput, height: 256}}
          placeholder='Isi Note'
          placeholderTextColor='#4F4F4F'
          onChangeText={setText}
          value={text}/>

        <View style={styles.actionContainer}>
          <TouchableHighlight
            style={styles.resetButton}
            onPress={resetText}>
            <View>
              <Text style={styles.buttonText}>RESET</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => saveText('internal')}>
            <View>
              <Text style={styles.buttonText}>SAVE internal</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => saveText('external')}>
            <View>
              <Text style={styles.buttonText}>SAVE external</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.fetchContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => getNotes('internal')}>
            <View>
              <Text style={styles.buttonText}>INTERNAL</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={() => getNotes('external')}>
            <View>
              <Text style={styles.buttonText}>EXTERNAL</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Text style={styles.storageTitle}>{ storage }</Text>
        <View style={styles.listContainer}>
          { notes.map((note, index) => {
              return (
                <TouchableOpacity key={index}
                  style={styles.listCard}
                  onPress={() => readFile(note)}>
                  <Text style={styles.listText}>{ note }</Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222832',
  },
  textInput: {
    marginTop: 6,
    backgroundColor: '#F2F2F2',
    color: '#222832',
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 8,
    height: 48,
    textAlignVertical: 'top',
  },
  fetchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FF8D6F',
    width: (SCREEN_WIDTH - 72) / 2,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  actionContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resetButton: {
    backgroundColor: '#DA2929',
    width: (SCREEN_WIDTH - 72) / 4,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  saveButton: {
    marginLeft: 12,
    backgroundColor: '#228B22',
    width: (SCREEN_WIDTH - 32) / 3,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  listCard: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  listText: {
    fontSize: 16,
  },
  storageTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  }
});