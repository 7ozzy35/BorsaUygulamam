import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home'; // Ana Sayfa bileşeni
import StockList from './StockList'; // Hisse Listesi bileşeni
import Gold from './Gold'; 
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconSource;
  
              if (route.name === 'Portföyüm') {
                iconSource = focused
                  ? require('./assets/wallet.png')
                  : require('./assets/wallet.png');
              } else if (route.name === 'StockList') {
                iconSource = focused
                  ? require('./assets/list.png')
                  : require('./assets/list.png');
              } 
              else if (route.name === 'Gold') {
                iconSource = focused
                  ? require('./assets/gold.png')
                  : require('./assets/gold.png');
              } else {
                iconSource = require('./assets/question.png'); // Varsayılan ikon
              }
  
              return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: '#1e1e1e' },
          })}
        >
          <Tab.Screen name="Portföyüm" component={Home} />
          <Tab.Screen name="StockList" component={StockList} />
          <Tab.Screen name="Gold" component={Gold} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
  
export default App;