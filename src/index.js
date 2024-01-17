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
      const { name, latitude, longitude } = coordinatesObject.results[0];
      return { name, latitude, longitude };
    }
    return "Location not found. Search must be in the form of 'City', 'City, State' or 'City, Country'";
    // NEED TO DEAL WITH ERRORS IN GETTING THE LOCATION
  } catch (error) {
    console.log("Error fetching location coordiantes", error);
    return error;
  }
}

getLocationCoordinates("new york city").then((response) => {
  console.log(response);
});

// ----------------------------------------------------------------------------

async function fetchWeatherData(requestParameters, location) {
  try {
    const weatherDataResponse = await fetch(
      `http://api.weatherapi.com/v1/${requestParameters.type}.json?key=ba28fb17cfeb4cddac8203519241301&q=${location}${requestParameters.days}`,
      { mode: "cors" },
    );
    const weatherDataJSON = await weatherDataResponse.json();
    // console.table(weatherDataJSON);
    return weatherDataJSON;
  } catch (error) {
    console.log("Error while fetching forecast weather data", error);
    return error;
  }
}

// Upper left corner data
async function processDataForUpperLeft(forecastDataPromise) {
  const currentData = await forecastDataPromise;
  const data = {
    condition: currentData.current.condition.text,
    location: currentData.location.name,
    date: currentData.location.localtime.split(" ")[0],
    time: currentData.location.localtime.split(" ")[1],
    temperateC: currentData.current.temp_c,
    temperateF: currentData.current.temp_f,
    conditionIcon: currentData.current.condition.icon,
  };
  return data;
}

// Upper right corner data. Forecast data is required because the "current"
// data doesn't include the daily "chance of rain" which needs to be displayed
async function processDataForUpperRight(forecastDataPromise) {
  const forecastData = await forecastDataPromise;
  const data = {
    feelsLikeC: forecastData.current.feelslike_c,
    feelsLikeF: forecastData.current.feelslike_f,
    humidity: forecastData.current.humidity,
    chanceOfRain: forecastData.forecast.forecastday[0].day.daily_chance_of_rain,
    chanceOfSnow: forecastData.forecast.forecastday[0].day.daily_chance_of_snow,
    windSpeedKmHr: forecastData.current.gust_kph,
    windSpeedMph: forecastData.current.gust_mph,
  };
  return data;
}

// Footer data
// async function processDailyDataForFooter(historicalDataPromise, forecastDataPromise) {
//   const historicalData = await historicalDataPromise;
//   const forecastData = await forecastDataPromise;

// }

// const currentData = fetchWeatherData({ type: "current", days: "" }, "Calgary");
const forecastData = fetchWeatherData(
  { type: "forecast", days: "&days=3" },
  "Calgary",
);
// const historicalData = fetchWeatherData({type: "history"});
processDataForUpperLeft(forecastData);
processDataForUpperRight(forecastData);

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
