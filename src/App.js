import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AuthContext from './utils/authContext';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import InfluencerScreen from './screens/InfluencerScreen';
import BrandScreen from './screens/BrandScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
                    if (route.name === 'Influencer') {
                      iconName = focused
                        ? 'people'
                        : 'people-outline';
                    } else if (route.name === 'Brand') {
                      iconName = focused 
                        ? 'briefcase-sharp' 
                        : 'briefcase-outline';
                    } else if (route.name === 'Profile') {
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
                <Tab.Screen name="Influencer" component={InfluencerScreen} />
                <Tab.Screen name="Brand" component={BrandScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
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