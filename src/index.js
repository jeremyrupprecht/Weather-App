import "./style.css";
import testImage from "./images/testImage.png";

function component() {
  // Test CSS
  const element = document.createElement("div");
  element.innerHTML = "Testing...";
  element.classList.add("hello");

  // Test Asset loader
  const imageElement = new Image();
  imageElement.src = testImage;
  element.appendChild(imageElement);

  // Test source map --> uncomment to test tracking
  // cosnole.log('I get called from print.js!');

  // Test Eslint --> uncomment to see suggestions
  // if (true) {}

  return element;
}
document.body.appendChild(component());

async function getLocationCoordinates(location) {
  try {
    const coordinatesPromse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`,
    );
    const coordinatesObject = await coordinatesPromse.json();
    if (coordinatesObject.results) {
      const { name, latitude, longitude, timezone } =
        coordinatesObject.results[0];
      return { name, latitude, longitude, timezone };
    }
    throw new Error("Error fetching location coordiantes");
  } catch (error) {
    throw new Error("Error fetching location coordiantes");
  }
}

async function buildFetchURL(
  coordinatePromise,
  currentOrForecast,
  celciusOrFahrenheit,
) {
  const coordinateData = await coordinatePromise;

  // Current data in Celcius
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}`;

  // Current data in Fahrenheit
  if (currentOrForecast === "Current" && celciusOrFahrenheit === "Fahrenheit") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;

    // Forecast data in Celcius
  } else if (
    currentOrForecast === "Forecast" &&
    celciusOrFahrenheit === "Celcius"
  ) {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=${coordinateData.timezone}`;

    // Forecast data in Fahrenheit
  } else if (
    currentOrForecast === "Forecast" &&
    celciusOrFahrenheit === "Fahrenheit"
  ) {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  }
  return url;
}

async function fetchCurrentWeatherData(urlPromise) {
  const url = await urlPromise;
  try {
    const weatherDataResponse = await fetch(url, { mode: "cors" });
    if (!weatherDataResponse.error) {
      const weatherDataJSON = await weatherDataResponse.json();
      return weatherDataJSON;
    }
    throw new Error("Error while fetching weather data");
  } catch (error) {
    throw new Error("Error while fetching weather data");
  }
}

function interpretWeatherCode(code) {
  return code;
}

// PUT THIS IN WINDOW ON LOAD FUNCTION

getLocationCoordinates("phoenix")
  .then((coordinates) => {
    const url1 = buildFetchURL(coordinates, "Current", "Celcius");
    const url2 = buildFetchURL(coordinates, "Current", "Fahrenheit");
    const url3 = buildFetchURL(coordinates, "Forecast", "Celcius");
    const url4 = buildFetchURL(coordinates, "Forecast", "Fahrenheit");

    const promises = [
      fetchCurrentWeatherData(url1),
      fetchCurrentWeatherData(url2),
      fetchCurrentWeatherData(url3),
      fetchCurrentWeatherData(url4),
    ];

    Promise.all(promises)
      .then((allWeatherData) => {
        console.log(allWeatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

interpretWeatherCode(3);

// ----------------------------------------------------------------------------

// async function fetchWeatherData1(requestParameters, location) {
//   try {
//     const weatherDataResponse = await fetch(
//       `http://api.weatherapi.com/v1/${requestParameters.type}.json?key=ba28fb17cfeb4cddac8203519241301&q=${location}${requestParameters.days}`,
//       { mode: "cors" },
//     );
//     const weatherDataJSON = await weatherDataResponse.json();
//     // console.table(weatherDataJSON);
//     return weatherDataJSON;
//   } catch (error) {
//     console.log("Error while fetching forecast weather data", error);
//     return error;
//   }
// }

// // Upper left corner data
// async function processDataForUpperLeft(forecastDataPromise) {
//   const currentData = await forecastDataPromise;
//   const data = {
//     condition: currentData.current.condition.text,
//     location: currentData.location.name,
//     date: currentData.location.localtime.split(" ")[0],
//     time: currentData.location.localtime.split(" ")[1],
//     temperateC: currentData.current.temp_c,
//     temperateF: currentData.current.temp_f,
//     conditionIcon: currentData.current.condition.icon,
//   };
//   return data;
// }

// // Upper right corner data. Forecast data is required because the "current"
// // data doesn't include the daily "chance of rain" which needs to be displayed
// async function processDataForUpperRight(forecastDataPromise) {
//   const forecastData = await forecastDataPromise;
//   const data = {
//     feelsLikeC: forecastData.current.feelslike_c,
//     feelsLikeF: forecastData.current.feelslike_f,
//     humidity: forecastData.current.humidity,
//     chanceOfRain: forecastData.forecast.forecastday[0].day.daily_chance_of_rain,
//     chanceOfSnow: forecastData.forecast.forecastday[0].day.daily_chance_of_snow,
//     windSpeedKmHr: forecastData.current.gust_kph,
//     windSpeedMph: forecastData.current.gust_mph,
//   };
//   return data;
// }

// Footer data
// async function processDailyDataForFooter(historicalDataPromise, forecastDataPromise) {
//   const historicalData = await historicalDataPromise;
//   const forecastData = await forecastDataPromise;

// }

// const currentData = fetchWeatherData({ type: "current", days: "" }, "Calgary");
// const forecastData = fetchWeatherData1(
//   { type: "forecast", days: "&days=3" },
//   "Calgary",
// );
// const historicalData = fetchWeatherData({type: "history"});
// processDataForUpperLeft(forecastData);
// processDataForUpperRight(forecastData);

// function showDataForUpperLeft(data) {}
// function showDataForUpperRight(data) {}

// async function processHourlyDataForFooter(dataPromise) {
//   const data = undefined;
//   return data;
// }

// function showDailyDataForFooter(data) {}
// function showHourlyDataForFooter(data) {}

/*
Upper Left Corner:

Overall Weather
Location
Date
Time
Temperature
Button to Switch between F and C
Icon based on the overall weather for today
Location Searchbar

Upper Right Corner:
Feels like
Humidity
Chance of Rain
Wind Speed

Footer:
Daily/Hourly button
Weather For each day, includes:
  temperature
  Icon showing the overall weather for that day

*/
