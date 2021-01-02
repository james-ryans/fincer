import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthContext from './utils/authContext';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            { isSignedIn ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="SignIn" component={SignInScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;