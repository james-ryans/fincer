import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import { debounce, throttle } from 'lodash';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const BrandScreen = (props) => {
    const { navigation } = props;

    const [isLoading, setIsLoading] = React.useState(true);

    const [premiumCarouselItems, setPremiumCarouselItems] = React.useState();
    const [categoryCarousel, setCategoryCarousel] = React.useState();

    React.useEffect(() => {
        database()
            .ref('/premiums/brands')
            .on('value', (snapshot) => {
            let brands = [];
            snapshot.forEach((item) => {
                brands.push(item.val());
            })
            setPremiumCarouselItems(brands);
            });
    }, []);

    React.useEffect(() => {
        let brands = [];
        database()
            .ref('/categories/brands')
            .once('value', (categorySnapshot) => {
            brands = [];
            categorySnapshot.forEach((category) => {
                brands.push({
                title: category.val().name,
                key: category.key,
                items: [],
                });
            });
        })
        .then(() => {
        database()
            .ref('/brands')
            .on('value', (brandSnapshot) => {
            brands = brands.map((brand) => {
                brand.items = [];
                return brand;
            });

            brandSnapshot.forEach((snapshot) => {
                brands = brands.map((brand) => {
                if (brand.key === snapshot.val().category) {
                    brand.items.push(snapshot.val());
                }
                return brand;
                });
            });

            setCategoryCarousel(brands);
            });
        });
    }, []);

    React.useEffect(() => {
        setIsLoading(!categoryCarousel?.length);
    }, [categoryCarousel]);

    const onFocusHandler = debounce(() => {
        navigation.navigate('BrandFilter');
    }, 2000, { leading: true, trailing: false });

    if (isLoading) {
        return null;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
            <TopSearchBar
                onFocus={onFocusHandler} />
            {   premiumCarouselItems.length > 0 && 
                <PremiumCarousel
                    containerStyle={styles.premiumCarousel}
                    carouselItems={premiumCarouselItems}
                    navigation={navigation}
                    navigateTo="BrandDetail" />
            }
            { categoryCarousel.map((category, index) => {
                if (category.items.length === 0) return null;
                return <CategoryCarousel
                    key={index}
                    containerStyle={styles.categoryCarousel}
                    carouselItems={category}
                    navigation={navigation}
                    navigateTo="BrandDetail" />
            })
            }
            </View>
        </ScrollView>
    );
};

export default BrandScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    premiumCarousel: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginVertical: 12,
    },
    categoryCarousel: {
        marginBottom: 40,
    },
});