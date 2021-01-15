import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { debounce, throttle } from 'lodash';

import TopSearchBar from '../components/TopSearchBar';
import PremiumCarousel from '../components/PremiumCarousel';
import CategoryCarousel from '../components/CategoryCarousel';

const BrandScreen = (props) => {
    const { navigation } = props;

    const [premiumCarouselItems, setPremiumCarouselItems] = React.useState([
    {
        source: 'https://www.innisfree.com/id/id/upload/product/30631_l.png',
        name: 'Vivid Slim Fit Tint',
        category: 'Beauty',
        description: 'Our brand Innisfree is a natural brand that shares the '+
                'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
        price: 300000,
    },
    {
        source: 'https://d1sag4ddilekf6.cloudfront.net/compressed/items/IDITE2020100310010528269/photo/menueditor_item_1a4012bd19474f2a92d381bae9e22090_1601721507827501482.jpg',
        name: 'Donat Kesu Keju Merona',
        category: 'Foods',
        description: 'Our brand Innisfree is a natural brand that shares the '+
                'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
        price: 300000,
    },
    {
        source: 'https://www.innisfree.com/id/id/upload/product/35160_l.png',
        name: 'Black Tea Youth Enhancing Ampoule 30 mL',
        category: 'Beauty',
        description: 'Our brand Innisfree is a natural brand that shares the '+
                'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
        price: 300000,
    },
    {
        source: 'https://www.innisfree.com/id/id/upload/product/32158_l.png',
        name: 'Jeju Lava Seawater Boosting Ampoule ex 25 mL',
        category: 'Beauty',
        description: 'Our brand Innisfree is a natural brand that shares the '+
                'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
        price: 300000,
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
            city: 'Medan',
            description: 'Our brand Innisfree is a natural brand that shares the '+
                    'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                    'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                    'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                    'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
            price: 300000,
        },
        {
            source: 'https://images-na.ssl-images-amazon.com/images/I/61DNdwVqvdL._UL1001_.jpg',
            name: 'Denim Jackets Shred Baggy Korean Style Hip Hop Casual Outfit Coat',
            category: 'Men Fashion',
            province: 'DKI Jakarta',
            city: 'Jakarta',
            description: 'Our brand Innisfree is a natural brand that shares the '+
                    'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                    'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                    'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                    'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
            price: 300000,
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
            city: 'Jogjakarta',
            description: 'Our brand Innisfree is a natural brand that shares the '+
                    'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                    'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                    'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                    'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
            price: 300000,
        },
        {
            source: 'https://live.staticflickr.com/65535/49958664992_cda293a8e9_o.jpg',
            name: 'Donat Kesu Avocado Coklat',
            category: 'Foods',
            province: 'North Sumatra',
            city: 'Medan',
            description: 'Our brand Innisfree is a natural brand that shares the '+
                    'benefits of nature from the pristine island of Jeju for healthy beauty and pursues an eco-friendly '+
                    'green life to preserve the balance of nature\n\n\nProduct name: Vivid Slim Fit Tint 3\nFill up your lips completely with the '+
                    'waterdrop-shaped tint! The waterdrop-shaped tip allows an exquisite makeup such as emphasizing the lip line '+
                    'or creating a sumptuous full lip.\n\nContact us at @innisfree_e or click our website wwww.innisfree.com\n.\n.\n.\n.\n.\n.',
            price: 300000,
        },
        ],
    }
    ]);

  const onFocusHandler = debounce(() => {
    navigation.navigate('BrandFilter');
  }, 2000, { leading: true, trailing: false });

  return (
    <ScrollView>
        <View style={styles.container}>
        <TopSearchBar
            onFocus={onFocusHandler} />
        <PremiumCarousel
            containerStyle={styles.premiumCarousel}
            carouselItems={premiumCarouselItems}
            navigation={navigation}
            navigateTo="BrandDetail" />
        { categoryCarousel.map((category, index) => {
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