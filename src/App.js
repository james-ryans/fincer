import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, StatusBar, Text } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AuthContext from './utils/authContext';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import InfluencerScreen from './screens/InfluencerScreen';
import InfluencerDetailScreen from './screens/InfluencerDetailScreen';
import InfluencerFilterScreen from './screens/InfluencerFilterScreen';

import BrandScreen from './screens/BrandScreen';

import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const InfluencerStack = createStackNavigator();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const authContextValue = React.useMemo(() => ({
    isSignedIn, 
    setIsSignedIn,
  }), [isSignedIn]);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContextValue}>
        <NavigationContainer>
          <StatusBar hidden />
          { isSignedIn ? (
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
                <Tab.Screen name="BrandTab" component={BrandScreen} />
                <Tab.Screen name="ProfileTab" component={ProfileScreen} />
              </Tab.Navigator>
            ) : (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
              </Stack.Navigator>
            )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;