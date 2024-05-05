import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Sun from "react-native-vector-icons/Feather";
import Drop from "react-native-vector-icons/Entypo";
import Wind from "react-native-vector-icons/Feather";
import images from "../../assets/rbg.png";
import weatherIcon from "../../assets/main.png";
import { getCtyWeather } from "../API/APIConfiguration";
import debounce from "lodash.debounce";
function Weather() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [city, setCity] = useState();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    console.log(text);
  };

  // Memoize the debounced function using useCallback
  const handleDebounce = useCallback(
    debounce((text) => handleSearch(text), 1200), // Only recreate the debounced function when handleSearch changes
    []
  );

  useEffect(() => {
    if (searchText) {
      getCtyWeather(searchText)
        .then((data) => {
          //   console.log("after response", data);
          setCity(data); // Handle the data received from the API
        })
        .catch((error) => {
          //   console.log("Error occurred while fetching weather data:", error);
        });
    }
  }, [searchText]);
  const extractTimeAndPeriod = (localtime) => {
    const time = localtime.split(" ")[1]; // Split the localtime string and extract the time portion
    const [hour, minute] = time.split(":").map(Number); // Parse the hour and minute as numbers
    const period = hour < 12 ? "AM" : "PM"; // Determine if it's AM or PM based on the hour

    // Convert hour to 12-hour format if needed
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    // Format the time with period
    const formattedTime = `${formattedHour}:${
      minute < 10 ? `0${minute}` : minute
    } ${period}`;

    return formattedTime;
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images} // Specify the path to your image
        style={styles.imageBackground}
        resizeMode="cover" // Make sure the image covers the entire container
      />
      {/* Search Section */}
      <View
        style={{
          marginTop: "15%",
          flexDirection: "row",
          justifyContent: toggleSearch ? "space-between" : "flex-end", // Corrected condition
          alignItems: "center",
          width: "90%",
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderRadius: toggleSearch ? 10 : 0,
          borderWidth: toggleSearch ? 1 : 0,
          borderColor: "gray",
          backgroundColor: toggleSearch ? "#f0fdfa" : "transparent", // Set background color based on toggleSearch
        }}
      >
        {toggleSearch && (
          <TextInput
            placeholder="Search city name"
            style={styles.searchText}
            onChangeText={(text) => {
              setSearchText(text);
              handleDebounce(text);
            }}
          />
        )}
        <Icon
          name="search"
          size={toggleSearch ? 20 : 30}
          color={"#94a3b8"}
          onPress={() => setToggleSearch(!toggleSearch)}
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: toggleSearch ? "#f3f4f6" : "#f3f4f6",
          }} // Toggle the state of toggleSearch
        />
      </View>
      {/* Header Section */}
      <View style={styles.centerSection}>
        {!toggleSearch && city && (
          <Text style={styles.capital}>
            {city.location.name}{" "}
            <Text style={styles.country}>, {city.location.country}</Text>{" "}
          </Text>
        )}
      </View>
      <View style={styles.imageSection}>
        {!toggleSearch && city && city.current.condition.icon && (
          <Image
            source={{ uri: `https:${city.current.condition.icon}` }}
            style={{ width: 100, height: 100 }}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.imageSection}>
        {!toggleSearch && city && (
          <>
            <Text style={styles.degree}>{city.current.temp_c}&deg;</Text>
            <Text style={styles.conditionText}>
              {city.current.condition.text}
            </Text>
          </>
        )}
      </View>

      {!toggleSearch && city && (
        <View style={styles.FoastcastStatus}>
          <View style={styles.hozentalText}>
            <Wind name="wind" size={30} color={"#94a3b8"} />
            <Text style={styles.situations}>{city.current.wind_kph}Km</Text>
          </View>
          <View style={styles.hozentalText}>
            <Drop name="drop" size={30} color={"#94a3b8"} />
            <Text style={styles.situations}>{city.current.humidity}%</Text>
          </View>
          <View style={styles.hozentalText}>
            <Sun name="sun" size={30} color={"#94a3b8"} />
            <Text style={styles.situations}>
              {" "}
              {extractTimeAndPeriod(city.location.localtime)}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Weather;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,

    alignItems: "center",
  },

  centerSection: {
    marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: "10%",
  },
  foterSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    backgroundColor: "white",
  },
  capital: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  degree: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  conditionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  country: { fontSize: 20, fontWeight: "bold", color: "grey" },
  situations: { fontSize: 20, fontWeight: "bold", color: "grey" },
  imageBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  searchText: {},
  FoastcastStatus: {
    marginTop: "20%",
    flexDirection: "row",
    justifyContent: "space-between", // Corrected condition
  },
  hozentalText: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});
