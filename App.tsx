import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View, ScrollView } from "react-native";
import { Quote } from "./Quote";
import { theme } from "./theme";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DM Serif Display": require("./assets/fonts/DMSerifDisplay-Regular.ttf"),
    "Maven Pro": require("./assets/fonts/MavenPro-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Quote />
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
