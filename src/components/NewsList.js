import * as React from 'react';
import {Linking} from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {AdMobBanner, AdMobInterstitial} from 'react-native-admob';
import Image from 'react-native-scalable-image';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

const NewsList = (props) => {
  const {items} = props;

  React.useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        return (
          <>
            {index % 10 === 0 ? (
              <AdMobBanner
                style={styles.banner}
                adSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={(error) => console.error(error)}
              />
            ) : null}
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                Linking.openURL(item.url);
              }}>
              <View style={styles.card}>
                <Image
                  width={SCREEN_WIDTH - 64}
                  style={styles.cardImage}
                  progressiveRenderingEnabled={true}
                  source={{uri: item.thumbnail}}
                />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title} </Text>
                  <Text style={styles.cardSubcategory}>{item.abstract}</Text>
                  <Text style={styles.cardByLine}>{item.byline}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </>
        );
      })}
    </View>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#F2F2F2',
    width: SCREEN_WIDTH - 64,
    marginTop: 40,
    borderRadius: 12,
  },
  cardImage: {
    width: SCREEN_WIDTH - 64,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardSubcategory: {
    fontSize: 13,
    color: '#626262',
  },
  cardByLine: {
    marginTop: 12,
    fontSize: 12,
    color: '#626262',
    alignSelf: 'flex-end',
  },
  banner: {
    marginTop: 40,
  },
});
