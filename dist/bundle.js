/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiHandler.js":
/*!***************************!*\
  !*** ./src/apiHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractFooterdata: () => (/* binding */ extractFooterdata),
/* harmony export */   extractUpperLeftData: () => (/* binding */ extractUpperLeftData),
/* harmony export */   extractUpperRightData: () => (/* binding */ extractUpperRightData),
/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)
/* harmony export */ });
async function getLocationCoordinates(location) {
  try {
    const coordinatesPromse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`);
    const coordinatesObject = await coordinatesPromse.json();
    if (coordinatesObject.results) {
      const {
        name,
        latitude,
        longitude,
        timezone
      } = coordinatesObject.results[0];
      return {
        name,
        latitude,
        longitude,
        timezone
      };
    }
    throw new Error("Error fetching location coordiantes");
  } catch (error) {
    throw new Error("Error fetching location coordiantes", error);
  }
}
async function buildFetchURL(coordinatePromise, currentOrForecast, celciusOrFahrenheit) {
  const coordinateData = await coordinatePromise;

  // Current data in Celcius
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=2&timezone=${coordinateData.timezone}`;

  // Current data in Fahrenheit
  if (currentOrForecast === "Current" && celciusOrFahrenheit === "Fahrenheit") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=2&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;

    // Forecast data in Celcius
  } else if (currentOrForecast === "Forecast" && celciusOrFahrenheit === "Celcius") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=${coordinateData.timezone}`;

    // Forecast data in Fahrenheit
  } else if (currentOrForecast === "Forecast" && celciusOrFahrenheit === "Fahrenheit") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  }
  return url;
}
async function fetchCurrentWeatherData(urlPromise) {
  const url = await urlPromise;
  try {
    const weatherDataResponse = await fetch(url, {
      mode: "cors"
    });
    if (!weatherDataResponse.error) {
      const weatherDataJSON = await weatherDataResponse.json();
      return weatherDataJSON;
    }
    throw new Error("Error while fetching weather data");
  } catch (error) {
    throw new Error("Error while fetching weather data", error);
  }
}
async function getWeatherData(location) {
  try {
    const coordinates = await getLocationCoordinates(location);
    const url1 = buildFetchURL(coordinates, "Current", "Celcius");
    const url2 = buildFetchURL(coordinates, "Current", "Fahrenheit");
    const url3 = buildFetchURL(coordinates, "Forecast", "Celcius");
    const url4 = buildFetchURL(coordinates, "Forecast", "Fahrenheit");
    const allWeatherData = await Promise.all([fetchCurrentWeatherData(url1), fetchCurrentWeatherData(url2), fetchCurrentWeatherData(url3), fetchCurrentWeatherData(url4)]);
    const mappedWeatherData = {
      currentCelcius: [allWeatherData[0], coordinates.name],
      currentFahrenheit: [allWeatherData[1], coordinates.name],
      forecastCelcius: allWeatherData[2],
      forecastFahrenheit: allWeatherData[3]
    };
    return mappedWeatherData;
  } catch (error) {
    console.log("Error while getting weather data", error);
    return error;
    // throw new Error("Error while getting weather data", error);
  }
}
function interpretWeatherCode(code) {
  switch (code) {
    case 0:
      return "Clear Sky";
    case 1:
      return "Mainly Clear Sky";
    case 2:
      return "Partly Cloudy";
    case 3:
      return "Overcast Clouds";
    case 45:
      return "Non-Frozen Fog";
    case 48:
      return "Freezing Fog";
    case 51:
      return "Light Drizzle";
    case 53:
      return "Moderate Drizzle";
    case 55:
      return "Intense Drizzle";
    case 56:
      return "Light Freezing Drizzle";
    case 57:
      return "Dense Freezing Drizzle";
    case 61:
      return "Slight Rain";
    case 63:
      return "Moderate Rain";
    case 65:
      return "Intense Rain";
    case 66:
      return "Light Freezing Rain";
    case 67:
      return "Intense Freezing Rain";
    case 71:
      return "Light Snow Fall";
    case 73:
      return "Moderate Snow Fall";
    case 75:
      return "Intense Snow Fall";
    case 77:
      return "Granular Snow Fall";
    case 80:
      return "Light Rain Showers";
    case 81:
      return "Moderate Rain Showers";
    case 82:
      return "Violent Rain Showers";
    case 85:
      return "Light Snow Showers";
    case 86:
      return "Intense Snow Showers";
    case 95:
      return "Thunderstorm";
    case 96:
      return "Moderate Thunderstorm";
    case 99:
      return "Thunderstorm With Heavy Hail";
    default:
      return "Clear Sky";
  }
}
function formatDate(timeZone) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone
  };
  const formattedDate = new Date().toLocaleString("en-US", options);
  return formattedDate;
}
function getTimeInTimezone(timeZone) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone,
    timeZoneName: "short"
  };
  const adjustedTime = new Date().toLocaleString("en-US", options);
  return adjustedTime;
}
function formatTime(time) {
  const militaryTime = new Date(time);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  const formattedTime = militaryTime.toLocaleString("en-US", options);
  return formattedTime;
}

// Function to get the suffix for the day (e.g., "st", "nd", "rd", "th")
function getNumberSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
function formatDay(inputString, timezone) {
  const inputDate = new Date(`${inputString}T00:00:00`);
  const options = {
    weekday: "long",
    timeZone: timezone
  };
  const formattedDate = inputDate.toLocaleString("en-US", options);
  const dayOfMonth = inputDate.getDate();
  const suffix = getNumberSuffix(dayOfMonth);
  const formattedDateWithTh = `${formattedDate} ${dayOfMonth}${suffix}`;
  return formattedDateWithTh;
}
function isolateCurrentHourIndex(timeZone) {
  // const currentTime = getTimeInTimezone(timeZone);
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    timeZone,
    hour12: false // Ensure 24-hour format
  });
  const hour = parseInt(currentTime, 10);
  return hour;
}
async function extractUpperLeftData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const mainForecast = interpretWeatherCode(data[0].current.weather_code);
  const upperLeftData = {
    mainForecast,
    location: data[1],
    date: formatDate(data[0].timezone),
    time: getTimeInTimezone(data[0].timezone),
    temperature: `${data[0].current.temperature_2m} ${data[0].current_units.temperature_2m}`,
    iconCode: data[0].current.weather_code
  };
  return upperLeftData;
}
async function extractUpperRightData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const upperRightData = {
    feelsLike: `${data[0].current.apparent_temperature} ${data[0].current_units.apparent_temperature}`,
    humidity: `${data[0].current.relative_humidity_2m} ${data[0].current_units.relative_humidity_2m}`,
    precipitation: `${data[0].current.precipitation} ${data[0].current_units.precipitation}`,
    windSpeed: `${data[0].current.wind_speed_10m} ${data[0].current_units.wind_speed_10m}`
  };
  return upperRightData;
}
async function extractFooterdata(dailyDataPromise, hourlyDataPromise) {
  const dailyData = await dailyDataPromise;
  const hourlyData = await hourlyDataPromise;
  // Fill in and return this object
  const footerData = {
    daily: [],
    hourly: []
  };
  // Fill in daily data
  for (let i = 0; i < dailyData.daily.temperature_2m_max.length; i += 1) {
    const compiledData = {
      date: formatDay(dailyData.daily.time[i], dailyData.daily_units.timezone),
      maxTemp: `${dailyData.daily.temperature_2m_max[i]} ${dailyData.daily_units.temperature_2m_max}`,
      minTemp: `${dailyData.daily.temperature_2m_min[i]} ${dailyData.daily_units.temperature_2m_min}`,
      weatherCode: dailyData.daily.weather_code[i]
    };
    footerData.daily.push(compiledData);
  }
  // The api call by returns data including the current day alongside the forecast
  // for the next seven days, get rid of the first day as that days data already
  // exists within the "current" api request payload
  footerData.daily.shift();

  // Hours are displayed starting after the current hour. Find that hour
  // so that the next 24 hours after it can be displayed
  const currentHour = isolateCurrentHourIndex(hourlyData[0].timezone);
  const validCurrentHour = (currentHour + 24) % 24;

  // Fill in hourly data
  for (let i = 0; i < 25; i += 1) {
    const hourIndex = (validCurrentHour + i) % 24;
    const compiledData = {
      time: formatTime(hourlyData[0].hourly.time[hourIndex]),
      temperature: `${hourlyData[0].hourly.temperature_2m[hourIndex]} ${hourlyData[0].hourly_units.temperature_2m}`,
      weatherCode: hourlyData[0].hourly.weather_code[hourIndex]
    };
    footerData.hourly.push(compiledData);
  }
  // The api call returns data for the current hour, this is already displayed
  // so we don't need to display it below (same logic as with the current day)
  footerData.hourly.shift();
  return footerData;
}


/***/ }),

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFooter: () => (/* binding */ renderFooter),
/* harmony export */   renderUpperLeftCorner: () => (/* binding */ renderUpperLeftCorner),
/* harmony export */   renderUpperRightCorner: () => (/* binding */ renderUpperRightCorner),
/* harmony export */   setupPage: () => (/* binding */ setupPage)
/* harmony export */ });
/* harmony import */ var _images_searchIcon_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/searchIcon.svg */ "./src/images/searchIcon.svg");
/* harmony import */ var _images_feelsLikeIcon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/feelsLikeIcon.svg */ "./src/images/feelsLikeIcon.svg");
/* harmony import */ var _images_humidityIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/humidityIcon.svg */ "./src/images/humidityIcon.svg");
/* harmony import */ var _images_precipitationIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/precipitationIcon.svg */ "./src/images/precipitationIcon.svg");
/* harmony import */ var _images_windIcon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/windIcon.svg */ "./src/images/windIcon.svg");
/* harmony import */ var _images_arrowLeft_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/arrowLeft.svg */ "./src/images/arrowLeft.svg");
/* harmony import */ var _images_arrowRight_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/arrowRight.svg */ "./src/images/arrowRight.svg");
/* harmony import */ var _images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/weatherCodeIcons/clearSky.svg */ "./src/images/weatherCodeIcons/clearSky.svg");
/* harmony import */ var _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/weatherCodeIcons/partlyCloudy.svg */ "./src/images/weatherCodeIcons/partlyCloudy.svg");
/* harmony import */ var _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/weatherCodeIcons/foggy.svg */ "./src/images/weatherCodeIcons/foggy.svg");
/* harmony import */ var _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/weatherCodeIcons/drizzle.svg */ "./src/images/weatherCodeIcons/drizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingDrizzle.svg */ "./src/images/weatherCodeIcons/freezingDrizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/weatherCodeIcons/rain.svg */ "./src/images/weatherCodeIcons/rain.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingRain.svg */ "./src/images/weatherCodeIcons/freezingRain.svg");
/* harmony import */ var _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowfall.svg */ "./src/images/weatherCodeIcons/snowfall.svg");
/* harmony import */ var _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowGrains.svg */ "./src/images/weatherCodeIcons/snowGrains.svg");
/* harmony import */ var _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/weatherCodeIcons/rainShowers.svg */ "./src/images/weatherCodeIcons/rainShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowShowers.svg */ "./src/images/weatherCodeIcons/snowShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/weatherCodeIcons/thunderStormBoth.svg */ "./src/images/weatherCodeIcons/thunderStormBoth.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/clearSkyCropped.svg */ "./src/images/weatherCodeIconsCropped/clearSkyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/partlyCloudyCropped.svg */ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/foggyCropped.svg */ "./src/images/weatherCodeIconsCropped/foggyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/drizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingDrizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainCropped.svg */ "./src/images/weatherCodeIconsCropped/rainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingRainCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowfallCropped.svg */ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowGrainsCropped.svg */ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/thunderStormBothCropped.svg */ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg");
// Other Icons








// Weather Icons













// Cropped Weather Icons













// import getWeatherData from "./apiHandler";

const weatherIcons = [_images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_7__, _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_8__, _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_9__, _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_10__, _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_11__, _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_12__, _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_13__, _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_14__, _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_15__, _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_16__, _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_17__, _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_18__];
const weatherIconsCropped = [_images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_19__, _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_20__, _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_21__, _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_22__, _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_23__, _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_24__, _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_25__, _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_26__, _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_27__, _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_28__, _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_29__, _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_30__];

// function component() {
//   // Test CSS
//   const element = document.createElement("div");
//   element.innerHTML = "Testing...";
//   element.classList.add("hello");

//   // Test Asset loader
//   const imageElement = new Image();
//   imageElement.src = testImage;
//   element.appendChild(imageElement);

//   // Test source map --> uncomment to test tracking
//   // cosnole.log('I get called from print.js!');

//   // Test Eslint --> uncomment to see suggestions
//   // if (true) {}

//   return element;
// }
// document.body.appendChild(component());

function renderImage(parent, image) {
  const imageElement = new Image();
  imageElement.src = image;
  // imageElement.classList.add("testBorder");
  parent.appendChild(imageElement);
}
function renderIcons() {
  // Searchbar icon
  const searchIconContainer = document.getElementById("searchIconContainer");
  renderImage(searchIconContainer, _images_searchIcon_svg__WEBPACK_IMPORTED_MODULE_0__);

  // Upper right icons
  const feelsLikeContainer = document.getElementById("feelsLikeIcon");
  renderImage(feelsLikeContainer, _images_feelsLikeIcon_svg__WEBPACK_IMPORTED_MODULE_1__);
  const humidityContainer = document.getElementById("humidityIcon");
  renderImage(humidityContainer, _images_humidityIcon_svg__WEBPACK_IMPORTED_MODULE_2__);
  const precipitationContainer = document.getElementById("precipitationIcon");
  renderImage(precipitationContainer, _images_precipitationIcon_svg__WEBPACK_IMPORTED_MODULE_3__);
  const windSpeedContainer = document.getElementById("windSpeedIcon");
  renderImage(windSpeedContainer, _images_windIcon_svg__WEBPACK_IMPORTED_MODULE_4__);

  // Hourly forecast arrows
  const leftIconContainer = document.getElementById("leftArrow");
  renderImage(leftIconContainer, _images_arrowLeft_svg__WEBPACK_IMPORTED_MODULE_5__);
  const rightIconContainer = document.getElementById("rightArrow");
  renderImage(rightIconContainer, _images_arrowRight_svg__WEBPACK_IMPORTED_MODULE_6__);
}
function interpretWeatherCode(code, cropped) {
  let imagesToUse = weatherIcons;
  if (cropped) {
    imagesToUse = weatherIconsCropped;
  }
  switch (code) {
    case 0:
      return imagesToUse[0];
    case 1:
    case 2:
    case 3:
      return imagesToUse[1];
    case 45:
    case 48:
      return imagesToUse[2];
    case 51:
    case 53:
    case 55:
      return imagesToUse[3];
    case 56:
    case 57:
      return imagesToUse[4];
    case 61:
    case 63:
    case 65:
      return imagesToUse[5];
    case 66:
    case 67:
      return imagesToUse[6];
    case 71:
    case 73:
    case 75:
      return imagesToUse[7];
    case 77:
      return imagesToUse[8];
    case 80:
    case 81:
    case 82:
      return imagesToUse[9];
    case 85:
    case 86:
      return imagesToUse[10];
    case 95:
    case 96:
    case 99:
      return imagesToUse[11];
    default:
      return imagesToUse[0];
  }
}
function renderForecastIcons(iconCodes, hourly) {
  let cardsCollection = document.getElementsByClassName("dayCard");
  if (hourly) {
    cardsCollection = document.getElementsByClassName("hourCard");
  }
  for (let i = 0; i < cardsCollection.length; i += 1) {
    const dayIconContainer = cardsCollection[i].children[cardsCollection[i].children.length - 1];
    // Clear previous icon
    dayIconContainer.innerHTML = "";
    renderImage(dayIconContainer, interpretWeatherCode(iconCodes[i], false));
  }
}
function renderCurrentIcon(iconCode) {
  const mainIconContainer = document.getElementById("mainIcon");
  renderImage(mainIconContainer, interpretWeatherCode(iconCode, true));
}
function toggleForecastCards(toggleHourlyCards) {
  const dailyForecastCardsGrid = document.querySelector(".dailyForecastGrid");
  const hourlyForecastCardsGrid = document.querySelector(".hourlyForecastGrid");
  const dailyButton = document.getElementById("dailyButton");
  const hourlyButton = document.getElementById("hourlyButton");
  const hoursSelectionButtons = document.getElementById("hoursSelectionContainer");
  if (toggleHourlyCards) {
    dailyForecastCardsGrid.classList.remove("show");
    hourlyForecastCardsGrid.classList.add("show");
    dailyButton.classList.remove("border");
    hourlyButton.classList.add("border");
    hoursSelectionButtons.classList.add("show");
  } else {
    dailyForecastCardsGrid.classList.add("show");
    hourlyForecastCardsGrid.classList.remove("show");
    dailyButton.classList.add("border");
    hourlyButton.classList.remove("border");
    hoursSelectionButtons.classList.remove("show");
  }
}

// function reRenderInCelciusOrFahrenheit() {

// }

async function renderUpperLeftCorner(dataPromise) {
  const data = await dataPromise;
  const mainForecastElement = document.getElementById("mainForecast");
  const locationElement = document.getElementById("location");
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");
  const temperatureElement = document.getElementById("mainTemperature");
  mainForecastElement.textContent = data.mainForecast;
  locationElement.textContent = data.location;
  dateElement.textContent = data.date;
  timeElement.textContent = data.time;
  temperatureElement.textContent = data.temperature;
  renderCurrentIcon(data.iconCode);
}
async function renderUpperRightCorner(dataPromise) {
  const data = await dataPromise;
  const feelsLikeElement = document.getElementById("feelsLike");
  const humidityElement = document.getElementById("humidity");
  const precipitationElement = document.getElementById("precipitation");
  const windSpeedElement = document.getElementById("windSpeed");
  feelsLikeElement.textContent = data.feelsLike;
  humidityElement.textContent = data.humidity;
  precipitationElement.textContent = data.precipitation;
  windSpeedElement.textContent = data.windSpeed;
}
async function renderFooter(forecastPromise, currentPromise) {
  const forecastData = await forecastPromise;
  const currentData = await currentPromise;
  const dayCardElements = document.getElementsByClassName("dayCard");
  const hourCardElements = document.getElementsByClassName("hourCard");

  // Render forecast/daily data
  for (let i = 0; i < forecastData.length; i += 1) {
    dayCardElements[i].children[0].textContent = forecastData[i].date;
    dayCardElements[i].children[1].textContent = forecastData[i].maxTemp;
    dayCardElements[i].children[2].textContent = forecastData[i].minTemp;
  }
  // Render icons
  const dailyIconCodes = [];
  for (let i = 0; i < forecastData.length; i += 1) {
    dailyIconCodes.push(forecastData[i].weatherCode);
  }
  renderForecastIcons(dailyIconCodes, false);

  // Render current/hourly data
  for (let i = 0; i < currentData.length; i += 1) {
    hourCardElements[i].children[0].textContent = currentData[i].time.toLowerCase();
    hourCardElements[i].children[1].textContent = currentData[i].temperature;
  }
  // Render icons
  const hourlyIconCodes = [];
  for (let i = 0; i < currentData.length; i += 1) {
    hourlyIconCodes.push(currentData[i].weatherCode);
  }
  renderForecastIcons(hourlyIconCodes, true);
}
function renderHourlyForecastCards(eightHourChunkId) {
  // Hide all chunks
  const allChunks = document.getElementsByClassName("chunk");
  for (let i = 0; i < allChunks.length; i += 1) {
    allChunks[i].classList.remove("show");
  }
  // Show selected chunk
  const chunkToShow = document.getElementById(`eightHourChunk${eightHourChunkId}`);
  chunkToShow.classList.add("show");
}
function switchHours(dotElement) {
  // Set active dot
  const allDotElements = document.getElementsByClassName("dot");
  for (let i = 0; i < allDotElements.length; i += 1) {
    allDotElements[i].classList.remove("active");
  }
  dotElement.classList.add("active");
  // Render correct the correct eight cards
  renderHourlyForecastCards(dotElement.getAttribute("data-hour"));
}
function switchHourUsingArrow(rightArrow) {
  const currentlyActiveDot = document.querySelector(".dot.active");

  // If the right arrow is clicked, move the current dot to the right, looping
  // around if the active dot is the rightmost dot, if the left arrow is clicked
  // move the current dot to the left, looping around if the active dot is
  // the leftmost dot
  const currentlyActiveDotId = currentlyActiveDot.getAttribute("data-hour");
  // calculate correct new dot id
  const nextDotId = (parseInt(currentlyActiveDotId, 10) + (rightArrow ? 1 : 2)) % 3;
  const dotToActive = document.querySelector(`.dot[data-hour="${nextDotId}"]`);
  switchHours(dotToActive);
}
function setupListeners() {
  const dailyForecastButton = document.getElementById("dailyButton");
  dailyForecastButton.addEventListener("click", () => {
    toggleForecastCards(false);
  });
  const hourlyForecastButton = document.getElementById("hourlyButton");
  hourlyForecastButton.addEventListener("click", () => {
    toggleForecastCards(true);
  });

  // The daily forecast shows the next 24 hours after the current hour,
  // These are shown in chunks of 8 hours each
  const switchHoursDots = document.getElementsByClassName("dot");
  for (let i = 0; i < switchHoursDots.length; i += 1) {
    switchHoursDots[i].addEventListener("click", () => switchHours(switchHoursDots[i]));
  }
  const switchHoursArrowLeft = document.getElementById("leftArrow");
  const switchHoursArrowRight = document.getElementById("rightArrow");
  switchHoursArrowLeft.addEventListener("click", () => switchHourUsingArrow(false));
  switchHoursArrowRight.addEventListener("click", () => switchHourUsingArrow(true));
  const switchCelciusFahrenheit = document.getElementById("switchTemperatureButton");
  // switchCelciusFahrenheit.addEventListener("click" )
}

// CALL THIS ON PAGE RENDER OR WHEN THE USER SEARCHES WITH A VALID INPUT
function setupPage() {
  renderIcons();
  setupListeners();
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./images/weatherBackground.jpg */ "./src/images/weatherBackground.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  color: white;
  font-family: montserrat,sans-serif;
}

html, body {
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

html {
  background-color: gray;
}

#backgroundContainer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;

  background: linear-gradient(
    rgba(0, 0, 0, 0.164), 
    rgba(0, 0, 0, 0.7)
  ),
  url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center center;
}

#mainContainer {
  height: 90%;
  width: 90%;

  display: none;
  grid-template: 2fr 1fr / 1fr 1fr;
}

#mainContainer.show {
  display: grid;
}

/* Upper Left Display */

#upperLeft {
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  gap: 15px;
}

#mainForecast, #mainTemperature {
  font-size: 3rem;
  font-weight: bold;
}

#mainTemperature {
  font-size: 3.5rem;
}

#location, #date, #time {
  font-size: 1.1rem;
}

button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

#switchTemperatureButton {
  font-weight: bold;
}

#mainIcon {
  width: 60px;
  height: 60px;
  padding: 10px 0px;
  /* border: 1px solid white; */
}

#searchContainer {
  display: flex;
  position: relative;
  border-bottom: 2px solid white;
  width: 200px;
}

#searchIconContainer {
  width: 1.3rem;
  position: relative;
  left: 10px;
}

input[type="text"] {
  width: 160px;
  height: 1.1rem;
  border: none;
  /* border-bottom: 2px solid white; */
  background-color: transparent;
  text-indent: 7px;
  font-size: 0.9rem;
  padding: 2px;
}

input[type="text"]::placeholder {
  color: white;
}

input[type="text"]:focus {
  outline-width: 0;
}

/* Upper Right Display */

#upperRight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#alignRight {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.upperRightContainer {
  display: flex;
  gap: 10px;
  /* border: 1px solid red; */
}

.upperRightContainer > div > p {
  margin-bottom: 5px;
}

.iconContainer {
  width: 3rem;
}

.upperLeftText {
  font-size: 1.1rem;
}

/* Footer */

#footer {
  grid-column: 1 / 3;
  /* border: 1px solid blue; */
  display: flex;
  flex-direction: column;

}

#dailyHourlyContainer {
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
}

#dailyHourlyContainer button {
  padding: 6px;
  border-radius: 5px;
}

#dailyButton.border, #hourlyButton.border {
  /* border: 2px solid white; */
  -webkit-box-shadow:inset 0px 0px 0px 2px white;
  -moz-box-shadow:inset 0px 0px 0px 2px white;
  box-shadow:inset 0px 0px 0px 2px white;
}

.dailyForecastGrid.show, .hourlyForecastGrid.show {
  display: grid;
}

#hoursSelectionContainer {
  visibility: hidden;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: 4px;
}

#hoursSelectionContainer.show {
  visibility: visible;
}

.arrow {
  width: 37px;
}

.dot {
  position: relative;
  top: -1px;
  height: 7px;
  width: 7px;
  /* background-color: rgba(0,0,0,0); */
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background-color: white;
}

.dailyForecastGrid {
  display: none;
  grid-template: 1fr / repeat(7, 1fr);
  flex: 1;
  margin-top: 30px;
}

.dayCard {
  height: 100%;
  display: grid;
  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
  /* border: 1px solid red; */

  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px; */
}

#dayName, #dayMaxTemp {
  white-space: nowrap;
}

/* #hourName {
  font-size: 1.4rem;
  text-align: center;
} */

#dayName, #hourName {
  font-size: calc(0.5rem + 1vw);
  text-align: center;
}

#dayMaxTemp, #hourTemp {
  font-size: 1.6rem;
  font-weight: bold;
}

#dayMinTemp {
  font-size: 0.9rem;
}

#dayIcon, #hourIcon {
  width: 70px;
}

.testBorder {
  border: 1px solid white;
}

.hourlyForecastGrid {
  display: none;
  /* border: 1px solid red; */
}

.chunk {
  display: none;
  /* height: 100%;
  width: 100%; */
  grid-template: 1fr / repeat(8, 1fr);
  flex: 1;
  margin-top: 30px;
}

.chunk.show {
  display: grid;
} 

.hourCard {
  height: 100%;
  display: grid;
  /* grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr; */
  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
}

#hourIcon {
  grid-row: 4 / 5;
}

@media only screen and (max-width: 850px) {
  body {
    background-color: lightblue;
  }
}

`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: white;\r\n  font-family: montserrat,sans-serif;\r\n}\r\n\r\nhtml, body {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  overflow-y: hidden;\r\n  overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\nhtml {\r\n  background-color: gray;\r\n}\r\n\r\n#backgroundContainer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  height: 100vh;\r\n  width: 100vw;\r\n\r\n  background: linear-gradient(\r\n    rgba(0, 0, 0, 0.164), \r\n    rgba(0, 0, 0, 0.7)\r\n  ),\r\n  url(\"./images/weatherBackground.jpg\");\r\n  background-size: cover;\r\n  background-repeat:no-repeat;\r\n  background-position: center center;\r\n}\r\n\r\n#mainContainer {\r\n  height: 90%;\r\n  width: 90%;\r\n\r\n  display: none;\r\n  grid-template: 2fr 1fr / 1fr 1fr;\r\n}\r\n\r\n#mainContainer.show {\r\n  display: grid;\r\n}\r\n\r\n/* Upper Left Display */\r\n\r\n#upperLeft {\r\n  display: flex;\r\n  flex-direction: column;\r\n  /* border: 1px solid red; */\r\n  gap: 15px;\r\n}\r\n\r\n#mainForecast, #mainTemperature {\r\n  font-size: 3rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#mainTemperature {\r\n  font-size: 3.5rem;\r\n}\r\n\r\n#location, #date, #time {\r\n  font-size: 1.1rem;\r\n}\r\n\r\nbutton {\r\n\tbackground: none;\r\n\tcolor: inherit;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tfont: inherit;\r\n\tcursor: pointer;\r\n\toutline: inherit;\r\n}\r\n\r\n#switchTemperatureButton {\r\n  font-weight: bold;\r\n}\r\n\r\n#mainIcon {\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 10px 0px;\r\n  /* border: 1px solid white; */\r\n}\r\n\r\n#searchContainer {\r\n  display: flex;\r\n  position: relative;\r\n  border-bottom: 2px solid white;\r\n  width: 200px;\r\n}\r\n\r\n#searchIconContainer {\r\n  width: 1.3rem;\r\n  position: relative;\r\n  left: 10px;\r\n}\r\n\r\ninput[type=\"text\"] {\r\n  width: 160px;\r\n  height: 1.1rem;\r\n  border: none;\r\n  /* border-bottom: 2px solid white; */\r\n  background-color: transparent;\r\n  text-indent: 7px;\r\n  font-size: 0.9rem;\r\n  padding: 2px;\r\n}\r\n\r\ninput[type=\"text\"]::placeholder {\r\n  color: white;\r\n}\r\n\r\ninput[type=\"text\"]:focus {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Upper Right Display */\r\n\r\n#upperRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n}\r\n\r\n#alignRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n}\r\n\r\n.upperRightContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  /* border: 1px solid red; */\r\n}\r\n\r\n.upperRightContainer > div > p {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.iconContainer {\r\n  width: 3rem;\r\n}\r\n\r\n.upperLeftText {\r\n  font-size: 1.1rem;\r\n}\r\n\r\n/* Footer */\r\n\r\n#footer {\r\n  grid-column: 1 / 3;\r\n  /* border: 1px solid blue; */\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n#dailyHourlyContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\n#dailyHourlyContainer button {\r\n  padding: 6px;\r\n  border-radius: 5px;\r\n}\r\n\r\n#dailyButton.border, #hourlyButton.border {\r\n  /* border: 2px solid white; */\r\n  -webkit-box-shadow:inset 0px 0px 0px 2px white;\r\n  -moz-box-shadow:inset 0px 0px 0px 2px white;\r\n  box-shadow:inset 0px 0px 0px 2px white;\r\n}\r\n\r\n.dailyForecastGrid.show, .hourlyForecastGrid.show {\r\n  display: grid;\r\n}\r\n\r\n#hoursSelectionContainer {\r\n  visibility: hidden;\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  padding-top: 4px;\r\n}\r\n\r\n#hoursSelectionContainer.show {\r\n  visibility: visible;\r\n}\r\n\r\n.arrow {\r\n  width: 37px;\r\n}\r\n\r\n.dot {\r\n  position: relative;\r\n  top: -1px;\r\n  height: 7px;\r\n  width: 7px;\r\n  /* background-color: rgba(0,0,0,0); */\r\n  border: 1px solid #f5f5f5;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n}\r\n\r\n.dot.active {\r\n  background-color: white;\r\n}\r\n\r\n.dailyForecastGrid {\r\n  display: none;\r\n  grid-template: 1fr / repeat(7, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n}\r\n\r\n.dayCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n  /* border: 1px solid red; */\r\n\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 10px; */\r\n}\r\n\r\n#dayName, #dayMaxTemp {\r\n  white-space: nowrap;\r\n}\r\n\r\n/* #hourName {\r\n  font-size: 1.4rem;\r\n  text-align: center;\r\n} */\r\n\r\n#dayName, #hourName {\r\n  font-size: calc(0.5rem + 1vw);\r\n  text-align: center;\r\n}\r\n\r\n#dayMaxTemp, #hourTemp {\r\n  font-size: 1.6rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#dayMinTemp {\r\n  font-size: 0.9rem;\r\n}\r\n\r\n#dayIcon, #hourIcon {\r\n  width: 70px;\r\n}\r\n\r\n.testBorder {\r\n  border: 1px solid white;\r\n}\r\n\r\n.hourlyForecastGrid {\r\n  display: none;\r\n  /* border: 1px solid red; */\r\n}\r\n\r\n.chunk {\r\n  display: none;\r\n  /* height: 100%;\r\n  width: 100%; */\r\n  grid-template: 1fr / repeat(8, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n}\r\n\r\n.chunk.show {\r\n  display: grid;\r\n} \r\n\r\n.hourCard {\r\n  height: 100%;\r\n  display: grid;\r\n  /* grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr; */\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#hourIcon {\r\n  grid-row: 4 / 5;\r\n}\r\n\r\n@media only screen and (max-width: 850px) {\r\n  body {\r\n    background-color: lightblue;\r\n  }\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/arrowLeft.svg":
/*!**********************************!*\
  !*** ./src/images/arrowLeft.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d61f631a81b5ab967068.svg";

/***/ }),

/***/ "./src/images/arrowRight.svg":
/*!***********************************!*\
  !*** ./src/images/arrowRight.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4d84eaf1e98c27070c4e.svg";

/***/ }),

/***/ "./src/images/feelsLikeIcon.svg":
/*!**************************************!*\
  !*** ./src/images/feelsLikeIcon.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a76cbc057d1734738c3a.svg";

/***/ }),

/***/ "./src/images/humidityIcon.svg":
/*!*************************************!*\
  !*** ./src/images/humidityIcon.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "285012c48709b595dccd.svg";

/***/ }),

/***/ "./src/images/precipitationIcon.svg":
/*!******************************************!*\
  !*** ./src/images/precipitationIcon.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eb8125f7ed77abf01963.svg";

/***/ }),

/***/ "./src/images/searchIcon.svg":
/*!***********************************!*\
  !*** ./src/images/searchIcon.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d46c1d565eac631fdac5.svg";

/***/ }),

/***/ "./src/images/weatherBackground.jpg":
/*!******************************************!*\
  !*** ./src/images/weatherBackground.jpg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7bae6e94fa88265ada67.jpg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/clearSkyCropped.svg":
/*!****************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/clearSkyCropped.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c3fa66f40127756c5343.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg":
/*!***************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/drizzleCropped.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3a7ae8f3521304f1d514.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/foggyCropped.svg":
/*!*************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/foggyCropped.svg ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e9dca14f2729654c05b5.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg":
/*!***********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a01fefe66a9531096371.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingRainCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5175bf8ad121ddf62b02.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a831295d93ec49f4f460.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainCropped.svg":
/*!************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainCropped.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c43a8eaaa172bd14a4e8.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ef03d3660182539936f9.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg":
/*!******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5a84ad51327f6ee2805e.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3d6299dd0f1989a52d82.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg":
/*!****************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowfallCropped.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "90ac81ea5040c97b2094.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg":
/*!************************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "1844d34a98ef770748e4.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/clearSky.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/clearSky.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "57115272e13f63d2b6eb.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/drizzle.svg":
/*!*************************************************!*\
  !*** ./src/images/weatherCodeIcons/drizzle.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eaa047ffecc293178e8b.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/foggy.svg":
/*!***********************************************!*\
  !*** ./src/images/weatherCodeIcons/foggy.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6cb1a62bf26dff88673.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingDrizzle.svg":
/*!*********************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingDrizzle.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6c557e6f6c1be983599.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingRain.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingRain.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e0afcc3dbb38db0f744a.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/partlyCloudy.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/partlyCloudy.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "132deb8460c23708c06c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rain.svg":
/*!**********************************************!*\
  !*** ./src/images/weatherCodeIcons/rain.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "283ea8b5f692002ac283.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rainShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/rainShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "989db99cbd4c524458e1.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowGrains.svg":
/*!****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowGrains.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a6c557e6f6c1be983599.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bafa4a458f7f6f723324.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowfall.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowfall.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d4fa716f7b0121462f6c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/thunderStormBoth.svg":
/*!**********************************************************!*\
  !*** ./src/images/weatherCodeIcons/thunderStormBoth.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "439bc95ff0ee4edc085e.svg";

/***/ }),

/***/ "./src/images/windIcon.svg":
/*!*********************************!*\
  !*** ./src/images/windIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2801ccc432fcc717bc51.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _apiHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiHandler */ "./src/apiHandler.js");
/* harmony import */ var _domHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domHandler */ "./src/domHandler.js");




/*
-Only get weather data:
    -on page load
    -when the search form has a valid input
*/

// Render inital page with weather data
async function renderPage(location, celcius) {
  try {
    const data = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.getWeatherData)(location);
    let upperLeftData;
    let upperRightData;
    let footerData;
    if (celcius) {
      upperLeftData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperLeftData)(data.currentCelcius);
      upperRightData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperRightData)(data.currentCelcius);
      footerData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractFooterdata)(data.forecastCelcius, data.currentCelcius);
    } else {
      upperLeftData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperLeftData)(data.currentFahrenheit);
      upperRightData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperRightData)(data.currentFahrenheit);
      footerData = await (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractFooterdata)(data.forecastFahrenheit, data.currentFahrenheit);
    }
    (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderUpperLeftCorner)(upperLeftData);
    (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderUpperRightCorner)(upperRightData);
    (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderFooter)(footerData.daily, footerData.hourly);
    return "All good";
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(new Error("Error while getting weather data"));
    });
  }
}
function showErrorModal() {
  console.log("Page failed to load! Showing Error Modal...");
}

// Hide everything but the background until the fetched api data loads, if the
// fetch call fails, then show an error message
async function showPage() {
  const mainContainer = document.getElementById("mainContainer");
  try {
    await renderPage("Toronto", true);
    mainContainer.classList.add("show");
  } catch (error) {
    mainContainer.classList.remove("show");
    showErrorModal();
  }
}

// Set up page --> NO weather calls
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.setupPage)();
showPage();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxnRkFBZ0YsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsUUFBUSxPQUFPLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sYUFBYSxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLGFBQWEsTUFBTSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sV0FBVyxLQUFLLFlBQVksYUFBYSxXQUFXLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFX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QUM4TSxPQUFPLEVBQUVDLE1BQU0sS0FBSztNQUN0Q0EsTUFBTSxDQUFDLElBQUluTyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUM7RUFDSjtBQUNGO0FBRUEsU0FBU29PLGNBQWNBLENBQUEsRUFBRztFQUN4QnpNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDZDQUE2QyxDQUFDO0FBQzVEOztBQUVBO0FBQ0E7QUFDQSxlQUFleU0sUUFBUUEsQ0FBQSxFQUFHO0VBQ3hCLE1BQU1DLGFBQWEsR0FBR2xGLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGVBQWUsQ0FBQztFQUM5RCxJQUFJO0lBQ0YsTUFBTTJFLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0lBQ2pDTSxhQUFhLENBQUN2RCxTQUFTLENBQUNFLEdBQUcsQ0FBQyxNQUFNLENBQUM7RUFDckMsQ0FBQyxDQUFDLE9BQU9oTCxLQUFLLEVBQUU7SUFDZHFPLGFBQWEsQ0FBQ3ZELFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN0Q29ELGNBQWMsQ0FBQyxDQUFDO0VBQ2xCO0FBQ0Y7O0FBRUE7QUFDQUwsc0RBQVMsQ0FBQyxDQUFDO0FBQ1hNLFFBQVEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2FwaUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9kb21IYW5kbGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uQ29vcmRpbmF0ZXMobG9jYXRpb24pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXNQcm9tc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vZ2VvY29kaW5nLWFwaS5vcGVuLW1ldGVvLmNvbS92MS9zZWFyY2g/bmFtZT0ke2xvY2F0aW9ufSZjb3VudD0xJmxhbmd1YWdlPWVuJmZvcm1hdD1qc29uYCxcclxuICAgICk7XHJcbiAgICBjb25zdCBjb29yZGluYXRlc09iamVjdCA9IGF3YWl0IGNvb3JkaW5hdGVzUHJvbXNlLmpzb24oKTtcclxuICAgIGlmIChjb29yZGluYXRlc09iamVjdC5yZXN1bHRzKSB7XHJcbiAgICAgIGNvbnN0IHsgbmFtZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgdGltZXpvbmUgfSA9XHJcbiAgICAgICAgY29vcmRpbmF0ZXNPYmplY3QucmVzdWx0c1swXTtcclxuICAgICAgcmV0dXJuIHsgbmFtZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgdGltZXpvbmUgfTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGZldGNoaW5nIGxvY2F0aW9uIGNvb3JkaWFudGVzXCIpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBmZXRjaGluZyBsb2NhdGlvbiBjb29yZGlhbnRlc1wiLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBidWlsZEZldGNoVVJMKFxyXG4gIGNvb3JkaW5hdGVQcm9taXNlLFxyXG4gIGN1cnJlbnRPckZvcmVjYXN0LFxyXG4gIGNlbGNpdXNPckZhaHJlbmhlaXQsXHJcbikge1xyXG4gIGNvbnN0IGNvb3JkaW5hdGVEYXRhID0gYXdhaXQgY29vcmRpbmF0ZVByb21pc2U7XHJcblxyXG4gIC8vIEN1cnJlbnQgZGF0YSBpbiBDZWxjaXVzXHJcbiAgbGV0IHVybCA9IGBodHRwczovL2FwaS5vcGVuLW1ldGVvLmNvbS92MS9mb3JlY2FzdD9sYXRpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxhdGl0dWRlfSZsb25naXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sb25naXR1ZGV9JmN1cnJlbnQ9dGVtcGVyYXR1cmVfMm0scmVsYXRpdmVfaHVtaWRpdHlfMm0sYXBwYXJlbnRfdGVtcGVyYXR1cmUscHJlY2lwaXRhdGlvbix3ZWF0aGVyX2NvZGUsd2luZF9zcGVlZF8xMG0maG91cmx5PXRlbXBlcmF0dXJlXzJtLHdlYXRoZXJfY29kZSZmb3JlY2FzdF9kYXlzPTImdGltZXpvbmU9JHtjb29yZGluYXRlRGF0YS50aW1lem9uZX1gO1xyXG5cclxuICAvLyBDdXJyZW50IGRhdGEgaW4gRmFocmVuaGVpdFxyXG4gIGlmIChjdXJyZW50T3JGb3JlY2FzdCA9PT0gXCJDdXJyZW50XCIgJiYgY2VsY2l1c09yRmFocmVuaGVpdCA9PT0gXCJGYWhyZW5oZWl0XCIpIHtcclxuICAgIHVybCA9IGBodHRwczovL2FwaS5vcGVuLW1ldGVvLmNvbS92MS9mb3JlY2FzdD9sYXRpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxhdGl0dWRlfSZsb25naXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sb25naXR1ZGV9JmN1cnJlbnQ9dGVtcGVyYXR1cmVfMm0scmVsYXRpdmVfaHVtaWRpdHlfMm0sYXBwYXJlbnRfdGVtcGVyYXR1cmUscHJlY2lwaXRhdGlvbix3ZWF0aGVyX2NvZGUsd2luZF9zcGVlZF8xMG0maG91cmx5PXRlbXBlcmF0dXJlXzJtLHdlYXRoZXJfY29kZSZmb3JlY2FzdF9kYXlzPTImdGltZXpvbmU9JHtjb29yZGluYXRlRGF0YS50aW1lem9uZX0mdGVtcGVyYXR1cmVfdW5pdD1mYWhyZW5oZWl0JndpbmRfc3BlZWRfdW5pdD1tcGgmcHJlY2lwaXRhdGlvbl91bml0PWluY2hgO1xyXG5cclxuICAgIC8vIEZvcmVjYXN0IGRhdGEgaW4gQ2VsY2l1c1xyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBjdXJyZW50T3JGb3JlY2FzdCA9PT0gXCJGb3JlY2FzdFwiICYmXHJcbiAgICBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkNlbGNpdXNcIlxyXG4gICkge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mZGFpbHk9d2VhdGhlcl9jb2RlLHRlbXBlcmF0dXJlXzJtX21heCx0ZW1wZXJhdHVyZV8ybV9taW4mZm9yZWNhc3RfZGF5cz04JnRpbWV6b25lPSR7Y29vcmRpbmF0ZURhdGEudGltZXpvbmV9YDtcclxuXHJcbiAgICAvLyBGb3JlY2FzdCBkYXRhIGluIEZhaHJlbmhlaXRcclxuICB9IGVsc2UgaWYgKFxyXG4gICAgY3VycmVudE9yRm9yZWNhc3QgPT09IFwiRm9yZWNhc3RcIiAmJlxyXG4gICAgY2VsY2l1c09yRmFocmVuaGVpdCA9PT0gXCJGYWhyZW5oZWl0XCJcclxuICApIHtcclxuICAgIHVybCA9IGBodHRwczovL2FwaS5vcGVuLW1ldGVvLmNvbS92MS9mb3JlY2FzdD9sYXRpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxhdGl0dWRlfSZsb25naXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sb25naXR1ZGV9JmRhaWx5PXdlYXRoZXJfY29kZSx0ZW1wZXJhdHVyZV8ybV9tYXgsdGVtcGVyYXR1cmVfMm1fbWluJmZvcmVjYXN0X2RheXM9OCZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfSZ0ZW1wZXJhdHVyZV91bml0PWZhaHJlbmhlaXQmd2luZF9zcGVlZF91bml0PW1waCZwcmVjaXBpdGF0aW9uX3VuaXQ9aW5jaGA7XHJcbiAgfVxyXG4gIHJldHVybiB1cmw7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybFByb21pc2UpIHtcclxuICBjb25zdCB1cmwgPSBhd2FpdCB1cmxQcm9taXNlO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YVJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IG1vZGU6IFwiY29yc1wiIH0pO1xyXG4gICAgaWYgKCF3ZWF0aGVyRGF0YVJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICAgIGNvbnN0IHdlYXRoZXJEYXRhSlNPTiA9IGF3YWl0IHdlYXRoZXJEYXRhUmVzcG9uc2UuanNvbigpO1xyXG4gICAgICByZXR1cm4gd2VhdGhlckRhdGFKU09OO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgd2VhdGhlciBkYXRhXCIpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBmZXRjaGluZyB3ZWF0aGVyIGRhdGFcIiwgZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBhd2FpdCBnZXRMb2NhdGlvbkNvb3JkaW5hdGVzKGxvY2F0aW9uKTtcclxuICAgIGNvbnN0IHVybDEgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkN1cnJlbnRcIiwgXCJDZWxjaXVzXCIpO1xyXG4gICAgY29uc3QgdXJsMiA9IGJ1aWxkRmV0Y2hVUkwoY29vcmRpbmF0ZXMsIFwiQ3VycmVudFwiLCBcIkZhaHJlbmhlaXRcIik7XHJcbiAgICBjb25zdCB1cmwzID0gYnVpbGRGZXRjaFVSTChjb29yZGluYXRlcywgXCJGb3JlY2FzdFwiLCBcIkNlbGNpdXNcIik7XHJcbiAgICBjb25zdCB1cmw0ID0gYnVpbGRGZXRjaFVSTChjb29yZGluYXRlcywgXCJGb3JlY2FzdFwiLCBcIkZhaHJlbmhlaXRcIik7XHJcblxyXG4gICAgY29uc3QgYWxsV2VhdGhlckRhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChbXHJcbiAgICAgIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybDEpLFxyXG4gICAgICBmZXRjaEN1cnJlbnRXZWF0aGVyRGF0YSh1cmwyKSxcclxuICAgICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsMyksXHJcbiAgICAgIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybDQpLFxyXG4gICAgXSk7XHJcbiAgICBjb25zdCBtYXBwZWRXZWF0aGVyRGF0YSA9IHtcclxuICAgICAgY3VycmVudENlbGNpdXM6IFthbGxXZWF0aGVyRGF0YVswXSwgY29vcmRpbmF0ZXMubmFtZV0sXHJcbiAgICAgIGN1cnJlbnRGYWhyZW5oZWl0OiBbYWxsV2VhdGhlckRhdGFbMV0sIGNvb3JkaW5hdGVzLm5hbWVdLFxyXG4gICAgICBmb3JlY2FzdENlbGNpdXM6IGFsbFdlYXRoZXJEYXRhWzJdLFxyXG4gICAgICBmb3JlY2FzdEZhaHJlbmhlaXQ6IGFsbFdlYXRoZXJEYXRhWzNdLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBtYXBwZWRXZWF0aGVyRGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coXCJFcnJvciB3aGlsZSBnZXR0aW5nIHdlYXRoZXIgZGF0YVwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gZXJyb3I7XHJcbiAgICAvLyB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBnZXR0aW5nIHdlYXRoZXIgZGF0YVwiLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbnRlcnByZXRXZWF0aGVyQ29kZShjb2RlKSB7XHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICByZXR1cm4gXCJNYWlubHkgQ2xlYXIgU2t5XCI7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHJldHVybiBcIlBhcnRseSBDbG91ZHlcIjtcclxuICAgIGNhc2UgMzpcclxuICAgICAgcmV0dXJuIFwiT3ZlcmNhc3QgQ2xvdWRzXCI7XHJcbiAgICBjYXNlIDQ1OlxyXG4gICAgICByZXR1cm4gXCJOb24tRnJvemVuIEZvZ1wiO1xyXG4gICAgY2FzZSA0ODpcclxuICAgICAgcmV0dXJuIFwiRnJlZXppbmcgRm9nXCI7XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgICByZXR1cm4gXCJMaWdodCBEcml6emxlXCI7XHJcbiAgICBjYXNlIDUzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBEcml6emxlXCI7XHJcbiAgICBjYXNlIDU1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTc6XHJcbiAgICAgIHJldHVybiBcIkRlbnNlIEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNjE6XHJcbiAgICAgIHJldHVybiBcIlNsaWdodCBSYWluXCI7XHJcbiAgICBjYXNlIDYzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBSYWluXCI7XHJcbiAgICBjYXNlIDY1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFJhaW5cIjtcclxuICAgIGNhc2UgNjY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIFJhaW5cIjtcclxuICAgIGNhc2UgNjc6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgRnJlZXppbmcgUmFpblwiO1xyXG4gICAgY2FzZSA3MTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDczOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDc3OlxyXG4gICAgICByZXR1cm4gXCJHcmFudWxhciBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgODA6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4MTpcclxuICAgICAgcmV0dXJuIFwiTW9kZXJhdGUgUmFpbiBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDgyOlxyXG4gICAgICByZXR1cm4gXCJWaW9sZW50IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4NTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDg2OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFNub3cgU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA5NTpcclxuICAgICAgcmV0dXJuIFwiVGh1bmRlcnN0b3JtXCI7XHJcbiAgICBjYXNlIDk2OlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBUaHVuZGVyc3Rvcm1cIjtcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBcIlRodW5kZXJzdG9ybSBXaXRoIEhlYXZ5IEhhaWxcIjtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF0ZSh0aW1lWm9uZSkge1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICB3ZWVrZGF5OiBcImxvbmdcIixcclxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICB0aW1lWm9uZSxcclxuICB9O1xyXG4gIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIGZvcm1hdHRlZERhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFRpbWVJblRpbWV6b25lKHRpbWVab25lKSB7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxyXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcclxuICAgIHRpbWVab25lLFxyXG4gICAgdGltZVpvbmVOYW1lOiBcInNob3J0XCIsXHJcbiAgfTtcclxuICBjb25zdCBhZGp1c3RlZFRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIGFkanVzdGVkVGltZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XHJcbiAgY29uc3QgbWlsaXRhcnlUaW1lID0gbmV3IERhdGUodGltZSk7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxyXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcclxuICAgIGhvdXIxMjogdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBtaWxpdGFyeVRpbWUudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcclxuICByZXR1cm4gZm9ybWF0dGVkVGltZTtcclxufVxyXG5cclxuLy8gRnVuY3Rpb24gdG8gZ2V0IHRoZSBzdWZmaXggZm9yIHRoZSBkYXkgKGUuZy4sIFwic3RcIiwgXCJuZFwiLCBcInJkXCIsIFwidGhcIilcclxuZnVuY3Rpb24gZ2V0TnVtYmVyU3VmZml4KGRheSkge1xyXG4gIGlmIChkYXkgPj0gMTEgJiYgZGF5IDw9IDEzKSB7XHJcbiAgICByZXR1cm4gXCJ0aFwiO1xyXG4gIH1cclxuICBzd2l0Y2ggKGRheSAlIDEwKSB7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIHJldHVybiBcInN0XCI7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHJldHVybiBcIm5kXCI7XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIHJldHVybiBcInJkXCI7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gXCJ0aFwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF5KGlucHV0U3RyaW5nLCB0aW1lem9uZSkge1xyXG4gIGNvbnN0IGlucHV0RGF0ZSA9IG5ldyBEYXRlKGAke2lucHV0U3RyaW5nfVQwMDowMDowMGApO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICB3ZWVrZGF5OiBcImxvbmdcIixcclxuICAgIHRpbWVab25lOiB0aW1lem9uZSxcclxuICB9O1xyXG4gIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBpbnB1dERhdGUudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCBvcHRpb25zKTtcclxuICBjb25zdCBkYXlPZk1vbnRoID0gaW5wdXREYXRlLmdldERhdGUoKTtcclxuICBjb25zdCBzdWZmaXggPSBnZXROdW1iZXJTdWZmaXgoZGF5T2ZNb250aCk7XHJcbiAgY29uc3QgZm9ybWF0dGVkRGF0ZVdpdGhUaCA9IGAke2Zvcm1hdHRlZERhdGV9ICR7ZGF5T2ZNb250aH0ke3N1ZmZpeH1gO1xyXG4gIHJldHVybiBmb3JtYXR0ZWREYXRlV2l0aFRoO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc29sYXRlQ3VycmVudEhvdXJJbmRleCh0aW1lWm9uZSkge1xyXG4gIC8vIGNvbnN0IGN1cnJlbnRUaW1lID0gZ2V0VGltZUluVGltZXpvbmUodGltZVpvbmUpO1xyXG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxyXG4gICAgdGltZVpvbmUsXHJcbiAgICBob3VyMTI6IGZhbHNlLCAvLyBFbnN1cmUgMjQtaG91ciBmb3JtYXRcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaG91ciA9IHBhcnNlSW50KGN1cnJlbnRUaW1lLCAxMCk7XHJcbiAgcmV0dXJuIGhvdXI7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RVcHBlckxlZnREYXRhKHdlYXRoZXJEYXRhUHJvbWlzZSkge1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB3ZWF0aGVyRGF0YVByb21pc2U7XHJcbiAgY29uc3QgbWFpbkZvcmVjYXN0ID0gaW50ZXJwcmV0V2VhdGhlckNvZGUoZGF0YVswXS5jdXJyZW50LndlYXRoZXJfY29kZSk7XHJcbiAgY29uc3QgdXBwZXJMZWZ0RGF0YSA9IHtcclxuICAgIG1haW5Gb3JlY2FzdCxcclxuICAgIGxvY2F0aW9uOiBkYXRhWzFdLFxyXG4gICAgZGF0ZTogZm9ybWF0RGF0ZShkYXRhWzBdLnRpbWV6b25lKSxcclxuICAgIHRpbWU6IGdldFRpbWVJblRpbWV6b25lKGRhdGFbMF0udGltZXpvbmUpLFxyXG4gICAgdGVtcGVyYXR1cmU6IGAke2RhdGFbMF0uY3VycmVudC50ZW1wZXJhdHVyZV8ybX0gJHtkYXRhWzBdLmN1cnJlbnRfdW5pdHMudGVtcGVyYXR1cmVfMm19YCxcclxuICAgIGljb25Db2RlOiBkYXRhWzBdLmN1cnJlbnQud2VhdGhlcl9jb2RlLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyTGVmdERhdGE7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RVcHBlclJpZ2h0RGF0YSh3ZWF0aGVyRGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgd2VhdGhlckRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IHVwcGVyUmlnaHREYXRhID0ge1xyXG4gICAgZmVlbHNMaWtlOiBgJHtkYXRhWzBdLmN1cnJlbnQuYXBwYXJlbnRfdGVtcGVyYXR1cmV9ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLmFwcGFyZW50X3RlbXBlcmF0dXJlfWAsXHJcbiAgICBodW1pZGl0eTogYCR7ZGF0YVswXS5jdXJyZW50LnJlbGF0aXZlX2h1bWlkaXR5XzJtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy5yZWxhdGl2ZV9odW1pZGl0eV8ybX1gLFxyXG4gICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YVswXS5jdXJyZW50LnByZWNpcGl0YXRpb259ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLnByZWNpcGl0YXRpb259YCxcclxuICAgIHdpbmRTcGVlZDogYCR7ZGF0YVswXS5jdXJyZW50LndpbmRfc3BlZWRfMTBtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy53aW5kX3NwZWVkXzEwbX1gLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyUmlnaHREYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0Rm9vdGVyZGF0YShkYWlseURhdGFQcm9taXNlLCBob3VybHlEYXRhUHJvbWlzZSkge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGF3YWl0IGRhaWx5RGF0YVByb21pc2U7XHJcbiAgY29uc3QgaG91cmx5RGF0YSA9IGF3YWl0IGhvdXJseURhdGFQcm9taXNlO1xyXG4gIC8vIEZpbGwgaW4gYW5kIHJldHVybiB0aGlzIG9iamVjdFxyXG4gIGNvbnN0IGZvb3RlckRhdGEgPSB7XHJcbiAgICBkYWlseTogW10sXHJcbiAgICBob3VybHk6IFtdLFxyXG4gIH07XHJcbiAgLy8gRmlsbCBpbiBkYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYWlseURhdGEuZGFpbHkudGVtcGVyYXR1cmVfMm1fbWF4Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBjb21waWxlZERhdGEgPSB7XHJcbiAgICAgIGRhdGU6IGZvcm1hdERheShkYWlseURhdGEuZGFpbHkudGltZVtpXSwgZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRpbWV6b25lKSxcclxuICAgICAgbWF4VGVtcDogYCR7ZGFpbHlEYXRhLmRhaWx5LnRlbXBlcmF0dXJlXzJtX21heFtpXX0gJHtkYWlseURhdGEuZGFpbHlfdW5pdHMudGVtcGVyYXR1cmVfMm1fbWF4fWAsXHJcbiAgICAgIG1pblRlbXA6IGAke2RhaWx5RGF0YS5kYWlseS50ZW1wZXJhdHVyZV8ybV9taW5baV19ICR7ZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRlbXBlcmF0dXJlXzJtX21pbn1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogZGFpbHlEYXRhLmRhaWx5LndlYXRoZXJfY29kZVtpXSxcclxuICAgIH07XHJcbiAgICBmb290ZXJEYXRhLmRhaWx5LnB1c2goY29tcGlsZWREYXRhKTtcclxuICB9XHJcbiAgLy8gVGhlIGFwaSBjYWxsIGJ5IHJldHVybnMgZGF0YSBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZGF5IGFsb25nc2lkZSB0aGUgZm9yZWNhc3RcclxuICAvLyBmb3IgdGhlIG5leHQgc2V2ZW4gZGF5cywgZ2V0IHJpZCBvZiB0aGUgZmlyc3QgZGF5IGFzIHRoYXQgZGF5cyBkYXRhIGFscmVhZHlcclxuICAvLyBleGlzdHMgd2l0aGluIHRoZSBcImN1cnJlbnRcIiBhcGkgcmVxdWVzdCBwYXlsb2FkXHJcbiAgZm9vdGVyRGF0YS5kYWlseS5zaGlmdCgpO1xyXG5cclxuICAvLyBIb3VycyBhcmUgZGlzcGxheWVkIHN0YXJ0aW5nIGFmdGVyIHRoZSBjdXJyZW50IGhvdXIuIEZpbmQgdGhhdCBob3VyXHJcbiAgLy8gc28gdGhhdCB0aGUgbmV4dCAyNCBob3VycyBhZnRlciBpdCBjYW4gYmUgZGlzcGxheWVkXHJcbiAgY29uc3QgY3VycmVudEhvdXIgPSBpc29sYXRlQ3VycmVudEhvdXJJbmRleChob3VybHlEYXRhWzBdLnRpbWV6b25lKTtcclxuICBjb25zdCB2YWxpZEN1cnJlbnRIb3VyID0gKGN1cnJlbnRIb3VyICsgMjQpICUgMjQ7XHJcblxyXG4gIC8vIEZpbGwgaW4gaG91cmx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGhvdXJJbmRleCA9ICh2YWxpZEN1cnJlbnRIb3VyICsgaSkgJSAyNDtcclxuICAgIGNvbnN0IGNvbXBpbGVkRGF0YSA9IHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShob3VybHlEYXRhWzBdLmhvdXJseS50aW1lW2hvdXJJbmRleF0pLFxyXG4gICAgICB0ZW1wZXJhdHVyZTogYCR7aG91cmx5RGF0YVswXS5ob3VybHkudGVtcGVyYXR1cmVfMm1baG91ckluZGV4XX0gJHtob3VybHlEYXRhWzBdLmhvdXJseV91bml0cy50ZW1wZXJhdHVyZV8ybX1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogaG91cmx5RGF0YVswXS5ob3VybHkud2VhdGhlcl9jb2RlW2hvdXJJbmRleF0sXHJcbiAgICB9O1xyXG4gICAgZm9vdGVyRGF0YS5ob3VybHkucHVzaChjb21waWxlZERhdGEpO1xyXG4gIH1cclxuICAvLyBUaGUgYXBpIGNhbGwgcmV0dXJucyBkYXRhIGZvciB0aGUgY3VycmVudCBob3VyLCB0aGlzIGlzIGFscmVhZHkgZGlzcGxheWVkXHJcbiAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBkaXNwbGF5IGl0IGJlbG93IChzYW1lIGxvZ2ljIGFzIHdpdGggdGhlIGN1cnJlbnQgZGF5KVxyXG4gIGZvb3RlckRhdGEuaG91cmx5LnNoaWZ0KCk7XHJcbiAgcmV0dXJuIGZvb3RlckRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZ2V0V2VhdGhlckRhdGEsXHJcbiAgZXh0cmFjdFVwcGVyTGVmdERhdGEsXHJcbiAgZXh0cmFjdFVwcGVyUmlnaHREYXRhLFxyXG4gIGV4dHJhY3RGb290ZXJkYXRhLFxyXG59O1xyXG4iLCIvLyBPdGhlciBJY29uc1xyXG5pbXBvcnQgc2VhcmNoSWNvbiBmcm9tIFwiLi9pbWFnZXMvc2VhcmNoSWNvbi5zdmdcIjtcclxuaW1wb3J0IGZlZWxzTGlrZUljb24gZnJvbSBcIi4vaW1hZ2VzL2ZlZWxzTGlrZUljb24uc3ZnXCI7XHJcbmltcG9ydCBodW1pZGl0eUljb24gZnJvbSBcIi4vaW1hZ2VzL2h1bWlkaXR5SWNvbi5zdmdcIjtcclxuaW1wb3J0IHByZWNpcGl0YXRpb25JY29uIGZyb20gXCIuL2ltYWdlcy9wcmVjaXBpdGF0aW9uSWNvbi5zdmdcIjtcclxuaW1wb3J0IHdpbmRTcGVlZEljb24gZnJvbSBcIi4vaW1hZ2VzL3dpbmRJY29uLnN2Z1wiO1xyXG5pbXBvcnQgbGVmdEFycm93SWNvbiBmcm9tIFwiLi9pbWFnZXMvYXJyb3dMZWZ0LnN2Z1wiO1xyXG5pbXBvcnQgcmlnaHRBcnJvd0ljb24gZnJvbSBcIi4vaW1hZ2VzL2Fycm93UmlnaHQuc3ZnXCI7XHJcblxyXG4vLyBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9jbGVhclNreS5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9wYXJ0bHlDbG91ZHkuc3ZnXCI7XHJcbmltcG9ydCBmb2dneSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mb2dneS5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGUgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZHJpenpsZS5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mcmVlemluZ0RyaXp6bGUuc3ZnXCI7XHJcbmltcG9ydCByYWluIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3JhaW4uc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW4gZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZnJlZXppbmdSYWluLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGwgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvc25vd2ZhbGwuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dHcmFpbnMuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2VycyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9yYWluU2hvd2Vycy5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dTaG93ZXJzLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aCBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy90aHVuZGVyU3Rvcm1Cb3RoLnN2Z1wiO1xyXG5cclxuLy8gQ3JvcHBlZCBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2NsZWFyU2t5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3BhcnRseUNsb3VkeUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmb2dneUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZvZ2d5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGVDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9kcml6emxlQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZyZWV6aW5nRHJpenpsZUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvcmFpbkNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW5DIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9mcmVlemluZ1JhaW5Dcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGxDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9zbm93ZmFsbENyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd0dyYWluc0Nyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2Vyc0MgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3JhaW5TaG93ZXJzQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd1Nob3dlcnNDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aEMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3RodW5kZXJTdG9ybUJvdGhDcm9wcGVkLnN2Z1wiO1xyXG5cclxuLy8gaW1wb3J0IGdldFdlYXRoZXJEYXRhIGZyb20gXCIuL2FwaUhhbmRsZXJcIjtcclxuXHJcbmNvbnN0IHdlYXRoZXJJY29ucyA9IFtcclxuICBjbGVhclNreSxcclxuICBwYXJ0bHlDbG91ZHksXHJcbiAgZm9nZ3ksXHJcbiAgZHJpenpsZSxcclxuICBmcmVlemluZ0RyaXp6bGUsXHJcbiAgcmFpbixcclxuICBmcmVlemluZ1JhaW4sXHJcbiAgc25vd2ZhbGwsXHJcbiAgc25vd0dyYWlucyxcclxuICByYWluU2hvd2VycyxcclxuICBzbm93U2hvd2VycyxcclxuICB0aHVuZGVyU3Rvcm1Cb3RoLFxyXG5dO1xyXG5cclxuY29uc3Qgd2VhdGhlckljb25zQ3JvcHBlZCA9IFtcclxuICBjbGVhclNreUMsXHJcbiAgcGFydGx5Q2xvdWR5QyxcclxuICBmb2dneUMsXHJcbiAgZHJpenpsZUMsXHJcbiAgZnJlZXppbmdEcml6emxlQyxcclxuICByYWluQyxcclxuICBmcmVlemluZ1JhaW5DLFxyXG4gIHNub3dmYWxsQyxcclxuICBzbm93R3JhaW5zQyxcclxuICByYWluU2hvd2Vyc0MsXHJcbiAgc25vd1Nob3dlcnNDLFxyXG4gIHRodW5kZXJTdG9ybUJvdGhDLFxyXG5dO1xyXG5cclxuLy8gZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4vLyAgIC8vIFRlc3QgQ1NTXHJcbi8vICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlRlc3RpbmcuLi5cIjtcclxuLy8gICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoZWxsb1wiKTtcclxuXHJcbi8vICAgLy8gVGVzdCBBc3NldCBsb2FkZXJcclxuLy8gICBjb25zdCBpbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICBpbWFnZUVsZW1lbnQuc3JjID0gdGVzdEltYWdlO1xyXG4vLyAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcclxuXHJcbi8vICAgLy8gVGVzdCBzb3VyY2UgbWFwIC0tPiB1bmNvbW1lbnQgdG8gdGVzdCB0cmFja2luZ1xyXG4vLyAgIC8vIGNvc25vbGUubG9nKCdJIGdldCBjYWxsZWQgZnJvbSBwcmludC5qcyEnKTtcclxuXHJcbi8vICAgLy8gVGVzdCBFc2xpbnQgLS0+IHVuY29tbWVudCB0byBzZWUgc3VnZ2VzdGlvbnNcclxuLy8gICAvLyBpZiAodHJ1ZSkge31cclxuXHJcbi8vICAgcmV0dXJuIGVsZW1lbnQ7XHJcbi8vIH1cclxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZShwYXJlbnQsIGltYWdlKSB7XHJcbiAgY29uc3QgaW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlO1xyXG4gIC8vIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGVzdEJvcmRlclwiKTtcclxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySWNvbnMoKSB7XHJcbiAgLy8gU2VhcmNoYmFyIGljb25cclxuICBjb25zdCBzZWFyY2hJY29uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hJY29uQ29udGFpbmVyXCIpO1xyXG4gIHJlbmRlckltYWdlKHNlYXJjaEljb25Db250YWluZXIsIHNlYXJjaEljb24pO1xyXG5cclxuICAvLyBVcHBlciByaWdodCBpY29uc1xyXG4gIGNvbnN0IGZlZWxzTGlrZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHNMaWtlSWNvblwiKTtcclxuICByZW5kZXJJbWFnZShmZWVsc0xpa2VDb250YWluZXIsIGZlZWxzTGlrZUljb24pO1xyXG5cclxuICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtaWRpdHlJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKGh1bWlkaXR5Q29udGFpbmVyLCBodW1pZGl0eUljb24pO1xyXG5cclxuICBjb25zdCBwcmVjaXBpdGF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uSWNvblwiKTtcclxuICByZW5kZXJJbWFnZShwcmVjaXBpdGF0aW9uQ29udGFpbmVyLCBwcmVjaXBpdGF0aW9uSWNvbik7XHJcblxyXG4gIGNvbnN0IHdpbmRTcGVlZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZFNwZWVkSWNvblwiKTtcclxuICByZW5kZXJJbWFnZSh3aW5kU3BlZWRDb250YWluZXIsIHdpbmRTcGVlZEljb24pO1xyXG5cclxuICAvLyBIb3VybHkgZm9yZWNhc3QgYXJyb3dzXHJcbiAgY29uc3QgbGVmdEljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRBcnJvd1wiKTtcclxuICByZW5kZXJJbWFnZShsZWZ0SWNvbkNvbnRhaW5lciwgbGVmdEFycm93SWNvbik7XHJcblxyXG4gIGNvbnN0IHJpZ2h0SWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHRBcnJvd1wiKTtcclxuICByZW5kZXJJbWFnZShyaWdodEljb25Db250YWluZXIsIHJpZ2h0QXJyb3dJY29uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJwcmV0V2VhdGhlckNvZGUoY29kZSwgY3JvcHBlZCkge1xyXG4gIGxldCBpbWFnZXNUb1VzZSA9IHdlYXRoZXJJY29ucztcclxuICBpZiAoY3JvcHBlZCkge1xyXG4gICAgaW1hZ2VzVG9Vc2UgPSB3ZWF0aGVySWNvbnNDcm9wcGVkO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVswXTtcclxuICAgIGNhc2UgMTpcclxuICAgIGNhc2UgMjpcclxuICAgIGNhc2UgMzpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzFdO1xyXG4gICAgY2FzZSA0NTpcclxuICAgIGNhc2UgNDg6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsyXTtcclxuICAgIGNhc2UgNTE6XHJcbiAgICBjYXNlIDUzOlxyXG4gICAgY2FzZSA1NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzNdO1xyXG4gICAgY2FzZSA1NjpcclxuICAgIGNhc2UgNTc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs0XTtcclxuICAgIGNhc2UgNjE6XHJcbiAgICBjYXNlIDYzOlxyXG4gICAgY2FzZSA2NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzVdO1xyXG4gICAgY2FzZSA2NjpcclxuICAgIGNhc2UgNjc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs2XTtcclxuICAgIGNhc2UgNzE6XHJcbiAgICBjYXNlIDczOlxyXG4gICAgY2FzZSA3NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzddO1xyXG4gICAgY2FzZSA3NzpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzhdO1xyXG4gICAgY2FzZSA4MDpcclxuICAgIGNhc2UgODE6XHJcbiAgICBjYXNlIDgyOlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbOV07XHJcbiAgICBjYXNlIDg1OlxyXG4gICAgY2FzZSA4NjpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzEwXTtcclxuICAgIGNhc2UgOTU6XHJcbiAgICBjYXNlIDk2OlxyXG4gICAgY2FzZSA5OTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzExXTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVswXTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckZvcmVjYXN0SWNvbnMoaWNvbkNvZGVzLCBob3VybHkpIHtcclxuICBsZXQgY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRheUNhcmRcIik7XHJcbiAgaWYgKGhvdXJseSkge1xyXG4gICAgY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhvdXJDYXJkXCIpO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc0NvbGxlY3Rpb24ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGRheUljb25Db250YWluZXIgPVxyXG4gICAgICBjYXJkc0NvbGxlY3Rpb25baV0uY2hpbGRyZW5bY2FyZHNDb2xsZWN0aW9uW2ldLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xyXG4gICAgLy8gQ2xlYXIgcHJldmlvdXMgaWNvblxyXG4gICAgZGF5SWNvbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgcmVuZGVySW1hZ2UoZGF5SWNvbkNvbnRhaW5lciwgaW50ZXJwcmV0V2VhdGhlckNvZGUoaWNvbkNvZGVzW2ldLCBmYWxzZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ3VycmVudEljb24oaWNvbkNvZGUpIHtcclxuICBjb25zdCBtYWluSWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UobWFpbkljb25Db250YWluZXIsIGludGVycHJldFdlYXRoZXJDb2RlKGljb25Db2RlLCB0cnVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZvcmVjYXN0Q2FyZHModG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICBjb25zdCBkYWlseUZvcmVjYXN0Q2FyZHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYWlseUZvcmVjYXN0R3JpZFwiKTtcclxuICBjb25zdCBob3VybHlGb3JlY2FzdENhcmRzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5Rm9yZWNhc3RHcmlkXCIpO1xyXG4gIGNvbnN0IGRhaWx5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3Vyc1NlbGVjdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cnNTZWxlY3Rpb25Db250YWluZXJcIixcclxuICApO1xyXG5cclxuICBpZiAodG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICAgIGRhaWx5Rm9yZWNhc3RDYXJkc0dyaWQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICBob3VybHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGRhaWx5QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJib3JkZXJcIik7XHJcbiAgICBob3VybHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJzU2VsZWN0aW9uQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGFpbHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgZGFpbHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJseUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYm9yZGVyXCIpO1xyXG4gICAgaG91cnNTZWxlY3Rpb25CdXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gZnVuY3Rpb24gcmVSZW5kZXJJbkNlbGNpdXNPckZhaHJlbmhlaXQoKSB7XHJcblxyXG4vLyB9XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJVcHBlckxlZnRDb3JuZXIoZGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgZGF0YVByb21pc2U7XHJcbiAgY29uc3QgbWFpbkZvcmVjYXN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkZvcmVjYXN0XCIpO1xyXG4gIGNvbnN0IGxvY2F0aW9uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25cIik7XHJcbiAgY29uc3QgZGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGVcIik7XHJcbiAgY29uc3QgdGltZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVcIik7XHJcbiAgY29uc3QgdGVtcGVyYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluVGVtcGVyYXR1cmVcIik7XHJcblxyXG4gIG1haW5Gb3JlY2FzdEVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLm1haW5Gb3JlY2FzdDtcclxuICBsb2NhdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLmxvY2F0aW9uO1xyXG4gIGRhdGVFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5kYXRlO1xyXG4gIHRpbWVFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS50aW1lO1xyXG4gIHRlbXBlcmF0dXJlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEudGVtcGVyYXR1cmU7XHJcbiAgcmVuZGVyQ3VycmVudEljb24oZGF0YS5pY29uQ29kZSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclVwcGVyUmlnaHRDb3JuZXIoZGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgZGF0YVByb21pc2U7XHJcbiAgY29uc3QgZmVlbHNMaWtlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHNMaWtlXCIpO1xyXG4gIGNvbnN0IGh1bWlkaXR5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtaWRpdHlcIik7XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWNpcGl0YXRpb25cIik7XHJcbiAgY29uc3Qgd2luZFNwZWVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZFNwZWVkXCIpO1xyXG5cclxuICBmZWVsc0xpa2VFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5mZWVsc0xpa2U7XHJcbiAgaHVtaWRpdHlFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5odW1pZGl0eTtcclxuICBwcmVjaXBpdGF0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEucHJlY2lwaXRhdGlvbjtcclxuICB3aW5kU3BlZWRFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS53aW5kU3BlZWQ7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbmRlckZvb3Rlcihmb3JlY2FzdFByb21pc2UsIGN1cnJlbnRQcm9taXNlKSB7XHJcbiAgY29uc3QgZm9yZWNhc3REYXRhID0gYXdhaXQgZm9yZWNhc3RQcm9taXNlO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRhID0gYXdhaXQgY3VycmVudFByb21pc2U7XHJcbiAgY29uc3QgZGF5Q2FyZEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRheUNhcmRcIik7XHJcbiAgY29uc3QgaG91ckNhcmRFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob3VyQ2FyZFwiKTtcclxuXHJcbiAgLy8gUmVuZGVyIGZvcmVjYXN0L2RhaWx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcmVjYXN0RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgZGF5Q2FyZEVsZW1lbnRzW2ldLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gZm9yZWNhc3REYXRhW2ldLmRhdGU7XHJcbiAgICBkYXlDYXJkRWxlbWVudHNbaV0uY2hpbGRyZW5bMV0udGV4dENvbnRlbnQgPSBmb3JlY2FzdERhdGFbaV0ubWF4VGVtcDtcclxuICAgIGRheUNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblsyXS50ZXh0Q29udGVudCA9IGZvcmVjYXN0RGF0YVtpXS5taW5UZW1wO1xyXG4gIH1cclxuICAvLyBSZW5kZXIgaWNvbnNcclxuICBjb25zdCBkYWlseUljb25Db2RlcyA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9yZWNhc3REYXRhLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBkYWlseUljb25Db2Rlcy5wdXNoKGZvcmVjYXN0RGF0YVtpXS53ZWF0aGVyQ29kZSk7XHJcbiAgfVxyXG4gIHJlbmRlckZvcmVjYXN0SWNvbnMoZGFpbHlJY29uQ29kZXMsIGZhbHNlKTtcclxuXHJcbiAgLy8gUmVuZGVyIGN1cnJlbnQvaG91cmx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnREYXRhLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBob3VyQ2FyZEVsZW1lbnRzW2ldLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID1cclxuICAgICAgY3VycmVudERhdGFbaV0udGltZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaG91ckNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblsxXS50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhW2ldLnRlbXBlcmF0dXJlO1xyXG4gIH1cclxuICAvLyBSZW5kZXIgaWNvbnNcclxuICBjb25zdCBob3VybHlJY29uQ29kZXMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnREYXRhLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBob3VybHlJY29uQ29kZXMucHVzaChjdXJyZW50RGF0YVtpXS53ZWF0aGVyQ29kZSk7XHJcbiAgfVxyXG4gIHJlbmRlckZvcmVjYXN0SWNvbnMoaG91cmx5SWNvbkNvZGVzLCB0cnVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySG91cmx5Rm9yZWNhc3RDYXJkcyhlaWdodEhvdXJDaHVua0lkKSB7XHJcbiAgLy8gSGlkZSBhbGwgY2h1bmtzXHJcbiAgY29uc3QgYWxsQ2h1bmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNodW5rXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsQ2h1bmtzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBhbGxDaHVua3NbaV0uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgfVxyXG4gIC8vIFNob3cgc2VsZWN0ZWQgY2h1bmtcclxuICBjb25zdCBjaHVua1RvU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgYGVpZ2h0SG91ckNodW5rJHtlaWdodEhvdXJDaHVua0lkfWAsXHJcbiAgKTtcclxuICBjaHVua1RvU2hvdy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3dpdGNoSG91cnMoZG90RWxlbWVudCkge1xyXG4gIC8vIFNldCBhY3RpdmUgZG90XHJcbiAgY29uc3QgYWxsRG90RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsRG90RWxlbWVudHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGFsbERvdEVsZW1lbnRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG4gIGRvdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAvLyBSZW5kZXIgY29ycmVjdCB0aGUgY29ycmVjdCBlaWdodCBjYXJkc1xyXG4gIHJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMoZG90RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhvdXJcIikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzd2l0Y2hIb3VyVXNpbmdBcnJvdyhyaWdodEFycm93KSB7XHJcbiAgY29uc3QgY3VycmVudGx5QWN0aXZlRG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3QuYWN0aXZlXCIpO1xyXG5cclxuICAvLyBJZiB0aGUgcmlnaHQgYXJyb3cgaXMgY2xpY2tlZCwgbW92ZSB0aGUgY3VycmVudCBkb3QgdG8gdGhlIHJpZ2h0LCBsb29waW5nXHJcbiAgLy8gYXJvdW5kIGlmIHRoZSBhY3RpdmUgZG90IGlzIHRoZSByaWdodG1vc3QgZG90LCBpZiB0aGUgbGVmdCBhcnJvdyBpcyBjbGlja2VkXHJcbiAgLy8gbW92ZSB0aGUgY3VycmVudCBkb3QgdG8gdGhlIGxlZnQsIGxvb3BpbmcgYXJvdW5kIGlmIHRoZSBhY3RpdmUgZG90IGlzXHJcbiAgLy8gdGhlIGxlZnRtb3N0IGRvdFxyXG4gIGNvbnN0IGN1cnJlbnRseUFjdGl2ZURvdElkID0gY3VycmVudGx5QWN0aXZlRG90LmdldEF0dHJpYnV0ZShcImRhdGEtaG91clwiKTtcclxuICAvLyBjYWxjdWxhdGUgY29ycmVjdCBuZXcgZG90IGlkXHJcbiAgY29uc3QgbmV4dERvdElkID1cclxuICAgIChwYXJzZUludChjdXJyZW50bHlBY3RpdmVEb3RJZCwgMTApICsgKHJpZ2h0QXJyb3cgPyAxIDogMikpICUgMztcclxuICBjb25zdCBkb3RUb0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5kb3RbZGF0YS1ob3VyPVwiJHtuZXh0RG90SWR9XCJdYCk7XHJcbiAgc3dpdGNoSG91cnMoZG90VG9BY3RpdmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cExpc3RlbmVycygpIHtcclxuICBjb25zdCBkYWlseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUJ1dHRvblwiKTtcclxuICBkYWlseUZvcmVjYXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICB0b2dnbGVGb3JlY2FzdENhcmRzKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaG91cmx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseUJ1dHRvblwiKTtcclxuICBob3VybHlGb3JlY2FzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdG9nZ2xlRm9yZWNhc3RDYXJkcyh0cnVlKTtcclxuICB9KTtcclxuXHJcbiAgLy8gVGhlIGRhaWx5IGZvcmVjYXN0IHNob3dzIHRoZSBuZXh0IDI0IGhvdXJzIGFmdGVyIHRoZSBjdXJyZW50IGhvdXIsXHJcbiAgLy8gVGhlc2UgYXJlIHNob3duIGluIGNodW5rcyBvZiA4IGhvdXJzIGVhY2hcclxuICBjb25zdCBzd2l0Y2hIb3Vyc0RvdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZG90XCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpdGNoSG91cnNEb3RzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBzd2l0Y2hIb3Vyc0RvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XHJcbiAgICAgIHN3aXRjaEhvdXJzKHN3aXRjaEhvdXJzRG90c1tpXSksXHJcbiAgICApO1xyXG4gIH1cclxuICBjb25zdCBzd2l0Y2hIb3Vyc0Fycm93TGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdEFycm93XCIpO1xyXG4gIGNvbnN0IHN3aXRjaEhvdXJzQXJyb3dSaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHRBcnJvd1wiKTtcclxuICBzd2l0Y2hIb3Vyc0Fycm93TGVmdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cclxuICAgIHN3aXRjaEhvdXJVc2luZ0Fycm93KGZhbHNlKSxcclxuICApO1xyXG4gIHN3aXRjaEhvdXJzQXJyb3dSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cclxuICAgIHN3aXRjaEhvdXJVc2luZ0Fycm93KHRydWUpLFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHN3aXRjaENlbGNpdXNGYWhyZW5oZWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICBcInN3aXRjaFRlbXBlcmF0dXJlQnV0dG9uXCIsXHJcbiAgKTtcclxuICAvLyBzd2l0Y2hDZWxjaXVzRmFocmVuaGVpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiApXHJcbn1cclxuXHJcbi8vIENBTEwgVEhJUyBPTiBQQUdFIFJFTkRFUiBPUiBXSEVOIFRIRSBVU0VSIFNFQVJDSEVTIFdJVEggQSBWQUxJRCBJTlBVVFxyXG5mdW5jdGlvbiBzZXR1cFBhZ2UoKSB7XHJcbiAgcmVuZGVySWNvbnMoKTtcclxuICBzZXR1cExpc3RlbmVycygpO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIHNldHVwUGFnZSxcclxuICByZW5kZXJVcHBlckxlZnRDb3JuZXIsXHJcbiAgcmVuZGVyVXBwZXJSaWdodENvcm5lcixcclxuICByZW5kZXJGb290ZXIsXHJcbn07XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogbW9udHNlcnJhdCxzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5odG1sLCBib2R5IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuaHRtbCB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxufVxyXG5cclxuI2JhY2tncm91bmRDb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICB6LWluZGV4OiAtMTtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4gICAgcmdiYSgwLCAwLCAwLCAwLjE2NCksIFxyXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXHJcbiAgKSxcclxuICB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxufVxyXG5cclxuI21haW5Db250YWluZXIge1xyXG4gIGhlaWdodDogOTAlO1xyXG4gIHdpZHRoOiA5MCU7XHJcblxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogMmZyIDFmciAvIDFmciAxZnI7XHJcbn1cclxuXHJcbiNtYWluQ29udGFpbmVyLnNob3cge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbn1cclxuXHJcbi8qIFVwcGVyIExlZnQgRGlzcGxheSAqL1xyXG5cclxuI3VwcGVyTGVmdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbiNtYWluRm9yZWNhc3QsICNtYWluVGVtcGVyYXR1cmUge1xyXG4gIGZvbnQtc2l6ZTogM3JlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuI21haW5UZW1wZXJhdHVyZSB7XHJcbiAgZm9udC1zaXplOiAzLjVyZW07XHJcbn1cclxuXHJcbiNsb2NhdGlvbiwgI2RhdGUsICN0aW1lIHtcclxuICBmb250LXNpemU6IDEuMXJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuXHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdGNvbG9yOiBpbmhlcml0O1xyXG5cdGJvcmRlcjogbm9uZTtcclxuXHRwYWRkaW5nOiAwO1xyXG5cdGZvbnQ6IGluaGVyaXQ7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdG91dGxpbmU6IGluaGVyaXQ7XHJcbn1cclxuXHJcbiNzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNtYWluSWNvbiB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4O1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlOyAqL1xyXG59XHJcblxyXG4jc2VhcmNoQ29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG59XHJcblxyXG4jc2VhcmNoSWNvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEuM3JlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTBweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl0ge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDEuMXJlbTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgLyogYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlOyAqL1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIHRleHQtaW5kZW50OiA3cHg7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgcGFkZGluZzogMnB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXTo6cGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl06Zm9jdXMge1xyXG4gIG91dGxpbmUtd2lkdGg6IDA7XHJcbn1cclxuXHJcbi8qIFVwcGVyIFJpZ2h0IERpc3BsYXkgKi9cclxuXHJcbiN1cHBlclJpZ2h0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4jYWxpZ25SaWdodCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMzBweDtcclxufVxyXG5cclxuLnVwcGVyUmlnaHRDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxufVxyXG5cclxuLnVwcGVyUmlnaHRDb250YWluZXIgPiBkaXYgPiBwIHtcclxuICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5pY29uQ29udGFpbmVyIHtcclxuICB3aWR0aDogM3JlbTtcclxufVxyXG5cclxuLnVwcGVyTGVmdFRleHQge1xyXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xyXG59XHJcblxyXG4vKiBGb290ZXIgKi9cclxuXHJcbiNmb290ZXIge1xyXG4gIGdyaWQtY29sdW1uOiAxIC8gMztcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCBibHVlOyAqL1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciBidXR0b24ge1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbiNkYWlseUJ1dHRvbi5ib3JkZXIsICNob3VybHlCdXR0b24uYm9yZGVyIHtcclxuICAvKiBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTsgKi9cclxuICAtd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xyXG4gIC1tb3otYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XHJcbiAgYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XHJcbn1cclxuXHJcbi5kYWlseUZvcmVjYXN0R3JpZC5zaG93LCAuaG91cmx5Rm9yZWNhc3RHcmlkLnNob3cge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbn1cclxuXHJcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lciB7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZy10b3A6IDRweDtcclxufVxyXG5cclxuI2hvdXJzU2VsZWN0aW9uQ29udGFpbmVyLnNob3cge1xyXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbn1cclxuXHJcbi5hcnJvdyB7XHJcbiAgd2lkdGg6IDM3cHg7XHJcbn1cclxuXHJcbi5kb3Qge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC0xcHg7XHJcbiAgaGVpZ2h0OiA3cHg7XHJcbiAgd2lkdGg6IDdweDtcclxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDApOyAqL1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNWY1ZjU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmRvdC5hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uZGFpbHlGb3JlY2FzdEdyaWQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gcmVwZWF0KDcsIDFmcik7XHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcblxyXG4uZGF5Q2FyZCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogNC41cmVtIDEuNXJlbSAwLjlyZW0gODVweCAvIDFmcjtcclxuICBnYXA6IDVweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXHJcblxyXG4gIC8qIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTBweDsgKi9cclxufVxyXG5cclxuI2RheU5hbWUsICNkYXlNYXhUZW1wIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG4vKiAjaG91ck5hbWUge1xyXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufSAqL1xyXG5cclxuI2RheU5hbWUsICNob3VyTmFtZSB7XHJcbiAgZm9udC1zaXplOiBjYWxjKDAuNXJlbSArIDF2dyk7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4jZGF5TWF4VGVtcCwgI2hvdXJUZW1wIHtcclxuICBmb250LXNpemU6IDEuNnJlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuI2RheU1pblRlbXAge1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG59XHJcblxyXG4jZGF5SWNvbiwgI2hvdXJJY29uIHtcclxuICB3aWR0aDogNzBweDtcclxufVxyXG5cclxuLnRlc3RCb3JkZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xyXG59XHJcblxyXG4uaG91cmx5Rm9yZWNhc3RHcmlkIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxufVxyXG5cclxuLmNodW5rIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIC8qIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTsgKi9cclxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoOCwgMWZyKTtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuXHJcbi5jaHVuay5zaG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG59IFxyXG5cclxuLmhvdXJDYXJkIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICAvKiBncmlkLXRlbXBsYXRlOiAzLjVyZW0gMS41cmVtIDAuOXJlbSA2MHB4IC8gMWZyOyAqL1xyXG4gIGdyaWQtdGVtcGxhdGU6IDQuNXJlbSAxLjVyZW0gMC45cmVtIDg1cHggLyAxZnI7XHJcbiAgZ2FwOiA1cHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNob3VySWNvbiB7XHJcbiAgZ3JpZC1yb3c6IDQgLyA1O1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDg1MHB4KSB7XHJcbiAgYm9keSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XHJcbiAgfVxyXG59XHJcblxyXG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLFlBQVk7RUFDWixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsYUFBYTtFQUNiLFlBQVk7O0VBRVo7Ozs7eUNBSXFDO0VBQ3JDLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0Isa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsV0FBVztFQUNYLFVBQVU7O0VBRVYsYUFBYTtFQUNiLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQSx1QkFBdUI7O0FBRXZCO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsU0FBUztBQUNYOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtDQUNDLGdCQUFnQjtDQUNoQixjQUFjO0NBQ2QsWUFBWTtDQUNaLFVBQVU7Q0FDVixhQUFhO0NBQ2IsZUFBZTtDQUNmLGdCQUFnQjtBQUNqQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsOEJBQThCO0VBQzlCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxZQUFZO0VBQ1osb0NBQW9DO0VBQ3BDLDZCQUE2QjtFQUM3QixnQkFBZ0I7RUFDaEIsaUJBQWlCO0VBQ2pCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQSx3QkFBd0I7O0FBRXhCO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBLFdBQVc7O0FBRVg7RUFDRSxrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLGFBQWE7RUFDYixzQkFBc0I7O0FBRXhCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3Qiw4Q0FBOEM7RUFDOUMsMkNBQTJDO0VBQzNDLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsU0FBUztFQUNULG1CQUFtQjtFQUNuQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFdBQVc7RUFDWCxVQUFVO0VBQ1YscUNBQXFDO0VBQ3JDLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsT0FBTztFQUNQLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsOENBQThDO0VBQzlDLFFBQVE7RUFDUixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLDJCQUEyQjs7RUFFM0I7Ozs7Y0FJWTtBQUNkOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBOzs7R0FHRzs7QUFFSDtFQUNFLDZCQUE2QjtFQUM3QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYjtnQkFDYztFQUNkLG1DQUFtQztFQUNuQyxPQUFPO0VBQ1AsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixvREFBb0Q7RUFDcEQsOENBQThDO0VBQzlDLFFBQVE7RUFDUixxQkFBcUI7RUFDckIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFO0lBQ0UsMkJBQTJCO0VBQzdCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbnRzZXJyYXQsc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCwgYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB6LWluZGV4OiAtMTtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuXFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxyXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcXHJcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXFxyXFxuICApLFxcclxcbiAgdXJsKFxcXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcXFwiKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkNvbnRhaW5lciB7XFxyXFxuICBoZWlnaHQ6IDkwJTtcXHJcXG4gIHdpZHRoOiA5MCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogMmZyIDFmciAvIDFmciAxZnI7XFxyXFxufVxcclxcblxcclxcbiNtYWluQ29udGFpbmVyLnNob3cge1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVXBwZXIgTGVmdCBEaXNwbGF5ICovXFxyXFxuXFxyXFxuI3VwcGVyTGVmdCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXHJcXG4gIGdhcDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5Gb3JlY2FzdCwgI21haW5UZW1wZXJhdHVyZSB7XFxyXFxuICBmb250LXNpemU6IDNyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5UZW1wZXJhdHVyZSB7XFxyXFxuICBmb250LXNpemU6IDMuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuI2xvY2F0aW9uLCAjZGF0ZSwgI3RpbWUge1xcclxcbiAgZm9udC1zaXplOiAxLjFyZW07XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuXFx0YmFja2dyb3VuZDogbm9uZTtcXHJcXG5cXHRjb2xvcjogaW5oZXJpdDtcXHJcXG5cXHRib3JkZXI6IG5vbmU7XFxyXFxuXFx0cGFkZGluZzogMDtcXHJcXG5cXHRmb250OiBpbmhlcml0O1xcclxcblxcdGN1cnNvcjogcG9pbnRlcjtcXHJcXG5cXHRvdXRsaW5lOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4jc3dpdGNoVGVtcGVyYXR1cmVCdXR0b24ge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtYWluSWNvbiB7XFxyXFxuICB3aWR0aDogNjBweDtcXHJcXG4gIGhlaWdodDogNjBweDtcXHJcXG4gIHBhZGRpbmc6IDEwcHggMHB4O1xcclxcbiAgLyogYm9yZGVyOiAxcHggc29saWQgd2hpdGU7ICovXFxyXFxufVxcclxcblxcclxcbiNzZWFyY2hDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIHdpZHRoOiAyMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaEljb25Db250YWluZXIge1xcclxcbiAgd2lkdGg6IDEuM3JlbTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxyXFxuICB3aWR0aDogMTYwcHg7XFxyXFxuICBoZWlnaHQ6IDEuMXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIC8qIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTsgKi9cXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgdGV4dC1pbmRlbnQ6IDdweDtcXHJcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcclxcbiAgcGFkZGluZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl06OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzIHtcXHJcXG4gIG91dGxpbmUtd2lkdGg6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIFVwcGVyIFJpZ2h0IERpc3BsYXkgKi9cXHJcXG5cXHJcXG4jdXBwZXJSaWdodCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuI2FsaWduUmlnaHQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi51cHBlclJpZ2h0Q29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxyXFxufVxcclxcblxcclxcbi51cHBlclJpZ2h0Q29udGFpbmVyID4gZGl2ID4gcCB7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5pY29uQ29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJMZWZ0VGV4dCB7XFxyXFxuICBmb250LXNpemU6IDEuMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9vdGVyICovXFxyXFxuXFxyXFxuI2Zvb3RlciB7XFxyXFxuICBncmlkLWNvbHVtbjogMSAvIDM7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCBibHVlOyAqL1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNkYWlseUhvdXJseUNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5SG91cmx5Q29udGFpbmVyIGJ1dHRvbiB7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbiNkYWlseUJ1dHRvbi5ib3JkZXIsICNob3VybHlCdXR0b24uYm9yZGVyIHtcXHJcXG4gIC8qIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlOyAqL1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XFxyXFxuICBib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmRhaWx5Rm9yZWNhc3RHcmlkLnNob3csIC5ob3VybHlGb3JlY2FzdEdyaWQuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbn1cXHJcXG5cXHJcXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIge1xcclxcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nLXRvcDogNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIuc2hvdyB7XFxyXFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXJyb3cge1xcclxcbiAgd2lkdGg6IDM3cHg7XFxyXFxufVxcclxcblxcclxcbi5kb3Qge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAtMXB4O1xcclxcbiAgaGVpZ2h0OiA3cHg7XFxyXFxuICB3aWR0aDogN3B4O1xcclxcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwKTsgKi9cXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNWY1ZjU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5kb3QuYWN0aXZlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGFpbHlGb3JlY2FzdEdyaWQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDFmciAvIHJlcGVhdCg3LCAxZnIpO1xcclxcbiAgZmxleDogMTtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi5kYXlDYXJkIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlOiA0LjVyZW0gMS41cmVtIDAuOXJlbSA4NXB4IC8gMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcclxcblxcclxcbiAgLyogZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDEwcHg7ICovXFxyXFxufVxcclxcblxcclxcbiNkYXlOYW1lLCAjZGF5TWF4VGVtcCB7XFxyXFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAjaG91ck5hbWUge1xcclxcbiAgZm9udC1zaXplOiAxLjRyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufSAqL1xcclxcblxcclxcbiNkYXlOYW1lLCAjaG91ck5hbWUge1xcclxcbiAgZm9udC1zaXplOiBjYWxjKDAuNXJlbSArIDF2dyk7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNkYXlNYXhUZW1wLCAjaG91clRlbXAge1xcclxcbiAgZm9udC1zaXplOiAxLjZyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI2RheU1pblRlbXAge1xcclxcbiAgZm9udC1zaXplOiAwLjlyZW07XFxyXFxufVxcclxcblxcclxcbiNkYXlJY29uLCAjaG91ckljb24ge1xcclxcbiAgd2lkdGg6IDcwcHg7XFxyXFxufVxcclxcblxcclxcbi50ZXN0Qm9yZGVyIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5Rm9yZWNhc3RHcmlkIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXFxyXFxufVxcclxcblxcclxcbi5jaHVuayB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgLyogaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7ICovXFxyXFxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2h1bmsuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbn0gXFxyXFxuXFxyXFxuLmhvdXJDYXJkIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAvKiBncmlkLXRlbXBsYXRlOiAzLjVyZW0gMS41cmVtIDAuOXJlbSA2MHB4IC8gMWZyOyAqL1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogNC41cmVtIDEuNXJlbSAwLjlyZW0gODVweCAvIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2hvdXJJY29uIHtcXHJcXG4gIGdyaWQtcm93OiA0IC8gNTtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4NTBweCkge1xcclxcbiAgYm9keSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0V2VhdGhlckRhdGEsXHJcbiAgZXh0cmFjdFVwcGVyTGVmdERhdGEsXHJcbiAgZXh0cmFjdFVwcGVyUmlnaHREYXRhLFxyXG4gIGV4dHJhY3RGb290ZXJkYXRhLFxyXG59IGZyb20gXCIuL2FwaUhhbmRsZXJcIjtcclxuaW1wb3J0IHtcclxuICBzZXR1cFBhZ2UsXHJcbiAgcmVuZGVyVXBwZXJMZWZ0Q29ybmVyLFxyXG4gIHJlbmRlclVwcGVyUmlnaHRDb3JuZXIsXHJcbiAgcmVuZGVyRm9vdGVyLFxyXG59IGZyb20gXCIuL2RvbUhhbmRsZXJcIjtcclxuXHJcbi8qXHJcbi1Pbmx5IGdldCB3ZWF0aGVyIGRhdGE6XHJcbiAgICAtb24gcGFnZSBsb2FkXHJcbiAgICAtd2hlbiB0aGUgc2VhcmNoIGZvcm0gaGFzIGEgdmFsaWQgaW5wdXRcclxuKi9cclxuXHJcbi8vIFJlbmRlciBpbml0YWwgcGFnZSB3aXRoIHdlYXRoZXIgZGF0YVxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJQYWdlKGxvY2F0aW9uLCBjZWxjaXVzKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbik7XHJcbiAgICBsZXQgdXBwZXJMZWZ0RGF0YTtcclxuICAgIGxldCB1cHBlclJpZ2h0RGF0YTtcclxuICAgIGxldCBmb290ZXJEYXRhO1xyXG5cclxuICAgIGlmIChjZWxjaXVzKSB7XHJcbiAgICAgIHVwcGVyTGVmdERhdGEgPSBhd2FpdCBleHRyYWN0VXBwZXJMZWZ0RGF0YShkYXRhLmN1cnJlbnRDZWxjaXVzKTtcclxuICAgICAgdXBwZXJSaWdodERhdGEgPSBhd2FpdCBleHRyYWN0VXBwZXJSaWdodERhdGEoZGF0YS5jdXJyZW50Q2VsY2l1cyk7XHJcbiAgICAgIGZvb3RlckRhdGEgPSBhd2FpdCBleHRyYWN0Rm9vdGVyZGF0YShcclxuICAgICAgICBkYXRhLmZvcmVjYXN0Q2VsY2l1cyxcclxuICAgICAgICBkYXRhLmN1cnJlbnRDZWxjaXVzLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXBwZXJMZWZ0RGF0YSA9IGF3YWl0IGV4dHJhY3RVcHBlckxlZnREYXRhKGRhdGEuY3VycmVudEZhaHJlbmhlaXQpO1xyXG4gICAgICB1cHBlclJpZ2h0RGF0YSA9IGF3YWl0IGV4dHJhY3RVcHBlclJpZ2h0RGF0YShkYXRhLmN1cnJlbnRGYWhyZW5oZWl0KTtcclxuICAgICAgZm9vdGVyRGF0YSA9IGF3YWl0IGV4dHJhY3RGb290ZXJkYXRhKFxyXG4gICAgICAgIGRhdGEuZm9yZWNhc3RGYWhyZW5oZWl0LFxyXG4gICAgICAgIGRhdGEuY3VycmVudEZhaHJlbmhlaXQsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJVcHBlckxlZnRDb3JuZXIodXBwZXJMZWZ0RGF0YSk7XHJcbiAgICByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKHVwcGVyUmlnaHREYXRhKTtcclxuICAgIHJlbmRlckZvb3Rlcihmb290ZXJEYXRhLmRhaWx5LCBmb290ZXJEYXRhLmhvdXJseSk7XHJcbiAgICByZXR1cm4gXCJBbGwgZ29vZFwiO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZWplY3QobmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgZ2V0dGluZyB3ZWF0aGVyIGRhdGFcIikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RXJyb3JNb2RhbCgpIHtcclxuICBjb25zb2xlLmxvZyhcIlBhZ2UgZmFpbGVkIHRvIGxvYWQhIFNob3dpbmcgRXJyb3IgTW9kYWwuLi5cIik7XHJcbn1cclxuXHJcbi8vIEhpZGUgZXZlcnl0aGluZyBidXQgdGhlIGJhY2tncm91bmQgdW50aWwgdGhlIGZldGNoZWQgYXBpIGRhdGEgbG9hZHMsIGlmIHRoZVxyXG4vLyBmZXRjaCBjYWxsIGZhaWxzLCB0aGVuIHNob3cgYW4gZXJyb3IgbWVzc2FnZVxyXG5hc3luYyBmdW5jdGlvbiBzaG93UGFnZSgpIHtcclxuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluQ29udGFpbmVyXCIpO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCByZW5kZXJQYWdlKFwiVG9yb250b1wiLCB0cnVlKTtcclxuICAgIG1haW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG1haW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICBzaG93RXJyb3JNb2RhbCgpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gU2V0IHVwIHBhZ2UgLS0+IE5PIHdlYXRoZXIgY2FsbHNcclxuc2V0dXBQYWdlKCk7XHJcbnNob3dQYWdlKCk7XHJcbiJdLCJuYW1lcyI6WyJnZXRMb2NhdGlvbkNvb3JkaW5hdGVzIiwibG9jYXRpb24iLCJjb29yZGluYXRlc1Byb21zZSIsImZldGNoIiwiY29vcmRpbmF0ZXNPYmplY3QiLCJqc29uIiwicmVzdWx0cyIsIm5hbWUiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInRpbWV6b25lIiwiRXJyb3IiLCJlcnJvciIsImJ1aWxkRmV0Y2hVUkwiLCJjb29yZGluYXRlUHJvbWlzZSIsImN1cnJlbnRPckZvcmVjYXN0IiwiY2VsY2l1c09yRmFocmVuaGVpdCIsImNvb3JkaW5hdGVEYXRhIiwidXJsIiwiZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEiLCJ1cmxQcm9taXNlIiwid2VhdGhlckRhdGFSZXNwb25zZSIsIm1vZGUiLCJ3ZWF0aGVyRGF0YUpTT04iLCJnZXRXZWF0aGVyRGF0YSIsImNvb3JkaW5hdGVzIiwidXJsMSIsInVybDIiLCJ1cmwzIiwidXJsNCIsImFsbFdlYXRoZXJEYXRhIiwiUHJvbWlzZSIsImFsbCIsIm1hcHBlZFdlYXRoZXJEYXRhIiwiY3VycmVudENlbGNpdXMiLCJjdXJyZW50RmFocmVuaGVpdCIsImZvcmVjYXN0Q2VsY2l1cyIsImZvcmVjYXN0RmFocmVuaGVpdCIsImNvbnNvbGUiLCJsb2ciLCJpbnRlcnByZXRXZWF0aGVyQ29kZSIsImNvZGUiLCJmb3JtYXREYXRlIiwidGltZVpvbmUiLCJvcHRpb25zIiwid2Vla2RheSIsInllYXIiLCJtb250aCIsImRheSIsImZvcm1hdHRlZERhdGUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJnZXRUaW1lSW5UaW1lem9uZSIsImhvdXIiLCJtaW51dGUiLCJ0aW1lWm9uZU5hbWUiLCJhZGp1c3RlZFRpbWUiLCJmb3JtYXRUaW1lIiwidGltZSIsIm1pbGl0YXJ5VGltZSIsImhvdXIxMiIsImZvcm1hdHRlZFRpbWUiLCJnZXROdW1iZXJTdWZmaXgiLCJmb3JtYXREYXkiLCJpbnB1dFN0cmluZyIsImlucHV0RGF0ZSIsImRheU9mTW9udGgiLCJnZXREYXRlIiwic3VmZml4IiwiZm9ybWF0dGVkRGF0ZVdpdGhUaCIsImlzb2xhdGVDdXJyZW50SG91ckluZGV4IiwiY3VycmVudFRpbWUiLCJwYXJzZUludCIsImV4dHJhY3RVcHBlckxlZnREYXRhIiwid2VhdGhlckRhdGFQcm9taXNlIiwiZGF0YSIsIm1haW5Gb3JlY2FzdCIsImN1cnJlbnQiLCJ3ZWF0aGVyX2NvZGUiLCJ1cHBlckxlZnREYXRhIiwiZGF0ZSIsInRlbXBlcmF0dXJlIiwidGVtcGVyYXR1cmVfMm0iLCJjdXJyZW50X3VuaXRzIiwiaWNvbkNvZGUiLCJleHRyYWN0VXBwZXJSaWdodERhdGEiLCJ1cHBlclJpZ2h0RGF0YSIsImZlZWxzTGlrZSIsImFwcGFyZW50X3RlbXBlcmF0dXJlIiwiaHVtaWRpdHkiLCJyZWxhdGl2ZV9odW1pZGl0eV8ybSIsInByZWNpcGl0YXRpb24iLCJ3aW5kU3BlZWQiLCJ3aW5kX3NwZWVkXzEwbSIsImV4dHJhY3RGb290ZXJkYXRhIiwiZGFpbHlEYXRhUHJvbWlzZSIsImhvdXJseURhdGFQcm9taXNlIiwiZGFpbHlEYXRhIiwiaG91cmx5RGF0YSIsImZvb3RlckRhdGEiLCJkYWlseSIsImhvdXJseSIsImkiLCJ0ZW1wZXJhdHVyZV8ybV9tYXgiLCJsZW5ndGgiLCJjb21waWxlZERhdGEiLCJkYWlseV91bml0cyIsIm1heFRlbXAiLCJtaW5UZW1wIiwidGVtcGVyYXR1cmVfMm1fbWluIiwid2VhdGhlckNvZGUiLCJwdXNoIiwic2hpZnQiLCJjdXJyZW50SG91ciIsInZhbGlkQ3VycmVudEhvdXIiLCJob3VySW5kZXgiLCJob3VybHlfdW5pdHMiLCJzZWFyY2hJY29uIiwiZmVlbHNMaWtlSWNvbiIsImh1bWlkaXR5SWNvbiIsInByZWNpcGl0YXRpb25JY29uIiwid2luZFNwZWVkSWNvbiIsImxlZnRBcnJvd0ljb24iLCJyaWdodEFycm93SWNvbiIsImNsZWFyU2t5IiwicGFydGx5Q2xvdWR5IiwiZm9nZ3kiLCJkcml6emxlIiwiZnJlZXppbmdEcml6emxlIiwicmFpbiIsImZyZWV6aW5nUmFpbiIsInNub3dmYWxsIiwic25vd0dyYWlucyIsInJhaW5TaG93ZXJzIiwic25vd1Nob3dlcnMiLCJ0aHVuZGVyU3Rvcm1Cb3RoIiwiY2xlYXJTa3lDIiwicGFydGx5Q2xvdWR5QyIsImZvZ2d5QyIsImRyaXp6bGVDIiwiZnJlZXppbmdEcml6emxlQyIsInJhaW5DIiwiZnJlZXppbmdSYWluQyIsInNub3dmYWxsQyIsInNub3dHcmFpbnNDIiwicmFpblNob3dlcnNDIiwic25vd1Nob3dlcnNDIiwidGh1bmRlclN0b3JtQm90aEMiLCJ3ZWF0aGVySWNvbnMiLCJ3ZWF0aGVySWNvbnNDcm9wcGVkIiwicmVuZGVySW1hZ2UiLCJwYXJlbnQiLCJpbWFnZSIsImltYWdlRWxlbWVudCIsIkltYWdlIiwic3JjIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJJY29ucyIsInNlYXJjaEljb25Db250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmVlbHNMaWtlQ29udGFpbmVyIiwiaHVtaWRpdHlDb250YWluZXIiLCJwcmVjaXBpdGF0aW9uQ29udGFpbmVyIiwid2luZFNwZWVkQ29udGFpbmVyIiwibGVmdEljb25Db250YWluZXIiLCJyaWdodEljb25Db250YWluZXIiLCJjcm9wcGVkIiwiaW1hZ2VzVG9Vc2UiLCJyZW5kZXJGb3JlY2FzdEljb25zIiwiaWNvbkNvZGVzIiwiY2FyZHNDb2xsZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRheUljb25Db250YWluZXIiLCJjaGlsZHJlbiIsImlubmVySFRNTCIsInJlbmRlckN1cnJlbnRJY29uIiwibWFpbkljb25Db250YWluZXIiLCJ0b2dnbGVGb3JlY2FzdENhcmRzIiwidG9nZ2xlSG91cmx5Q2FyZHMiLCJkYWlseUZvcmVjYXN0Q2FyZHNHcmlkIiwicXVlcnlTZWxlY3RvciIsImhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkIiwiZGFpbHlCdXR0b24iLCJob3VybHlCdXR0b24iLCJob3Vyc1NlbGVjdGlvbkJ1dHRvbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZW5kZXJVcHBlckxlZnRDb3JuZXIiLCJkYXRhUHJvbWlzZSIsIm1haW5Gb3JlY2FzdEVsZW1lbnQiLCJsb2NhdGlvbkVsZW1lbnQiLCJkYXRlRWxlbWVudCIsInRpbWVFbGVtZW50IiwidGVtcGVyYXR1cmVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJyZW5kZXJVcHBlclJpZ2h0Q29ybmVyIiwiZmVlbHNMaWtlRWxlbWVudCIsImh1bWlkaXR5RWxlbWVudCIsInByZWNpcGl0YXRpb25FbGVtZW50Iiwid2luZFNwZWVkRWxlbWVudCIsInJlbmRlckZvb3RlciIsImZvcmVjYXN0UHJvbWlzZSIsImN1cnJlbnRQcm9taXNlIiwiZm9yZWNhc3REYXRhIiwiY3VycmVudERhdGEiLCJkYXlDYXJkRWxlbWVudHMiLCJob3VyQ2FyZEVsZW1lbnRzIiwiZGFpbHlJY29uQ29kZXMiLCJ0b0xvd2VyQ2FzZSIsImhvdXJseUljb25Db2RlcyIsInJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMiLCJlaWdodEhvdXJDaHVua0lkIiwiYWxsQ2h1bmtzIiwiY2h1bmtUb1Nob3ciLCJzd2l0Y2hIb3VycyIsImRvdEVsZW1lbnQiLCJhbGxEb3RFbGVtZW50cyIsImdldEF0dHJpYnV0ZSIsInN3aXRjaEhvdXJVc2luZ0Fycm93IiwicmlnaHRBcnJvdyIsImN1cnJlbnRseUFjdGl2ZURvdCIsImN1cnJlbnRseUFjdGl2ZURvdElkIiwibmV4dERvdElkIiwiZG90VG9BY3RpdmUiLCJzZXR1cExpc3RlbmVycyIsImRhaWx5Rm9yZWNhc3RCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiaG91cmx5Rm9yZWNhc3RCdXR0b24iLCJzd2l0Y2hIb3Vyc0RvdHMiLCJzd2l0Y2hIb3Vyc0Fycm93TGVmdCIsInN3aXRjaEhvdXJzQXJyb3dSaWdodCIsInN3aXRjaENlbGNpdXNGYWhyZW5oZWl0Iiwic2V0dXBQYWdlIiwicmVuZGVyUGFnZSIsImNlbGNpdXMiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2hvd0Vycm9yTW9kYWwiLCJzaG93UGFnZSIsIm1haW5Db250YWluZXIiXSwic291cmNlUm9vdCI6IiJ9