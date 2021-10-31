import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Login from '../screens/Login';
import GeneratePIN from '../screens/PINGenerate';
import GetStarted from '../screens/GetStarted';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Get Started" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="PIN Generate" component={GeneratePIN} />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="bottom" style={{elevation: 10}} />
    </NavigationContainer>
  );
};

export default AppNavigator;
