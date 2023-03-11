import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking'

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { useAuth } from '../context';

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      AccountCreated: 'account-created',
      ResetPassword: 'reset-password'
    }
  }
}

export const Router = () => {
  const { authData } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      {authData ? <AppStack Stack={Stack} /> : <AuthStack Stack={Stack} />}
    </NavigationContainer>
  );
};