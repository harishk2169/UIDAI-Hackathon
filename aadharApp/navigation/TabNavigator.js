import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Request from '../screens/Request';
import Received from '../screens/Received';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Request"
      component={Request}
      options={{
        tabBarIcon: () => {
          return <Icon name="map-marked-alt" type="font-awesome" size={24} />;
        },
      }}
    />
    <Tab.Screen name="Received" component={Received} />
  </Tab.Navigator>
);

export default TabNavigator;
