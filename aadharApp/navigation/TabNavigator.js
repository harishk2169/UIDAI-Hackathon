import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Request from '../screens/Request';
import Received from '../screens/Received';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Request" component={Request} />
    <Tab.Screen name="Received" component={Received} />
  </Tab.Navigator>
);

export default TabNavigator;
