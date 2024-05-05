import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { getCityForecast, getCtyWeather } from "./src/API/APIConfiguration";
import Weather from "./src/Screens/Weather";

export default function App() {
  // useEffect(() => {
  //   getCtyWeather("Mogadishu")
  //     .then((data) => {
  //       console.log(data); // Handle the data received from the API
  //     })
  //     .catch((error) => {
  //       console.error("Error occurred while fetching weather data:", error);
  //     });

  // }, []);
  return (
    <View style={styles.container}>
      <Weather />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
