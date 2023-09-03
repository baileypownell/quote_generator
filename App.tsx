import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Quote } from "./Quote";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Quote />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C89F9C",
    alignItems: "center",
    justifyContent: "center",
  },
});
