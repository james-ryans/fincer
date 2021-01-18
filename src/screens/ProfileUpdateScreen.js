import * as React from 'react';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';

const ProfileUpdateScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
    </View>
  );
};

export default ProfileUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  backIcon: {
    margin: 16,
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: '#A2A2A2',
    textShadowRadius: 16,
  },
});