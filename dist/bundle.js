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
/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData),
/* harmony export */   searchLocation: () => (/* binding */ searchLocation)
/* harmony export */ });
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorHandler */ "./src/errorHandler.js");
/* harmony import */ var _dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dateAndTimeAuxFunctions */ "./src/dateAndTimeAuxFunctions.js");


async function getLocationCoordinates(location) {
  // Fetch coordinates
  const [coordinatesPromse, error] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_0__["default"])(fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`));

  // Check for valid response
  if (error) throw new Error("Error while fetching location coordinates", error);
  const response = await coordinatesPromse.json();
  if (!response.results) {
    throw new Error("Error in API response", response.status);

    // Return valid coordinates
  } else {
    const {
      name,
      latitude,
      longitude,
      timezone
    } = response.results[0];
    return {
      name,
      latitude,
      longitude,
      timezone
    };
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
  const [weatherDataResponse, error] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_0__["default"])(fetch(url, {
    mode: "cors"
  }));
  if (error) throw new Error("Error while fetching weather data", error);
  if (!weatherDataResponse.error) {
    const weatherDataJSON = await weatherDataResponse.json();
    return weatherDataJSON;
  }
  throw new Error("Error while fetching weather data");
}
async function getWeatherData(location) {
  // Grab coordinates
  const [coordinates, error] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_0__["default"])(getLocationCoordinates(location));
  if (error) throw new Error(error);

  // Don't need additional error checking for these as any issues
  // with coordinates will already have been caught right above
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
}
function parseWeatherCodeToString(code) {
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
async function extractUpperLeftData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const mainForecast = parseWeatherCodeToString(data[0].current.weather_code);
  const upperLeftData = {
    mainForecast,
    location: data[1],
    date: (0,_dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__.formatDate)(data[0].timezone),
    time: (0,_dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__.getTimeInTimezone)(data[0].timezone),
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
      date: (0,_dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__.formatDay)(dailyData.daily.time[i], dailyData.daily_units.timezone),
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
  const currentHour = (0,_dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__.isolateCurrentHourIndex)(hourlyData[0].timezone);
  const validCurrentHour = (currentHour + 24) % 24;

  // Fill in hourly data
  for (let i = 0; i < 25; i += 1) {
    const hourIndex = (validCurrentHour + i) % 24;
    const compiledData = {
      time: (0,_dateAndTimeAuxFunctions__WEBPACK_IMPORTED_MODULE_1__.formatTime)(hourlyData[0].hourly.time[hourIndex]),
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
function searchLocation() {
  const searchBarInput = document.getElementById("searchBar");
  const locationString = searchBarInput.value;
  // Don't search for empty strings or those containing only white space
  const stringIsNotOnlyWhiteSpace = locationString.replace(/\s/g, "").length;
  if (locationString && stringIsNotOnlyWhiteSpace) {
    return locationString;
  }
  return undefined;
}


/***/ }),

/***/ "./src/dateAndTimeAuxFunctions.js":
/*!****************************************!*\
  !*** ./src/dateAndTimeAuxFunctions.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatDay: () => (/* binding */ formatDay),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   getTimeInTimezone: () => (/* binding */ getTimeInTimezone),
/* harmony export */   isolateCurrentHourIndex: () => (/* binding */ isolateCurrentHourIndex)
/* harmony export */ });
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
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    timeZone,
    hour12: false // Ensure 24-hour format
  });
  const hour = parseInt(currentTime, 10);
  return hour;
}


/***/ }),

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideInvalidInputModal: () => (/* binding */ hideInvalidInputModal),
/* harmony export */   removeErrorModal: () => (/* binding */ removeErrorModal),
/* harmony export */   renderIcons: () => (/* binding */ renderIcons),
/* harmony export */   renderPage: () => (/* binding */ renderPage),
/* harmony export */   setupListeners: () => (/* binding */ setupListeners),
/* harmony export */   showErrorModal: () => (/* binding */ showErrorModal),
/* harmony export */   showInvalidInputModal: () => (/* binding */ showInvalidInputModal)
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












const weatherIcons = [_images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_7__, _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_8__, _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_9__, _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_10__, _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_11__, _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_12__, _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_13__, _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_14__, _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_15__, _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_16__, _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_17__, _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_18__];
const weatherIconsCropped = [_images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_19__, _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_20__, _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_21__, _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_22__, _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_23__, _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_24__, _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_25__, _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_26__, _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_27__, _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_28__, _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_29__, _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_30__];
function renderImage(parent, image) {
  const imageElement = new Image();
  imageElement.src = image;
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
function parseWeatherCodeToImage(code, cropped) {
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
    renderImage(dayIconContainer, parseWeatherCodeToImage(iconCodes[i], false));
  }
}
function renderCurrentIcon(iconCode) {
  const mainIconContainer = document.getElementById("mainIcon");
  // Clear any existing icons
  mainIconContainer.innerHTML = "";
  renderImage(mainIconContainer, parseWeatherCodeToImage(iconCode, true));
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
function showErrorModal() {
  const errorModal = document.getElementById("errorModal");
  errorModal.classList.add("show");
}
function removeErrorModal() {
  const errorModal = document.getElementById("errorModal");
  errorModal.classList.remove("show");
}
function showInvalidInputModal() {
  const invalidInput = document.getElementById("locationNotFound");
  invalidInput.classList.add("show");
}
function hideInvalidInputModal() {
  const invalidInput = document.getElementById("locationNotFound");
  invalidInput.classList.remove("show");
}
function renderPage(upperLeftData, upperRightData, footerData) {
  const mainContainer = document.getElementById("mainContainer");
  if (upperLeftData && upperRightData && footerData) {
    renderUpperLeftCorner(upperLeftData);
    renderUpperRightCorner(upperRightData);
    renderFooter(footerData.daily, footerData.hourly);
    // Hide the page but the background until the fetched api data loads, if the
    // fetch call fails, then show an error message
    mainContainer.classList.add("show");
  } else {
    mainContainer.classList.remove("show");
    showErrorModal();
  }
}
function switchTemperatureUnit() {
  // Toggle between Celsius and Fahrenheit
  window.renderCelcius = !window.renderCelcius;

  // Get the appropriate data based on the temperature unit
  const upperLeftData = window.renderCelcius ? window.extractedData.upperLeftDataCelcius : window.extractedData.upperLeftDataFahrenheit;
  const upperRightData = window.renderCelcius ? window.extractedData.upperRightDataCelcius : window.extractedData.upperRightDataFahrenheit;
  const footerData = window.renderCelcius ? window.extractedData.footerDataCelcius : window.extractedData.footerDataFahrenheit;

  // Call renderPage with the updated data
  renderPage(upperLeftData, upperRightData, footerData);
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
  switchCelciusFahrenheit.addEventListener("click", () => {
    switchTemperatureUnit();
  });
}


/***/ }),

/***/ "./src/errorHandler.js":
/*!*****************************!*\
  !*** ./src/errorHandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function handle(promise) {
  return promise.then(data => [data, undefined]).catch(error => Promise.resolve([undefined, error]));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handle);

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
  position: relative;
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

#errorModal {
  display: none;
  position: absolute;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.568);
  border-radius: 10px;

  left: 50%;
  top: 45%;
  transform: translate(-50%,-50%);
}

#errorModal.show {
  display: block;
}

#mainContainer {
  height: 90%;
  width: 90%;

  display: none;
  gap: 10px;
  grid-template: 2fr 1fr / 1fr 1fr;
}

#mainContainer.show {
  display: grid;
}

/* Upper Left Display */

#upperLeft {
  display: flex;
  flex-direction: column;
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
  gap: 20px;
  overflow-x: scroll;
}

::-webkit-scrollbar {
  height: 10px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 5px;
}


.dayCard {
  height: 100%;
  display: grid;
  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
}

#dayName, #dayMaxTemp, #dayMinTemp, #hourTemp, #hourName {
  white-space: nowrap;
}

#dayName, #hourName {
  font-size: calc(0.4rem + 1.1vw);
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
  overflow-x: scroll;
}

.chunk {
  display: none;
  grid-template: 1fr / repeat(8, 1fr);
  flex: 1;
  margin-top: 30px;
  gap: 40px;
}

.chunk.show {
  display: grid;
} 

.hourCard {
  height: 100%;
  display: grid;
  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
}

#hourIcon {
  grid-row: 4 / 5;
}

#locationNotFound {
  font-size: 0.8rem;
  display: none;
}

#locationNotFound.show {
  display: block;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: white;\r\n  font-family: montserrat,sans-serif;\r\n}\r\n\r\nhtml, body {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  overflow-y: hidden;\r\n  overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\nhtml {\r\n  background-color: gray;\r\n}\r\n\r\n#backgroundContainer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  height: 100vh;\r\n  width: 100vw;\r\n\r\n  background: linear-gradient(\r\n    rgba(0, 0, 0, 0.164), \r\n    rgba(0, 0, 0, 0.7)\r\n  ),\r\n  url(\"./images/weatherBackground.jpg\");\r\n  background-size: cover;\r\n  background-repeat:no-repeat;\r\n  background-position: center center;\r\n}\r\n\r\n#errorModal {\r\n  display: none;\r\n  position: absolute;\r\n  padding: 20px;\r\n  background-color: rgba(0, 0, 0, 0.568);\r\n  border-radius: 10px;\r\n\r\n  left: 50%;\r\n  top: 45%;\r\n  transform: translate(-50%,-50%);\r\n}\r\n\r\n#errorModal.show {\r\n  display: block;\r\n}\r\n\r\n#mainContainer {\r\n  height: 90%;\r\n  width: 90%;\r\n\r\n  display: none;\r\n  gap: 10px;\r\n  grid-template: 2fr 1fr / 1fr 1fr;\r\n}\r\n\r\n#mainContainer.show {\r\n  display: grid;\r\n}\r\n\r\n/* Upper Left Display */\r\n\r\n#upperLeft {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 15px;\r\n}\r\n\r\n#mainForecast, #mainTemperature {\r\n  font-size: 3rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#mainTemperature {\r\n  font-size: 3.5rem;\r\n}\r\n\r\n#location, #date, #time {\r\n  font-size: 1.1rem;\r\n}\r\n\r\nbutton {\r\n\tbackground: none;\r\n\tcolor: inherit;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tfont: inherit;\r\n\tcursor: pointer;\r\n\toutline: inherit;\r\n}\r\n\r\n#switchTemperatureButton {\r\n  font-weight: bold;\r\n}\r\n\r\n#mainIcon {\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 10px 0px;\r\n}\r\n\r\n#searchContainer {\r\n  display: flex;\r\n  position: relative;\r\n  border-bottom: 2px solid white;\r\n  width: 200px;\r\n}\r\n\r\n#searchIconContainer {\r\n  width: 1.3rem;\r\n  position: relative;\r\n  left: 10px;\r\n}\r\n\r\ninput[type=\"text\"] {\r\n  width: 160px;\r\n  height: 1.1rem;\r\n  border: none;\r\n  background-color: transparent;\r\n  text-indent: 7px;\r\n  font-size: 0.9rem;\r\n  padding: 2px;\r\n}\r\n\r\ninput[type=\"text\"]::placeholder {\r\n  color: white;\r\n}\r\n\r\ninput[type=\"text\"]:focus {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Upper Right Display */\r\n\r\n#upperRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n}\r\n\r\n#alignRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n}\r\n\r\n.upperRightContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n}\r\n\r\n.upperRightContainer > div > p {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.iconContainer {\r\n  width: 3rem;\r\n}\r\n\r\n.upperLeftText {\r\n  font-size: 1.1rem;\r\n}\r\n\r\n/* Footer */\r\n\r\n#footer {\r\n  grid-column: 1 / 3;\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n#dailyHourlyContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\n#dailyHourlyContainer button {\r\n  padding: 6px;\r\n  border-radius: 5px;\r\n}\r\n\r\n#dailyButton.border, #hourlyButton.border {\r\n  -webkit-box-shadow:inset 0px 0px 0px 2px white;\r\n  -moz-box-shadow:inset 0px 0px 0px 2px white;\r\n  box-shadow:inset 0px 0px 0px 2px white;\r\n}\r\n\r\n.dailyForecastGrid.show, .hourlyForecastGrid.show {\r\n  display: grid;\r\n}\r\n\r\n#hoursSelectionContainer {\r\n  visibility: hidden;\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  padding-top: 4px;\r\n}\r\n\r\n#hoursSelectionContainer.show {\r\n  visibility: visible;\r\n}\r\n\r\n.arrow {\r\n  width: 37px;\r\n}\r\n\r\n.dot {\r\n  position: relative;\r\n  top: -1px;\r\n  height: 7px;\r\n  width: 7px;\r\n  border: 1px solid #f5f5f5;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n}\r\n\r\n.dot.active {\r\n  background-color: white;\r\n}\r\n\r\n.dailyForecastGrid {\r\n  display: none;\r\n  grid-template: 1fr / repeat(7, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n  gap: 20px;\r\n  overflow-x: scroll;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  height: 10px;\r\n  background-color: transparent;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background: white;\r\n  border-radius: 5px;\r\n}\r\n\r\n\r\n.dayCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#dayName, #dayMaxTemp, #dayMinTemp, #hourTemp, #hourName {\r\n  white-space: nowrap;\r\n}\r\n\r\n#dayName, #hourName {\r\n  font-size: calc(0.4rem + 1.1vw);\r\n  text-align: center;\r\n}\r\n\r\n#dayMaxTemp, #hourTemp {\r\n  font-size: 1.6rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#dayMinTemp {\r\n  font-size: 0.9rem;\r\n}\r\n\r\n#dayIcon, #hourIcon {\r\n  width: 70px;\r\n}\r\n\r\n.testBorder {\r\n  border: 1px solid white;\r\n}\r\n\r\n.hourlyForecastGrid {\r\n  display: none;\r\n  overflow-x: scroll;\r\n}\r\n\r\n.chunk {\r\n  display: none;\r\n  grid-template: 1fr / repeat(8, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n  gap: 40px;\r\n}\r\n\r\n.chunk.show {\r\n  display: grid;\r\n} \r\n\r\n.hourCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#hourIcon {\r\n  grid-row: 4 / 5;\r\n}\r\n\r\n#locationNotFound {\r\n  font-size: 0.8rem;\r\n  display: none;\r\n}\r\n\r\n#locationNotFound.show {\r\n  display: block;\r\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _errorHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errorHandler */ "./src/errorHandler.js");




async function extractData(data) {
  // Extract both the Celecius and Fahrenheit data only once, then just
  // display/reredender the desired temperature value in domHandler
  const [upperLeftDataCelcius, error1] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperLeftData)(data.currentCelcius));
  const [upperRightDataCelcius, error2] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperRightData)(data.currentCelcius));
  const [footerDataCelcius, error3] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractFooterdata)(data.forecastCelcius, data.currentCelcius));
  const [upperLeftDataFahrenheit, error4] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperLeftData)(data.currentFahrenheit));
  const [upperRightDataFahrenheit, error5] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractUpperRightData)(data.currentFahrenheit));
  const [footerDataFahrenheit, error6] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.extractFooterdata)(data.forecastFahrenheit, data.currentFahrenheit));
  if (error1 || error2 || error3 || error4 || error5 || error6) {
    throw new Error("Error while extracting weather data");
  }
  return {
    upperLeftDataCelcius,
    upperRightDataCelcius,
    footerDataCelcius,
    upperLeftDataFahrenheit,
    upperRightDataFahrenheit,
    footerDataFahrenheit
  };
}
const renderCelcius = true;
let extractedData;
async function fetchDataAndRenderPage(location) {
  // Fetch data
  const [fetchedData, fetchingError] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.getWeatherData)(location));
  if (fetchingError) throw new Error(fetchingError);

  // Extract data
  const [extractedDataLocal, extractingError] = await (0,_errorHandler__WEBPACK_IMPORTED_MODULE_3__["default"])(extractData(fetchedData));
  if (extractingError) throw new Error(extractingError);
  extractedData = extractedDataLocal;

  // Render data
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderPage)(extractedData.upperLeftDataCelcius, extractedData.upperRightDataCelcius, extractedData.footerDataCelcius);
  return "Fetch and render success!";
}
function clearSearchBar() {
  const searchBarInput = document.getElementById("searchBar");
  searchBarInput.value = "";
}
function executeSearch(locationString) {
  fetchDataAndRenderPage(locationString).then(() => {
    window.renderCelcius = renderCelcius;
    window.extractedData = extractedData;
    (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.hideInvalidInputModal)();
  }).catch(() => {
    (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.showInvalidInputModal)();
  });
  clearSearchBar();
}
function setupSearchBarListener() {
  const form = document.getElementById("searchContainer");
  form.addEventListener("submit", event => {
    event.preventDefault();
    const locationString = (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.searchLocation)();
    if (locationString) {
      executeSearch(locationString);
    }
  });
  const searchBarSubmitButton = document.getElementById("searchIconContainer");
  searchBarSubmitButton.addEventListener("click", event => {
    event.preventDefault();
    const locationString = (0,_apiHandler__WEBPACK_IMPORTED_MODULE_1__.searchLocation)();
    if (locationString) {
      executeSearch(locationString);
    }
  });
}

/*
-Only fetch weather data:
    -On page load
    and
    -When the search form has a valid input
    NOT
    -when the page is rerendered in celcius or fahrenheit
*/
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderIcons)();
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.setupListeners)();
setupSearchBarListener();
fetchDataAndRenderPage("Calgary").then(() => {
  console.log("Inital fetch and render success!");
  window.renderCelcius = renderCelcius;
  window.extractedData = extractedData;
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.removeErrorModal)();
}).catch(error => {
  console.log(error);
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.showErrorModal)();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxRQUFRLE9BQU8sYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksY0FBYyxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxXQUFXLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sYUFBYSxNQUFNLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFh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QUM1QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUcwQixLQUFLLElBQUs7SUFDekRBLEtBQUssQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDdEIsTUFBTXpMLGNBQWMsR0FBR0osMkRBQWMsQ0FBQyxDQUFDO0lBQ3ZDLElBQUlJLGNBQWMsRUFBRTtNQUNsQnFMLGFBQWEsQ0FBQ3JMLGNBQWMsQ0FBQztJQUMvQjtFQUNGLENBQUMsQ0FBQztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQXNFLHdEQUFXLENBQUMsQ0FBQztBQUNic0YsMkRBQWMsQ0FBQyxDQUFDO0FBQ2hCMEIsc0JBQXNCLENBQUMsQ0FBQztBQUN4QlAsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQzlCVixJQUFJLENBQUMsTUFBTTtFQUNWc0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7RUFDL0N6QyxNQUFNLENBQUNDLGFBQWEsR0FBR0EsYUFBYTtFQUNwQ0QsTUFBTSxDQUFDRSxhQUFhLEdBQUdBLGFBQWE7RUFDcENULDZEQUFnQixDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQ0QwQixLQUFLLENBQUU3UCxLQUFLLElBQUs7RUFDaEJrUixPQUFPLENBQUNDLEdBQUcsQ0FBQ25SLEtBQUssQ0FBQztFQUNsQmlPLDJEQUFjLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYXBpSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2RhdGVBbmRUaW1lQXV4RnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZG9tSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2Vycm9ySGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGFuZGxlIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdERhdGUsXHJcbiAgZ2V0VGltZUluVGltZXpvbmUsXHJcbiAgZm9ybWF0VGltZSxcclxuICBmb3JtYXREYXksXHJcbiAgaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgsXHJcbn0gZnJvbSBcIi4vZGF0ZUFuZFRpbWVBdXhGdW5jdGlvbnNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uQ29vcmRpbmF0ZXMobG9jYXRpb24pIHtcclxuICAvLyBGZXRjaCBjb29yZGluYXRlc1xyXG4gIGNvbnN0IFtjb29yZGluYXRlc1Byb21zZSwgZXJyb3JdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZmV0Y2goXHJcbiAgICAgIGBodHRwczovL2dlb2NvZGluZy1hcGkub3Blbi1tZXRlby5jb20vdjEvc2VhcmNoP25hbWU9JHtsb2NhdGlvbn0mY291bnQ9MSZsYW5ndWFnZT1lbiZmb3JtYXQ9anNvbmAsXHJcbiAgICApLFxyXG4gICk7XHJcblxyXG4gIC8vIENoZWNrIGZvciB2YWxpZCByZXNwb25zZVxyXG4gIGlmIChlcnJvcilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIGxvY2F0aW9uIGNvb3JkaW5hdGVzXCIsIGVycm9yKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvb3JkaW5hdGVzUHJvbXNlLmpzb24oKTtcclxuICBpZiAoIXJlc3BvbnNlLnJlc3VsdHMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluIEFQSSByZXNwb25zZVwiLCByZXNwb25zZS5zdGF0dXMpO1xyXG5cclxuICAgIC8vIFJldHVybiB2YWxpZCBjb29yZGluYXRlc1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGxhdGl0dWRlLCBsb25naXR1ZGUsIHRpbWV6b25lIH0gPSByZXNwb25zZS5yZXN1bHRzWzBdO1xyXG4gICAgcmV0dXJuIHsgbmFtZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgdGltZXpvbmUgfTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkRmV0Y2hVUkwoXHJcbiAgY29vcmRpbmF0ZVByb21pc2UsXHJcbiAgY3VycmVudE9yRm9yZWNhc3QsXHJcbiAgY2VsY2l1c09yRmFocmVuaGVpdCxcclxuKSB7XHJcbiAgY29uc3QgY29vcmRpbmF0ZURhdGEgPSBhd2FpdCBjb29yZGluYXRlUHJvbWlzZTtcclxuXHJcbiAgLy8gQ3VycmVudCBkYXRhIGluIENlbGNpdXNcclxuICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MiZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfWA7XHJcblxyXG4gIC8vIEN1cnJlbnQgZGF0YSBpbiBGYWhyZW5oZWl0XHJcbiAgaWYgKGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkN1cnJlbnRcIiAmJiBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIikge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MiZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfSZ0ZW1wZXJhdHVyZV91bml0PWZhaHJlbmhlaXQmd2luZF9zcGVlZF91bml0PW1waCZwcmVjaXBpdGF0aW9uX3VuaXQ9aW5jaGA7XHJcblxyXG4gICAgLy8gRm9yZWNhc3QgZGF0YSBpbiBDZWxjaXVzXHJcbiAgfSBlbHNlIGlmIChcclxuICAgIGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkZvcmVjYXN0XCIgJiZcclxuICAgIGNlbGNpdXNPckZhaHJlbmhlaXQgPT09IFwiQ2VsY2l1c1wiXHJcbiAgKSB7XHJcbiAgICB1cmwgPSBgaHR0cHM6Ly9hcGkub3Blbi1tZXRlby5jb20vdjEvZm9yZWNhc3Q/bGF0aXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sYXRpdHVkZX0mbG9uZ2l0dWRlPSR7Y29vcmRpbmF0ZURhdGEubG9uZ2l0dWRlfSZkYWlseT13ZWF0aGVyX2NvZGUsdGVtcGVyYXR1cmVfMm1fbWF4LHRlbXBlcmF0dXJlXzJtX21pbiZmb3JlY2FzdF9kYXlzPTgmdGltZXpvbmU9JHtjb29yZGluYXRlRGF0YS50aW1lem9uZX1gO1xyXG5cclxuICAgIC8vIEZvcmVjYXN0IGRhdGEgaW4gRmFocmVuaGVpdFxyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBjdXJyZW50T3JGb3JlY2FzdCA9PT0gXCJGb3JlY2FzdFwiICYmXHJcbiAgICBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIlxyXG4gICkge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mZGFpbHk9d2VhdGhlcl9jb2RlLHRlbXBlcmF0dXJlXzJtX21heCx0ZW1wZXJhdHVyZV8ybV9taW4mZm9yZWNhc3RfZGF5cz04JnRpbWV6b25lPSR7Y29vcmRpbmF0ZURhdGEudGltZXpvbmV9JnRlbXBlcmF0dXJlX3VuaXQ9ZmFocmVuaGVpdCZ3aW5kX3NwZWVkX3VuaXQ9bXBoJnByZWNpcGl0YXRpb25fdW5pdD1pbmNoYDtcclxuICB9XHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsUHJvbWlzZSkge1xyXG4gIGNvbnN0IHVybCA9IGF3YWl0IHVybFByb21pc2U7XHJcbiAgY29uc3QgW3dlYXRoZXJEYXRhUmVzcG9uc2UsIGVycm9yXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KSxcclxuICApO1xyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgd2VhdGhlciBkYXRhXCIsIGVycm9yKTtcclxuXHJcbiAgaWYgKCF3ZWF0aGVyRGF0YVJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YUpTT04gPSBhd2FpdCB3ZWF0aGVyRGF0YVJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiB3ZWF0aGVyRGF0YUpTT047XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIHdlYXRoZXIgZGF0YVwiKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcclxuICAvLyBHcmFiIGNvb3JkaW5hdGVzXHJcbiAgY29uc3QgW2Nvb3JkaW5hdGVzLCBlcnJvcl0gPSBhd2FpdCBoYW5kbGUoZ2V0TG9jYXRpb25Db29yZGluYXRlcyhsb2NhdGlvbikpO1xyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuXHJcbiAgLy8gRG9uJ3QgbmVlZCBhZGRpdGlvbmFsIGVycm9yIGNoZWNraW5nIGZvciB0aGVzZSBhcyBhbnkgaXNzdWVzXHJcbiAgLy8gd2l0aCBjb29yZGluYXRlcyB3aWxsIGFscmVhZHkgaGF2ZSBiZWVuIGNhdWdodCByaWdodCBhYm92ZVxyXG4gIGNvbnN0IHVybDEgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkN1cnJlbnRcIiwgXCJDZWxjaXVzXCIpO1xyXG4gIGNvbnN0IHVybDIgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkN1cnJlbnRcIiwgXCJGYWhyZW5oZWl0XCIpO1xyXG4gIGNvbnN0IHVybDMgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkZvcmVjYXN0XCIsIFwiQ2VsY2l1c1wiKTtcclxuICBjb25zdCB1cmw0ID0gYnVpbGRGZXRjaFVSTChjb29yZGluYXRlcywgXCJGb3JlY2FzdFwiLCBcIkZhaHJlbmhlaXRcIik7XHJcblxyXG4gIGNvbnN0IGFsbFdlYXRoZXJEYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsMSksXHJcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyRGF0YSh1cmwyKSxcclxuICAgIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybDMpLFxyXG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsNCksXHJcbiAgXSk7XHJcbiAgY29uc3QgbWFwcGVkV2VhdGhlckRhdGEgPSB7XHJcbiAgICBjdXJyZW50Q2VsY2l1czogW2FsbFdlYXRoZXJEYXRhWzBdLCBjb29yZGluYXRlcy5uYW1lXSxcclxuICAgIGN1cnJlbnRGYWhyZW5oZWl0OiBbYWxsV2VhdGhlckRhdGFbMV0sIGNvb3JkaW5hdGVzLm5hbWVdLFxyXG4gICAgZm9yZWNhc3RDZWxjaXVzOiBhbGxXZWF0aGVyRGF0YVsyXSxcclxuICAgIGZvcmVjYXN0RmFocmVuaGVpdDogYWxsV2VhdGhlckRhdGFbM10sXHJcbiAgfTtcclxuICByZXR1cm4gbWFwcGVkV2VhdGhlckRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlV2VhdGhlckNvZGVUb1N0cmluZyhjb2RlKSB7XHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICByZXR1cm4gXCJNYWlubHkgQ2xlYXIgU2t5XCI7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHJldHVybiBcIlBhcnRseSBDbG91ZHlcIjtcclxuICAgIGNhc2UgMzpcclxuICAgICAgcmV0dXJuIFwiT3ZlcmNhc3QgQ2xvdWRzXCI7XHJcbiAgICBjYXNlIDQ1OlxyXG4gICAgICByZXR1cm4gXCJOb24tRnJvemVuIEZvZ1wiO1xyXG4gICAgY2FzZSA0ODpcclxuICAgICAgcmV0dXJuIFwiRnJlZXppbmcgRm9nXCI7XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgICByZXR1cm4gXCJMaWdodCBEcml6emxlXCI7XHJcbiAgICBjYXNlIDUzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBEcml6emxlXCI7XHJcbiAgICBjYXNlIDU1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTc6XHJcbiAgICAgIHJldHVybiBcIkRlbnNlIEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNjE6XHJcbiAgICAgIHJldHVybiBcIlNsaWdodCBSYWluXCI7XHJcbiAgICBjYXNlIDYzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBSYWluXCI7XHJcbiAgICBjYXNlIDY1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFJhaW5cIjtcclxuICAgIGNhc2UgNjY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIFJhaW5cIjtcclxuICAgIGNhc2UgNjc6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgRnJlZXppbmcgUmFpblwiO1xyXG4gICAgY2FzZSA3MTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDczOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDc3OlxyXG4gICAgICByZXR1cm4gXCJHcmFudWxhciBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgODA6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4MTpcclxuICAgICAgcmV0dXJuIFwiTW9kZXJhdGUgUmFpbiBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDgyOlxyXG4gICAgICByZXR1cm4gXCJWaW9sZW50IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4NTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDg2OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFNub3cgU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA5NTpcclxuICAgICAgcmV0dXJuIFwiVGh1bmRlcnN0b3JtXCI7XHJcbiAgICBjYXNlIDk2OlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBUaHVuZGVyc3Rvcm1cIjtcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBcIlRodW5kZXJzdG9ybSBXaXRoIEhlYXZ5IEhhaWxcIjtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFVwcGVyTGVmdERhdGEod2VhdGhlckRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHdlYXRoZXJEYXRhUHJvbWlzZTtcclxuICBjb25zdCBtYWluRm9yZWNhc3QgPSBwYXJzZVdlYXRoZXJDb2RlVG9TdHJpbmcoZGF0YVswXS5jdXJyZW50LndlYXRoZXJfY29kZSk7XHJcbiAgY29uc3QgdXBwZXJMZWZ0RGF0YSA9IHtcclxuICAgIG1haW5Gb3JlY2FzdCxcclxuICAgIGxvY2F0aW9uOiBkYXRhWzFdLFxyXG4gICAgZGF0ZTogZm9ybWF0RGF0ZShkYXRhWzBdLnRpbWV6b25lKSxcclxuICAgIHRpbWU6IGdldFRpbWVJblRpbWV6b25lKGRhdGFbMF0udGltZXpvbmUpLFxyXG4gICAgdGVtcGVyYXR1cmU6IGAke2RhdGFbMF0uY3VycmVudC50ZW1wZXJhdHVyZV8ybX0gJHtkYXRhWzBdLmN1cnJlbnRfdW5pdHMudGVtcGVyYXR1cmVfMm19YCxcclxuICAgIGljb25Db2RlOiBkYXRhWzBdLmN1cnJlbnQud2VhdGhlcl9jb2RlLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyTGVmdERhdGE7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RVcHBlclJpZ2h0RGF0YSh3ZWF0aGVyRGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgd2VhdGhlckRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IHVwcGVyUmlnaHREYXRhID0ge1xyXG4gICAgZmVlbHNMaWtlOiBgJHtkYXRhWzBdLmN1cnJlbnQuYXBwYXJlbnRfdGVtcGVyYXR1cmV9ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLmFwcGFyZW50X3RlbXBlcmF0dXJlfWAsXHJcbiAgICBodW1pZGl0eTogYCR7ZGF0YVswXS5jdXJyZW50LnJlbGF0aXZlX2h1bWlkaXR5XzJtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy5yZWxhdGl2ZV9odW1pZGl0eV8ybX1gLFxyXG4gICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YVswXS5jdXJyZW50LnByZWNpcGl0YXRpb259ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLnByZWNpcGl0YXRpb259YCxcclxuICAgIHdpbmRTcGVlZDogYCR7ZGF0YVswXS5jdXJyZW50LndpbmRfc3BlZWRfMTBtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy53aW5kX3NwZWVkXzEwbX1gLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyUmlnaHREYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0Rm9vdGVyZGF0YShkYWlseURhdGFQcm9taXNlLCBob3VybHlEYXRhUHJvbWlzZSkge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGF3YWl0IGRhaWx5RGF0YVByb21pc2U7XHJcbiAgY29uc3QgaG91cmx5RGF0YSA9IGF3YWl0IGhvdXJseURhdGFQcm9taXNlO1xyXG4gIC8vIEZpbGwgaW4gYW5kIHJldHVybiB0aGlzIG9iamVjdFxyXG4gIGNvbnN0IGZvb3RlckRhdGEgPSB7XHJcbiAgICBkYWlseTogW10sXHJcbiAgICBob3VybHk6IFtdLFxyXG4gIH07XHJcbiAgLy8gRmlsbCBpbiBkYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYWlseURhdGEuZGFpbHkudGVtcGVyYXR1cmVfMm1fbWF4Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBjb21waWxlZERhdGEgPSB7XHJcbiAgICAgIGRhdGU6IGZvcm1hdERheShkYWlseURhdGEuZGFpbHkudGltZVtpXSwgZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRpbWV6b25lKSxcclxuICAgICAgbWF4VGVtcDogYCR7ZGFpbHlEYXRhLmRhaWx5LnRlbXBlcmF0dXJlXzJtX21heFtpXX0gJHtkYWlseURhdGEuZGFpbHlfdW5pdHMudGVtcGVyYXR1cmVfMm1fbWF4fWAsXHJcbiAgICAgIG1pblRlbXA6IGAke2RhaWx5RGF0YS5kYWlseS50ZW1wZXJhdHVyZV8ybV9taW5baV19ICR7ZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRlbXBlcmF0dXJlXzJtX21pbn1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogZGFpbHlEYXRhLmRhaWx5LndlYXRoZXJfY29kZVtpXSxcclxuICAgIH07XHJcbiAgICBmb290ZXJEYXRhLmRhaWx5LnB1c2goY29tcGlsZWREYXRhKTtcclxuICB9XHJcbiAgLy8gVGhlIGFwaSBjYWxsIGJ5IHJldHVybnMgZGF0YSBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZGF5IGFsb25nc2lkZSB0aGUgZm9yZWNhc3RcclxuICAvLyBmb3IgdGhlIG5leHQgc2V2ZW4gZGF5cywgZ2V0IHJpZCBvZiB0aGUgZmlyc3QgZGF5IGFzIHRoYXQgZGF5cyBkYXRhIGFscmVhZHlcclxuICAvLyBleGlzdHMgd2l0aGluIHRoZSBcImN1cnJlbnRcIiBhcGkgcmVxdWVzdCBwYXlsb2FkXHJcbiAgZm9vdGVyRGF0YS5kYWlseS5zaGlmdCgpO1xyXG5cclxuICAvLyBIb3VycyBhcmUgZGlzcGxheWVkIHN0YXJ0aW5nIGFmdGVyIHRoZSBjdXJyZW50IGhvdXIuIEZpbmQgdGhhdCBob3VyXHJcbiAgLy8gc28gdGhhdCB0aGUgbmV4dCAyNCBob3VycyBhZnRlciBpdCBjYW4gYmUgZGlzcGxheWVkXHJcbiAgY29uc3QgY3VycmVudEhvdXIgPSBpc29sYXRlQ3VycmVudEhvdXJJbmRleChob3VybHlEYXRhWzBdLnRpbWV6b25lKTtcclxuICBjb25zdCB2YWxpZEN1cnJlbnRIb3VyID0gKGN1cnJlbnRIb3VyICsgMjQpICUgMjQ7XHJcblxyXG4gIC8vIEZpbGwgaW4gaG91cmx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGhvdXJJbmRleCA9ICh2YWxpZEN1cnJlbnRIb3VyICsgaSkgJSAyNDtcclxuICAgIGNvbnN0IGNvbXBpbGVkRGF0YSA9IHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShob3VybHlEYXRhWzBdLmhvdXJseS50aW1lW2hvdXJJbmRleF0pLFxyXG4gICAgICB0ZW1wZXJhdHVyZTogYCR7aG91cmx5RGF0YVswXS5ob3VybHkudGVtcGVyYXR1cmVfMm1baG91ckluZGV4XX0gJHtob3VybHlEYXRhWzBdLmhvdXJseV91bml0cy50ZW1wZXJhdHVyZV8ybX1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogaG91cmx5RGF0YVswXS5ob3VybHkud2VhdGhlcl9jb2RlW2hvdXJJbmRleF0sXHJcbiAgICB9O1xyXG4gICAgZm9vdGVyRGF0YS5ob3VybHkucHVzaChjb21waWxlZERhdGEpO1xyXG4gIH1cclxuICAvLyBUaGUgYXBpIGNhbGwgcmV0dXJucyBkYXRhIGZvciB0aGUgY3VycmVudCBob3VyLCB0aGlzIGlzIGFscmVhZHkgZGlzcGxheWVkXHJcbiAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBkaXNwbGF5IGl0IGJlbG93IChzYW1lIGxvZ2ljIGFzIHdpdGggdGhlIGN1cnJlbnQgZGF5KVxyXG4gIGZvb3RlckRhdGEuaG91cmx5LnNoaWZ0KCk7XHJcbiAgcmV0dXJuIGZvb3RlckRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaExvY2F0aW9uKCkge1xyXG4gIGNvbnN0IHNlYXJjaEJhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XHJcbiAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBzZWFyY2hCYXJJbnB1dC52YWx1ZTtcclxuICAvLyBEb24ndCBzZWFyY2ggZm9yIGVtcHR5IHN0cmluZ3Mgb3IgdGhvc2UgY29udGFpbmluZyBvbmx5IHdoaXRlIHNwYWNlXHJcbiAgY29uc3Qgc3RyaW5nSXNOb3RPbmx5V2hpdGVTcGFjZSA9IGxvY2F0aW9uU3RyaW5nLnJlcGxhY2UoL1xccy9nLCBcIlwiKS5sZW5ndGg7XHJcbiAgaWYgKGxvY2F0aW9uU3RyaW5nICYmIHN0cmluZ0lzTm90T25seVdoaXRlU3BhY2UpIHtcclxuICAgIHJldHVybiBsb2NhdGlvblN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBnZXRXZWF0aGVyRGF0YSxcclxuICBleHRyYWN0VXBwZXJMZWZ0RGF0YSxcclxuICBleHRyYWN0VXBwZXJSaWdodERhdGEsXHJcbiAgZXh0cmFjdEZvb3RlcmRhdGEsXHJcbiAgc2VhcmNoTG9jYXRpb24sXHJcbn07XHJcbiIsImZ1bmN0aW9uIGZvcm1hdERhdGUodGltZVpvbmUpIHtcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgd2Vla2RheTogXCJsb25nXCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgdGltZVpvbmUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBmb3JtYXR0ZWREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lSW5UaW1lem9uZSh0aW1lWm9uZSkge1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXHJcbiAgICB0aW1lWm9uZSxcclxuICAgIHRpbWVab25lTmFtZTogXCJzaG9ydFwiLFxyXG4gIH07XHJcbiAgY29uc3QgYWRqdXN0ZWRUaW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBhZGp1c3RlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xyXG4gIGNvbnN0IG1pbGl0YXJ5VGltZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXHJcbiAgICBob3VyMTI6IHRydWUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gbWlsaXRhcnlUaW1lLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIGZvcm1hdHRlZFRpbWU7XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgc3VmZml4IGZvciB0aGUgZGF5IChlLmcuLCBcInN0XCIsIFwibmRcIiwgXCJyZFwiLCBcInRoXCIpXHJcbmZ1bmN0aW9uIGdldE51bWJlclN1ZmZpeChkYXkpIHtcclxuICBpZiAoZGF5ID49IDExICYmIGRheSA8PSAxMykge1xyXG4gICAgcmV0dXJuIFwidGhcIjtcclxuICB9XHJcbiAgc3dpdGNoIChkYXkgJSAxMCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICByZXR1cm4gXCJzdFwiO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICByZXR1cm4gXCJuZFwiO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICByZXR1cm4gXCJyZFwiO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIFwidGhcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERheShpbnB1dFN0cmluZywgdGltZXpvbmUpIHtcclxuICBjb25zdCBpbnB1dERhdGUgPSBuZXcgRGF0ZShgJHtpbnB1dFN0cmluZ31UMDA6MDA6MDBgKTtcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgd2Vla2RheTogXCJsb25nXCIsXHJcbiAgICB0aW1lWm9uZTogdGltZXpvbmUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gaW5wdXREYXRlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgY29uc3QgZGF5T2ZNb250aCA9IGlucHV0RGF0ZS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgc3VmZml4ID0gZ2V0TnVtYmVyU3VmZml4KGRheU9mTW9udGgpO1xyXG4gIGNvbnN0IGZvcm1hdHRlZERhdGVXaXRoVGggPSBgJHtmb3JtYXR0ZWREYXRlfSAke2RheU9mTW9udGh9JHtzdWZmaXh9YDtcclxuICByZXR1cm4gZm9ybWF0dGVkRGF0ZVdpdGhUaDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgodGltZVpvbmUpIHtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIHRpbWVab25lLFxyXG4gICAgaG91cjEyOiBmYWxzZSwgLy8gRW5zdXJlIDI0LWhvdXIgZm9ybWF0XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhvdXIgPSBwYXJzZUludChjdXJyZW50VGltZSwgMTApO1xyXG4gIHJldHVybiBob3VyO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGZvcm1hdERhdGUsXHJcbiAgZ2V0VGltZUluVGltZXpvbmUsXHJcbiAgZm9ybWF0VGltZSxcclxuICBmb3JtYXREYXksXHJcbiAgaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgsXHJcbn07XHJcbiIsIi8vIE90aGVyIEljb25zXHJcbmltcG9ydCBzZWFyY2hJY29uIGZyb20gXCIuL2ltYWdlcy9zZWFyY2hJY29uLnN2Z1wiO1xyXG5pbXBvcnQgZmVlbHNMaWtlSWNvbiBmcm9tIFwiLi9pbWFnZXMvZmVlbHNMaWtlSWNvbi5zdmdcIjtcclxuaW1wb3J0IGh1bWlkaXR5SWNvbiBmcm9tIFwiLi9pbWFnZXMvaHVtaWRpdHlJY29uLnN2Z1wiO1xyXG5pbXBvcnQgcHJlY2lwaXRhdGlvbkljb24gZnJvbSBcIi4vaW1hZ2VzL3ByZWNpcGl0YXRpb25JY29uLnN2Z1wiO1xyXG5pbXBvcnQgd2luZFNwZWVkSWNvbiBmcm9tIFwiLi9pbWFnZXMvd2luZEljb24uc3ZnXCI7XHJcbmltcG9ydCBsZWZ0QXJyb3dJY29uIGZyb20gXCIuL2ltYWdlcy9hcnJvd0xlZnQuc3ZnXCI7XHJcbmltcG9ydCByaWdodEFycm93SWNvbiBmcm9tIFwiLi9pbWFnZXMvYXJyb3dSaWdodC5zdmdcIjtcclxuXHJcbi8vIFdlYXRoZXIgSWNvbnNcclxuaW1wb3J0IGNsZWFyU2t5IGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL2NsZWFyU2t5LnN2Z1wiO1xyXG5pbXBvcnQgcGFydGx5Q2xvdWR5IGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3BhcnRseUNsb3VkeS5zdmdcIjtcclxuaW1wb3J0IGZvZ2d5IGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL2ZvZ2d5LnN2Z1wiO1xyXG5pbXBvcnQgZHJpenpsZSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9kcml6emxlLnN2Z1wiO1xyXG5pbXBvcnQgZnJlZXppbmdEcml6emxlIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL2ZyZWV6aW5nRHJpenpsZS5zdmdcIjtcclxuaW1wb3J0IHJhaW4gZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvcmFpbi5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nUmFpbiBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mcmVlemluZ1JhaW4uc3ZnXCI7XHJcbmltcG9ydCBzbm93ZmFsbCBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9zbm93ZmFsbC5zdmdcIjtcclxuaW1wb3J0IHNub3dHcmFpbnMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvc25vd0dyYWlucy5zdmdcIjtcclxuaW1wb3J0IHJhaW5TaG93ZXJzIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3JhaW5TaG93ZXJzLnN2Z1wiO1xyXG5pbXBvcnQgc25vd1Nob3dlcnMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvc25vd1Nob3dlcnMuc3ZnXCI7XHJcbmltcG9ydCB0aHVuZGVyU3Rvcm1Cb3RoIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3RodW5kZXJTdG9ybUJvdGguc3ZnXCI7XHJcblxyXG4vLyBDcm9wcGVkIFdlYXRoZXIgSWNvbnNcclxuaW1wb3J0IGNsZWFyU2t5QyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvY2xlYXJTa3lDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgcGFydGx5Q2xvdWR5QyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvcGFydGx5Q2xvdWR5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGZvZ2d5QyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvZm9nZ3lDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgZHJpenpsZUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2RyaXp6bGVDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgZnJlZXppbmdEcml6emxlQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvZnJlZXppbmdEcml6emxlQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHJhaW5DIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9yYWluQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nUmFpbkMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZyZWV6aW5nUmFpbkNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBzbm93ZmFsbEMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3Nub3dmYWxsQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHNub3dHcmFpbnNDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9zbm93R3JhaW5zQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHJhaW5TaG93ZXJzQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvcmFpblNob3dlcnNDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgc25vd1Nob3dlcnNDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9zbm93U2hvd2Vyc0Nyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCB0aHVuZGVyU3Rvcm1Cb3RoQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvdGh1bmRlclN0b3JtQm90aENyb3BwZWQuc3ZnXCI7XHJcblxyXG5jb25zdCB3ZWF0aGVySWNvbnMgPSBbXHJcbiAgY2xlYXJTa3ksXHJcbiAgcGFydGx5Q2xvdWR5LFxyXG4gIGZvZ2d5LFxyXG4gIGRyaXp6bGUsXHJcbiAgZnJlZXppbmdEcml6emxlLFxyXG4gIHJhaW4sXHJcbiAgZnJlZXppbmdSYWluLFxyXG4gIHNub3dmYWxsLFxyXG4gIHNub3dHcmFpbnMsXHJcbiAgcmFpblNob3dlcnMsXHJcbiAgc25vd1Nob3dlcnMsXHJcbiAgdGh1bmRlclN0b3JtQm90aCxcclxuXTtcclxuXHJcbmNvbnN0IHdlYXRoZXJJY29uc0Nyb3BwZWQgPSBbXHJcbiAgY2xlYXJTa3lDLFxyXG4gIHBhcnRseUNsb3VkeUMsXHJcbiAgZm9nZ3lDLFxyXG4gIGRyaXp6bGVDLFxyXG4gIGZyZWV6aW5nRHJpenpsZUMsXHJcbiAgcmFpbkMsXHJcbiAgZnJlZXppbmdSYWluQyxcclxuICBzbm93ZmFsbEMsXHJcbiAgc25vd0dyYWluc0MsXHJcbiAgcmFpblNob3dlcnNDLFxyXG4gIHNub3dTaG93ZXJzQyxcclxuICB0aHVuZGVyU3Rvcm1Cb3RoQyxcclxuXTtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckltYWdlKHBhcmVudCwgaW1hZ2UpIHtcclxuICBjb25zdCBpbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuICBpbWFnZUVsZW1lbnQuc3JjID0gaW1hZ2U7XHJcbiAgcGFyZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckljb25zKCkge1xyXG4gIC8vIFNlYXJjaGJhciBpY29uXHJcbiAgY29uc3Qgc2VhcmNoSWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoSWNvbkNvbnRhaW5lclwiKTtcclxuICByZW5kZXJJbWFnZShzZWFyY2hJY29uQ29udGFpbmVyLCBzZWFyY2hJY29uKTtcclxuXHJcbiAgLy8gVXBwZXIgcmlnaHQgaWNvbnNcclxuICBjb25zdCBmZWVsc0xpa2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzTGlrZUljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UoZmVlbHNMaWtlQ29udGFpbmVyLCBmZWVsc0xpa2VJY29uKTtcclxuXHJcbiAgY29uc3QgaHVtaWRpdHlDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5SWNvblwiKTtcclxuICByZW5kZXJJbWFnZShodW1pZGl0eUNvbnRhaW5lciwgaHVtaWRpdHlJY29uKTtcclxuXHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlY2lwaXRhdGlvbkljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UocHJlY2lwaXRhdGlvbkNvbnRhaW5lciwgcHJlY2lwaXRhdGlvbkljb24pO1xyXG5cclxuICBjb25zdCB3aW5kU3BlZWRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRTcGVlZEljb25cIik7XHJcbiAgcmVuZGVySW1hZ2Uod2luZFNwZWVkQ29udGFpbmVyLCB3aW5kU3BlZWRJY29uKTtcclxuXHJcbiAgLy8gSG91cmx5IGZvcmVjYXN0IGFycm93c1xyXG4gIGNvbnN0IGxlZnRJY29uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0QXJyb3dcIik7XHJcbiAgcmVuZGVySW1hZ2UobGVmdEljb25Db250YWluZXIsIGxlZnRBcnJvd0ljb24pO1xyXG5cclxuICBjb25zdCByaWdodEljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0QXJyb3dcIik7XHJcbiAgcmVuZGVySW1hZ2UocmlnaHRJY29uQ29udGFpbmVyLCByaWdodEFycm93SWNvbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGNvZGUsIGNyb3BwZWQpIHtcclxuICBsZXQgaW1hZ2VzVG9Vc2UgPSB3ZWF0aGVySWNvbnM7XHJcbiAgaWYgKGNyb3BwZWQpIHtcclxuICAgIGltYWdlc1RvVXNlID0gd2VhdGhlckljb25zQ3JvcHBlZDtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoY29kZSkge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgICBjYXNlIDE6XHJcbiAgICBjYXNlIDI6XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxXTtcclxuICAgIGNhc2UgNDU6XHJcbiAgICBjYXNlIDQ4OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMl07XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgY2FzZSA1MzpcclxuICAgIGNhc2UgNTU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVszXTtcclxuICAgIGNhc2UgNTY6XHJcbiAgICBjYXNlIDU3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNF07XHJcbiAgICBjYXNlIDYxOlxyXG4gICAgY2FzZSA2MzpcclxuICAgIGNhc2UgNjU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs1XTtcclxuICAgIGNhc2UgNjY6XHJcbiAgICBjYXNlIDY3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNl07XHJcbiAgICBjYXNlIDcxOlxyXG4gICAgY2FzZSA3MzpcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs3XTtcclxuICAgIGNhc2UgNzc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs4XTtcclxuICAgIGNhc2UgODA6XHJcbiAgICBjYXNlIDgxOlxyXG4gICAgY2FzZSA4MjpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzldO1xyXG4gICAgY2FzZSA4NTpcclxuICAgIGNhc2UgODY6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMF07XHJcbiAgICBjYXNlIDk1OlxyXG4gICAgY2FzZSA5NjpcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMV07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb3JlY2FzdEljb25zKGljb25Db2RlcywgaG91cmx5KSB7XHJcbiAgbGV0IGNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkYXlDYXJkXCIpO1xyXG4gIGlmIChob3VybHkpIHtcclxuICAgIGNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob3VyQ2FyZFwiKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNDb2xsZWN0aW9uLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBkYXlJY29uQ29udGFpbmVyID1cclxuICAgICAgY2FyZHNDb2xsZWN0aW9uW2ldLmNoaWxkcmVuW2NhcmRzQ29sbGVjdGlvbltpXS5jaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuICAgIC8vIENsZWFyIHByZXZpb3VzIGljb25cclxuICAgIGRheUljb25Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHJlbmRlckltYWdlKGRheUljb25Db250YWluZXIsIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGljb25Db2Rlc1tpXSwgZmFsc2UpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRJY29uKGljb25Db2RlKSB7XHJcbiAgY29uc3QgbWFpbkljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5JY29uXCIpO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyBpY29uc1xyXG4gIG1haW5JY29uQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgcmVuZGVySW1hZ2UobWFpbkljb25Db250YWluZXIsIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGljb25Db2RlLCB0cnVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZvcmVjYXN0Q2FyZHModG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICBjb25zdCBkYWlseUZvcmVjYXN0Q2FyZHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYWlseUZvcmVjYXN0R3JpZFwiKTtcclxuICBjb25zdCBob3VybHlGb3JlY2FzdENhcmRzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5Rm9yZWNhc3RHcmlkXCIpO1xyXG4gIGNvbnN0IGRhaWx5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3Vyc1NlbGVjdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cnNTZWxlY3Rpb25Db250YWluZXJcIixcclxuICApO1xyXG5cclxuICBpZiAodG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICAgIGRhaWx5Rm9yZWNhc3RDYXJkc0dyaWQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICBob3VybHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGRhaWx5QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJib3JkZXJcIik7XHJcbiAgICBob3VybHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJzU2VsZWN0aW9uQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGFpbHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgZGFpbHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJseUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYm9yZGVyXCIpO1xyXG4gICAgaG91cnNTZWxlY3Rpb25CdXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyVXBwZXJMZWZ0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IG1haW5Gb3JlY2FzdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5Gb3JlY2FzdFwiKTtcclxuICBjb25zdCBsb2NhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xyXG4gIGNvbnN0IGRhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpO1xyXG4gIGNvbnN0IHRpbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpO1xyXG4gIGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblRlbXBlcmF0dXJlXCIpO1xyXG5cclxuICBtYWluRm9yZWNhc3RFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5tYWluRm9yZWNhc3Q7XHJcbiAgbG9jYXRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5sb2NhdGlvbjtcclxuICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZGF0ZTtcclxuICB0aW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEudGltZTtcclxuICB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnRlbXBlcmF0dXJlO1xyXG4gIHJlbmRlckN1cnJlbnRJY29uKGRhdGEuaWNvbkNvZGUpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzTGlrZVwiKTtcclxuICBjb25zdCBodW1pZGl0eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5XCIpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uXCIpO1xyXG4gIGNvbnN0IHdpbmRTcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRTcGVlZFwiKTtcclxuXHJcbiAgZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZmVlbHNMaWtlO1xyXG4gIGh1bWlkaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuaHVtaWRpdHk7XHJcbiAgcHJlY2lwaXRhdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnByZWNpcGl0YXRpb247XHJcbiAgd2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEud2luZFNwZWVkO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJGb290ZXIoZm9yZWNhc3RQcm9taXNlLCBjdXJyZW50UHJvbWlzZSkge1xyXG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UHJvbWlzZTtcclxuICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGN1cnJlbnRQcm9taXNlO1xyXG4gIGNvbnN0IGRheUNhcmRFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkYXlDYXJkXCIpO1xyXG4gIGNvbnN0IGhvdXJDYXJkRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG91ckNhcmRcIik7XHJcblxyXG4gIC8vIFJlbmRlciBmb3JlY2FzdC9kYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JlY2FzdERhdGEubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGRheUNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IGZvcmVjYXN0RGF0YVtpXS5kYXRlO1xyXG4gICAgZGF5Q2FyZEVsZW1lbnRzW2ldLmNoaWxkcmVuWzFdLnRleHRDb250ZW50ID0gZm9yZWNhc3REYXRhW2ldLm1heFRlbXA7XHJcbiAgICBkYXlDYXJkRWxlbWVudHNbaV0uY2hpbGRyZW5bMl0udGV4dENvbnRlbnQgPSBmb3JlY2FzdERhdGFbaV0ubWluVGVtcDtcclxuICB9XHJcbiAgLy8gUmVuZGVyIGljb25zXHJcbiAgY29uc3QgZGFpbHlJY29uQ29kZXMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcmVjYXN0RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgZGFpbHlJY29uQ29kZXMucHVzaChmb3JlY2FzdERhdGFbaV0ud2VhdGhlckNvZGUpO1xyXG4gIH1cclxuICByZW5kZXJGb3JlY2FzdEljb25zKGRhaWx5SWNvbkNvZGVzLCBmYWxzZSk7XHJcblxyXG4gIC8vIFJlbmRlciBjdXJyZW50L2hvdXJseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgaG91ckNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9XHJcbiAgICAgIGN1cnJlbnREYXRhW2ldLnRpbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGhvdXJDYXJkRWxlbWVudHNbaV0uY2hpbGRyZW5bMV0udGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YVtpXS50ZW1wZXJhdHVyZTtcclxuICB9XHJcbiAgLy8gUmVuZGVyIGljb25zXHJcbiAgY29uc3QgaG91cmx5SWNvbkNvZGVzID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgaG91cmx5SWNvbkNvZGVzLnB1c2goY3VycmVudERhdGFbaV0ud2VhdGhlckNvZGUpO1xyXG4gIH1cclxuICByZW5kZXJGb3JlY2FzdEljb25zKGhvdXJseUljb25Db2RlcywgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMoZWlnaHRIb3VyQ2h1bmtJZCkge1xyXG4gIC8vIEhpZGUgYWxsIGNodW5rc1xyXG4gIGNvbnN0IGFsbENodW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaHVua1wiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENodW5rcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgYWxsQ2h1bmtzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxuICAvLyBTaG93IHNlbGVjdGVkIGNodW5rXHJcbiAgY29uc3QgY2h1bmtUb1Nob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIGBlaWdodEhvdXJDaHVuayR7ZWlnaHRIb3VyQ2h1bmtJZH1gLFxyXG4gICk7XHJcbiAgY2h1bmtUb1Nob3cuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN3aXRjaEhvdXJzKGRvdEVsZW1lbnQpIHtcclxuICAvLyBTZXQgYWN0aXZlIGRvdFxyXG4gIGNvbnN0IGFsbERvdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbERvdEVsZW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBhbGxEb3RFbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBkb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgLy8gUmVuZGVyIGNvcnJlY3QgdGhlIGNvcnJlY3QgZWlnaHQgY2FyZHNcclxuICByZW5kZXJIb3VybHlGb3JlY2FzdENhcmRzKGRvdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ob3VyXCIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3dpdGNoSG91clVzaW5nQXJyb3cocmlnaHRBcnJvdykge1xyXG4gIGNvbnN0IGN1cnJlbnRseUFjdGl2ZURvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG90LmFjdGl2ZVwiKTtcclxuXHJcbiAgLy8gSWYgdGhlIHJpZ2h0IGFycm93IGlzIGNsaWNrZWQsIG1vdmUgdGhlIGN1cnJlbnQgZG90IHRvIHRoZSByaWdodCwgbG9vcGluZ1xyXG4gIC8vIGFyb3VuZCBpZiB0aGUgYWN0aXZlIGRvdCBpcyB0aGUgcmlnaHRtb3N0IGRvdCwgaWYgdGhlIGxlZnQgYXJyb3cgaXMgY2xpY2tlZFxyXG4gIC8vIG1vdmUgdGhlIGN1cnJlbnQgZG90IHRvIHRoZSBsZWZ0LCBsb29waW5nIGFyb3VuZCBpZiB0aGUgYWN0aXZlIGRvdCBpc1xyXG4gIC8vIHRoZSBsZWZ0bW9zdCBkb3RcclxuICBjb25zdCBjdXJyZW50bHlBY3RpdmVEb3RJZCA9IGN1cnJlbnRseUFjdGl2ZURvdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhvdXJcIik7XHJcbiAgLy8gY2FsY3VsYXRlIGNvcnJlY3QgbmV3IGRvdCBpZFxyXG4gIGNvbnN0IG5leHREb3RJZCA9XHJcbiAgICAocGFyc2VJbnQoY3VycmVudGx5QWN0aXZlRG90SWQsIDEwKSArIChyaWdodEFycm93ID8gMSA6IDIpKSAlIDM7XHJcbiAgY29uc3QgZG90VG9BY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZG90W2RhdGEtaG91cj1cIiR7bmV4dERvdElkfVwiXWApO1xyXG4gIHN3aXRjaEhvdXJzKGRvdFRvQWN0aXZlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0Vycm9yTW9kYWwoKSB7XHJcbiAgY29uc3QgZXJyb3JNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JNb2RhbFwiKTtcclxuICBlcnJvck1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVFcnJvck1vZGFsKCkge1xyXG4gIGNvbnN0IGVycm9yTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTW9kYWxcIik7XHJcbiAgZXJyb3JNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0ludmFsaWRJbnB1dE1vZGFsKCkge1xyXG4gIGNvbnN0IGludmFsaWRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25Ob3RGb3VuZFwiKTtcclxuICBpbnZhbGlkSW5wdXQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVJbnZhbGlkSW5wdXRNb2RhbCgpIHtcclxuICBjb25zdCBpbnZhbGlkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uTm90Rm91bmRcIik7XHJcbiAgaW52YWxpZElucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJQYWdlKHVwcGVyTGVmdERhdGEsIHVwcGVyUmlnaHREYXRhLCBmb290ZXJEYXRhKSB7XHJcbiAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkNvbnRhaW5lclwiKTtcclxuICBpZiAodXBwZXJMZWZ0RGF0YSAmJiB1cHBlclJpZ2h0RGF0YSAmJiBmb290ZXJEYXRhKSB7XHJcbiAgICByZW5kZXJVcHBlckxlZnRDb3JuZXIodXBwZXJMZWZ0RGF0YSk7XHJcbiAgICByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKHVwcGVyUmlnaHREYXRhKTtcclxuICAgIHJlbmRlckZvb3Rlcihmb290ZXJEYXRhLmRhaWx5LCBmb290ZXJEYXRhLmhvdXJseSk7XHJcbiAgICAvLyBIaWRlIHRoZSBwYWdlIGJ1dCB0aGUgYmFja2dyb3VuZCB1bnRpbCB0aGUgZmV0Y2hlZCBhcGkgZGF0YSBsb2FkcywgaWYgdGhlXHJcbiAgICAvLyBmZXRjaCBjYWxsIGZhaWxzLCB0aGVuIHNob3cgYW4gZXJyb3IgbWVzc2FnZVxyXG4gICAgbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuICAgIHNob3dFcnJvck1vZGFsKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzd2l0Y2hUZW1wZXJhdHVyZVVuaXQoKSB7XHJcbiAgLy8gVG9nZ2xlIGJldHdlZW4gQ2Vsc2l1cyBhbmQgRmFocmVuaGVpdFxyXG4gIHdpbmRvdy5yZW5kZXJDZWxjaXVzID0gIXdpbmRvdy5yZW5kZXJDZWxjaXVzO1xyXG5cclxuICAvLyBHZXQgdGhlIGFwcHJvcHJpYXRlIGRhdGEgYmFzZWQgb24gdGhlIHRlbXBlcmF0dXJlIHVuaXRcclxuICBjb25zdCB1cHBlckxlZnREYXRhID0gd2luZG93LnJlbmRlckNlbGNpdXNcclxuICAgID8gd2luZG93LmV4dHJhY3RlZERhdGEudXBwZXJMZWZ0RGF0YUNlbGNpdXNcclxuICAgIDogd2luZG93LmV4dHJhY3RlZERhdGEudXBwZXJMZWZ0RGF0YUZhaHJlbmhlaXQ7XHJcblxyXG4gIGNvbnN0IHVwcGVyUmlnaHREYXRhID0gd2luZG93LnJlbmRlckNlbGNpdXNcclxuICAgID8gd2luZG93LmV4dHJhY3RlZERhdGEudXBwZXJSaWdodERhdGFDZWxjaXVzXHJcbiAgICA6IHdpbmRvdy5leHRyYWN0ZWREYXRhLnVwcGVyUmlnaHREYXRhRmFocmVuaGVpdDtcclxuXHJcbiAgY29uc3QgZm9vdGVyRGF0YSA9IHdpbmRvdy5yZW5kZXJDZWxjaXVzXHJcbiAgICA/IHdpbmRvdy5leHRyYWN0ZWREYXRhLmZvb3RlckRhdGFDZWxjaXVzXHJcbiAgICA6IHdpbmRvdy5leHRyYWN0ZWREYXRhLmZvb3RlckRhdGFGYWhyZW5oZWl0O1xyXG5cclxuICAvLyBDYWxsIHJlbmRlclBhZ2Ugd2l0aCB0aGUgdXBkYXRlZCBkYXRhXHJcbiAgcmVuZGVyUGFnZSh1cHBlckxlZnREYXRhLCB1cHBlclJpZ2h0RGF0YSwgZm9vdGVyRGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldHVwTGlzdGVuZXJzKCkge1xyXG4gIGNvbnN0IGRhaWx5Rm9yZWNhc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhaWx5QnV0dG9uXCIpO1xyXG4gIGRhaWx5Rm9yZWNhc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHRvZ2dsZUZvcmVjYXN0Q2FyZHMoZmFsc2UpO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBob3VybHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaG91cmx5QnV0dG9uXCIpO1xyXG4gIGhvdXJseUZvcmVjYXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICB0b2dnbGVGb3JlY2FzdENhcmRzKHRydWUpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBUaGUgZGFpbHkgZm9yZWNhc3Qgc2hvd3MgdGhlIG5leHQgMjQgaG91cnMgYWZ0ZXIgdGhlIGN1cnJlbnQgaG91cixcclxuICAvLyBUaGVzZSBhcmUgc2hvd24gaW4gY2h1bmtzIG9mIDggaG91cnMgZWFjaFxyXG4gIGNvbnN0IHN3aXRjaEhvdXJzRG90cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkb3RcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2l0Y2hIb3Vyc0RvdHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIHN3aXRjaEhvdXJzRG90c1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cclxuICAgICAgc3dpdGNoSG91cnMoc3dpdGNoSG91cnNEb3RzW2ldKSxcclxuICAgICk7XHJcbiAgfVxyXG4gIGNvbnN0IHN3aXRjaEhvdXJzQXJyb3dMZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0QXJyb3dcIik7XHJcbiAgY29uc3Qgc3dpdGNoSG91cnNBcnJvd1JpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodEFycm93XCIpO1xyXG4gIHN3aXRjaEhvdXJzQXJyb3dMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgc3dpdGNoSG91clVzaW5nQXJyb3coZmFsc2UpLFxyXG4gICk7XHJcbiAgc3dpdGNoSG91cnNBcnJvd1JpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgc3dpdGNoSG91clVzaW5nQXJyb3codHJ1ZSksXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc3dpdGNoQ2VsY2l1c0ZhaHJlbmhlaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwic3dpdGNoVGVtcGVyYXR1cmVCdXR0b25cIixcclxuICApO1xyXG4gIHN3aXRjaENlbGNpdXNGYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBzd2l0Y2hUZW1wZXJhdHVyZVVuaXQoKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICByZW5kZXJJY29ucyxcclxuICBzZXR1cExpc3RlbmVycyxcclxuICByZW5kZXJQYWdlLFxyXG4gIHNob3dFcnJvck1vZGFsLFxyXG4gIHJlbW92ZUVycm9yTW9kYWwsXHJcbiAgc2hvd0ludmFsaWRJbnB1dE1vZGFsLFxyXG4gIGhpZGVJbnZhbGlkSW5wdXRNb2RhbCxcclxufTtcclxuIiwiZnVuY3Rpb24gaGFuZGxlKHByb21pc2UpIHtcclxuICByZXR1cm4gcHJvbWlzZVxyXG4gICAgLnRoZW4oKGRhdGEpID0+IFtkYXRhLCB1bmRlZmluZWRdKVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4gUHJvbWlzZS5yZXNvbHZlKFt1bmRlZmluZWQsIGVycm9yXSkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGU7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogbW9udHNlcnJhdCxzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5odG1sLCBib2R5IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbmh0bWwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XHJcbn1cclxuXHJcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgei1pbmRleDogLTE7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdnc7XHJcblxyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcclxuICAgIHJnYmEoMCwgMCwgMCwgMC43KVxyXG4gICksXHJcbiAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbn1cclxuXHJcbiNlcnJvck1vZGFsIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NjgpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblxyXG4gIGxlZnQ6IDUwJTtcclxuICB0b3A6IDQ1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLC01MCUpO1xyXG59XHJcblxyXG4jZXJyb3JNb2RhbC5zaG93IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuI21haW5Db250YWluZXIge1xyXG4gIGhlaWdodDogOTAlO1xyXG4gIHdpZHRoOiA5MCU7XHJcblxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGdyaWQtdGVtcGxhdGU6IDJmciAxZnIgLyAxZnIgMWZyO1xyXG59XHJcblxyXG4jbWFpbkNvbnRhaW5lci5zaG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG59XHJcblxyXG4vKiBVcHBlciBMZWZ0IERpc3BsYXkgKi9cclxuXHJcbiN1cHBlckxlZnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDE1cHg7XHJcbn1cclxuXHJcbiNtYWluRm9yZWNhc3QsICNtYWluVGVtcGVyYXR1cmUge1xyXG4gIGZvbnQtc2l6ZTogM3JlbTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuI21haW5UZW1wZXJhdHVyZSB7XHJcbiAgZm9udC1zaXplOiAzLjVyZW07XHJcbn1cclxuXHJcbiNsb2NhdGlvbiwgI2RhdGUsICN0aW1lIHtcclxuICBmb250LXNpemU6IDEuMXJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuXHRiYWNrZ3JvdW5kOiBub25lO1xyXG5cdGNvbG9yOiBpbmhlcml0O1xyXG5cdGJvcmRlcjogbm9uZTtcclxuXHRwYWRkaW5nOiAwO1xyXG5cdGZvbnQ6IGluaGVyaXQ7XHJcblx0Y3Vyc29yOiBwb2ludGVyO1xyXG5cdG91dGxpbmU6IGluaGVyaXQ7XHJcbn1cclxuXHJcbiNzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvbiB7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNtYWluSWNvbiB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMHB4O1xyXG59XHJcblxyXG4jc2VhcmNoQ29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG59XHJcblxyXG4jc2VhcmNoSWNvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDEuM3JlbTtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgbGVmdDogMTBweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl0ge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDEuMXJlbTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgdGV4dC1pbmRlbnQ6IDdweDtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxuICBwYWRkaW5nOiAycHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdOjpwbGFjZWhvbGRlciB7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXTpmb2N1cyB7XHJcbiAgb3V0bGluZS13aWR0aDogMDtcclxufVxyXG5cclxuLyogVXBwZXIgUmlnaHQgRGlzcGxheSAqL1xyXG5cclxuI3VwcGVyUmlnaHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbn1cclxuXHJcbiNhbGlnblJpZ2h0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAzMHB4O1xyXG59XHJcblxyXG4udXBwZXJSaWdodENvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbn1cclxuXHJcbi51cHBlclJpZ2h0Q29udGFpbmVyID4gZGl2ID4gcCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4uaWNvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDNyZW07XHJcbn1cclxuXHJcbi51cHBlckxlZnRUZXh0IHtcclxuICBmb250LXNpemU6IDEuMXJlbTtcclxufVxyXG5cclxuLyogRm9vdGVyICovXHJcblxyXG4jZm9vdGVyIHtcclxuICBncmlkLWNvbHVtbjogMSAvIDM7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cclxufVxyXG5cclxuI2RhaWx5SG91cmx5Q29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTBweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG5cclxuI2RhaWx5SG91cmx5Q29udGFpbmVyIGJ1dHRvbiB7XHJcbiAgcGFkZGluZzogNnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuI2RhaWx5QnV0dG9uLmJvcmRlciwgI2hvdXJseUJ1dHRvbi5ib3JkZXIge1xyXG4gIC13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XHJcbiAgLW1vei1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcclxuICBib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcclxufVxyXG5cclxuLmRhaWx5Rm9yZWNhc3RHcmlkLnNob3csIC5ob3VybHlGb3JlY2FzdEdyaWQuc2hvdyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxufVxyXG5cclxuI2hvdXJzU2VsZWN0aW9uQ29udGFpbmVyIHtcclxuICB2aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nLXRvcDogNHB4O1xyXG59XHJcblxyXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIuc2hvdyB7XHJcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxufVxyXG5cclxuLmFycm93IHtcclxuICB3aWR0aDogMzdweDtcclxufVxyXG5cclxuLmRvdCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHRvcDogLTFweDtcclxuICBoZWlnaHQ6IDdweDtcclxuICB3aWR0aDogN3B4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmNWY1ZjU7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmRvdC5hY3RpdmUge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uZGFpbHlGb3JlY2FzdEdyaWQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gcmVwZWF0KDcsIDFmcik7XHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIGdhcDogMjBweDtcclxuICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIGhlaWdodDogMTBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG5cclxuLmRheUNhcmQge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6IDQuNXJlbSAxLjVyZW0gMC45cmVtIDg1cHggLyAxZnI7XHJcbiAgZ2FwOiA1cHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNkYXlOYW1lLCAjZGF5TWF4VGVtcCwgI2RheU1pblRlbXAsICNob3VyVGVtcCwgI2hvdXJOYW1lIHtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG59XHJcblxyXG4jZGF5TmFtZSwgI2hvdXJOYW1lIHtcclxuICBmb250LXNpemU6IGNhbGMoMC40cmVtICsgMS4xdncpO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuI2RheU1heFRlbXAsICNob3VyVGVtcCB7XHJcbiAgZm9udC1zaXplOiAxLjZyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNkYXlNaW5UZW1wIHtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG5cclxuI2RheUljb24sICNob3VySWNvbiB7XHJcbiAgd2lkdGg6IDcwcHg7XHJcbn1cclxuXHJcbi50ZXN0Qm9yZGVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxufVxyXG5cclxuLmhvdXJseUZvcmVjYXN0R3JpZCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbn1cclxuXHJcbi5jaHVuayB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoOCwgMWZyKTtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgZ2FwOiA0MHB4O1xyXG59XHJcblxyXG4uY2h1bmsuc2hvdyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxufSBcclxuXHJcbi5ob3VyQ2FyZCB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogNC41cmVtIDEuNXJlbSAwLjlyZW0gODVweCAvIDFmcjtcclxuICBnYXA6IDVweDtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuI2hvdXJJY29uIHtcclxuICBncmlkLXJvdzogNCAvIDU7XHJcbn1cclxuXHJcbiNsb2NhdGlvbk5vdEZvdW5kIHtcclxuICBmb250LXNpemU6IDAuOHJlbTtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4jbG9jYXRpb25Ob3RGb3VuZC5zaG93IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNz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bkMsT0FBTztFQUNQLGdCQUFnQjtFQUNoQixTQUFTO0VBQ1Qsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7OztBQUdBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsUUFBUTtFQUNSLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSwrQkFBK0I7RUFDL0Isa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsUUFBUTtFQUNSLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGNBQWM7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbnRzZXJyYXQsc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCwgYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB6LWluZGV4OiAtMTtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuXFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxyXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcXHJcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXFxyXFxuICApLFxcclxcbiAgdXJsKFxcXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcXFwiKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jZXJyb3JNb2RhbCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NjgpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG5cXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG4gIHRvcDogNDUlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuI2Vycm9yTW9kYWwuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuI21haW5Db250YWluZXIge1xcclxcbiAgaGVpZ2h0OiA5MCU7XFxyXFxuICB3aWR0aDogOTAlO1xcclxcblxcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDJmciAxZnIgLyAxZnIgMWZyO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkNvbnRhaW5lci5zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxufVxcclxcblxcclxcbi8qIFVwcGVyIExlZnQgRGlzcGxheSAqL1xcclxcblxcclxcbiN1cHBlckxlZnQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxufVxcclxcblxcclxcbiNtYWluRm9yZWNhc3QsICNtYWluVGVtcGVyYXR1cmUge1xcclxcbiAgZm9udC1zaXplOiAzcmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNtYWluVGVtcGVyYXR1cmUge1xcclxcbiAgZm9udC1zaXplOiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbiNsb2NhdGlvbiwgI2RhdGUsICN0aW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcblxcdGJhY2tncm91bmQ6IG5vbmU7XFxyXFxuXFx0Y29sb3I6IGluaGVyaXQ7XFxyXFxuXFx0Ym9yZGVyOiBub25lO1xcclxcblxcdHBhZGRpbmc6IDA7XFxyXFxuXFx0Zm9udDogaW5oZXJpdDtcXHJcXG5cXHRjdXJzb3I6IHBvaW50ZXI7XFxyXFxuXFx0b3V0bGluZTogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuI3N3aXRjaFRlbXBlcmF0dXJlQnV0dG9uIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkljb24ge1xcclxcbiAgd2lkdGg6IDYwcHg7XFxyXFxuICBoZWlnaHQ6IDYwcHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4IDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaENvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xcclxcbiAgd2lkdGg6IDIwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jc2VhcmNoSWNvbkNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogMS4zcmVtO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXHJcXG4gIHdpZHRoOiAxNjBweDtcXHJcXG4gIGhlaWdodDogMS4xcmVtO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICB0ZXh0LWluZGVudDogN3B4O1xcclxcbiAgZm9udC1zaXplOiAwLjlyZW07XFxyXFxuICBwYWRkaW5nOiAycHg7XFxyXFxufVxcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTo6cGxhY2Vob2xkZXIge1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl06Zm9jdXMge1xcclxcbiAgb3V0bGluZS13aWR0aDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVXBwZXIgUmlnaHQgRGlzcGxheSAqL1xcclxcblxcclxcbiN1cHBlclJpZ2h0IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcclxcbn1cXHJcXG5cXHJcXG4jYWxpZ25SaWdodCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyUmlnaHRDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyUmlnaHRDb250YWluZXIgPiBkaXYgPiBwIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb25Db250YWluZXIge1xcclxcbiAgd2lkdGg6IDNyZW07XFxyXFxufVxcclxcblxcclxcbi51cHBlckxlZnRUZXh0IHtcXHJcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb290ZXIgKi9cXHJcXG5cXHJcXG4jZm9vdGVyIHtcXHJcXG4gIGdyaWQtY29sdW1uOiAxIC8gMztcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlIb3VybHlDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbiNkYWlseUhvdXJseUNvbnRhaW5lciBidXR0b24ge1xcclxcbiAgcGFkZGluZzogNnB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlCdXR0b24uYm9yZGVyLCAjaG91cmx5QnV0dG9uLmJvcmRlciB7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xcclxcbiAgLW1vei1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG4gIGJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGFpbHlGb3JlY2FzdEdyaWQuc2hvdywgLmhvdXJseUZvcmVjYXN0R3JpZC5zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxufVxcclxcblxcclxcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lciB7XFxyXFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmctdG9wOiA0cHg7XFxyXFxufVxcclxcblxcclxcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lci5zaG93IHtcXHJcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5hcnJvdyB7XFxyXFxuICB3aWR0aDogMzdweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRvdCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IC0xcHg7XFxyXFxuICBoZWlnaHQ6IDdweDtcXHJcXG4gIHdpZHRoOiA3cHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjZjVmNWY1O1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZG90LmFjdGl2ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmRhaWx5Rm9yZWNhc3RHcmlkIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoNywgMWZyKTtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgZ2FwOiAyMHB4O1xcclxcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcXHJcXG4gIGhlaWdodDogMTBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbn1cXHJcXG5cXHJcXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcXHJcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uZGF5Q2FyZCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogNC41cmVtIDEuNXJlbSAwLjlyZW0gODVweCAvIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2RheU5hbWUsICNkYXlNYXhUZW1wLCAjZGF5TWluVGVtcCwgI2hvdXJUZW1wLCAjaG91ck5hbWUge1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuI2RheU5hbWUsICNob3VyTmFtZSB7XFxyXFxuICBmb250LXNpemU6IGNhbGMoMC40cmVtICsgMS4xdncpO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5TWF4VGVtcCwgI2hvdXJUZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNkYXlNaW5UZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5SWNvbiwgI2hvdXJJY29uIHtcXHJcXG4gIHdpZHRoOiA3MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGVzdEJvcmRlciB7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseUZvcmVjYXN0R3JpZCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4uY2h1bmsge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDFmciAvIHJlcGVhdCg4LCAxZnIpO1xcclxcbiAgZmxleDogMTtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICBnYXA6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi5jaHVuay5zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxufSBcXHJcXG5cXHJcXG4uaG91ckNhcmQge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDQuNXJlbSAxLjVyZW0gMC45cmVtIDg1cHggLyAxZnI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNob3VySWNvbiB7XFxyXFxuICBncmlkLXJvdzogNCAvIDU7XFxyXFxufVxcclxcblxcclxcbiNsb2NhdGlvbk5vdEZvdW5kIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuI2xvY2F0aW9uTm90Rm91bmQuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0V2VhdGhlckRhdGEsXHJcbiAgZXh0cmFjdFVwcGVyTGVmdERhdGEsXHJcbiAgZXh0cmFjdFVwcGVyUmlnaHREYXRhLFxyXG4gIGV4dHJhY3RGb290ZXJkYXRhLFxyXG4gIHNlYXJjaExvY2F0aW9uLFxyXG59IGZyb20gXCIuL2FwaUhhbmRsZXJcIjtcclxuaW1wb3J0IHtcclxuICByZW5kZXJJY29ucyxcclxuICBzZXR1cExpc3RlbmVycyxcclxuICByZW5kZXJQYWdlLFxyXG4gIHNob3dFcnJvck1vZGFsLFxyXG4gIHJlbW92ZUVycm9yTW9kYWwsXHJcbiAgc2hvd0ludmFsaWRJbnB1dE1vZGFsLFxyXG4gIGhpZGVJbnZhbGlkSW5wdXRNb2RhbCxcclxufSBmcm9tIFwiLi9kb21IYW5kbGVyXCI7XHJcbmltcG9ydCBoYW5kbGUgZnJvbSBcIi4vZXJyb3JIYW5kbGVyXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0RGF0YShkYXRhKSB7XHJcbiAgLy8gRXh0cmFjdCBib3RoIHRoZSBDZWxlY2l1cyBhbmQgRmFocmVuaGVpdCBkYXRhIG9ubHkgb25jZSwgdGhlbiBqdXN0XHJcbiAgLy8gZGlzcGxheS9yZXJlZGVuZGVyIHRoZSBkZXNpcmVkIHRlbXBlcmF0dXJlIHZhbHVlIGluIGRvbUhhbmRsZXJcclxuICBjb25zdCBbdXBwZXJMZWZ0RGF0YUNlbGNpdXMsIGVycm9yMV0gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0VXBwZXJMZWZ0RGF0YShkYXRhLmN1cnJlbnRDZWxjaXVzKSxcclxuICApO1xyXG4gIGNvbnN0IFt1cHBlclJpZ2h0RGF0YUNlbGNpdXMsIGVycm9yMl0gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0VXBwZXJSaWdodERhdGEoZGF0YS5jdXJyZW50Q2VsY2l1cyksXHJcbiAgKTtcclxuICBjb25zdCBbZm9vdGVyRGF0YUNlbGNpdXMsIGVycm9yM10gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0Rm9vdGVyZGF0YShkYXRhLmZvcmVjYXN0Q2VsY2l1cywgZGF0YS5jdXJyZW50Q2VsY2l1cyksXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgW3VwcGVyTGVmdERhdGFGYWhyZW5oZWl0LCBlcnJvcjRdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZXh0cmFjdFVwcGVyTGVmdERhdGEoZGF0YS5jdXJyZW50RmFocmVuaGVpdCksXHJcbiAgKTtcclxuICBjb25zdCBbdXBwZXJSaWdodERhdGFGYWhyZW5oZWl0LCBlcnJvcjVdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZXh0cmFjdFVwcGVyUmlnaHREYXRhKGRhdGEuY3VycmVudEZhaHJlbmhlaXQpLFxyXG4gICk7XHJcbiAgY29uc3QgW2Zvb3RlckRhdGFGYWhyZW5oZWl0LCBlcnJvcjZdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZXh0cmFjdEZvb3RlcmRhdGEoZGF0YS5mb3JlY2FzdEZhaHJlbmhlaXQsIGRhdGEuY3VycmVudEZhaHJlbmhlaXQpLFxyXG4gICk7XHJcblxyXG4gIGlmIChlcnJvcjEgfHwgZXJyb3IyIHx8IGVycm9yMyB8fCBlcnJvcjQgfHwgZXJyb3I1IHx8IGVycm9yNikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgZXh0cmFjdGluZyB3ZWF0aGVyIGRhdGFcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdXBwZXJMZWZ0RGF0YUNlbGNpdXMsXHJcbiAgICB1cHBlclJpZ2h0RGF0YUNlbGNpdXMsXHJcbiAgICBmb290ZXJEYXRhQ2VsY2l1cyxcclxuICAgIHVwcGVyTGVmdERhdGFGYWhyZW5oZWl0LFxyXG4gICAgdXBwZXJSaWdodERhdGFGYWhyZW5oZWl0LFxyXG4gICAgZm9vdGVyRGF0YUZhaHJlbmhlaXQsXHJcbiAgfTtcclxufVxyXG5cclxuY29uc3QgcmVuZGVyQ2VsY2l1cyA9IHRydWU7XHJcbmxldCBleHRyYWN0ZWREYXRhO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhQW5kUmVuZGVyUGFnZShsb2NhdGlvbikge1xyXG4gIC8vIEZldGNoIGRhdGFcclxuICBjb25zdCBbZmV0Y2hlZERhdGEsIGZldGNoaW5nRXJyb3JdID0gYXdhaXQgaGFuZGxlKGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSk7XHJcbiAgaWYgKGZldGNoaW5nRXJyb3IpIHRocm93IG5ldyBFcnJvcihmZXRjaGluZ0Vycm9yKTtcclxuXHJcbiAgLy8gRXh0cmFjdCBkYXRhXHJcbiAgY29uc3QgW2V4dHJhY3RlZERhdGFMb2NhbCwgZXh0cmFjdGluZ0Vycm9yXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGV4dHJhY3REYXRhKGZldGNoZWREYXRhKSxcclxuICApO1xyXG4gIGlmIChleHRyYWN0aW5nRXJyb3IpIHRocm93IG5ldyBFcnJvcihleHRyYWN0aW5nRXJyb3IpO1xyXG4gIGV4dHJhY3RlZERhdGEgPSBleHRyYWN0ZWREYXRhTG9jYWw7XHJcblxyXG4gIC8vIFJlbmRlciBkYXRhXHJcbiAgcmVuZGVyUGFnZShcclxuICAgIGV4dHJhY3RlZERhdGEudXBwZXJMZWZ0RGF0YUNlbGNpdXMsXHJcbiAgICBleHRyYWN0ZWREYXRhLnVwcGVyUmlnaHREYXRhQ2VsY2l1cyxcclxuICAgIGV4dHJhY3RlZERhdGEuZm9vdGVyRGF0YUNlbGNpdXMsXHJcbiAgKTtcclxuICByZXR1cm4gXCJGZXRjaCBhbmQgcmVuZGVyIHN1Y2Nlc3MhXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyU2VhcmNoQmFyKCkge1xyXG4gIGNvbnN0IHNlYXJjaEJhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XHJcbiAgc2VhcmNoQmFySW5wdXQudmFsdWUgPSBcIlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleGVjdXRlU2VhcmNoKGxvY2F0aW9uU3RyaW5nKSB7XHJcbiAgZmV0Y2hEYXRhQW5kUmVuZGVyUGFnZShsb2NhdGlvblN0cmluZylcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgd2luZG93LnJlbmRlckNlbGNpdXMgPSByZW5kZXJDZWxjaXVzO1xyXG4gICAgICB3aW5kb3cuZXh0cmFjdGVkRGF0YSA9IGV4dHJhY3RlZERhdGE7XHJcbiAgICAgIGhpZGVJbnZhbGlkSW5wdXRNb2RhbCgpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIHNob3dJbnZhbGlkSW5wdXRNb2RhbCgpO1xyXG4gICAgfSk7XHJcbiAgY2xlYXJTZWFyY2hCYXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBTZWFyY2hCYXJMaXN0ZW5lcigpIHtcclxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hDb250YWluZXJcIik7XHJcbiAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IGxvY2F0aW9uU3RyaW5nID0gc2VhcmNoTG9jYXRpb24oKTtcclxuICAgIGlmIChsb2NhdGlvblN0cmluZykge1xyXG4gICAgICBleGVjdXRlU2VhcmNoKGxvY2F0aW9uU3RyaW5nKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgY29uc3Qgc2VhcmNoQmFyU3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hJY29uQ29udGFpbmVyXCIpO1xyXG4gIHNlYXJjaEJhclN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBzZWFyY2hMb2NhdGlvbigpO1xyXG4gICAgaWYgKGxvY2F0aW9uU3RyaW5nKSB7XHJcbiAgICAgIGV4ZWN1dGVTZWFyY2gobG9jYXRpb25TdHJpbmcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vKlxyXG4tT25seSBmZXRjaCB3ZWF0aGVyIGRhdGE6XHJcbiAgICAtT24gcGFnZSBsb2FkXHJcbiAgICBhbmRcclxuICAgIC1XaGVuIHRoZSBzZWFyY2ggZm9ybSBoYXMgYSB2YWxpZCBpbnB1dFxyXG4gICAgTk9UXHJcbiAgICAtd2hlbiB0aGUgcGFnZSBpcyByZXJlbmRlcmVkIGluIGNlbGNpdXMgb3IgZmFocmVuaGVpdFxyXG4qL1xyXG5yZW5kZXJJY29ucygpO1xyXG5zZXR1cExpc3RlbmVycygpO1xyXG5zZXR1cFNlYXJjaEJhckxpc3RlbmVyKCk7XHJcbmZldGNoRGF0YUFuZFJlbmRlclBhZ2UoXCJDYWxnYXJ5XCIpXHJcbiAgLnRoZW4oKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJJbml0YWwgZmV0Y2ggYW5kIHJlbmRlciBzdWNjZXNzIVwiKTtcclxuICAgIHdpbmRvdy5yZW5kZXJDZWxjaXVzID0gcmVuZGVyQ2VsY2l1cztcclxuICAgIHdpbmRvdy5leHRyYWN0ZWREYXRhID0gZXh0cmFjdGVkRGF0YTtcclxuICAgIHJlbW92ZUVycm9yTW9kYWwoKTtcclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIHNob3dFcnJvck1vZGFsKCk7XHJcbiAgfSk7XHJcbiJdLCJuYW1lcyI6WyJoYW5kbGUiLCJmb3JtYXREYXRlIiwiZ2V0VGltZUluVGltZXpvbmUiLCJmb3JtYXRUaW1lIiwiZm9ybWF0RGF5IiwiaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgiLCJnZXRMb2NhdGlvbkNvb3JkaW5hdGVzIiwibG9jYXRpb24iLCJjb29yZGluYXRlc1Byb21zZSIsImVycm9yIiwiZmV0Y2giLCJFcnJvciIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdHMiLCJzdGF0dXMiLCJuYW1lIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ0aW1lem9uZSIsImJ1aWxkRmV0Y2hVUkwiLCJjb29yZGluYXRlUHJvbWlzZSIsImN1cnJlbnRPckZvcmVjYXN0IiwiY2VsY2l1c09yRmFocmVuaGVpdCIsImNvb3JkaW5hdGVEYXRhIiwidXJsIiwiZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEiLCJ1cmxQcm9taXNlIiwid2VhdGhlckRhdGFSZXNwb25zZSIsIm1vZGUiLCJ3ZWF0aGVyRGF0YUpTT04iLCJnZXRXZWF0aGVyRGF0YSIsImNvb3JkaW5hdGVzIiwidXJsMSIsInVybDIiLCJ1cmwzIiwidXJsNCIsImFsbFdlYXRoZXJEYXRhIiwiUHJvbWlzZSIsImFsbCIsIm1hcHBlZFdlYXRoZXJEYXRhIiwiY3VycmVudENlbGNpdXMiLCJjdXJyZW50RmFocmVuaGVpdCIsImZvcmVjYXN0Q2VsY2l1cyIsImZvcmVjYXN0RmFocmVuaGVpdCIsInBhcnNlV2VhdGhlckNvZGVUb1N0cmluZyIsImNvZGUiLCJleHRyYWN0VXBwZXJMZWZ0RGF0YSIsIndlYXRoZXJEYXRhUHJvbWlzZSIsImRhdGEiLCJtYWluRm9yZWNhc3QiLCJjdXJyZW50Iiwid2VhdGhlcl9jb2RlIiwidXBwZXJMZWZ0RGF0YSIsImRhdGUiLCJ0aW1lIiwidGVtcGVyYXR1cmUiLCJ0ZW1wZXJhdHVyZV8ybSIsImN1cnJlbnRfdW5pdHMiLCJpY29uQ29kZSIsImV4dHJhY3RVcHBlclJpZ2h0RGF0YSIsInVwcGVyUmlnaHREYXRhIiwiZmVlbHNMaWtlIiwiYXBwYXJlbnRfdGVtcGVyYXR1cmUiLCJodW1pZGl0eSIsInJlbGF0aXZlX2h1bWlkaXR5XzJtIiwicHJlY2lwaXRhdGlvbiIsIndpbmRTcGVlZCIsIndpbmRfc3BlZWRfMTBtIiwiZXh0cmFjdEZvb3RlcmRhdGEiLCJkYWlseURhdGFQcm9taXNlIiwiaG91cmx5RGF0YVByb21pc2UiLCJkYWlseURhdGEiLCJob3VybHlEYXRhIiwiZm9vdGVyRGF0YSIsImRhaWx5IiwiaG91cmx5IiwiaSIsInRlbXBlcmF0dXJlXzJtX21heCIsImxlbmd0aCIsImNvbXBpbGVkRGF0YSIsImRhaWx5X3VuaXRzIiwibWF4VGVtcCIsIm1pblRlbXAiLCJ0ZW1wZXJhdHVyZV8ybV9taW4iLCJ3ZWF0aGVyQ29kZSIsInB1c2giLCJzaGlmdCIsImN1cnJlbnRIb3VyIiwidmFsaWRDdXJyZW50SG91ciIsImhvdXJJbmRleCIsImhvdXJseV91bml0cyIsInNlYXJjaExvY2F0aW9uIiwic2VhcmNoQmFySW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibG9jYXRpb25TdHJpbmciLCJ2YWx1ZSIsInN0cmluZ0lzTm90T25seVdoaXRlU3BhY2UiLCJyZXBsYWNlIiwidW5kZWZpbmVkIiwidGltZVpvbmUiLCJvcHRpb25zIiwid2Vla2RheSIsInllYXIiLCJtb250aCIsImRheSIsImZvcm1hdHRlZERhdGUiLCJEYXRlIiwidG9Mb2NhbGVTdHJpbmciLCJob3VyIiwibWludXRlIiwidGltZVpvbmVOYW1lIiwiYWRqdXN0ZWRUaW1lIiwibWlsaXRhcnlUaW1lIiwiaG91cjEyIiwiZm9ybWF0dGVkVGltZSIsImdldE51bWJlclN1ZmZpeCIsImlucHV0U3RyaW5nIiwiaW5wdXREYXRlIiwiZGF5T2ZNb250aCIsImdldERhdGUiLCJzdWZmaXgiLCJmb3JtYXR0ZWREYXRlV2l0aFRoIiwiY3VycmVudFRpbWUiLCJwYXJzZUludCIsInNlYXJjaEljb24iLCJmZWVsc0xpa2VJY29uIiwiaHVtaWRpdHlJY29uIiwicHJlY2lwaXRhdGlvbkljb24iLCJ3aW5kU3BlZWRJY29uIiwibGVmdEFycm93SWNvbiIsInJpZ2h0QXJyb3dJY29uIiwiY2xlYXJTa3kiLCJwYXJ0bHlDbG91ZHkiLCJmb2dneSIsImRyaXp6bGUiLCJmcmVlemluZ0RyaXp6bGUiLCJyYWluIiwiZnJlZXppbmdSYWluIiwic25vd2ZhbGwiLCJzbm93R3JhaW5zIiwicmFpblNob3dlcnMiLCJzbm93U2hvd2VycyIsInRodW5kZXJTdG9ybUJvdGgiLCJjbGVhclNreUMiLCJwYXJ0bHlDbG91ZHlDIiwiZm9nZ3lDIiwiZHJpenpsZUMiLCJmcmVlemluZ0RyaXp6bGVDIiwicmFpbkMiLCJmcmVlemluZ1JhaW5DIiwic25vd2ZhbGxDIiwic25vd0dyYWluc0MiLCJyYWluU2hvd2Vyc0MiLCJzbm93U2hvd2Vyc0MiLCJ0aHVuZGVyU3Rvcm1Cb3RoQyIsIndlYXRoZXJJY29ucyIsIndlYXRoZXJJY29uc0Nyb3BwZWQiLCJyZW5kZXJJbWFnZSIsInBhcmVudCIsImltYWdlIiwiaW1hZ2VFbGVtZW50IiwiSW1hZ2UiLCJzcmMiLCJhcHBlbmRDaGlsZCIsInJlbmRlckljb25zIiwic2VhcmNoSWNvbkNvbnRhaW5lciIsImZlZWxzTGlrZUNvbnRhaW5lciIsImh1bWlkaXR5Q29udGFpbmVyIiwicHJlY2lwaXRhdGlvbkNvbnRhaW5lciIsIndpbmRTcGVlZENvbnRhaW5lciIsImxlZnRJY29uQ29udGFpbmVyIiwicmlnaHRJY29uQ29udGFpbmVyIiwicGFyc2VXZWF0aGVyQ29kZVRvSW1hZ2UiLCJjcm9wcGVkIiwiaW1hZ2VzVG9Vc2UiLCJyZW5kZXJGb3JlY2FzdEljb25zIiwiaWNvbkNvZGVzIiwiY2FyZHNDb2xsZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRheUljb25Db250YWluZXIiLCJjaGlsZHJlbiIsImlubmVySFRNTCIsInJlbmRlckN1cnJlbnRJY29uIiwibWFpbkljb25Db250YWluZXIiLCJ0b2dnbGVGb3JlY2FzdENhcmRzIiwidG9nZ2xlSG91cmx5Q2FyZHMiLCJkYWlseUZvcmVjYXN0Q2FyZHNHcmlkIiwicXVlcnlTZWxlY3RvciIsImhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkIiwiZGFpbHlCdXR0b24iLCJob3VybHlCdXR0b24iLCJob3Vyc1NlbGVjdGlvbkJ1dHRvbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZW5kZXJVcHBlckxlZnRDb3JuZXIiLCJkYXRhUHJvbWlzZSIsIm1haW5Gb3JlY2FzdEVsZW1lbnQiLCJsb2NhdGlvbkVsZW1lbnQiLCJkYXRlRWxlbWVudCIsInRpbWVFbGVtZW50IiwidGVtcGVyYXR1cmVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJyZW5kZXJVcHBlclJpZ2h0Q29ybmVyIiwiZmVlbHNMaWtlRWxlbWVudCIsImh1bWlkaXR5RWxlbWVudCIsInByZWNpcGl0YXRpb25FbGVtZW50Iiwid2luZFNwZWVkRWxlbWVudCIsInJlbmRlckZvb3RlciIsImZvcmVjYXN0UHJvbWlzZSIsImN1cnJlbnRQcm9taXNlIiwiZm9yZWNhc3REYXRhIiwiY3VycmVudERhdGEiLCJkYXlDYXJkRWxlbWVudHMiLCJob3VyQ2FyZEVsZW1lbnRzIiwiZGFpbHlJY29uQ29kZXMiLCJ0b0xvd2VyQ2FzZSIsImhvdXJseUljb25Db2RlcyIsInJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMiLCJlaWdodEhvdXJDaHVua0lkIiwiYWxsQ2h1bmtzIiwiY2h1bmtUb1Nob3ciLCJzd2l0Y2hIb3VycyIsImRvdEVsZW1lbnQiLCJhbGxEb3RFbGVtZW50cyIsImdldEF0dHJpYnV0ZSIsInN3aXRjaEhvdXJVc2luZ0Fycm93IiwicmlnaHRBcnJvdyIsImN1cnJlbnRseUFjdGl2ZURvdCIsImN1cnJlbnRseUFjdGl2ZURvdElkIiwibmV4dERvdElkIiwiZG90VG9BY3RpdmUiLCJzaG93RXJyb3JNb2RhbCIsImVycm9yTW9kYWwiLCJyZW1vdmVFcnJvck1vZGFsIiwic2hvd0ludmFsaWRJbnB1dE1vZGFsIiwiaW52YWxpZElucHV0IiwiaGlkZUludmFsaWRJbnB1dE1vZGFsIiwicmVuZGVyUGFnZSIsIm1haW5Db250YWluZXIiLCJzd2l0Y2hUZW1wZXJhdHVyZVVuaXQiLCJ3aW5kb3ciLCJyZW5kZXJDZWxjaXVzIiwiZXh0cmFjdGVkRGF0YSIsInVwcGVyTGVmdERhdGFDZWxjaXVzIiwidXBwZXJMZWZ0RGF0YUZhaHJlbmhlaXQiLCJ1cHBlclJpZ2h0RGF0YUNlbGNpdXMiLCJ1cHBlclJpZ2h0RGF0YUZhaHJlbmhlaXQiLCJmb290ZXJEYXRhQ2VsY2l1cyIsImZvb3RlckRhdGFGYWhyZW5oZWl0Iiwic2V0dXBMaXN0ZW5lcnMiLCJkYWlseUZvcmVjYXN0QnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhvdXJseUZvcmVjYXN0QnV0dG9uIiwic3dpdGNoSG91cnNEb3RzIiwic3dpdGNoSG91cnNBcnJvd0xlZnQiLCJzd2l0Y2hIb3Vyc0Fycm93UmlnaHQiLCJzd2l0Y2hDZWxjaXVzRmFocmVuaGVpdCIsInByb21pc2UiLCJ0aGVuIiwiY2F0Y2giLCJyZXNvbHZlIiwiZXh0cmFjdERhdGEiLCJlcnJvcjEiLCJlcnJvcjIiLCJlcnJvcjMiLCJlcnJvcjQiLCJlcnJvcjUiLCJlcnJvcjYiLCJmZXRjaERhdGFBbmRSZW5kZXJQYWdlIiwiZmV0Y2hlZERhdGEiLCJmZXRjaGluZ0Vycm9yIiwiZXh0cmFjdGVkRGF0YUxvY2FsIiwiZXh0cmFjdGluZ0Vycm9yIiwiY2xlYXJTZWFyY2hCYXIiLCJleGVjdXRlU2VhcmNoIiwic2V0dXBTZWFyY2hCYXJMaXN0ZW5lciIsImZvcm0iLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic2VhcmNoQmFyU3VibWl0QnV0dG9uIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=