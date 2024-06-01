import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper';

import { Provider as ReduxProvider } from "react-redux";
import store from './redux/index';
import { MenuProvider } from "react-native-popup-menu";
import HomeScreen from './src/home/HomeScreen';

const App = () => {
  return (
    <ReduxProvider store={store}>


      <PaperProvider>
        <MenuProvider>
          <HomeScreen />
        </MenuProvider>
      </PaperProvider>
    </ReduxProvider>
  )
}

export default App

const styles = StyleSheet.create({})