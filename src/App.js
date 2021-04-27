import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, StatusBar, Text, Linking } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import notifee, { EventType } from '@notifee/react-native';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import InfluencerScreen from './screens/InfluencerScreen';
import InfluencerDetailScreen from './screens/InfluencerDetailScreen';
import InfluencerFilterScreen from './screens/InfluencerFilterScreen';

import BrandScreen from './screens/BrandScreen';
import BrandDetailScreen from './screens/BrandDetailScreen';
import BrandFilterScreen from './screens/BrandFilterScreen';

import NewsScreen from './screens/NewsScreen';
import NewsController from './controllers/NewsController';

import ProfileScreen from './screens/ProfileScreen';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';
import GalleryScreen from './screens/GalleryScreen';

import * as RootNavigation from './RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const InfluencerStack = createStackNavigator();
const BrandStack = createStackNavigator();
const NewsStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.PRESS) {
        RootNavigation.navigate('ProfileTab');
      }

      if (type === EventType.ACTION_PRESS && pressAction.id === 'gallery') {
        Linking.openURL('content://media/internal/images/media');
        notifee.cancelNotification(notification.id);
      }
    });
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <StatusBar hidden />
        { !user ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator 
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'InfluencerTab') {
                    iconName = focused
                      ? 'people'
                      : 'people-outline';
                  } else if (route.name === 'BrandTab') {
                    iconName = focused 
                      ? 'briefcase-sharp' 
                      : 'briefcase-outline';
                  } else if (route.name === 'NewsTab') {
                    iconName = focused
                      ? 'newspaper'
                      : 'newspaper-outline'
                  } else if (route.name === 'ProfileTab') {
                    iconName = focused
                      ? 'person-circle'
                      : 'person-circle-outline';
                  }

                  return <Ionicons name={iconName} size={30} color={color} />;
                }
              })}
              tabBarOptions={{
                activeTintColor: '#FF8D6F',
                inactiveTintColor: 'gray',
                showLabel: false,
                style: { 
                  height: 64,
                  borderTopWidth: null,
                  elevation: null,
                }
              }}>
              <Tab.Screen 
                name="InfluencerTab"
                options={({ route }) => ({
                  tabBarVisible: getFocusedRouteNameFromRoute(route) == 'InfluencerDetail' ? false : true,
                })}>
                {() => (
                  <InfluencerStack.Navigator screenOptions={{ headerShown: false }}>
                    <InfluencerStack.Screen name="Influencer" component={InfluencerScreen} />
                    <InfluencerStack.Screen name="InfluencerDetail" component={InfluencerDetailScreen} />
                    <InfluencerStack.Screen name="InfluencerFilter" component={InfluencerFilterScreen} />
                  </InfluencerStack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen 
                name="BrandTab"
                options={({ route }) => ({
                  tabBarVisible: getFocusedRouteNameFromRoute(route) == 'BrandDetail' ? false : true,
                })}>
                {() => (
                  <BrandStack.Navigator screenOptions={{ headerShown: false }}>
                    <BrandStack.Screen name="Brand" component={BrandScreen} />
                    <BrandStack.Screen name="BrandDetail" component={BrandDetailScreen} />
                    <BrandStack.Screen name="BrandFilter" component={BrandFilterScreen} />
                  </BrandStack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen 
                name="NewsTab">
                {() => (
                  <NewsStack.Navigator screenOptions={{ headerShown: false }}>
                    <NewsStack.Screen name="News" component={NewsController} />
                  </NewsStack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen 
                name="ProfileTab"
                options={({ route }) => ({
                  tabBarVisible: getFocusedRouteNameFromRoute(route) == 'ProfileUpdate' ? false : true,
                })}>
                {() => (
                  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
                    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
                    <ProfileStack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
                    <ProfileStack.Screen name="Gallery" component={GalleryScreen} />
                  </ProfileStack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;