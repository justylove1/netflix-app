import React, {memo} from 'react';
import Config from 'react-native-config';

export const HomeScreen = memo(function HomeScreen() {
  console.log('check into', Config.ENV);
  return <></>;
});

export default HomeScreen;
