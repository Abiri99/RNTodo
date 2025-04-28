import React, { JSX } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import todosReducer, { todoAdded, todoRemoved, todoUpdated } from './state/todosSlice'
import HomeScreen from "./ui/HomeScreen";
import store from './state/store'

function App() {
  return (
    <Provider store={store}>
      <View style={{
        backgroundColor: '#e0e0e0',
        flex: 1,
      }}>
        <HomeScreen/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 20
  }
});

export default App;