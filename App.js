/**
 * 2022
 * Bimo Tactical App
 * Universitas Negeri Jakarta
 * Created: Imam Ramadhan
 * with zustand state management
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { colorScheme } from './src/components/theme/theme';
import { LogBox } from 'react-native';
import Routes from './src/routes/routes';

// ignore warning
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  
  return (
    <>
     <StatusBar 
        barStyle='light-content' 
        backgroundColor={colorScheme.green} 
      />
     <Routes />
    </>
  );
};

export default App;
