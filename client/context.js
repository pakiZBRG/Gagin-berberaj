import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as NavigationBar from 'expo-navigation-bar'

import { ApiManager } from './api';

const AppContext = React.createContext(null)

const useAuth = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

const AppProvider = ({ children }) => {
  const [authData, setAuthData] = useState();

  const isLoggedIn = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@user');
      if (authDataSerialized) {
        const data = JSON.parse(authDataSerialized);
        setAuthData(data);
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async (loginData) => {
    const data = await ApiManager('/login', 'POST', loginData)
    if (data.error) {
      Toast.show({
        type: 'warning',
        text2: data.message.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text2: data.data.message
      })
      AsyncStorage.setItem('@user', JSON.stringify(data.data.token));
      setAuthData(data.data.token)
    }
  }

  const logout = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem('@user');
    Toast.show({
      type: 'success',
      text2: "Vidimo se uskoro",
    });
  };

  const changeNavigationColor = async (color) => {
    try {
      await NavigationBar.setBackgroundColorAsync(color);
    } catch (e) {
      console.log(e.message)
    }
  }

  const contextValue = {
    authData, login, logout, isLoggedIn, changeNavigationColor
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider, useAuth };