import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, StatusBar, Text, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { debounce, throttle } from 'lodash';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import InfluencerScreen from './screens/InfluencerScreen';
import InfluencerDetailScreen from './screens/InfluencerDetailScreen';
import InfluencerFilterScreen from './screens/InfluencerFilterScreen';

import BrandScreen from './screens/BrandScreen';
import BrandDetailScreen from './screens/BrandDetailScreen';
import BrandFilterScreen from './screens/BrandFilterScreen';

import ProfileScreen from './screens/ProfileScreen';
import ProfileUpdateScreen from './screens/ProfileUpdateScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const InfluencerStack = createStackNavigator();
const BrandStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  const onConnectionChanged = debounce((isConnected) => {
    ToastAndroid.show('You are ' + (isConnected ? 'online!' : 'offline!'), ToastAndroid.SHORT);
  }, 2000);
  
  React.useEffect(() => {
    NetInfo.configure({
      reachabilityLongTimeout: 10 * 1000, // 10s
      reachabilityShortTimeout: 3 * 1000, // 3s
      reachabilityRequestTimeout: 5 * 1000, // 5s
    })

    const unsubscribe = NetInfo.addEventListener(state => {
      onConnectionChanged(state.isConnected);
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
      <NavigationContainer>
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
                name="ProfileTab"
                options={({ route }) => ({
                  tabBarVisible: getFocusedRouteNameFromRoute(route) == 'ProfileUpdate' ? false : true,
                })}>
                {() => (
                  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
                    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
                    <ProfileStack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
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