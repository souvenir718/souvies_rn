import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigation/RootStack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

function App() {
  StatusBar.setBackgroundColor('transparent');
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
