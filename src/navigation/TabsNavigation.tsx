import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import Main from '../screens/Main';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {View} from 'react-native';
import tx from '../libs/tailwind';

function TabsNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          paddingTop: 24,
          paddingBottom: 24,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      }}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{width: 24, height: 24, alignItems: 'center'}}>
              <FontAwesomeIcon
                size={24}
                icon={faHouse}
                color={focused ? '#C67C4E' : '#8D8D8D'}
              />
              <View
                style={tx`w-[10px] h-[5px] ${
                  focused ? 'bg-orangeCustom' : 'bg-transparent'
                } rounded mt-[5px]`}></View>
            </View>
          ),
          tabBarIconStyle: {width: 24, height: 24},
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{width: 24, height: 24, alignItems: 'center'}}>
              <FontAwesomeIcon
                size={24}
                icon={faHeart}
                color={focused ? '#C67C4E' : '#8D8D8D'}
              />
              <View
                style={tx`w-[10px] h-[5px] ${
                  focused ? 'bg-orangeCustom' : 'bg-transparent'
                } rounded mt-[5px]`}></View>
            </View>
          ),
          tabBarIconStyle: {width: 24, height: 24},
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{width: 24, height: 24, alignItems: 'center'}}>
              <FontAwesomeIcon
                size={24}
                icon={faCartShopping}
                color={focused ? '#C67C4E' : '#8D8D8D'}
              />
              <View
                style={tx`w-[10px] h-[5px] ${
                  focused ? 'bg-orangeCustom' : 'bg-transparent'
                } rounded mt-[5px]`}></View>
            </View>
          ),
          tabBarIconStyle: {width: 24, height: 24},
        }}
      />
    </Tab.Navigator>
  );
}

export default TabsNavigation;
