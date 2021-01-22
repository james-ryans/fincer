import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

import TopSearchBar from '../components/TopSearchBar';
import BannerList from '../components/BannerList';
import CardList from '../components/CardList';

const BrandFilterScreen = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [categoryKey, setCategoryKey] = React.useState('');

  const [categories, setCategories] = React.useState();

  const [brands, setBrands] = React.useState([
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
  ]);

    React.useEffect(() => {
        database()
        .ref('/categories/brands')
        .once('value', (snapshot) => {
            let category_arr = [];
            snapshot.forEach((item) => {
            category_arr.push({
                ...item.val(),
                key: item.key,
            })
            });
            setCategories(category_arr);
        });
    }, []);

    React.useEffect(() => {
        database()
        .ref('/brands/')
        .on('value', (snapshot) => {
            let brand_arr = [];
            snapshot.forEach((item) => {
            brand_arr.push(item.val());
            });
            setBrands(brand_arr);
        });
    }, []);

    React.useEffect(() => {
        setIsLoading(!categories?.length || !brands);
    }, [categories, brands]);

    if (isLoading) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TopSearchBar
                isFocused={true}
                onChangeText={(search) => { setSearch(search); }}
                value={search} />
        
            <ScrollView style={styles.scrollViewContainer}>
                <BannerList
                title="Categories"
                items={categories}
                onPressHandler={(value, key) => {
                    setCategory(value);
                    setCategoryKey(key);
                }} />
                <CardList
                title={(category ? category + " " : "") + "Brands"}
                items={brands.filter((brand) => {
                    return brand.name.toLowerCase().includes(search.toLowerCase()) && (categoryKey === '' || categoryKey === brand.category);
                })}
                navigation={navigation}
                navigateTo="BrandDetail" />
            </ScrollView>
        </View>
    );
};

export default BrandFilterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    scrollViewContainer: {
        flex: 1,
        paddingHorizontal: 24,
    }
});