import React from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';

import {TransitionPresets} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/core';
import {Routes} from '@/Routes';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const openDrawer = () =>
  navigation().dispatch(DrawerActions.openDrawer());

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.push(screenName, params));
  };

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const goBack = () => navigation().goBack();

export const navigateToRootScreen = createReplace(Routes.RootStackContainer);

export const navigateToLoginScreen = createNavigate(Routes.LoginScreen);

export const navigateToRegisterScreen = createNavigate(Routes.RegisterScreen);

export const navigateToMainStack = createNavigate(Routes.MainStackComponent);
