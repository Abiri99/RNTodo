import React, { JSX } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import todosReducer, { todoAdded, todoRemoved, todoUpdated } from './state/todosSlice'
import HomeScreen from "./ui/HomeScreen";
import store from './state/store'
import { createStaticNavigation, NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTodoScreen from "./ui/AddTodoScreen";

const Stack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    AddTodo: AddTodoScreen,
  }
});

const Navigation = createStaticNavigation(Stack);

function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 20
  }
});

export default App;