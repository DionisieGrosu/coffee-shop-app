/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
if (__DEV__) {
  require('./ReactotronConfig');
}

import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import Store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <StoreProvider store={Store}>
      <NavigationContainer>
        <MenuProvider>
          <Navigation />
          <FlashMessage position="top" />
        </MenuProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

export default App;
