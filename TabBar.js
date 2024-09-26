import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import StockList from './StockList';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Portföyüm') {
              iconName = 'Portföyüm';
            } else if (route.name === 'StockList') {
              iconName = 'list';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="StockList" component={StockList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
