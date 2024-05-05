import axios from "axios";

export const getCtyWeather = async (city) => {
  https: return await axios
    .get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error occurred while fetching weather data:", error);
      throw error; // Re-throw the error to propagate it further
    });
};

export const getCityForecast = (city) => {
  return axios
    .get(
      `https://api.weatherapi.com/v1/forecast.json?key=0e790f63c1e84608aea110748240405&q=Mogadishu&days=1&aqi=no&alerts=no`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(
        "Error occurred while fetching weather forecast data:",
        error
      );
      throw error; // Re-throw the error to propagate it further
    });
};

// Example usage:
//   const handleSearch = (text) => {
//     console.log(text);
//   };

//   // Memoize the debounced function using useCallback
//   const handleDebounce = useCallback(
//     debounce(handleSearch, 1200),
//     getCtyWeather(searchText)
//       .then((data) => {
//         console.log("after desponse", data);
//         setCity(data); // Handle the data received from the API
//       })
//       .catch((error) => {
//         console.log("Error occurred while fetching weather data:", error);
//       }),
//     [searchText]
//   );
const t = {
  current: {
    cloud: 75,
    condition: {
      code: 1003,
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      text: "Partly cloudy",
    },
    feelslike_c: 34.4,
    feelslike_f: 93.9,
    gust_kph: 39.2,
    gust_mph: 24.4,
    humidity: 89,
    is_day: 1,
    last_updated: "2024-05-05 14:15",
    last_updated_epoch: 1714907700,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 29.8,
    pressure_mb: 1009,
    temp_c: 29,
    temp_f: 84.2,
    uv: 6,
    vis_km: 10,
    vis_miles: 6,
    wind_degree: 210,
    wind_dir: "SSW",
    wind_kph: 16.9,
    wind_mph: 10.5,
  },
  location: {
    country: "Somalia",
    lat: 2.07,
    localtime: "2024-05-05 14:17",
    localtime_epoch: 1714907860,
    lon: 45.37,
    name: "Mogadishu",
    region: "Banaadir",
    tz_id: "Africa/Mogadishu",
  },
};
