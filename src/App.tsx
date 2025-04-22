import React, { JSX } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function App() {
  return (
    <SafeAreaView>
      <Text style={styles.text}>
       Hello World
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 20
  }
});

export default App;