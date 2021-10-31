import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Request from '../screens/Request';
import Received from '../screens/Received';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Request') {
          iconName = 'map-marker';
        } else if (route.name === 'Received') {
          iconName = 'users';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveBackgroundColor: 'tomato',
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: {
        fontSize: 13,
      },
    })}>
    <Tab.Screen name="Request" component={Request} />
    <Tab.Screen name="Received" component={Received} />
  </Tab.Navigator>
);

export default TabNavigator;
