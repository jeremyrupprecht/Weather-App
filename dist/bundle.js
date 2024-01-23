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
/* harmony export */   hideLoadingModal: () => (/* binding */ hideLoadingModal),
/* harmony export */   removeErrorModal: () => (/* binding */ removeErrorModal),
/* harmony export */   renderIcons: () => (/* binding */ renderIcons),
/* harmony export */   renderPage: () => (/* binding */ renderPage),
/* harmony export */   setupListeners: () => (/* binding */ setupListeners),
/* harmony export */   showErrorModal: () => (/* binding */ showErrorModal),
/* harmony export */   showInvalidInputModal: () => (/* binding */ showInvalidInputModal),
/* harmony export */   showLoadingModal: () => (/* binding */ showLoadingModal)
/* harmony export */ });
/* harmony import */ var _images_searchIcon_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/searchIcon.svg */ "./src/images/searchIcon.svg");
/* harmony import */ var _images_feelsLikeIcon_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/feelsLikeIcon.svg */ "./src/images/feelsLikeIcon.svg");
/* harmony import */ var _images_humidityIcon_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/humidityIcon.svg */ "./src/images/humidityIcon.svg");
/* harmony import */ var _images_precipitationIcon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/precipitationIcon.svg */ "./src/images/precipitationIcon.svg");
/* harmony import */ var _images_windIcon_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/windIcon.svg */ "./src/images/windIcon.svg");
/* harmony import */ var _images_arrowLeft_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/arrowLeft.svg */ "./src/images/arrowLeft.svg");
/* harmony import */ var _images_arrowRight_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/arrowRight.svg */ "./src/images/arrowRight.svg");
/* harmony import */ var _images_loading_gif__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/loading.gif */ "./src/images/loading.gif");
/* harmony import */ var _images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/weatherCodeIcons/clearSky.svg */ "./src/images/weatherCodeIcons/clearSky.svg");
/* harmony import */ var _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/weatherCodeIcons/partlyCloudy.svg */ "./src/images/weatherCodeIcons/partlyCloudy.svg");
/* harmony import */ var _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/weatherCodeIcons/foggy.svg */ "./src/images/weatherCodeIcons/foggy.svg");
/* harmony import */ var _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/weatherCodeIcons/drizzle.svg */ "./src/images/weatherCodeIcons/drizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingDrizzle.svg */ "./src/images/weatherCodeIcons/freezingDrizzle.svg");
/* harmony import */ var _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/weatherCodeIcons/rain.svg */ "./src/images/weatherCodeIcons/rain.svg");
/* harmony import */ var _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/weatherCodeIcons/freezingRain.svg */ "./src/images/weatherCodeIcons/freezingRain.svg");
/* harmony import */ var _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowfall.svg */ "./src/images/weatherCodeIcons/snowfall.svg");
/* harmony import */ var _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowGrains.svg */ "./src/images/weatherCodeIcons/snowGrains.svg");
/* harmony import */ var _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/weatherCodeIcons/rainShowers.svg */ "./src/images/weatherCodeIcons/rainShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/weatherCodeIcons/snowShowers.svg */ "./src/images/weatherCodeIcons/snowShowers.svg");
/* harmony import */ var _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/weatherCodeIcons/thunderStormBoth.svg */ "./src/images/weatherCodeIcons/thunderStormBoth.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/clearSkyCropped.svg */ "./src/images/weatherCodeIconsCropped/clearSkyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/partlyCloudyCropped.svg */ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/foggyCropped.svg */ "./src/images/weatherCodeIconsCropped/foggyCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/drizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingDrizzleCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainCropped.svg */ "./src/images/weatherCodeIconsCropped/rainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/freezingRainCropped.svg */ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowfallCropped.svg */ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowGrainsCropped.svg */ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/rainShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/snowShowersCropped.svg */ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg");
/* harmony import */ var _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./images/weatherCodeIconsCropped/thunderStormBothCropped.svg */ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg");
// Other Icons









// Weather Icons













// Cropped Weather Icons












const weatherIcons = [_images_weatherCodeIcons_clearSky_svg__WEBPACK_IMPORTED_MODULE_8__, _images_weatherCodeIcons_partlyCloudy_svg__WEBPACK_IMPORTED_MODULE_9__, _images_weatherCodeIcons_foggy_svg__WEBPACK_IMPORTED_MODULE_10__, _images_weatherCodeIcons_drizzle_svg__WEBPACK_IMPORTED_MODULE_11__, _images_weatherCodeIcons_freezingDrizzle_svg__WEBPACK_IMPORTED_MODULE_12__, _images_weatherCodeIcons_rain_svg__WEBPACK_IMPORTED_MODULE_13__, _images_weatherCodeIcons_freezingRain_svg__WEBPACK_IMPORTED_MODULE_14__, _images_weatherCodeIcons_snowfall_svg__WEBPACK_IMPORTED_MODULE_15__, _images_weatherCodeIcons_snowGrains_svg__WEBPACK_IMPORTED_MODULE_16__, _images_weatherCodeIcons_rainShowers_svg__WEBPACK_IMPORTED_MODULE_17__, _images_weatherCodeIcons_snowShowers_svg__WEBPACK_IMPORTED_MODULE_18__, _images_weatherCodeIcons_thunderStormBoth_svg__WEBPACK_IMPORTED_MODULE_19__];
const weatherIconsCropped = [_images_weatherCodeIconsCropped_clearSkyCropped_svg__WEBPACK_IMPORTED_MODULE_20__, _images_weatherCodeIconsCropped_partlyCloudyCropped_svg__WEBPACK_IMPORTED_MODULE_21__, _images_weatherCodeIconsCropped_foggyCropped_svg__WEBPACK_IMPORTED_MODULE_22__, _images_weatherCodeIconsCropped_drizzleCropped_svg__WEBPACK_IMPORTED_MODULE_23__, _images_weatherCodeIconsCropped_freezingDrizzleCropped_svg__WEBPACK_IMPORTED_MODULE_24__, _images_weatherCodeIconsCropped_rainCropped_svg__WEBPACK_IMPORTED_MODULE_25__, _images_weatherCodeIconsCropped_freezingRainCropped_svg__WEBPACK_IMPORTED_MODULE_26__, _images_weatherCodeIconsCropped_snowfallCropped_svg__WEBPACK_IMPORTED_MODULE_27__, _images_weatherCodeIconsCropped_snowGrainsCropped_svg__WEBPACK_IMPORTED_MODULE_28__, _images_weatherCodeIconsCropped_rainShowersCropped_svg__WEBPACK_IMPORTED_MODULE_29__, _images_weatherCodeIconsCropped_snowShowersCropped_svg__WEBPACK_IMPORTED_MODULE_30__, _images_weatherCodeIconsCropped_thunderStormBothCropped_svg__WEBPACK_IMPORTED_MODULE_31__];
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

  // Loading gif
  const container = document.getElementById("loadingModal");
  renderImage(container, _images_loading_gif__WEBPACK_IMPORTED_MODULE_7__);
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
function showLoadingModal() {
  const loadingModal = document.getElementById("loadingModal");
  loadingModal.classList.add("show");
}
function hideLoadingModal() {
  const loadingModal = document.getElementById("loadingModal");
  loadingModal.classList.remove("show");
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

#loadingModal {
  display: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%,-50%);
}

#loadingModal.show {
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: white;\r\n  font-family: montserrat,sans-serif;\r\n}\r\n\r\nhtml, body {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  overflow-y: hidden;\r\n  overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\nhtml {\r\n  background-color: gray;\r\n}\r\n\r\n#backgroundContainer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  height: 100vh;\r\n  width: 100vw;\r\n\r\n  background: linear-gradient(\r\n    rgba(0, 0, 0, 0.164), \r\n    rgba(0, 0, 0, 0.7)\r\n  ),\r\n  url(\"./images/weatherBackground.jpg\");\r\n  background-size: cover;\r\n  background-repeat:no-repeat;\r\n  background-position: center center;\r\n}\r\n\r\n#errorModal {\r\n  display: none;\r\n  position: absolute;\r\n  padding: 20px;\r\n  background-color: rgba(0, 0, 0, 0.568);\r\n  border-radius: 10px;\r\n\r\n  left: 50%;\r\n  top: 45%;\r\n  transform: translate(-50%,-50%);\r\n}\r\n\r\n#errorModal.show {\r\n  display: block;\r\n}\r\n\r\n#loadingModal {\r\n  display: none;\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 45%;\r\n  transform: translate(-50%,-50%);\r\n}\r\n\r\n#loadingModal.show {\r\n  display: block;\r\n}\r\n\r\n#mainContainer {\r\n  height: 90%;\r\n  width: 90%;\r\n\r\n  display: none;\r\n  gap: 10px;\r\n  grid-template: 2fr 1fr / 1fr 1fr;\r\n}\r\n\r\n#mainContainer.show {\r\n  display: grid;\r\n}\r\n\r\n/* Upper Left Display */\r\n\r\n#upperLeft {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 15px;\r\n}\r\n\r\n#mainForecast, #mainTemperature {\r\n  font-size: 3rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#mainTemperature {\r\n  font-size: 3.5rem;\r\n}\r\n\r\n#location, #date, #time {\r\n  font-size: 1.1rem;\r\n}\r\n\r\nbutton {\r\n\tbackground: none;\r\n\tcolor: inherit;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tfont: inherit;\r\n\tcursor: pointer;\r\n\toutline: inherit;\r\n}\r\n\r\n#switchTemperatureButton {\r\n  font-weight: bold;\r\n}\r\n\r\n#mainIcon {\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 10px 0px;\r\n}\r\n\r\n#searchContainer {\r\n  display: flex;\r\n  position: relative;\r\n  border-bottom: 2px solid white;\r\n  width: 200px;\r\n}\r\n\r\n#searchIconContainer {\r\n  width: 1.3rem;\r\n  position: relative;\r\n  left: 10px;\r\n}\r\n\r\ninput[type=\"text\"] {\r\n  width: 160px;\r\n  height: 1.1rem;\r\n  border: none;\r\n  background-color: transparent;\r\n  text-indent: 7px;\r\n  font-size: 0.9rem;\r\n  padding: 2px;\r\n}\r\n\r\ninput[type=\"text\"]::placeholder {\r\n  color: white;\r\n}\r\n\r\ninput[type=\"text\"]:focus {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Upper Right Display */\r\n\r\n#upperRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n}\r\n\r\n#alignRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n}\r\n\r\n.upperRightContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n}\r\n\r\n.upperRightContainer > div > p {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.iconContainer {\r\n  width: 3rem;\r\n}\r\n\r\n.upperLeftText {\r\n  font-size: 1.1rem;\r\n}\r\n\r\n/* Footer */\r\n\r\n#footer {\r\n  grid-column: 1 / 3;\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n#dailyHourlyContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\n#dailyHourlyContainer button {\r\n  padding: 6px;\r\n  border-radius: 5px;\r\n}\r\n\r\n#dailyButton.border, #hourlyButton.border {\r\n  -webkit-box-shadow:inset 0px 0px 0px 2px white;\r\n  -moz-box-shadow:inset 0px 0px 0px 2px white;\r\n  box-shadow:inset 0px 0px 0px 2px white;\r\n}\r\n\r\n.dailyForecastGrid.show, .hourlyForecastGrid.show {\r\n  display: grid;\r\n}\r\n\r\n#hoursSelectionContainer {\r\n  visibility: hidden;\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  padding-top: 4px;\r\n}\r\n\r\n#hoursSelectionContainer.show {\r\n  visibility: visible;\r\n}\r\n\r\n.arrow {\r\n  width: 37px;\r\n}\r\n\r\n.dot {\r\n  position: relative;\r\n  top: -1px;\r\n  height: 7px;\r\n  width: 7px;\r\n  border: 1px solid #f5f5f5;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n}\r\n\r\n.dot.active {\r\n  background-color: white;\r\n}\r\n\r\n.dailyForecastGrid {\r\n  display: none;\r\n  grid-template: 1fr / repeat(7, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n  gap: 20px;\r\n  overflow-x: scroll;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  height: 10px;\r\n  background-color: transparent;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background: white;\r\n  border-radius: 5px;\r\n}\r\n\r\n\r\n.dayCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#dayName, #dayMaxTemp, #dayMinTemp, #hourTemp, #hourName {\r\n  white-space: nowrap;\r\n}\r\n\r\n#dayName, #hourName {\r\n  font-size: calc(0.4rem + 1.1vw);\r\n  text-align: center;\r\n}\r\n\r\n#dayMaxTemp, #hourTemp {\r\n  font-size: 1.6rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#dayMinTemp {\r\n  font-size: 0.9rem;\r\n}\r\n\r\n#dayIcon, #hourIcon {\r\n  width: 70px;\r\n}\r\n\r\n.testBorder {\r\n  border: 1px solid white;\r\n}\r\n\r\n.hourlyForecastGrid {\r\n  display: none;\r\n  overflow-x: scroll;\r\n}\r\n\r\n.chunk {\r\n  display: none;\r\n  grid-template: 1fr / repeat(8, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n  gap: 40px;\r\n}\r\n\r\n.chunk.show {\r\n  display: grid;\r\n} \r\n\r\n.hourCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 4.5rem 1.5rem 0.9rem 85px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#hourIcon {\r\n  grid-row: 4 / 5;\r\n}\r\n\r\n#locationNotFound {\r\n  font-size: 0.8rem;\r\n  display: none;\r\n}\r\n\r\n#locationNotFound.show {\r\n  display: block;\r\n}"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "90e1ebd6bd3caf1bc4ca.svg";

/***/ }),

/***/ "./src/images/arrowRight.svg":
/*!***********************************!*\
  !*** ./src/images/arrowRight.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "30f8ac8bc3f46ff7ee89.svg";

/***/ }),

/***/ "./src/images/feelsLikeIcon.svg":
/*!**************************************!*\
  !*** ./src/images/feelsLikeIcon.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "06c7048c02992a6bac53.svg";

/***/ }),

/***/ "./src/images/humidityIcon.svg":
/*!*************************************!*\
  !*** ./src/images/humidityIcon.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ec2a8bbc33bf717b18f4.svg";

/***/ }),

/***/ "./src/images/loading.gif":
/*!********************************!*\
  !*** ./src/images/loading.gif ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "52bc6cfab43024a60767.gif";

/***/ }),

/***/ "./src/images/precipitationIcon.svg":
/*!******************************************!*\
  !*** ./src/images/precipitationIcon.svg ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3f01601ba11084c7b301.svg";

/***/ }),

/***/ "./src/images/searchIcon.svg":
/*!***********************************!*\
  !*** ./src/images/searchIcon.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7918cfb1b51e560a1c1f.svg";

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

module.exports = __webpack_require__.p + "0d0416b7ac7f60c72f3f.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/drizzleCropped.svg":
/*!***************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/drizzleCropped.svg ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7e67c813636b9a96a3d4.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/foggyCropped.svg":
/*!*************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/foggyCropped.svg ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "359f6e78037063fa6ae8.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg":
/*!***********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingDrizzleCropped.svg ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ee8f416286808086768c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/freezingRainCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/freezingRainCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "bd74e39a065403c5e87f.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg":
/*!********************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/partlyCloudyCropped.svg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e8f80a2c344cec145d9d.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainCropped.svg":
/*!************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainCropped.svg ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6c03d07cf2f1d12b2f7d.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/rainShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/rainShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cef6f6839f4109fe2bd5.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg":
/*!******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowGrainsCropped.svg ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8e0ef39671e95e39ad5c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowShowersCropped.svg":
/*!*******************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowShowersCropped.svg ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f69329c7b4f7f0233de3.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/snowfallCropped.svg":
/*!****************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/snowfallCropped.svg ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0e49e5305b17b6775ad1.svg";

/***/ }),

/***/ "./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg":
/*!************************************************************************!*\
  !*** ./src/images/weatherCodeIconsCropped/thunderStormBothCropped.svg ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a3dfc10cb21eee5f3210.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/clearSky.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/clearSky.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "de53058398764eb1489c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/drizzle.svg":
/*!*************************************************!*\
  !*** ./src/images/weatherCodeIcons/drizzle.svg ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e2036a3a3417a4548806.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/foggy.svg":
/*!***********************************************!*\
  !*** ./src/images/weatherCodeIcons/foggy.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ab06ef5db4c569db5389.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingDrizzle.svg":
/*!*********************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingDrizzle.svg ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0d989b52b4a5ad91ecfb.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/freezingRain.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/freezingRain.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3d0332e5e5875c987fbe.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/partlyCloudy.svg":
/*!******************************************************!*\
  !*** ./src/images/weatherCodeIcons/partlyCloudy.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a779a9d88dc79d13020c.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rain.svg":
/*!**********************************************!*\
  !*** ./src/images/weatherCodeIcons/rain.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a351a2aa8f85c1320e41.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/rainShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/rainShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "d3f8f6bbcd6935d940a8.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowGrains.svg":
/*!****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowGrains.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0d989b52b4a5ad91ecfb.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowShowers.svg":
/*!*****************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowShowers.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "aece7d7cb24ed5f9bcbf.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/snowfall.svg":
/*!**************************************************!*\
  !*** ./src/images/weatherCodeIcons/snowfall.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "70745aa0d851949f2303.svg";

/***/ }),

/***/ "./src/images/weatherCodeIcons/thunderStormBoth.svg":
/*!**********************************************************!*\
  !*** ./src/images/weatherCodeIcons/thunderStormBoth.svg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "065467f2e0d6fe9cc52a.svg";

/***/ }),

/***/ "./src/images/windIcon.svg":
/*!*********************************!*\
  !*** ./src/images/windIcon.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b09937da773e3bd5a35a.svg";

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

(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.showLoadingModal)();
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.renderIcons)();
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.setupListeners)();
setupSearchBarListener();
fetchDataAndRenderPage("Calgary").then(() => {
  console.log("Inital fetch and render success!");
  window.renderCelcius = renderCelcius;
  window.extractedData = extractedData;
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.removeErrorModal)();
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.hideLoadingModal)();
}).catch(error => {
  console.log(error);
  (0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.showErrorModal)();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtQ0FBbUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxRQUFRLE9BQU8sYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksY0FBYyxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFdBQVcsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxhQUFhLE1BQU0sVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sYUFBYSxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sV0FBVyxLQUFLLFlBQVksV0FBVyxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FB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QUMsQ0FBQztBQUN4QlAsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQzlCVixJQUFJLENBQUMsTUFBTTtFQUNWc0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0NBQWtDLENBQUM7RUFDL0N6QyxNQUFNLENBQUNDLGFBQWEsR0FBR0EsYUFBYTtFQUNwQ0QsTUFBTSxDQUFDRSxhQUFhLEdBQUdBLGFBQWE7RUFDcENaLDZEQUFnQixDQUFDLENBQUM7RUFDbEJNLDZEQUFnQixDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQ0R1QixLQUFLLENBQUVsUSxLQUFLLElBQUs7RUFDaEJ1UixPQUFPLENBQUNDLEdBQUcsQ0FBQ3hSLEtBQUssQ0FBQztFQUNsQm1PLDJEQUFjLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYXBpSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2RhdGVBbmRUaW1lQXV4RnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvZG9tSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2Vycm9ySGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaGFuZGxlIGZyb20gXCIuL2Vycm9ySGFuZGxlclwiO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdERhdGUsXHJcbiAgZ2V0VGltZUluVGltZXpvbmUsXHJcbiAgZm9ybWF0VGltZSxcclxuICBmb3JtYXREYXksXHJcbiAgaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgsXHJcbn0gZnJvbSBcIi4vZGF0ZUFuZFRpbWVBdXhGdW5jdGlvbnNcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uQ29vcmRpbmF0ZXMobG9jYXRpb24pIHtcclxuICAvLyBGZXRjaCBjb29yZGluYXRlc1xyXG4gIGNvbnN0IFtjb29yZGluYXRlc1Byb21zZSwgZXJyb3JdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZmV0Y2goXHJcbiAgICAgIGBodHRwczovL2dlb2NvZGluZy1hcGkub3Blbi1tZXRlby5jb20vdjEvc2VhcmNoP25hbWU9JHtsb2NhdGlvbn0mY291bnQ9MSZsYW5ndWFnZT1lbiZmb3JtYXQ9anNvbmAsXHJcbiAgICApLFxyXG4gICk7XHJcblxyXG4gIC8vIENoZWNrIGZvciB2YWxpZCByZXNwb25zZVxyXG4gIGlmIChlcnJvcilcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIGxvY2F0aW9uIGNvb3JkaW5hdGVzXCIsIGVycm9yKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvb3JkaW5hdGVzUHJvbXNlLmpzb24oKTtcclxuICBpZiAoIXJlc3BvbnNlLnJlc3VsdHMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGluIEFQSSByZXNwb25zZVwiLCByZXNwb25zZS5zdGF0dXMpO1xyXG5cclxuICAgIC8vIFJldHVybiB2YWxpZCBjb29yZGluYXRlc1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGxhdGl0dWRlLCBsb25naXR1ZGUsIHRpbWV6b25lIH0gPSByZXNwb25zZS5yZXN1bHRzWzBdO1xyXG4gICAgcmV0dXJuIHsgbmFtZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgdGltZXpvbmUgfTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkRmV0Y2hVUkwoXHJcbiAgY29vcmRpbmF0ZVByb21pc2UsXHJcbiAgY3VycmVudE9yRm9yZWNhc3QsXHJcbiAgY2VsY2l1c09yRmFocmVuaGVpdCxcclxuKSB7XHJcbiAgY29uc3QgY29vcmRpbmF0ZURhdGEgPSBhd2FpdCBjb29yZGluYXRlUHJvbWlzZTtcclxuXHJcbiAgLy8gQ3VycmVudCBkYXRhIGluIENlbGNpdXNcclxuICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MiZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfWA7XHJcblxyXG4gIC8vIEN1cnJlbnQgZGF0YSBpbiBGYWhyZW5oZWl0XHJcbiAgaWYgKGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkN1cnJlbnRcIiAmJiBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIikge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MiZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfSZ0ZW1wZXJhdHVyZV91bml0PWZhaHJlbmhlaXQmd2luZF9zcGVlZF91bml0PW1waCZwcmVjaXBpdGF0aW9uX3VuaXQ9aW5jaGA7XHJcblxyXG4gICAgLy8gRm9yZWNhc3QgZGF0YSBpbiBDZWxjaXVzXHJcbiAgfSBlbHNlIGlmIChcclxuICAgIGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkZvcmVjYXN0XCIgJiZcclxuICAgIGNlbGNpdXNPckZhaHJlbmhlaXQgPT09IFwiQ2VsY2l1c1wiXHJcbiAgKSB7XHJcbiAgICB1cmwgPSBgaHR0cHM6Ly9hcGkub3Blbi1tZXRlby5jb20vdjEvZm9yZWNhc3Q/bGF0aXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sYXRpdHVkZX0mbG9uZ2l0dWRlPSR7Y29vcmRpbmF0ZURhdGEubG9uZ2l0dWRlfSZkYWlseT13ZWF0aGVyX2NvZGUsdGVtcGVyYXR1cmVfMm1fbWF4LHRlbXBlcmF0dXJlXzJtX21pbiZmb3JlY2FzdF9kYXlzPTgmdGltZXpvbmU9JHtjb29yZGluYXRlRGF0YS50aW1lem9uZX1gO1xyXG5cclxuICAgIC8vIEZvcmVjYXN0IGRhdGEgaW4gRmFocmVuaGVpdFxyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBjdXJyZW50T3JGb3JlY2FzdCA9PT0gXCJGb3JlY2FzdFwiICYmXHJcbiAgICBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIlxyXG4gICkge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mZGFpbHk9d2VhdGhlcl9jb2RlLHRlbXBlcmF0dXJlXzJtX21heCx0ZW1wZXJhdHVyZV8ybV9taW4mZm9yZWNhc3RfZGF5cz04JnRpbWV6b25lPSR7Y29vcmRpbmF0ZURhdGEudGltZXpvbmV9JnRlbXBlcmF0dXJlX3VuaXQ9ZmFocmVuaGVpdCZ3aW5kX3NwZWVkX3VuaXQ9bXBoJnByZWNpcGl0YXRpb25fdW5pdD1pbmNoYDtcclxuICB9XHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsUHJvbWlzZSkge1xyXG4gIGNvbnN0IHVybCA9IGF3YWl0IHVybFByb21pc2U7XHJcbiAgY29uc3QgW3dlYXRoZXJEYXRhUmVzcG9uc2UsIGVycm9yXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGZldGNoKHVybCwgeyBtb2RlOiBcImNvcnNcIiB9KSxcclxuICApO1xyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3Igd2hpbGUgZmV0Y2hpbmcgd2VhdGhlciBkYXRhXCIsIGVycm9yKTtcclxuXHJcbiAgaWYgKCF3ZWF0aGVyRGF0YVJlc3BvbnNlLmVycm9yKSB7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YUpTT04gPSBhd2FpdCB3ZWF0aGVyRGF0YVJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiB3ZWF0aGVyRGF0YUpTT047XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIHdlYXRoZXIgZGF0YVwiKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pIHtcclxuICAvLyBHcmFiIGNvb3JkaW5hdGVzXHJcbiAgY29uc3QgW2Nvb3JkaW5hdGVzLCBlcnJvcl0gPSBhd2FpdCBoYW5kbGUoZ2V0TG9jYXRpb25Db29yZGluYXRlcyhsb2NhdGlvbikpO1xyXG4gIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuXHJcbiAgLy8gRG9uJ3QgbmVlZCBhZGRpdGlvbmFsIGVycm9yIGNoZWNraW5nIGZvciB0aGVzZSBhcyBhbnkgaXNzdWVzXHJcbiAgLy8gd2l0aCBjb29yZGluYXRlcyB3aWxsIGFscmVhZHkgaGF2ZSBiZWVuIGNhdWdodCByaWdodCBhYm92ZVxyXG4gIGNvbnN0IHVybDEgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkN1cnJlbnRcIiwgXCJDZWxjaXVzXCIpO1xyXG4gIGNvbnN0IHVybDIgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkN1cnJlbnRcIiwgXCJGYWhyZW5oZWl0XCIpO1xyXG4gIGNvbnN0IHVybDMgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkZvcmVjYXN0XCIsIFwiQ2VsY2l1c1wiKTtcclxuICBjb25zdCB1cmw0ID0gYnVpbGRGZXRjaFVSTChjb29yZGluYXRlcywgXCJGb3JlY2FzdFwiLCBcIkZhaHJlbmhlaXRcIik7XHJcblxyXG4gIGNvbnN0IGFsbFdlYXRoZXJEYXRhID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xyXG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsMSksXHJcbiAgICBmZXRjaEN1cnJlbnRXZWF0aGVyRGF0YSh1cmwyKSxcclxuICAgIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybDMpLFxyXG4gICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsNCksXHJcbiAgXSk7XHJcbiAgY29uc3QgbWFwcGVkV2VhdGhlckRhdGEgPSB7XHJcbiAgICBjdXJyZW50Q2VsY2l1czogW2FsbFdlYXRoZXJEYXRhWzBdLCBjb29yZGluYXRlcy5uYW1lXSxcclxuICAgIGN1cnJlbnRGYWhyZW5oZWl0OiBbYWxsV2VhdGhlckRhdGFbMV0sIGNvb3JkaW5hdGVzLm5hbWVdLFxyXG4gICAgZm9yZWNhc3RDZWxjaXVzOiBhbGxXZWF0aGVyRGF0YVsyXSxcclxuICAgIGZvcmVjYXN0RmFocmVuaGVpdDogYWxsV2VhdGhlckRhdGFbM10sXHJcbiAgfTtcclxuICByZXR1cm4gbWFwcGVkV2VhdGhlckRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlV2VhdGhlckNvZGVUb1N0cmluZyhjb2RlKSB7XHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICByZXR1cm4gXCJNYWlubHkgQ2xlYXIgU2t5XCI7XHJcbiAgICBjYXNlIDI6XHJcbiAgICAgIHJldHVybiBcIlBhcnRseSBDbG91ZHlcIjtcclxuICAgIGNhc2UgMzpcclxuICAgICAgcmV0dXJuIFwiT3ZlcmNhc3QgQ2xvdWRzXCI7XHJcbiAgICBjYXNlIDQ1OlxyXG4gICAgICByZXR1cm4gXCJOb24tRnJvemVuIEZvZ1wiO1xyXG4gICAgY2FzZSA0ODpcclxuICAgICAgcmV0dXJuIFwiRnJlZXppbmcgRm9nXCI7XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgICByZXR1cm4gXCJMaWdodCBEcml6emxlXCI7XHJcbiAgICBjYXNlIDUzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBEcml6emxlXCI7XHJcbiAgICBjYXNlIDU1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTc6XHJcbiAgICAgIHJldHVybiBcIkRlbnNlIEZyZWV6aW5nIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNjE6XHJcbiAgICAgIHJldHVybiBcIlNsaWdodCBSYWluXCI7XHJcbiAgICBjYXNlIDYzOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBSYWluXCI7XHJcbiAgICBjYXNlIDY1OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFJhaW5cIjtcclxuICAgIGNhc2UgNjY6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IEZyZWV6aW5nIFJhaW5cIjtcclxuICAgIGNhc2UgNjc6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgRnJlZXppbmcgUmFpblwiO1xyXG4gICAgY2FzZSA3MTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDczOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgU25vdyBGYWxsXCI7XHJcbiAgICBjYXNlIDc3OlxyXG4gICAgICByZXR1cm4gXCJHcmFudWxhciBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgODA6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4MTpcclxuICAgICAgcmV0dXJuIFwiTW9kZXJhdGUgUmFpbiBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDgyOlxyXG4gICAgICByZXR1cm4gXCJWaW9sZW50IFJhaW4gU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA4NTpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgU25vdyBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDg2OlxyXG4gICAgICByZXR1cm4gXCJJbnRlbnNlIFNub3cgU2hvd2Vyc1wiO1xyXG4gICAgY2FzZSA5NTpcclxuICAgICAgcmV0dXJuIFwiVGh1bmRlcnN0b3JtXCI7XHJcbiAgICBjYXNlIDk2OlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBUaHVuZGVyc3Rvcm1cIjtcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBcIlRodW5kZXJzdG9ybSBXaXRoIEhlYXZ5IEhhaWxcIjtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBcIkNsZWFyIFNreVwiO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFVwcGVyTGVmdERhdGEod2VhdGhlckRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHdlYXRoZXJEYXRhUHJvbWlzZTtcclxuICBjb25zdCBtYWluRm9yZWNhc3QgPSBwYXJzZVdlYXRoZXJDb2RlVG9TdHJpbmcoZGF0YVswXS5jdXJyZW50LndlYXRoZXJfY29kZSk7XHJcbiAgY29uc3QgdXBwZXJMZWZ0RGF0YSA9IHtcclxuICAgIG1haW5Gb3JlY2FzdCxcclxuICAgIGxvY2F0aW9uOiBkYXRhWzFdLFxyXG4gICAgZGF0ZTogZm9ybWF0RGF0ZShkYXRhWzBdLnRpbWV6b25lKSxcclxuICAgIHRpbWU6IGdldFRpbWVJblRpbWV6b25lKGRhdGFbMF0udGltZXpvbmUpLFxyXG4gICAgdGVtcGVyYXR1cmU6IGAke2RhdGFbMF0uY3VycmVudC50ZW1wZXJhdHVyZV8ybX0gJHtkYXRhWzBdLmN1cnJlbnRfdW5pdHMudGVtcGVyYXR1cmVfMm19YCxcclxuICAgIGljb25Db2RlOiBkYXRhWzBdLmN1cnJlbnQud2VhdGhlcl9jb2RlLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyTGVmdERhdGE7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RVcHBlclJpZ2h0RGF0YSh3ZWF0aGVyRGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgd2VhdGhlckRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IHVwcGVyUmlnaHREYXRhID0ge1xyXG4gICAgZmVlbHNMaWtlOiBgJHtkYXRhWzBdLmN1cnJlbnQuYXBwYXJlbnRfdGVtcGVyYXR1cmV9ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLmFwcGFyZW50X3RlbXBlcmF0dXJlfWAsXHJcbiAgICBodW1pZGl0eTogYCR7ZGF0YVswXS5jdXJyZW50LnJlbGF0aXZlX2h1bWlkaXR5XzJtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy5yZWxhdGl2ZV9odW1pZGl0eV8ybX1gLFxyXG4gICAgcHJlY2lwaXRhdGlvbjogYCR7ZGF0YVswXS5jdXJyZW50LnByZWNpcGl0YXRpb259ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLnByZWNpcGl0YXRpb259YCxcclxuICAgIHdpbmRTcGVlZDogYCR7ZGF0YVswXS5jdXJyZW50LndpbmRfc3BlZWRfMTBtfSAke2RhdGFbMF0uY3VycmVudF91bml0cy53aW5kX3NwZWVkXzEwbX1gLFxyXG4gIH07XHJcbiAgcmV0dXJuIHVwcGVyUmlnaHREYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0Rm9vdGVyZGF0YShkYWlseURhdGFQcm9taXNlLCBob3VybHlEYXRhUHJvbWlzZSkge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGF3YWl0IGRhaWx5RGF0YVByb21pc2U7XHJcbiAgY29uc3QgaG91cmx5RGF0YSA9IGF3YWl0IGhvdXJseURhdGFQcm9taXNlO1xyXG4gIC8vIEZpbGwgaW4gYW5kIHJldHVybiB0aGlzIG9iamVjdFxyXG4gIGNvbnN0IGZvb3RlckRhdGEgPSB7XHJcbiAgICBkYWlseTogW10sXHJcbiAgICBob3VybHk6IFtdLFxyXG4gIH07XHJcbiAgLy8gRmlsbCBpbiBkYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYWlseURhdGEuZGFpbHkudGVtcGVyYXR1cmVfMm1fbWF4Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBjb21waWxlZERhdGEgPSB7XHJcbiAgICAgIGRhdGU6IGZvcm1hdERheShkYWlseURhdGEuZGFpbHkudGltZVtpXSwgZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRpbWV6b25lKSxcclxuICAgICAgbWF4VGVtcDogYCR7ZGFpbHlEYXRhLmRhaWx5LnRlbXBlcmF0dXJlXzJtX21heFtpXX0gJHtkYWlseURhdGEuZGFpbHlfdW5pdHMudGVtcGVyYXR1cmVfMm1fbWF4fWAsXHJcbiAgICAgIG1pblRlbXA6IGAke2RhaWx5RGF0YS5kYWlseS50ZW1wZXJhdHVyZV8ybV9taW5baV19ICR7ZGFpbHlEYXRhLmRhaWx5X3VuaXRzLnRlbXBlcmF0dXJlXzJtX21pbn1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogZGFpbHlEYXRhLmRhaWx5LndlYXRoZXJfY29kZVtpXSxcclxuICAgIH07XHJcbiAgICBmb290ZXJEYXRhLmRhaWx5LnB1c2goY29tcGlsZWREYXRhKTtcclxuICB9XHJcbiAgLy8gVGhlIGFwaSBjYWxsIGJ5IHJldHVybnMgZGF0YSBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZGF5IGFsb25nc2lkZSB0aGUgZm9yZWNhc3RcclxuICAvLyBmb3IgdGhlIG5leHQgc2V2ZW4gZGF5cywgZ2V0IHJpZCBvZiB0aGUgZmlyc3QgZGF5IGFzIHRoYXQgZGF5cyBkYXRhIGFscmVhZHlcclxuICAvLyBleGlzdHMgd2l0aGluIHRoZSBcImN1cnJlbnRcIiBhcGkgcmVxdWVzdCBwYXlsb2FkXHJcbiAgZm9vdGVyRGF0YS5kYWlseS5zaGlmdCgpO1xyXG5cclxuICAvLyBIb3VycyBhcmUgZGlzcGxheWVkIHN0YXJ0aW5nIGFmdGVyIHRoZSBjdXJyZW50IGhvdXIuIEZpbmQgdGhhdCBob3VyXHJcbiAgLy8gc28gdGhhdCB0aGUgbmV4dCAyNCBob3VycyBhZnRlciBpdCBjYW4gYmUgZGlzcGxheWVkXHJcbiAgY29uc3QgY3VycmVudEhvdXIgPSBpc29sYXRlQ3VycmVudEhvdXJJbmRleChob3VybHlEYXRhWzBdLnRpbWV6b25lKTtcclxuICBjb25zdCB2YWxpZEN1cnJlbnRIb3VyID0gKGN1cnJlbnRIb3VyICsgMjQpICUgMjQ7XHJcblxyXG4gIC8vIEZpbGwgaW4gaG91cmx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGhvdXJJbmRleCA9ICh2YWxpZEN1cnJlbnRIb3VyICsgaSkgJSAyNDtcclxuICAgIGNvbnN0IGNvbXBpbGVkRGF0YSA9IHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShob3VybHlEYXRhWzBdLmhvdXJseS50aW1lW2hvdXJJbmRleF0pLFxyXG4gICAgICB0ZW1wZXJhdHVyZTogYCR7aG91cmx5RGF0YVswXS5ob3VybHkudGVtcGVyYXR1cmVfMm1baG91ckluZGV4XX0gJHtob3VybHlEYXRhWzBdLmhvdXJseV91bml0cy50ZW1wZXJhdHVyZV8ybX1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogaG91cmx5RGF0YVswXS5ob3VybHkud2VhdGhlcl9jb2RlW2hvdXJJbmRleF0sXHJcbiAgICB9O1xyXG4gICAgZm9vdGVyRGF0YS5ob3VybHkucHVzaChjb21waWxlZERhdGEpO1xyXG4gIH1cclxuICAvLyBUaGUgYXBpIGNhbGwgcmV0dXJucyBkYXRhIGZvciB0aGUgY3VycmVudCBob3VyLCB0aGlzIGlzIGFscmVhZHkgZGlzcGxheWVkXHJcbiAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0byBkaXNwbGF5IGl0IGJlbG93IChzYW1lIGxvZ2ljIGFzIHdpdGggdGhlIGN1cnJlbnQgZGF5KVxyXG4gIGZvb3RlckRhdGEuaG91cmx5LnNoaWZ0KCk7XHJcbiAgcmV0dXJuIGZvb3RlckRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaExvY2F0aW9uKCkge1xyXG4gIGNvbnN0IHNlYXJjaEJhcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XHJcbiAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBzZWFyY2hCYXJJbnB1dC52YWx1ZTtcclxuICAvLyBEb24ndCBzZWFyY2ggZm9yIGVtcHR5IHN0cmluZ3Mgb3IgdGhvc2UgY29udGFpbmluZyBvbmx5IHdoaXRlIHNwYWNlXHJcbiAgY29uc3Qgc3RyaW5nSXNOb3RPbmx5V2hpdGVTcGFjZSA9IGxvY2F0aW9uU3RyaW5nLnJlcGxhY2UoL1xccy9nLCBcIlwiKS5sZW5ndGg7XHJcbiAgaWYgKGxvY2F0aW9uU3RyaW5nICYmIHN0cmluZ0lzTm90T25seVdoaXRlU3BhY2UpIHtcclxuICAgIHJldHVybiBsb2NhdGlvblN0cmluZztcclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBnZXRXZWF0aGVyRGF0YSxcclxuICBleHRyYWN0VXBwZXJMZWZ0RGF0YSxcclxuICBleHRyYWN0VXBwZXJSaWdodERhdGEsXHJcbiAgZXh0cmFjdEZvb3RlcmRhdGEsXHJcbiAgc2VhcmNoTG9jYXRpb24sXHJcbn07XHJcbiIsImZ1bmN0aW9uIGZvcm1hdERhdGUodGltZVpvbmUpIHtcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgd2Vla2RheTogXCJsb25nXCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgdGltZVpvbmUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBmb3JtYXR0ZWREYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUaW1lSW5UaW1lem9uZSh0aW1lWm9uZSkge1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXHJcbiAgICB0aW1lWm9uZSxcclxuICAgIHRpbWVab25lTmFtZTogXCJzaG9ydFwiLFxyXG4gIH07XHJcbiAgY29uc3QgYWRqdXN0ZWRUaW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBhZGp1c3RlZFRpbWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xyXG4gIGNvbnN0IG1pbGl0YXJ5VGltZSA9IG5ldyBEYXRlKHRpbWUpO1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIG1pbnV0ZTogXCJudW1lcmljXCIsXHJcbiAgICBob3VyMTI6IHRydWUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gbWlsaXRhcnlUaW1lLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgcmV0dXJuIGZvcm1hdHRlZFRpbWU7XHJcbn1cclxuXHJcbi8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgc3VmZml4IGZvciB0aGUgZGF5IChlLmcuLCBcInN0XCIsIFwibmRcIiwgXCJyZFwiLCBcInRoXCIpXHJcbmZ1bmN0aW9uIGdldE51bWJlclN1ZmZpeChkYXkpIHtcclxuICBpZiAoZGF5ID49IDExICYmIGRheSA8PSAxMykge1xyXG4gICAgcmV0dXJuIFwidGhcIjtcclxuICB9XHJcbiAgc3dpdGNoIChkYXkgJSAxMCkge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICByZXR1cm4gXCJzdFwiO1xyXG4gICAgY2FzZSAyOlxyXG4gICAgICByZXR1cm4gXCJuZFwiO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICByZXR1cm4gXCJyZFwiO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIFwidGhcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERheShpbnB1dFN0cmluZywgdGltZXpvbmUpIHtcclxuICBjb25zdCBpbnB1dERhdGUgPSBuZXcgRGF0ZShgJHtpbnB1dFN0cmluZ31UMDA6MDA6MDBgKTtcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgd2Vla2RheTogXCJsb25nXCIsXHJcbiAgICB0aW1lWm9uZTogdGltZXpvbmUsXHJcbiAgfTtcclxuICBjb25zdCBmb3JtYXR0ZWREYXRlID0gaW5wdXREYXRlLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwgb3B0aW9ucyk7XHJcbiAgY29uc3QgZGF5T2ZNb250aCA9IGlucHV0RGF0ZS5nZXREYXRlKCk7XHJcbiAgY29uc3Qgc3VmZml4ID0gZ2V0TnVtYmVyU3VmZml4KGRheU9mTW9udGgpO1xyXG4gIGNvbnN0IGZvcm1hdHRlZERhdGVXaXRoVGggPSBgJHtmb3JtYXR0ZWREYXRlfSAke2RheU9mTW9udGh9JHtzdWZmaXh9YDtcclxuICByZXR1cm4gZm9ybWF0dGVkRGF0ZVdpdGhUaDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgodGltZVpvbmUpIHtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICBob3VyOiBcIm51bWVyaWNcIixcclxuICAgIHRpbWVab25lLFxyXG4gICAgaG91cjEyOiBmYWxzZSwgLy8gRW5zdXJlIDI0LWhvdXIgZm9ybWF0XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhvdXIgPSBwYXJzZUludChjdXJyZW50VGltZSwgMTApO1xyXG4gIHJldHVybiBob3VyO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGZvcm1hdERhdGUsXHJcbiAgZ2V0VGltZUluVGltZXpvbmUsXHJcbiAgZm9ybWF0VGltZSxcclxuICBmb3JtYXREYXksXHJcbiAgaXNvbGF0ZUN1cnJlbnRIb3VySW5kZXgsXHJcbn07XHJcbiIsIi8vIE90aGVyIEljb25zXHJcbmltcG9ydCBzZWFyY2hJY29uIGZyb20gXCIuL2ltYWdlcy9zZWFyY2hJY29uLnN2Z1wiO1xyXG5pbXBvcnQgZmVlbHNMaWtlSWNvbiBmcm9tIFwiLi9pbWFnZXMvZmVlbHNMaWtlSWNvbi5zdmdcIjtcclxuaW1wb3J0IGh1bWlkaXR5SWNvbiBmcm9tIFwiLi9pbWFnZXMvaHVtaWRpdHlJY29uLnN2Z1wiO1xyXG5pbXBvcnQgcHJlY2lwaXRhdGlvbkljb24gZnJvbSBcIi4vaW1hZ2VzL3ByZWNpcGl0YXRpb25JY29uLnN2Z1wiO1xyXG5pbXBvcnQgd2luZFNwZWVkSWNvbiBmcm9tIFwiLi9pbWFnZXMvd2luZEljb24uc3ZnXCI7XHJcbmltcG9ydCBsZWZ0QXJyb3dJY29uIGZyb20gXCIuL2ltYWdlcy9hcnJvd0xlZnQuc3ZnXCI7XHJcbmltcG9ydCByaWdodEFycm93SWNvbiBmcm9tIFwiLi9pbWFnZXMvYXJyb3dSaWdodC5zdmdcIjtcclxuaW1wb3J0IGxvYWRpbmdHaWYgZnJvbSBcIi4vaW1hZ2VzL2xvYWRpbmcuZ2lmXCI7XHJcblxyXG4vLyBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9jbGVhclNreS5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9wYXJ0bHlDbG91ZHkuc3ZnXCI7XHJcbmltcG9ydCBmb2dneSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mb2dneS5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGUgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZHJpenpsZS5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mcmVlemluZ0RyaXp6bGUuc3ZnXCI7XHJcbmltcG9ydCByYWluIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3JhaW4uc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW4gZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZnJlZXppbmdSYWluLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGwgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvc25vd2ZhbGwuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dHcmFpbnMuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2VycyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9yYWluU2hvd2Vycy5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dTaG93ZXJzLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aCBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy90aHVuZGVyU3Rvcm1Cb3RoLnN2Z1wiO1xyXG5cclxuLy8gQ3JvcHBlZCBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2NsZWFyU2t5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3BhcnRseUNsb3VkeUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmb2dneUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZvZ2d5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGVDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9kcml6emxlQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZyZWV6aW5nRHJpenpsZUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvcmFpbkNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW5DIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9mcmVlemluZ1JhaW5Dcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGxDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9zbm93ZmFsbENyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd0dyYWluc0Nyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2Vyc0MgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3JhaW5TaG93ZXJzQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd1Nob3dlcnNDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aEMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3RodW5kZXJTdG9ybUJvdGhDcm9wcGVkLnN2Z1wiO1xyXG5cclxuY29uc3Qgd2VhdGhlckljb25zID0gW1xyXG4gIGNsZWFyU2t5LFxyXG4gIHBhcnRseUNsb3VkeSxcclxuICBmb2dneSxcclxuICBkcml6emxlLFxyXG4gIGZyZWV6aW5nRHJpenpsZSxcclxuICByYWluLFxyXG4gIGZyZWV6aW5nUmFpbixcclxuICBzbm93ZmFsbCxcclxuICBzbm93R3JhaW5zLFxyXG4gIHJhaW5TaG93ZXJzLFxyXG4gIHNub3dTaG93ZXJzLFxyXG4gIHRodW5kZXJTdG9ybUJvdGgsXHJcbl07XHJcblxyXG5jb25zdCB3ZWF0aGVySWNvbnNDcm9wcGVkID0gW1xyXG4gIGNsZWFyU2t5QyxcclxuICBwYXJ0bHlDbG91ZHlDLFxyXG4gIGZvZ2d5QyxcclxuICBkcml6emxlQyxcclxuICBmcmVlemluZ0RyaXp6bGVDLFxyXG4gIHJhaW5DLFxyXG4gIGZyZWV6aW5nUmFpbkMsXHJcbiAgc25vd2ZhbGxDLFxyXG4gIHNub3dHcmFpbnNDLFxyXG4gIHJhaW5TaG93ZXJzQyxcclxuICBzbm93U2hvd2Vyc0MsXHJcbiAgdGh1bmRlclN0b3JtQm90aEMsXHJcbl07XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZShwYXJlbnQsIGltYWdlKSB7XHJcbiAgY29uc3QgaW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlO1xyXG4gIHBhcmVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJY29ucygpIHtcclxuICAvLyBTZWFyY2hiYXIgaWNvblxyXG4gIGNvbnN0IHNlYXJjaEljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEljb25Db250YWluZXJcIik7XHJcbiAgcmVuZGVySW1hZ2Uoc2VhcmNoSWNvbkNvbnRhaW5lciwgc2VhcmNoSWNvbik7XHJcblxyXG4gIC8vIFVwcGVyIHJpZ2h0IGljb25zXHJcbiAgY29uc3QgZmVlbHNMaWtlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVsc0xpa2VJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKGZlZWxzTGlrZUNvbnRhaW5lciwgZmVlbHNMaWtlSWNvbik7XHJcblxyXG4gIGNvbnN0IGh1bWlkaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJodW1pZGl0eUljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UoaHVtaWRpdHlDb250YWluZXIsIGh1bWlkaXR5SWNvbik7XHJcblxyXG4gIGNvbnN0IHByZWNpcGl0YXRpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWNpcGl0YXRpb25JY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKHByZWNpcGl0YXRpb25Db250YWluZXIsIHByZWNpcGl0YXRpb25JY29uKTtcclxuXHJcbiAgY29uc3Qgd2luZFNwZWVkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kU3BlZWRJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKHdpbmRTcGVlZENvbnRhaW5lciwgd2luZFNwZWVkSWNvbik7XHJcblxyXG4gIC8vIEhvdXJseSBmb3JlY2FzdCBhcnJvd3NcclxuICBjb25zdCBsZWZ0SWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdEFycm93XCIpO1xyXG4gIHJlbmRlckltYWdlKGxlZnRJY29uQ29udGFpbmVyLCBsZWZ0QXJyb3dJY29uKTtcclxuXHJcbiAgY29uc3QgcmlnaHRJY29uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodEFycm93XCIpO1xyXG4gIHJlbmRlckltYWdlKHJpZ2h0SWNvbkNvbnRhaW5lciwgcmlnaHRBcnJvd0ljb24pO1xyXG5cclxuICAvLyBMb2FkaW5nIGdpZlxyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ01vZGFsXCIpO1xyXG4gIHJlbmRlckltYWdlKGNvbnRhaW5lciwgbG9hZGluZ0dpZik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGNvZGUsIGNyb3BwZWQpIHtcclxuICBsZXQgaW1hZ2VzVG9Vc2UgPSB3ZWF0aGVySWNvbnM7XHJcbiAgaWYgKGNyb3BwZWQpIHtcclxuICAgIGltYWdlc1RvVXNlID0gd2VhdGhlckljb25zQ3JvcHBlZDtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoY29kZSkge1xyXG4gICAgY2FzZSAwOlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgICBjYXNlIDE6XHJcbiAgICBjYXNlIDI6XHJcbiAgICBjYXNlIDM6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxXTtcclxuICAgIGNhc2UgNDU6XHJcbiAgICBjYXNlIDQ4OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMl07XHJcbiAgICBjYXNlIDUxOlxyXG4gICAgY2FzZSA1MzpcclxuICAgIGNhc2UgNTU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVszXTtcclxuICAgIGNhc2UgNTY6XHJcbiAgICBjYXNlIDU3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNF07XHJcbiAgICBjYXNlIDYxOlxyXG4gICAgY2FzZSA2MzpcclxuICAgIGNhc2UgNjU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs1XTtcclxuICAgIGNhc2UgNjY6XHJcbiAgICBjYXNlIDY3OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbNl07XHJcbiAgICBjYXNlIDcxOlxyXG4gICAgY2FzZSA3MzpcclxuICAgIGNhc2UgNzU6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs3XTtcclxuICAgIGNhc2UgNzc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs4XTtcclxuICAgIGNhc2UgODA6XHJcbiAgICBjYXNlIDgxOlxyXG4gICAgY2FzZSA4MjpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzldO1xyXG4gICAgY2FzZSA4NTpcclxuICAgIGNhc2UgODY6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMF07XHJcbiAgICBjYXNlIDk1OlxyXG4gICAgY2FzZSA5NjpcclxuICAgIGNhc2UgOTk6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsxMV07XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbMF07XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb3JlY2FzdEljb25zKGljb25Db2RlcywgaG91cmx5KSB7XHJcbiAgbGV0IGNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkYXlDYXJkXCIpO1xyXG4gIGlmIChob3VybHkpIHtcclxuICAgIGNhcmRzQ29sbGVjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob3VyQ2FyZFwiKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2FyZHNDb2xsZWN0aW9uLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBkYXlJY29uQ29udGFpbmVyID1cclxuICAgICAgY2FyZHNDb2xsZWN0aW9uW2ldLmNoaWxkcmVuW2NhcmRzQ29sbGVjdGlvbltpXS5jaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuICAgIC8vIENsZWFyIHByZXZpb3VzIGljb25cclxuICAgIGRheUljb25Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHJlbmRlckltYWdlKGRheUljb25Db250YWluZXIsIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGljb25Db2Rlc1tpXSwgZmFsc2UpKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckN1cnJlbnRJY29uKGljb25Db2RlKSB7XHJcbiAgY29uc3QgbWFpbkljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5JY29uXCIpO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyBpY29uc1xyXG4gIG1haW5JY29uQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgcmVuZGVySW1hZ2UobWFpbkljb25Db250YWluZXIsIHBhcnNlV2VhdGhlckNvZGVUb0ltYWdlKGljb25Db2RlLCB0cnVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZvcmVjYXN0Q2FyZHModG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICBjb25zdCBkYWlseUZvcmVjYXN0Q2FyZHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYWlseUZvcmVjYXN0R3JpZFwiKTtcclxuICBjb25zdCBob3VybHlGb3JlY2FzdENhcmRzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5Rm9yZWNhc3RHcmlkXCIpO1xyXG4gIGNvbnN0IGRhaWx5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3Vyc1NlbGVjdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cnNTZWxlY3Rpb25Db250YWluZXJcIixcclxuICApO1xyXG5cclxuICBpZiAodG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICAgIGRhaWx5Rm9yZWNhc3RDYXJkc0dyaWQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICBob3VybHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGRhaWx5QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJib3JkZXJcIik7XHJcbiAgICBob3VybHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJzU2VsZWN0aW9uQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGFpbHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgZGFpbHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJseUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYm9yZGVyXCIpO1xyXG4gICAgaG91cnNTZWxlY3Rpb25CdXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyVXBwZXJMZWZ0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IG1haW5Gb3JlY2FzdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5Gb3JlY2FzdFwiKTtcclxuICBjb25zdCBsb2NhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xyXG4gIGNvbnN0IGRhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpO1xyXG4gIGNvbnN0IHRpbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpO1xyXG4gIGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblRlbXBlcmF0dXJlXCIpO1xyXG5cclxuICBtYWluRm9yZWNhc3RFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5tYWluRm9yZWNhc3Q7XHJcbiAgbG9jYXRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5sb2NhdGlvbjtcclxuICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZGF0ZTtcclxuICB0aW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEudGltZTtcclxuICB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnRlbXBlcmF0dXJlO1xyXG4gIHJlbmRlckN1cnJlbnRJY29uKGRhdGEuaWNvbkNvZGUpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzTGlrZVwiKTtcclxuICBjb25zdCBodW1pZGl0eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5XCIpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uXCIpO1xyXG4gIGNvbnN0IHdpbmRTcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRTcGVlZFwiKTtcclxuXHJcbiAgZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZmVlbHNMaWtlO1xyXG4gIGh1bWlkaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuaHVtaWRpdHk7XHJcbiAgcHJlY2lwaXRhdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnByZWNpcGl0YXRpb247XHJcbiAgd2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEud2luZFNwZWVkO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJGb290ZXIoZm9yZWNhc3RQcm9taXNlLCBjdXJyZW50UHJvbWlzZSkge1xyXG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UHJvbWlzZTtcclxuICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGN1cnJlbnRQcm9taXNlO1xyXG4gIGNvbnN0IGRheUNhcmRFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkYXlDYXJkXCIpO1xyXG4gIGNvbnN0IGhvdXJDYXJkRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG91ckNhcmRcIik7XHJcblxyXG4gIC8vIFJlbmRlciBmb3JlY2FzdC9kYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JlY2FzdERhdGEubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGRheUNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9IGZvcmVjYXN0RGF0YVtpXS5kYXRlO1xyXG4gICAgZGF5Q2FyZEVsZW1lbnRzW2ldLmNoaWxkcmVuWzFdLnRleHRDb250ZW50ID0gZm9yZWNhc3REYXRhW2ldLm1heFRlbXA7XHJcbiAgICBkYXlDYXJkRWxlbWVudHNbaV0uY2hpbGRyZW5bMl0udGV4dENvbnRlbnQgPSBmb3JlY2FzdERhdGFbaV0ubWluVGVtcDtcclxuICB9XHJcbiAgLy8gUmVuZGVyIGljb25zXHJcbiAgY29uc3QgZGFpbHlJY29uQ29kZXMgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcmVjYXN0RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgZGFpbHlJY29uQ29kZXMucHVzaChmb3JlY2FzdERhdGFbaV0ud2VhdGhlckNvZGUpO1xyXG4gIH1cclxuICByZW5kZXJGb3JlY2FzdEljb25zKGRhaWx5SWNvbkNvZGVzLCBmYWxzZSk7XHJcblxyXG4gIC8vIFJlbmRlciBjdXJyZW50L2hvdXJseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgaG91ckNhcmRFbGVtZW50c1tpXS5jaGlsZHJlblswXS50ZXh0Q29udGVudCA9XHJcbiAgICAgIGN1cnJlbnREYXRhW2ldLnRpbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGhvdXJDYXJkRWxlbWVudHNbaV0uY2hpbGRyZW5bMV0udGV4dENvbnRlbnQgPSBjdXJyZW50RGF0YVtpXS50ZW1wZXJhdHVyZTtcclxuICB9XHJcbiAgLy8gUmVuZGVyIGljb25zXHJcbiAgY29uc3QgaG91cmx5SWNvbkNvZGVzID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50RGF0YS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgaG91cmx5SWNvbkNvZGVzLnB1c2goY3VycmVudERhdGFbaV0ud2VhdGhlckNvZGUpO1xyXG4gIH1cclxuICByZW5kZXJGb3JlY2FzdEljb25zKGhvdXJseUljb25Db2RlcywgdHJ1ZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMoZWlnaHRIb3VyQ2h1bmtJZCkge1xyXG4gIC8vIEhpZGUgYWxsIGNodW5rc1xyXG4gIGNvbnN0IGFsbENodW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjaHVua1wiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbENodW5rcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgYWxsQ2h1bmtzW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxuICAvLyBTaG93IHNlbGVjdGVkIGNodW5rXHJcbiAgY29uc3QgY2h1bmtUb1Nob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIGBlaWdodEhvdXJDaHVuayR7ZWlnaHRIb3VyQ2h1bmtJZH1gLFxyXG4gICk7XHJcbiAgY2h1bmtUb1Nob3cuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN3aXRjaEhvdXJzKGRvdEVsZW1lbnQpIHtcclxuICAvLyBTZXQgYWN0aXZlIGRvdFxyXG4gIGNvbnN0IGFsbERvdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbERvdEVsZW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBhbGxEb3RFbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBkb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgLy8gUmVuZGVyIGNvcnJlY3QgdGhlIGNvcnJlY3QgZWlnaHQgY2FyZHNcclxuICByZW5kZXJIb3VybHlGb3JlY2FzdENhcmRzKGRvdEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ob3VyXCIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3dpdGNoSG91clVzaW5nQXJyb3cocmlnaHRBcnJvdykge1xyXG4gIGNvbnN0IGN1cnJlbnRseUFjdGl2ZURvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG90LmFjdGl2ZVwiKTtcclxuXHJcbiAgLy8gSWYgdGhlIHJpZ2h0IGFycm93IGlzIGNsaWNrZWQsIG1vdmUgdGhlIGN1cnJlbnQgZG90IHRvIHRoZSByaWdodCwgbG9vcGluZ1xyXG4gIC8vIGFyb3VuZCBpZiB0aGUgYWN0aXZlIGRvdCBpcyB0aGUgcmlnaHRtb3N0IGRvdCwgaWYgdGhlIGxlZnQgYXJyb3cgaXMgY2xpY2tlZFxyXG4gIC8vIG1vdmUgdGhlIGN1cnJlbnQgZG90IHRvIHRoZSBsZWZ0LCBsb29waW5nIGFyb3VuZCBpZiB0aGUgYWN0aXZlIGRvdCBpc1xyXG4gIC8vIHRoZSBsZWZ0bW9zdCBkb3RcclxuICBjb25zdCBjdXJyZW50bHlBY3RpdmVEb3RJZCA9IGN1cnJlbnRseUFjdGl2ZURvdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhvdXJcIik7XHJcbiAgLy8gY2FsY3VsYXRlIGNvcnJlY3QgbmV3IGRvdCBpZFxyXG4gIGNvbnN0IG5leHREb3RJZCA9XHJcbiAgICAocGFyc2VJbnQoY3VycmVudGx5QWN0aXZlRG90SWQsIDEwKSArIChyaWdodEFycm93ID8gMSA6IDIpKSAlIDM7XHJcbiAgY29uc3QgZG90VG9BY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZG90W2RhdGEtaG91cj1cIiR7bmV4dERvdElkfVwiXWApO1xyXG4gIHN3aXRjaEhvdXJzKGRvdFRvQWN0aXZlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0Vycm9yTW9kYWwoKSB7XHJcbiAgY29uc3QgZXJyb3JNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyb3JNb2RhbFwiKTtcclxuICBlcnJvck1vZGFsLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVFcnJvck1vZGFsKCkge1xyXG4gIGNvbnN0IGVycm9yTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTW9kYWxcIik7XHJcbiAgZXJyb3JNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0ludmFsaWRJbnB1dE1vZGFsKCkge1xyXG4gIGNvbnN0IGludmFsaWRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYXRpb25Ob3RGb3VuZFwiKTtcclxuICBpbnZhbGlkSW5wdXQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVJbnZhbGlkSW5wdXRNb2RhbCgpIHtcclxuICBjb25zdCBpbnZhbGlkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uTm90Rm91bmRcIik7XHJcbiAgaW52YWxpZElucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TG9hZGluZ01vZGFsKCkge1xyXG4gIGNvbnN0IGxvYWRpbmdNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9hZGluZ01vZGFsXCIpO1xyXG4gIGxvYWRpbmdNb2RhbC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUxvYWRpbmdNb2RhbCgpIHtcclxuICBjb25zdCBsb2FkaW5nTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmdNb2RhbFwiKTtcclxuICBsb2FkaW5nTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclBhZ2UodXBwZXJMZWZ0RGF0YSwgdXBwZXJSaWdodERhdGEsIGZvb3RlckRhdGEpIHtcclxuICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluQ29udGFpbmVyXCIpO1xyXG4gIGlmICh1cHBlckxlZnREYXRhICYmIHVwcGVyUmlnaHREYXRhICYmIGZvb3RlckRhdGEpIHtcclxuICAgIHJlbmRlclVwcGVyTGVmdENvcm5lcih1cHBlckxlZnREYXRhKTtcclxuICAgIHJlbmRlclVwcGVyUmlnaHRDb3JuZXIodXBwZXJSaWdodERhdGEpO1xyXG4gICAgcmVuZGVyRm9vdGVyKGZvb3RlckRhdGEuZGFpbHksIGZvb3RlckRhdGEuaG91cmx5KTtcclxuICAgIC8vIEhpZGUgdGhlIHBhZ2UgYnV0IHRoZSBiYWNrZ3JvdW5kIHVudGlsIHRoZSBmZXRjaGVkIGFwaSBkYXRhIGxvYWRzLCBpZiB0aGVcclxuICAgIC8vIGZldGNoIGNhbGwgZmFpbHMsIHRoZW4gc2hvdyBhbiBlcnJvciBtZXNzYWdlXHJcbiAgICBtYWluQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtYWluQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgc2hvd0Vycm9yTW9kYWwoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN3aXRjaFRlbXBlcmF0dXJlVW5pdCgpIHtcclxuICAvLyBUb2dnbGUgYmV0d2VlbiBDZWxzaXVzIGFuZCBGYWhyZW5oZWl0XHJcbiAgd2luZG93LnJlbmRlckNlbGNpdXMgPSAhd2luZG93LnJlbmRlckNlbGNpdXM7XHJcblxyXG4gIC8vIEdldCB0aGUgYXBwcm9wcmlhdGUgZGF0YSBiYXNlZCBvbiB0aGUgdGVtcGVyYXR1cmUgdW5pdFxyXG4gIGNvbnN0IHVwcGVyTGVmdERhdGEgPSB3aW5kb3cucmVuZGVyQ2VsY2l1c1xyXG4gICAgPyB3aW5kb3cuZXh0cmFjdGVkRGF0YS51cHBlckxlZnREYXRhQ2VsY2l1c1xyXG4gICAgOiB3aW5kb3cuZXh0cmFjdGVkRGF0YS51cHBlckxlZnREYXRhRmFocmVuaGVpdDtcclxuXHJcbiAgY29uc3QgdXBwZXJSaWdodERhdGEgPSB3aW5kb3cucmVuZGVyQ2VsY2l1c1xyXG4gICAgPyB3aW5kb3cuZXh0cmFjdGVkRGF0YS51cHBlclJpZ2h0RGF0YUNlbGNpdXNcclxuICAgIDogd2luZG93LmV4dHJhY3RlZERhdGEudXBwZXJSaWdodERhdGFGYWhyZW5oZWl0O1xyXG5cclxuICBjb25zdCBmb290ZXJEYXRhID0gd2luZG93LnJlbmRlckNlbGNpdXNcclxuICAgID8gd2luZG93LmV4dHJhY3RlZERhdGEuZm9vdGVyRGF0YUNlbGNpdXNcclxuICAgIDogd2luZG93LmV4dHJhY3RlZERhdGEuZm9vdGVyRGF0YUZhaHJlbmhlaXQ7XHJcblxyXG4gIC8vIENhbGwgcmVuZGVyUGFnZSB3aXRoIHRoZSB1cGRhdGVkIGRhdGFcclxuICByZW5kZXJQYWdlKHVwcGVyTGVmdERhdGEsIHVwcGVyUmlnaHREYXRhLCBmb290ZXJEYXRhKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoKSB7XHJcbiAgY29uc3QgZGFpbHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHlCdXR0b25cIik7XHJcbiAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdG9nZ2xlRm9yZWNhc3RDYXJkcyhmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhvdXJseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHlCdXR0b25cIik7XHJcbiAgaG91cmx5Rm9yZWNhc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHRvZ2dsZUZvcmVjYXN0Q2FyZHModHJ1ZSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFRoZSBkYWlseSBmb3JlY2FzdCBzaG93cyB0aGUgbmV4dCAyNCBob3VycyBhZnRlciB0aGUgY3VycmVudCBob3VyLFxyXG4gIC8vIFRoZXNlIGFyZSBzaG93biBpbiBjaHVua3Mgb2YgOCBob3VycyBlYWNoXHJcbiAgY29uc3Qgc3dpdGNoSG91cnNEb3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvdFwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXRjaEhvdXJzRG90cy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgc3dpdGNoSG91cnNEb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PlxyXG4gICAgICBzd2l0Y2hIb3Vycyhzd2l0Y2hIb3Vyc0RvdHNbaV0pLFxyXG4gICAgKTtcclxuICB9XHJcbiAgY29uc3Qgc3dpdGNoSG91cnNBcnJvd0xlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRBcnJvd1wiKTtcclxuICBjb25zdCBzd2l0Y2hIb3Vyc0Fycm93UmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0QXJyb3dcIik7XHJcbiAgc3dpdGNoSG91cnNBcnJvd0xlZnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XHJcbiAgICBzd2l0Y2hIb3VyVXNpbmdBcnJvdyhmYWxzZSksXHJcbiAgKTtcclxuICBzd2l0Y2hIb3Vyc0Fycm93UmlnaHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+XHJcbiAgICBzd2l0Y2hIb3VyVXNpbmdBcnJvdyh0cnVlKSxcclxuICApO1xyXG5cclxuICBjb25zdCBzd2l0Y2hDZWxjaXVzRmFocmVuaGVpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvblwiLFxyXG4gICk7XHJcbiAgc3dpdGNoQ2VsY2l1c0ZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHN3aXRjaFRlbXBlcmF0dXJlVW5pdCgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIHJlbmRlckljb25zLFxyXG4gIHNldHVwTGlzdGVuZXJzLFxyXG4gIHJlbmRlclBhZ2UsXHJcbiAgc2hvd0Vycm9yTW9kYWwsXHJcbiAgcmVtb3ZlRXJyb3JNb2RhbCxcclxuICBzaG93SW52YWxpZElucHV0TW9kYWwsXHJcbiAgaGlkZUludmFsaWRJbnB1dE1vZGFsLFxyXG4gIHNob3dMb2FkaW5nTW9kYWwsXHJcbiAgaGlkZUxvYWRpbmdNb2RhbCxcclxufTtcclxuIiwiZnVuY3Rpb24gaGFuZGxlKHByb21pc2UpIHtcclxuICByZXR1cm4gcHJvbWlzZVxyXG4gICAgLnRoZW4oKGRhdGEpID0+IFtkYXRhLCB1bmRlZmluZWRdKVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4gUHJvbWlzZS5yZXNvbHZlKFt1bmRlZmluZWQsIGVycm9yXSkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGU7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBmb250LWZhbWlseTogbW9udHNlcnJhdCxzYW5zLXNlcmlmO1xyXG59XHJcblxyXG5odG1sLCBib2R5IHtcclxuICBoZWlnaHQ6IDEwMHZoO1xyXG4gIHdpZHRoOiAxMDB2dztcclxuICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbmh0bWwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XHJcbn1cclxuXHJcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgei1pbmRleDogLTE7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdnc7XHJcblxyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcclxuICAgIHJnYmEoMCwgMCwgMCwgMC43KVxyXG4gICksXHJcbiAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbn1cclxuXHJcbiNlcnJvck1vZGFsIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NjgpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblxyXG4gIGxlZnQ6IDUwJTtcclxuICB0b3A6IDQ1JTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLC01MCUpO1xyXG59XHJcblxyXG4jZXJyb3JNb2RhbC5zaG93IHtcclxuICBkaXNwbGF5OiBibG9jaztcclxufVxyXG5cclxuI2xvYWRpbmdNb2RhbCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRvcDogNDUlO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XHJcbn1cclxuXHJcbiNsb2FkaW5nTW9kYWwuc2hvdyB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbiNtYWluQ29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDkwJTtcclxuICB3aWR0aDogOTAlO1xyXG5cclxuICBkaXNwbGF5OiBub25lO1xyXG4gIGdhcDogMTBweDtcclxuICBncmlkLXRlbXBsYXRlOiAyZnIgMWZyIC8gMWZyIDFmcjtcclxufVxyXG5cclxuI21haW5Db250YWluZXIuc2hvdyB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxufVxyXG5cclxuLyogVXBwZXIgTGVmdCBEaXNwbGF5ICovXHJcblxyXG4jdXBwZXJMZWZ0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcblxyXG4jbWFpbkZvcmVjYXN0LCAjbWFpblRlbXBlcmF0dXJlIHtcclxuICBmb250LXNpemU6IDNyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNtYWluVGVtcGVyYXR1cmUge1xyXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xyXG59XHJcblxyXG4jbG9jYXRpb24sICNkYXRlLCAjdGltZSB7XHJcbiAgZm9udC1zaXplOiAxLjFyZW07XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcblx0YmFja2dyb3VuZDogbm9uZTtcclxuXHRjb2xvcjogaW5oZXJpdDtcclxuXHRib3JkZXI6IG5vbmU7XHJcblx0cGFkZGluZzogMDtcclxuXHRmb250OiBpbmhlcml0O1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHRvdXRsaW5lOiBpbmhlcml0O1xyXG59XHJcblxyXG4jc3dpdGNoVGVtcGVyYXR1cmVCdXR0b24ge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4jbWFpbkljb24ge1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGhlaWdodDogNjBweDtcclxuICBwYWRkaW5nOiAxMHB4IDBweDtcclxufVxyXG5cclxuI3NlYXJjaENvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xyXG4gIHdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuI3NlYXJjaEljb25Db250YWluZXIge1xyXG4gIHdpZHRoOiAxLjNyZW07XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdIHtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxLjFyZW07XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIHRleHQtaW5kZW50OiA3cHg7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbiAgcGFkZGluZzogMnB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwidGV4dFwiXTo6cGxhY2Vob2xkZXIge1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl06Zm9jdXMge1xyXG4gIG91dGxpbmUtd2lkdGg6IDA7XHJcbn1cclxuXHJcbi8qIFVwcGVyIFJpZ2h0IERpc3BsYXkgKi9cclxuXHJcbiN1cHBlclJpZ2h0IHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG59XHJcblxyXG4jYWxpZ25SaWdodCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMzBweDtcclxufVxyXG5cclxuLnVwcGVyUmlnaHRDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG59XHJcblxyXG4udXBwZXJSaWdodENvbnRhaW5lciA+IGRpdiA+IHAge1xyXG4gIG1hcmdpbi1ib3R0b206IDVweDtcclxufVxyXG5cclxuLmljb25Db250YWluZXIge1xyXG4gIHdpZHRoOiAzcmVtO1xyXG59XHJcblxyXG4udXBwZXJMZWZ0VGV4dCB7XHJcbiAgZm9udC1zaXplOiAxLjFyZW07XHJcbn1cclxuXHJcbi8qIEZvb3RlciAqL1xyXG5cclxuI2Zvb3RlciB7XHJcbiAgZ3JpZC1jb2x1bW46IDEgLyAzO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDEwcHg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuXHJcbiNkYWlseUhvdXJseUNvbnRhaW5lciBidXR0b24ge1xyXG4gIHBhZGRpbmc6IDZweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbiNkYWlseUJ1dHRvbi5ib3JkZXIsICNob3VybHlCdXR0b24uYm9yZGVyIHtcclxuICAtd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xyXG4gIC1tb3otYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XHJcbiAgYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XHJcbn1cclxuXHJcbi5kYWlseUZvcmVjYXN0R3JpZC5zaG93LCAuaG91cmx5Rm9yZWNhc3RHcmlkLnNob3cge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbn1cclxuXHJcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lciB7XHJcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZy10b3A6IDRweDtcclxufVxyXG5cclxuI2hvdXJzU2VsZWN0aW9uQ29udGFpbmVyLnNob3cge1xyXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbn1cclxuXHJcbi5hcnJvdyB7XHJcbiAgd2lkdGg6IDM3cHg7XHJcbn1cclxuXHJcbi5kb3Qge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB0b3A6IC0xcHg7XHJcbiAgaGVpZ2h0OiA3cHg7XHJcbiAgd2lkdGg6IDdweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZjVmNWY1O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kb3QuYWN0aXZlIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmRhaWx5Rm9yZWNhc3RHcmlkIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIGdyaWQtdGVtcGxhdGU6IDFmciAvIHJlcGVhdCg3LCAxZnIpO1xyXG4gIGZsZXg6IDE7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxuICBnYXA6IDIwcHg7XHJcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxufVxyXG5cclxuXHJcbi5kYXlDYXJkIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlOiA0LjVyZW0gMS41cmVtIDAuOXJlbSA4NXB4IC8gMWZyO1xyXG4gIGdhcDogNXB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4jZGF5TmFtZSwgI2RheU1heFRlbXAsICNkYXlNaW5UZW1wLCAjaG91clRlbXAsICNob3VyTmFtZSB7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxufVxyXG5cclxuI2RheU5hbWUsICNob3VyTmFtZSB7XHJcbiAgZm9udC1zaXplOiBjYWxjKDAuNHJlbSArIDEuMXZ3KTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNkYXlNYXhUZW1wLCAjaG91clRlbXAge1xyXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4jZGF5TWluVGVtcCB7XHJcbiAgZm9udC1zaXplOiAwLjlyZW07XHJcbn1cclxuXHJcbiNkYXlJY29uLCAjaG91ckljb24ge1xyXG4gIHdpZHRoOiA3MHB4O1xyXG59XHJcblxyXG4udGVzdEJvcmRlciB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbn1cclxuXHJcbi5ob3VybHlGb3JlY2FzdEdyaWQge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xyXG59XHJcblxyXG4uY2h1bmsge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gcmVwZWF0KDgsIDFmcik7XHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tdG9wOiAzMHB4O1xyXG4gIGdhcDogNDBweDtcclxufVxyXG5cclxuLmNodW5rLnNob3cge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbn0gXHJcblxyXG4uaG91ckNhcmQge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6IDQuNXJlbSAxLjVyZW0gMC45cmVtIDg1cHggLyAxZnI7XHJcbiAgZ2FwOiA1cHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNob3VySWNvbiB7XHJcbiAgZ3JpZC1yb3c6IDQgLyA1O1xyXG59XHJcblxyXG4jbG9jYXRpb25Ob3RGb3VuZCB7XHJcbiAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuI2xvY2F0aW9uTm90Rm91bmQuc2hvdyB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLFlBQVk7RUFDWixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixZQUFZOztFQUVaOzs7O3lDQUlxQztFQUNyQyxzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQkFBbUI7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QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsUUFBUTtFQUNSLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGNBQWM7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IG1vbnRzZXJyYXQsc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCwgYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxyXFxufVxcclxcblxcclxcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGxlZnQ6IDA7XFxyXFxuICB6LWluZGV4OiAtMTtcXHJcXG4gIGhlaWdodDogMTAwdmg7XFxyXFxuICB3aWR0aDogMTAwdnc7XFxyXFxuXFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXFxyXFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcXHJcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjcpXFxyXFxuICApLFxcclxcbiAgdXJsKFxcXCIuL2ltYWdlcy93ZWF0aGVyQmFja2dyb3VuZC5qcGdcXFwiKTtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jZXJyb3JNb2RhbCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41NjgpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG5cXHJcXG4gIGxlZnQ6IDUwJTtcXHJcXG4gIHRvcDogNDUlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwtNTAlKTtcXHJcXG59XFxyXFxuXFxyXFxuI2Vycm9yTW9kYWwuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuI2xvYWRpbmdNb2RhbCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogNTAlO1xcclxcbiAgdG9wOiA0NSU7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLC01MCUpO1xcclxcbn1cXHJcXG5cXHJcXG4jbG9hZGluZ01vZGFsLnNob3cge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbiNtYWluQ29udGFpbmVyIHtcXHJcXG4gIGhlaWdodDogOTAlO1xcclxcbiAgd2lkdGg6IDkwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICBncmlkLXRlbXBsYXRlOiAyZnIgMWZyIC8gMWZyIDFmcjtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5Db250YWluZXIuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBVcHBlciBMZWZ0IERpc3BsYXkgKi9cXHJcXG5cXHJcXG4jdXBwZXJMZWZ0IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkZvcmVjYXN0LCAjbWFpblRlbXBlcmF0dXJlIHtcXHJcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpblRlbXBlcmF0dXJlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jbG9jYXRpb24sICNkYXRlLCAjdGltZSB7XFxyXFxuICBmb250LXNpemU6IDEuMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcclxcblxcdGNvbG9yOiBpbmhlcml0O1xcclxcblxcdGJvcmRlcjogbm9uZTtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcclxcblxcdG91dGxpbmU6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbiNzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvbiB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5JY29uIHtcXHJcXG4gIHdpZHRoOiA2MHB4O1xcclxcbiAgaGVpZ2h0OiA2MHB4O1xcclxcbiAgcGFkZGluZzogMTBweCAwcHg7XFxyXFxufVxcclxcblxcclxcbiNzZWFyY2hDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIHdpZHRoOiAyMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaEljb25Db250YWluZXIge1xcclxcbiAgd2lkdGg6IDEuM3JlbTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGxlZnQ6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxyXFxuICB3aWR0aDogMTYwcHg7XFxyXFxuICBoZWlnaHQ6IDEuMXJlbTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgdGV4dC1pbmRlbnQ6IDdweDtcXHJcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcclxcbiAgcGFkZGluZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl06OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzIHtcXHJcXG4gIG91dGxpbmUtd2lkdGg6IDA7XFxyXFxufVxcclxcblxcclxcbi8qIFVwcGVyIFJpZ2h0IERpc3BsYXkgKi9cXHJcXG5cXHJcXG4jdXBwZXJSaWdodCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXHJcXG59XFxyXFxuXFxyXFxuI2FsaWduUmlnaHQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi51cHBlclJpZ2h0Q29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi51cHBlclJpZ2h0Q29udGFpbmVyID4gZGl2ID4gcCB7XFxyXFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5pY29uQ29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udXBwZXJMZWZ0VGV4dCB7XFxyXFxuICBmb250LXNpemU6IDEuMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLyogRm9vdGVyICovXFxyXFxuXFxyXFxuI2Zvb3RlciB7XFxyXFxuICBncmlkLWNvbHVtbjogMSAvIDM7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5SG91cmx5Q29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlIb3VybHlDb250YWluZXIgYnV0dG9uIHtcXHJcXG4gIHBhZGRpbmc6IDZweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5QnV0dG9uLmJvcmRlciwgI2hvdXJseUJ1dHRvbi5ib3JkZXIge1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzppbnNldCAwcHggMHB4IDBweCAycHggd2hpdGU7XFxyXFxuICBib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmRhaWx5Rm9yZWNhc3RHcmlkLnNob3csIC5ob3VybHlGb3JlY2FzdEdyaWQuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbn1cXHJcXG5cXHJcXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIge1xcclxcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwYWRkaW5nLXRvcDogNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIuc2hvdyB7XFxyXFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcclxcbn1cXHJcXG5cXHJcXG4uYXJyb3cge1xcclxcbiAgd2lkdGg6IDM3cHg7XFxyXFxufVxcclxcblxcclxcbi5kb3Qge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdG9wOiAtMXB4O1xcclxcbiAgaGVpZ2h0OiA3cHg7XFxyXFxuICB3aWR0aDogN3B4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y1ZjVmNTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRvdC5hY3RpdmUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5kYWlseUZvcmVjYXN0R3JpZCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gcmVwZWF0KDcsIDFmcik7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIGdhcDogMjBweDtcXHJcXG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcXHJcXG59XFxyXFxuXFxyXFxuOjotd2Via2l0LXNjcm9sbGJhciB7XFxyXFxuICBoZWlnaHQ6IDEwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXHJcXG59XFxyXFxuXFxyXFxuOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7XFxyXFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLmRheUNhcmQge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDQuNXJlbSAxLjVyZW0gMC45cmVtIDg1cHggLyAxZnI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbiNkYXlOYW1lLCAjZGF5TWF4VGVtcCwgI2RheU1pblRlbXAsICNob3VyVGVtcCwgI2hvdXJOYW1lIHtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxufVxcclxcblxcclxcbiNkYXlOYW1lLCAjaG91ck5hbWUge1xcclxcbiAgZm9udC1zaXplOiBjYWxjKDAuNHJlbSArIDEuMXZ3KTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI2RheU1heFRlbXAsICNob3VyVGVtcCB7XFxyXFxuICBmb250LXNpemU6IDEuNnJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5TWluVGVtcCB7XFxyXFxuICBmb250LXNpemU6IDAuOXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuI2RheUljb24sICNob3VySWNvbiB7XFxyXFxuICB3aWR0aDogNzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRlc3RCb3JkZXIge1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5ob3VybHlGb3JlY2FzdEdyaWQge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcXHJcXG59XFxyXFxuXFxyXFxuLmNodW5rIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgZ2FwOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2h1bmsuc2hvdyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbn0gXFxyXFxuXFxyXFxuLmhvdXJDYXJkIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlOiA0LjVyZW0gMS41cmVtIDAuOXJlbSA4NXB4IC8gMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jaG91ckljb24ge1xcclxcbiAgZ3JpZC1yb3c6IDQgLyA1O1xcclxcbn1cXHJcXG5cXHJcXG4jbG9jYXRpb25Ob3RGb3VuZCB7XFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNsb2NhdGlvbk5vdEZvdW5kLnNob3cge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQge1xyXG4gIGdldFdlYXRoZXJEYXRhLFxyXG4gIGV4dHJhY3RVcHBlckxlZnREYXRhLFxyXG4gIGV4dHJhY3RVcHBlclJpZ2h0RGF0YSxcclxuICBleHRyYWN0Rm9vdGVyZGF0YSxcclxuICBzZWFyY2hMb2NhdGlvbixcclxufSBmcm9tIFwiLi9hcGlIYW5kbGVyXCI7XHJcbmltcG9ydCB7XHJcbiAgcmVuZGVySWNvbnMsXHJcbiAgc2V0dXBMaXN0ZW5lcnMsXHJcbiAgcmVuZGVyUGFnZSxcclxuICBzaG93RXJyb3JNb2RhbCxcclxuICByZW1vdmVFcnJvck1vZGFsLFxyXG4gIHNob3dJbnZhbGlkSW5wdXRNb2RhbCxcclxuICBoaWRlSW52YWxpZElucHV0TW9kYWwsXHJcbiAgc2hvd0xvYWRpbmdNb2RhbCxcclxuICBoaWRlTG9hZGluZ01vZGFsLFxyXG59IGZyb20gXCIuL2RvbUhhbmRsZXJcIjtcclxuaW1wb3J0IGhhbmRsZSBmcm9tIFwiLi9lcnJvckhhbmRsZXJcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3REYXRhKGRhdGEpIHtcclxuICAvLyBFeHRyYWN0IGJvdGggdGhlIENlbGVjaXVzIGFuZCBGYWhyZW5oZWl0IGRhdGEgb25seSBvbmNlLCB0aGVuIGp1c3RcclxuICAvLyBkaXNwbGF5L3JlcmVkZW5kZXIgdGhlIGRlc2lyZWQgdGVtcGVyYXR1cmUgdmFsdWUgaW4gZG9tSGFuZGxlclxyXG4gIGNvbnN0IFt1cHBlckxlZnREYXRhQ2VsY2l1cywgZXJyb3IxXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGV4dHJhY3RVcHBlckxlZnREYXRhKGRhdGEuY3VycmVudENlbGNpdXMpLFxyXG4gICk7XHJcbiAgY29uc3QgW3VwcGVyUmlnaHREYXRhQ2VsY2l1cywgZXJyb3IyXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGV4dHJhY3RVcHBlclJpZ2h0RGF0YShkYXRhLmN1cnJlbnRDZWxjaXVzKSxcclxuICApO1xyXG4gIGNvbnN0IFtmb290ZXJEYXRhQ2VsY2l1cywgZXJyb3IzXSA9IGF3YWl0IGhhbmRsZShcclxuICAgIGV4dHJhY3RGb290ZXJkYXRhKGRhdGEuZm9yZWNhc3RDZWxjaXVzLCBkYXRhLmN1cnJlbnRDZWxjaXVzKSxcclxuICApO1xyXG5cclxuICBjb25zdCBbdXBwZXJMZWZ0RGF0YUZhaHJlbmhlaXQsIGVycm9yNF0gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0VXBwZXJMZWZ0RGF0YShkYXRhLmN1cnJlbnRGYWhyZW5oZWl0KSxcclxuICApO1xyXG4gIGNvbnN0IFt1cHBlclJpZ2h0RGF0YUZhaHJlbmhlaXQsIGVycm9yNV0gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0VXBwZXJSaWdodERhdGEoZGF0YS5jdXJyZW50RmFocmVuaGVpdCksXHJcbiAgKTtcclxuICBjb25zdCBbZm9vdGVyRGF0YUZhaHJlbmhlaXQsIGVycm9yNl0gPSBhd2FpdCBoYW5kbGUoXHJcbiAgICBleHRyYWN0Rm9vdGVyZGF0YShkYXRhLmZvcmVjYXN0RmFocmVuaGVpdCwgZGF0YS5jdXJyZW50RmFocmVuaGVpdCksXHJcbiAgKTtcclxuXHJcbiAgaWYgKGVycm9yMSB8fCBlcnJvcjIgfHwgZXJyb3IzIHx8IGVycm9yNCB8fCBlcnJvcjUgfHwgZXJyb3I2KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBleHRyYWN0aW5nIHdlYXRoZXIgZGF0YVwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB1cHBlckxlZnREYXRhQ2VsY2l1cyxcclxuICAgIHVwcGVyUmlnaHREYXRhQ2VsY2l1cyxcclxuICAgIGZvb3RlckRhdGFDZWxjaXVzLFxyXG4gICAgdXBwZXJMZWZ0RGF0YUZhaHJlbmhlaXQsXHJcbiAgICB1cHBlclJpZ2h0RGF0YUZhaHJlbmhlaXQsXHJcbiAgICBmb290ZXJEYXRhRmFocmVuaGVpdCxcclxuICB9O1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJDZWxjaXVzID0gdHJ1ZTtcclxubGV0IGV4dHJhY3RlZERhdGE7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaERhdGFBbmRSZW5kZXJQYWdlKGxvY2F0aW9uKSB7XHJcbiAgLy8gRmV0Y2ggZGF0YVxyXG4gIGNvbnN0IFtmZXRjaGVkRGF0YSwgZmV0Y2hpbmdFcnJvcl0gPSBhd2FpdCBoYW5kbGUoZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pKTtcclxuICBpZiAoZmV0Y2hpbmdFcnJvcikgdGhyb3cgbmV3IEVycm9yKGZldGNoaW5nRXJyb3IpO1xyXG5cclxuICAvLyBFeHRyYWN0IGRhdGFcclxuICBjb25zdCBbZXh0cmFjdGVkRGF0YUxvY2FsLCBleHRyYWN0aW5nRXJyb3JdID0gYXdhaXQgaGFuZGxlKFxyXG4gICAgZXh0cmFjdERhdGEoZmV0Y2hlZERhdGEpLFxyXG4gICk7XHJcbiAgaWYgKGV4dHJhY3RpbmdFcnJvcikgdGhyb3cgbmV3IEVycm9yKGV4dHJhY3RpbmdFcnJvcik7XHJcbiAgZXh0cmFjdGVkRGF0YSA9IGV4dHJhY3RlZERhdGFMb2NhbDtcclxuXHJcbiAgLy8gUmVuZGVyIGRhdGFcclxuICByZW5kZXJQYWdlKFxyXG4gICAgZXh0cmFjdGVkRGF0YS51cHBlckxlZnREYXRhQ2VsY2l1cyxcclxuICAgIGV4dHJhY3RlZERhdGEudXBwZXJSaWdodERhdGFDZWxjaXVzLFxyXG4gICAgZXh0cmFjdGVkRGF0YS5mb290ZXJEYXRhQ2VsY2l1cyxcclxuICApO1xyXG4gIHJldHVybiBcIkZldGNoIGFuZCByZW5kZXIgc3VjY2VzcyFcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJTZWFyY2hCYXIoKSB7XHJcbiAgY29uc3Qgc2VhcmNoQmFySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJhclwiKTtcclxuICBzZWFyY2hCYXJJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4ZWN1dGVTZWFyY2gobG9jYXRpb25TdHJpbmcpIHtcclxuICBmZXRjaERhdGFBbmRSZW5kZXJQYWdlKGxvY2F0aW9uU3RyaW5nKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVuZGVyQ2VsY2l1cyA9IHJlbmRlckNlbGNpdXM7XHJcbiAgICAgIHdpbmRvdy5leHRyYWN0ZWREYXRhID0gZXh0cmFjdGVkRGF0YTtcclxuICAgICAgaGlkZUludmFsaWRJbnB1dE1vZGFsKCk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgc2hvd0ludmFsaWRJbnB1dE1vZGFsKCk7XHJcbiAgICB9KTtcclxuICBjbGVhclNlYXJjaEJhcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXR1cFNlYXJjaEJhckxpc3RlbmVyKCkge1xyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaENvbnRhaW5lclwiKTtcclxuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSBzZWFyY2hMb2NhdGlvbigpO1xyXG4gICAgaWYgKGxvY2F0aW9uU3RyaW5nKSB7XHJcbiAgICAgIGV4ZWN1dGVTZWFyY2gobG9jYXRpb25TdHJpbmcpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzZWFyY2hCYXJTdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEljb25Db250YWluZXJcIik7XHJcbiAgc2VhcmNoQmFyU3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBsb2NhdGlvblN0cmluZyA9IHNlYXJjaExvY2F0aW9uKCk7XHJcbiAgICBpZiAobG9jYXRpb25TdHJpbmcpIHtcclxuICAgICAgZXhlY3V0ZVNlYXJjaChsb2NhdGlvblN0cmluZyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qXHJcbi1Pbmx5IGZldGNoIHdlYXRoZXIgZGF0YTpcclxuICAgIC1PbiBwYWdlIGxvYWRcclxuICAgIGFuZFxyXG4gICAgLVdoZW4gdGhlIHNlYXJjaCBmb3JtIGhhcyBhIHZhbGlkIGlucHV0XHJcbiAgICBOT1RcclxuICAgIC13aGVuIHRoZSBwYWdlIGlzIHJlcmVuZGVyZWQgaW4gY2VsY2l1cyBvciBmYWhyZW5oZWl0XHJcbiovXHJcblxyXG5zaG93TG9hZGluZ01vZGFsKCk7XHJcbnJlbmRlckljb25zKCk7XHJcbnNldHVwTGlzdGVuZXJzKCk7XHJcbnNldHVwU2VhcmNoQmFyTGlzdGVuZXIoKTtcclxuZmV0Y2hEYXRhQW5kUmVuZGVyUGFnZShcIkNhbGdhcnlcIilcclxuICAudGhlbigoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkluaXRhbCBmZXRjaCBhbmQgcmVuZGVyIHN1Y2Nlc3MhXCIpO1xyXG4gICAgd2luZG93LnJlbmRlckNlbGNpdXMgPSByZW5kZXJDZWxjaXVzO1xyXG4gICAgd2luZG93LmV4dHJhY3RlZERhdGEgPSBleHRyYWN0ZWREYXRhO1xyXG4gICAgcmVtb3ZlRXJyb3JNb2RhbCgpO1xyXG4gICAgaGlkZUxvYWRpbmdNb2RhbCgpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgc2hvd0Vycm9yTW9kYWwoKTtcclxuICB9KTtcclxuIl0sIm5hbWVzIjpbImhhbmRsZSIsImZvcm1hdERhdGUiLCJnZXRUaW1lSW5UaW1lem9uZSIsImZvcm1hdFRpbWUiLCJmb3JtYXREYXkiLCJpc29sYXRlQ3VycmVudEhvdXJJbmRleCIsImdldExvY2F0aW9uQ29vcmRpbmF0ZXMiLCJsb2NhdGlvbiIsImNvb3JkaW5hdGVzUHJvbXNlIiwiZXJyb3IiLCJmZXRjaCIsIkVycm9yIiwicmVzcG9uc2UiLCJqc29uIiwicmVzdWx0cyIsInN0YXR1cyIsIm5hbWUiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInRpbWV6b25lIiwiYnVpbGRGZXRjaFVSTCIsImNvb3JkaW5hdGVQcm9taXNlIiwiY3VycmVudE9yRm9yZWNhc3QiLCJjZWxjaXVzT3JGYWhyZW5oZWl0IiwiY29vcmRpbmF0ZURhdGEiLCJ1cmwiLCJmZXRjaEN1cnJlbnRXZWF0aGVyRGF0YSIsInVybFByb21pc2UiLCJ3ZWF0aGVyRGF0YVJlc3BvbnNlIiwibW9kZSIsIndlYXRoZXJEYXRhSlNPTiIsImdldFdlYXRoZXJEYXRhIiwiY29vcmRpbmF0ZXMiLCJ1cmwxIiwidXJsMiIsInVybDMiLCJ1cmw0IiwiYWxsV2VhdGhlckRhdGEiLCJQcm9taXNlIiwiYWxsIiwibWFwcGVkV2VhdGhlckRhdGEiLCJjdXJyZW50Q2VsY2l1cyIsImN1cnJlbnRGYWhyZW5oZWl0IiwiZm9yZWNhc3RDZWxjaXVzIiwiZm9yZWNhc3RGYWhyZW5oZWl0IiwicGFyc2VXZWF0aGVyQ29kZVRvU3RyaW5nIiwiY29kZSIsImV4dHJhY3RVcHBlckxlZnREYXRhIiwid2VhdGhlckRhdGFQcm9taXNlIiwiZGF0YSIsIm1haW5Gb3JlY2FzdCIsImN1cnJlbnQiLCJ3ZWF0aGVyX2NvZGUiLCJ1cHBlckxlZnREYXRhIiwiZGF0ZSIsInRpbWUiLCJ0ZW1wZXJhdHVyZSIsInRlbXBlcmF0dXJlXzJtIiwiY3VycmVudF91bml0cyIsImljb25Db2RlIiwiZXh0cmFjdFVwcGVyUmlnaHREYXRhIiwidXBwZXJSaWdodERhdGEiLCJmZWVsc0xpa2UiLCJhcHBhcmVudF90ZW1wZXJhdHVyZSIsImh1bWlkaXR5IiwicmVsYXRpdmVfaHVtaWRpdHlfMm0iLCJwcmVjaXBpdGF0aW9uIiwid2luZFNwZWVkIiwid2luZF9zcGVlZF8xMG0iLCJleHRyYWN0Rm9vdGVyZGF0YSIsImRhaWx5RGF0YVByb21pc2UiLCJob3VybHlEYXRhUHJvbWlzZSIsImRhaWx5RGF0YSIsImhvdXJseURhdGEiLCJmb290ZXJEYXRhIiwiZGFpbHkiLCJob3VybHkiLCJpIiwidGVtcGVyYXR1cmVfMm1fbWF4IiwibGVuZ3RoIiwiY29tcGlsZWREYXRhIiwiZGFpbHlfdW5pdHMiLCJtYXhUZW1wIiwibWluVGVtcCIsInRlbXBlcmF0dXJlXzJtX21pbiIsIndlYXRoZXJDb2RlIiwicHVzaCIsInNoaWZ0IiwiY3VycmVudEhvdXIiLCJ2YWxpZEN1cnJlbnRIb3VyIiwiaG91ckluZGV4IiwiaG91cmx5X3VuaXRzIiwic2VhcmNoTG9jYXRpb24iLCJzZWFyY2hCYXJJbnB1dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsb2NhdGlvblN0cmluZyIsInZhbHVlIiwic3RyaW5nSXNOb3RPbmx5V2hpdGVTcGFjZSIsInJlcGxhY2UiLCJ1bmRlZmluZWQiLCJ0aW1lWm9uZSIsIm9wdGlvbnMiLCJ3ZWVrZGF5IiwieWVhciIsIm1vbnRoIiwiZGF5IiwiZm9ybWF0dGVkRGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsImhvdXIiLCJtaW51dGUiLCJ0aW1lWm9uZU5hbWUiLCJhZGp1c3RlZFRpbWUiLCJtaWxpdGFyeVRpbWUiLCJob3VyMTIiLCJmb3JtYXR0ZWRUaW1lIiwiZ2V0TnVtYmVyU3VmZml4IiwiaW5wdXRTdHJpbmciLCJpbnB1dERhdGUiLCJkYXlPZk1vbnRoIiwiZ2V0RGF0ZSIsInN1ZmZpeCIsImZvcm1hdHRlZERhdGVXaXRoVGgiLCJjdXJyZW50VGltZSIsInBhcnNlSW50Iiwic2VhcmNoSWNvbiIsImZlZWxzTGlrZUljb24iLCJodW1pZGl0eUljb24iLCJwcmVjaXBpdGF0aW9uSWNvbiIsIndpbmRTcGVlZEljb24iLCJsZWZ0QXJyb3dJY29uIiwicmlnaHRBcnJvd0ljb24iLCJsb2FkaW5nR2lmIiwiY2xlYXJTa3kiLCJwYXJ0bHlDbG91ZHkiLCJmb2dneSIsImRyaXp6bGUiLCJmcmVlemluZ0RyaXp6bGUiLCJyYWluIiwiZnJlZXppbmdSYWluIiwic25vd2ZhbGwiLCJzbm93R3JhaW5zIiwicmFpblNob3dlcnMiLCJzbm93U2hvd2VycyIsInRodW5kZXJTdG9ybUJvdGgiLCJjbGVhclNreUMiLCJwYXJ0bHlDbG91ZHlDIiwiZm9nZ3lDIiwiZHJpenpsZUMiLCJmcmVlemluZ0RyaXp6bGVDIiwicmFpbkMiLCJmcmVlemluZ1JhaW5DIiwic25vd2ZhbGxDIiwic25vd0dyYWluc0MiLCJyYWluU2hvd2Vyc0MiLCJzbm93U2hvd2Vyc0MiLCJ0aHVuZGVyU3Rvcm1Cb3RoQyIsIndlYXRoZXJJY29ucyIsIndlYXRoZXJJY29uc0Nyb3BwZWQiLCJyZW5kZXJJbWFnZSIsInBhcmVudCIsImltYWdlIiwiaW1hZ2VFbGVtZW50IiwiSW1hZ2UiLCJzcmMiLCJhcHBlbmRDaGlsZCIsInJlbmRlckljb25zIiwic2VhcmNoSWNvbkNvbnRhaW5lciIsImZlZWxzTGlrZUNvbnRhaW5lciIsImh1bWlkaXR5Q29udGFpbmVyIiwicHJlY2lwaXRhdGlvbkNvbnRhaW5lciIsIndpbmRTcGVlZENvbnRhaW5lciIsImxlZnRJY29uQ29udGFpbmVyIiwicmlnaHRJY29uQ29udGFpbmVyIiwiY29udGFpbmVyIiwicGFyc2VXZWF0aGVyQ29kZVRvSW1hZ2UiLCJjcm9wcGVkIiwiaW1hZ2VzVG9Vc2UiLCJyZW5kZXJGb3JlY2FzdEljb25zIiwiaWNvbkNvZGVzIiwiY2FyZHNDb2xsZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRheUljb25Db250YWluZXIiLCJjaGlsZHJlbiIsImlubmVySFRNTCIsInJlbmRlckN1cnJlbnRJY29uIiwibWFpbkljb25Db250YWluZXIiLCJ0b2dnbGVGb3JlY2FzdENhcmRzIiwidG9nZ2xlSG91cmx5Q2FyZHMiLCJkYWlseUZvcmVjYXN0Q2FyZHNHcmlkIiwicXVlcnlTZWxlY3RvciIsImhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkIiwiZGFpbHlCdXR0b24iLCJob3VybHlCdXR0b24iLCJob3Vyc1NlbGVjdGlvbkJ1dHRvbnMiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJyZW5kZXJVcHBlckxlZnRDb3JuZXIiLCJkYXRhUHJvbWlzZSIsIm1haW5Gb3JlY2FzdEVsZW1lbnQiLCJsb2NhdGlvbkVsZW1lbnQiLCJkYXRlRWxlbWVudCIsInRpbWVFbGVtZW50IiwidGVtcGVyYXR1cmVFbGVtZW50IiwidGV4dENvbnRlbnQiLCJyZW5kZXJVcHBlclJpZ2h0Q29ybmVyIiwiZmVlbHNMaWtlRWxlbWVudCIsImh1bWlkaXR5RWxlbWVudCIsInByZWNpcGl0YXRpb25FbGVtZW50Iiwid2luZFNwZWVkRWxlbWVudCIsInJlbmRlckZvb3RlciIsImZvcmVjYXN0UHJvbWlzZSIsImN1cnJlbnRQcm9taXNlIiwiZm9yZWNhc3REYXRhIiwiY3VycmVudERhdGEiLCJkYXlDYXJkRWxlbWVudHMiLCJob3VyQ2FyZEVsZW1lbnRzIiwiZGFpbHlJY29uQ29kZXMiLCJ0b0xvd2VyQ2FzZSIsImhvdXJseUljb25Db2RlcyIsInJlbmRlckhvdXJseUZvcmVjYXN0Q2FyZHMiLCJlaWdodEhvdXJDaHVua0lkIiwiYWxsQ2h1bmtzIiwiY2h1bmtUb1Nob3ciLCJzd2l0Y2hIb3VycyIsImRvdEVsZW1lbnQiLCJhbGxEb3RFbGVtZW50cyIsImdldEF0dHJpYnV0ZSIsInN3aXRjaEhvdXJVc2luZ0Fycm93IiwicmlnaHRBcnJvdyIsImN1cnJlbnRseUFjdGl2ZURvdCIsImN1cnJlbnRseUFjdGl2ZURvdElkIiwibmV4dERvdElkIiwiZG90VG9BY3RpdmUiLCJzaG93RXJyb3JNb2RhbCIsImVycm9yTW9kYWwiLCJyZW1vdmVFcnJvck1vZGFsIiwic2hvd0ludmFsaWRJbnB1dE1vZGFsIiwiaW52YWxpZElucHV0IiwiaGlkZUludmFsaWRJbnB1dE1vZGFsIiwic2hvd0xvYWRpbmdNb2RhbCIsImxvYWRpbmdNb2RhbCIsImhpZGVMb2FkaW5nTW9kYWwiLCJyZW5kZXJQYWdlIiwibWFpbkNvbnRhaW5lciIsInN3aXRjaFRlbXBlcmF0dXJlVW5pdCIsIndpbmRvdyIsInJlbmRlckNlbGNpdXMiLCJleHRyYWN0ZWREYXRhIiwidXBwZXJMZWZ0RGF0YUNlbGNpdXMiLCJ1cHBlckxlZnREYXRhRmFocmVuaGVpdCIsInVwcGVyUmlnaHREYXRhQ2VsY2l1cyIsInVwcGVyUmlnaHREYXRhRmFocmVuaGVpdCIsImZvb3RlckRhdGFDZWxjaXVzIiwiZm9vdGVyRGF0YUZhaHJlbmhlaXQiLCJzZXR1cExpc3RlbmVycyIsImRhaWx5Rm9yZWNhc3RCdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiaG91cmx5Rm9yZWNhc3RCdXR0b24iLCJzd2l0Y2hIb3Vyc0RvdHMiLCJzd2l0Y2hIb3Vyc0Fycm93TGVmdCIsInN3aXRjaEhvdXJzQXJyb3dSaWdodCIsInN3aXRjaENlbGNpdXNGYWhyZW5oZWl0IiwicHJvbWlzZSIsInRoZW4iLCJjYXRjaCIsInJlc29sdmUiLCJleHRyYWN0RGF0YSIsImVycm9yMSIsImVycm9yMiIsImVycm9yMyIsImVycm9yNCIsImVycm9yNSIsImVycm9yNiIsImZldGNoRGF0YUFuZFJlbmRlclBhZ2UiLCJmZXRjaGVkRGF0YSIsImZldGNoaW5nRXJyb3IiLCJleHRyYWN0ZWREYXRhTG9jYWwiLCJleHRyYWN0aW5nRXJyb3IiLCJjbGVhclNlYXJjaEJhciIsImV4ZWN1dGVTZWFyY2giLCJzZXR1cFNlYXJjaEJhckxpc3RlbmVyIiwiZm9ybSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZWFyY2hCYXJTdWJtaXRCdXR0b24iLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==