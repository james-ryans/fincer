import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const BrandScreen = ({ navigation, route }) => {
    const [premiumCarouselItems, setPremiumCarouselItems] = React.useState([
    {
        source: 'https://www.innisfree.com/id/id/upload/product/30631_l.png',
        name: 'Vivid Slim Fit Tint',
        category: 'Beauty',
    },
    {
        source: 'https://d1sag4ddilekf6.cloudfront.net/compressed/items/IDITE2020100310010528269/photo/menueditor_item_1a4012bd19474f2a92d381bae9e22090_1601721507827501482.jpg',
        name: 'Donat Kesu Keju Merona',
        category: 'Foods',
    },
    {
        source: 'https://www.innisfree.com/id/id/upload/product/35160_l.png',
        name: 'Black Tea Youth Enhancing Ampoule 30 mL',
        category: 'Beauty',
    },
    {
        source: 'https://www.innisfree.com/id/id/upload/product/32158_l.png',
        name: 'Jeju Lava Seawater Boosting Ampoule ex 25 mL',
        category: 'Beauty',
    },
    ]);
    const [categoryCarousel, setCategoryCarousel] = React.useState([
    {
        title: 'Fashion',
        items: [
        {
            source: 'https://www.dhresource.com/f2/albu/g10/M00/62/B4/rBVaVl542fiABOP5AAKNnl_7T-s845.jpg',
            name: 'Two pieces sets: Summer Sweet Korean Off Shoulder Tops and Shorts',
            category: 'Women Fashion',
            province: 'North Sumatra',
            city: 'Medan'
        },
        {
            source: 'https://images-na.ssl-images-amazon.com/images/I/61DNdwVqvdL._UL1001_.jpg',
            name: 'Denim Jackets Shred Baggy Korean Style Hip Hop Casual Outfit Coat',
            category: 'Men Fashion',
            province: 'DKI Jakarta',
            city: 'Jakarta'
        },
        ],
    },
    {
        title: 'Foods&Drinks',
        items: [
        {
            source: 'https://tidbitsmag.com/wp-content/uploads/2019/05/Jinjja-Chicken.jpg',
            name: 'Big Bang Set A',
            category: 'Foods',
            province: 'DI Jogjakarta',
            city: 'Jogjakarta'
        },
        {
            source: 'https://live.staticflickr.com/65535/49958664992_cda293a8e9_o.jpg',
            name: 'Donat Kesu Avocado Coklat',
            category: 'Foods',
            province: 'North Sumatra',
            city: 'Medan'
        },
        ],
    }
    ]);
  return (
    <ScrollView>
        <View style={styles.container}>
        <TopSearchBar />
        <PremiumCarousel
            containerStyle={styles.premiumCarousel}
            carouselItems={premiumCarouselItems} />
        { categoryCarousel.map((category, index) => {
            return <CategoryCarousel
                key={index}
                containerStyle={styles.categoryCarousel}
                carouselItems={category}
                navigation={navigation} />
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