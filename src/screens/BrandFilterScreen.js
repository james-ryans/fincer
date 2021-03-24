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

  const [brands, setBrands] = React.useState();

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