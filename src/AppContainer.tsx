import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {defaultScreenOptions, navigationRef} from '@/utils/navigation';
import {IC_RACE, IC_RANK, IC_RUN, IC_SHOP} from '@/assets';
import {CustomTabBar, TabBarIcon} from '@/components/CustomTabBar';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import PreloadScreen from '@/screens/Preload';
import {Routes} from './Routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '@/components/CustomTabBar/CustomDrawerContent';
import HomeScreen from '@/screens/Home/HomeScreen';
import LoginScreen from '@/screens/Login/LoginScreen';
import {AuthContextProvider, useAuthContext} from '@/screens/Login/authContext';
import RegisterScreen from '@/screens/Login/RegisterScreen';
import ClassesScreen from '@/screens/Classes/components/ClassesScreen';

const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();
const MainStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const BottomStack = createBottomTabNavigator();

const MainStackComponent = React.memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.BottomStackScreen}
      screenOptions={{
        ...defaultScreenOptions,
        gestureEnabled: false,
        headerShown: false,
      }}>
      {/*<MainStack.Screen*/}
      {/*  name={Routes.BottomStackScreen}*/}
      {/*  component={BottomStackScreen}*/}
      {/*  options={{*/}
      {/*    gestureEnabled: false,*/}
      {/*  }}*/}
      {/*/>*/}
      <MainStack.Screen name={Routes.ClassesScreen} component={ClassesScreen} />

      <MainStack.Screen
        name={Routes.HomeScreen}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
});

const BottomStackScreen = React.memo(function BottomStackScreen() {
  return (
    <BottomStack.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: JSX.IntrinsicAttributes & BottomTabBarProps) => (
        <CustomTabBar {...props} />
      )}>
      <BottomStack.Screen
        name={Routes.HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_RUN} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <BottomStack.Screen
        name={Routes.HomeScreen}
        options={{
          title: 'Setting',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_RACE} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <BottomStack.Screen
        name={Routes.HomeScreen}
        options={{
          title: 'Marketplace',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_RANK} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <BottomStack.Screen
        name={Routes.HomeScreen}
        options={{
          title: 'User',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_SHOP} color={color} />
          ),
        }}
        component={HomeScreen}
      />
    </BottomStack.Navigator>
  );
});

export const RootStackContainer = React.memo(function RootStackContainer() {
  const {token} = useAuthContext();

  return (
    <RootStack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        gestureEnabled: false,
        headerMode: 'screen',
        headerShown: false,
      }}>
      <RootStack.Group navigationKey={token === '' ? 'auth' : 'user'}>
        <RootStack.Screen name={Routes.LoginScreen} component={LoginScreen} />
        <RootStack.Screen
          name={Routes.RegisterScreen}
          component={RegisterScreen}
        />
      </RootStack.Group>

      <RootStack.Screen
        options={{gestureEnabled: false}}
        name={Routes.MainStackComponent}
        component={MainStackComponent}
      />
    </RootStack.Navigator>
  );
});

export const AppContainer = React.memo(function AppContainer() {
  const routeNameRef = React.useRef<string>('');
  const onStateChange = React.useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <AuthContextProvider>
      <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
        <RootStack.Navigator
          initialRouteName={Routes.Preload}
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}>
          <RootStack.Screen
            name={Routes.Preload}
            component={PreloadScreen}
            options={{animationTypeForReplace: 'pop'}}
          />
          <RootStack.Screen
            options={{gestureEnabled: false}}
            name={Routes.RootStackContainer}
            component={RootStackContainer}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
});

export default AppContainer;
