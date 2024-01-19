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
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}`;

  // Current data in Fahrenheit
  if (currentOrForecast === "Current" && celciusOrFahrenheit === "Fahrenheit") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;

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
function formatDate(string) {
  const utcDate = new Date(`${string}Z`);
  const formattedUtcDate = utcDate.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return formattedUtcDate;
}
function formatTime(timeZone, shortened, time) {
  let utcDate = new Date();
  if (time) {
    utcDate = new Date(time);
  }
  if (shortened) {
    utcDate.setMinutes(Math.round(utcDate.getMinutes() / 60) * 60);
  }
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(utcDate);
  return formattedTime;
}
async function extractUpperLeftData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const mainForecast = interpretWeatherCode(data[0].current.weather_code);
  const upperLeftData = {
    mainForecast,
    location: data[1],
    date: formatDate(data[0].current.time),
    time: formatTime(data[0].current.timezone, false),
    temperature: `${data[0].current.temperature_2m} ${data[0].current_units.temperature_2m}`
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
      maxTemp: dailyData.daily.temperature_2m_max[i],
      minTemp: dailyData.daily.temperature_2m_min[i],
      weatherCode: dailyData.daily.weather_code[i]
    };
    footerData.daily.push(compiledData);
  }
  // Fill in hourly data
  for (let i = 0; i < hourlyData[0].hourly.temperature_2m.length; i += 1) {
    const compiledData = {
      time: formatTime(hourlyData[0].timezone, true, hourlyData[0].hourly.time[i]),
      temperature: `${hourlyData[0].hourly.temperature_2m[i]} ${hourlyData[0].hourly_units.temperature_2m}`,
      weatherCode: hourlyData[0].hourly.weather_code[i]
    };
    footerData.hourly.push(compiledData);
  }
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
function setupListeners() {
  const dailyForecastButton = document.getElementById("dailyButton");
  dailyForecastButton.addEventListener("click", () => {
    toggleForecastCards(false);
  });
  const hourlyForecastButton = document.getElementById("hourlyButton");
  hourlyForecastButton.addEventListener("click", () => {
    toggleForecastCards(true);
  });
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
  console.log(forecastData);
  console.log(dayCardElements);

  // Render forecast/daily data
  for (let i = 1; i < forecastData.length; i += 1) {
    console.log(dayCardElements[i - 1].children);

    // NEED TO GET THE DAY NAME --> EXTRACT DAY NAME FROM THE EXTRACTFOOTERDATAFUNCTION
    // IN APIHANDLER DO ITTTTTTTTTTTTTTT

    // dayCardElements[i - 1].children[0] =

    // console.log(dayCardElements[i - 1]);
  }

  // Render current/hourly data
}
function renderWeatherData() {
  // Get weather data for each corner and render it

  // Upper left corner
  renderCurrentIcon(56);

  // Upper right corner

  // Footer
  renderForecastIcons([71, 77, 80, 85, 95, 61, 66], false);
  renderForecastIcons([71, 77, 80, 85, 95, 61, 66, 0], true);
}

// CALL THIS ON PAGE RENDER OR WHEN THE USER SEARCHES WITH A VALID INPUT
function setupPage() {
  renderIcons();
  setupListeners();
  // REMOVE THIS ONCE YOU GET RENDERING WORKING!
  renderWeatherData();
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

  display: grid;
  grid-template: 2fr 1fr / 1fr 1fr;
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

.dailyForecastGrid {
  display: none;
  grid-template: 1fr / repeat(7, 1fr);
  flex: 1;
  margin-top: 30px;
}

.dayCard {
  height: 100%;
  display: grid;
  grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr;
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

#dayName, #hourName {
  font-size: 1.4rem;
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
  grid-template: 1fr / repeat(8, 1fr);
  flex: 1;
  margin-top: 30px;
  /* border: 1px solid red; */
}

.hourCard {
  height: 100%;
  display: grid;
  grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr;
  gap: 5px;
  justify-items: center;
  align-items: center;
}

#hourIcon {
  grid-row: 4 / 5;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  color: white;\r\n  font-family: montserrat,sans-serif;\r\n}\r\n\r\nhtml, body {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  overflow-y: hidden;\r\n  overflow-x: hidden;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\nhtml {\r\n  background-color: gray;\r\n}\r\n\r\n#backgroundContainer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: -1;\r\n  height: 100vh;\r\n  width: 100vw;\r\n\r\n  background: linear-gradient(\r\n    rgba(0, 0, 0, 0.164), \r\n    rgba(0, 0, 0, 0.7)\r\n  ),\r\n  url(\"./images/weatherBackground.jpg\");\r\n  background-size: cover;\r\n  background-repeat:no-repeat;\r\n  background-position: center center;\r\n}\r\n\r\n#mainContainer {\r\n  height: 90%;\r\n  width: 90%;\r\n\r\n  display: grid;\r\n  grid-template: 2fr 1fr / 1fr 1fr;\r\n}\r\n\r\n/* Upper Left Display */\r\n\r\n#upperLeft {\r\n  display: flex;\r\n  flex-direction: column;\r\n  /* border: 1px solid red; */\r\n  gap: 15px;\r\n}\r\n\r\n#mainForecast, #mainTemperature {\r\n  font-size: 3rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#mainTemperature {\r\n  font-size: 3.5rem;\r\n}\r\n\r\n#location, #date, #time {\r\n  font-size: 1.1rem;\r\n}\r\n\r\nbutton {\r\n\tbackground: none;\r\n\tcolor: inherit;\r\n\tborder: none;\r\n\tpadding: 0;\r\n\tfont: inherit;\r\n\tcursor: pointer;\r\n\toutline: inherit;\r\n}\r\n\r\n#switchTemperatureButton {\r\n  font-weight: bold;\r\n}\r\n\r\n#mainIcon {\r\n  width: 60px;\r\n  height: 60px;\r\n  padding: 10px 0px;\r\n  /* border: 1px solid white; */\r\n}\r\n\r\n#searchContainer {\r\n  display: flex;\r\n  position: relative;\r\n  border-bottom: 2px solid white;\r\n  width: 200px;\r\n}\r\n\r\n#searchIconContainer {\r\n  width: 1.3rem;\r\n  position: relative;\r\n  left: 10px;\r\n}\r\n\r\ninput[type=\"text\"] {\r\n  width: 160px;\r\n  height: 1.1rem;\r\n  border: none;\r\n  /* border-bottom: 2px solid white; */\r\n  background-color: transparent;\r\n  text-indent: 7px;\r\n  font-size: 0.9rem;\r\n  padding: 2px;\r\n}\r\n\r\ninput[type=\"text\"]::placeholder {\r\n  color: white;\r\n}\r\n\r\ninput[type=\"text\"]:focus {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Upper Right Display */\r\n\r\n#upperRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n}\r\n\r\n#alignRight {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 30px;\r\n}\r\n\r\n.upperRightContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  /* border: 1px solid red; */\r\n}\r\n\r\n.upperRightContainer > div > p {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.iconContainer {\r\n  width: 3rem;\r\n}\r\n\r\n.upperLeftText {\r\n  font-size: 1.1rem;\r\n}\r\n\r\n/* Footer */\r\n\r\n#footer {\r\n  grid-column: 1 / 3;\r\n  /* border: 1px solid blue; */\r\n  display: flex;\r\n  flex-direction: column;\r\n\r\n}\r\n\r\n#dailyHourlyContainer {\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\n#dailyHourlyContainer button {\r\n  padding: 6px;\r\n  border-radius: 5px;\r\n}\r\n\r\n#dailyButton.border, #hourlyButton.border {\r\n  /* border: 2px solid white; */\r\n  -webkit-box-shadow:inset 0px 0px 0px 2px white;\r\n  -moz-box-shadow:inset 0px 0px 0px 2px white;\r\n  box-shadow:inset 0px 0px 0px 2px white;\r\n}\r\n\r\n.dailyForecastGrid.show, .hourlyForecastGrid.show {\r\n  display: grid;\r\n}\r\n\r\n#hoursSelectionContainer {\r\n  visibility: hidden;\r\n  display: flex;\r\n  gap: 10px;\r\n  align-items: center;\r\n  padding-top: 4px;\r\n}\r\n\r\n#hoursSelectionContainer.show {\r\n  visibility: visible;\r\n}\r\n\r\n.arrow {\r\n  width: 37px;\r\n}\r\n\r\n.dot {\r\n  position: relative;\r\n  top: -1px;\r\n  height: 7px;\r\n  width: 7px;\r\n  /* background-color: rgba(0,0,0,0); */\r\n  border: 1px solid #f5f5f5;\r\n  border-radius: 50%;\r\n  cursor: pointer;\r\n}\r\n\r\n.dailyForecastGrid {\r\n  display: none;\r\n  grid-template: 1fr / repeat(7, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n}\r\n\r\n.dayCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n  /* border: 1px solid red; */\r\n\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 10px; */\r\n}\r\n\r\n#dayName, #hourName {\r\n  font-size: 1.4rem;\r\n}\r\n\r\n#dayMaxTemp, #hourTemp {\r\n  font-size: 1.6rem;\r\n  font-weight: bold;\r\n}\r\n\r\n#dayMinTemp {\r\n  font-size: 0.9rem;\r\n}\r\n\r\n#dayIcon, #hourIcon {\r\n  width: 70px;\r\n}\r\n\r\n.testBorder {\r\n  border: 1px solid white;\r\n}\r\n\r\n.hourlyForecastGrid {\r\n  display: none;\r\n  grid-template: 1fr / repeat(8, 1fr);\r\n  flex: 1;\r\n  margin-top: 30px;\r\n  /* border: 1px solid red; */\r\n}\r\n\r\n.hourCard {\r\n  height: 100%;\r\n  display: grid;\r\n  grid-template: 3.5rem 1.5rem 0.9rem 60px / 1fr;\r\n  gap: 5px;\r\n  justify-items: center;\r\n  align-items: center;\r\n}\r\n\r\n#hourIcon {\r\n  grid-row: 4 / 5;\r\n}"],"sourceRoot":""}]);
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
}

// Set up page --> NO weather calls
(0,_domHandler__WEBPACK_IMPORTED_MODULE_2__.setupPage)();
renderPage("Calgary", true);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtQ0FBbUM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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VSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYXBpSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2RvbUhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25Db29yZGluYXRlcyhsb2NhdGlvbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb29yZGluYXRlc1Byb21zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9nZW9jb2RpbmctYXBpLm9wZW4tbWV0ZW8uY29tL3YxL3NlYXJjaD9uYW1lPSR7bG9jYXRpb259JmNvdW50PTEmbGFuZ3VhZ2U9ZW4mZm9ybWF0PWpzb25gLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzT2JqZWN0ID0gYXdhaXQgY29vcmRpbmF0ZXNQcm9tc2UuanNvbigpO1xyXG4gICAgaWYgKGNvb3JkaW5hdGVzT2JqZWN0LnJlc3VsdHMpIHtcclxuICAgICAgY29uc3QgeyBuYW1lLCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCB0aW1lem9uZSB9ID1cclxuICAgICAgICBjb29yZGluYXRlc09iamVjdC5yZXN1bHRzWzBdO1xyXG4gICAgICByZXR1cm4geyBuYW1lLCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCB0aW1lem9uZSB9O1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgbG9jYXRpb24gY29vcmRpYW50ZXNcIik7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIGZldGNoaW5nIGxvY2F0aW9uIGNvb3JkaWFudGVzXCIsIGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkRmV0Y2hVUkwoXHJcbiAgY29vcmRpbmF0ZVByb21pc2UsXHJcbiAgY3VycmVudE9yRm9yZWNhc3QsXHJcbiAgY2VsY2l1c09yRmFocmVuaGVpdCxcclxuKSB7XHJcbiAgY29uc3QgY29vcmRpbmF0ZURhdGEgPSBhd2FpdCBjb29yZGluYXRlUHJvbWlzZTtcclxuXHJcbiAgLy8gQ3VycmVudCBkYXRhIGluIENlbGNpdXNcclxuICBsZXQgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MSZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfWA7XHJcblxyXG4gIC8vIEN1cnJlbnQgZGF0YSBpbiBGYWhyZW5oZWl0XHJcbiAgaWYgKGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkN1cnJlbnRcIiAmJiBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIikge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mY3VycmVudD10ZW1wZXJhdHVyZV8ybSxyZWxhdGl2ZV9odW1pZGl0eV8ybSxhcHBhcmVudF90ZW1wZXJhdHVyZSxwcmVjaXBpdGF0aW9uLHdlYXRoZXJfY29kZSx3aW5kX3NwZWVkXzEwbSZob3VybHk9dGVtcGVyYXR1cmVfMm0sd2VhdGhlcl9jb2RlJmZvcmVjYXN0X2RheXM9MSZ0aW1lem9uZT0ke2Nvb3JkaW5hdGVEYXRhLnRpbWV6b25lfSZ0ZW1wZXJhdHVyZV91bml0PWZhaHJlbmhlaXQmd2luZF9zcGVlZF91bml0PW1waCZwcmVjaXBpdGF0aW9uX3VuaXQ9aW5jaGA7XHJcblxyXG4gICAgLy8gRm9yZWNhc3QgZGF0YSBpbiBDZWxjaXVzXHJcbiAgfSBlbHNlIGlmIChcclxuICAgIGN1cnJlbnRPckZvcmVjYXN0ID09PSBcIkZvcmVjYXN0XCIgJiZcclxuICAgIGNlbGNpdXNPckZhaHJlbmhlaXQgPT09IFwiQ2VsY2l1c1wiXHJcbiAgKSB7XHJcbiAgICB1cmwgPSBgaHR0cHM6Ly9hcGkub3Blbi1tZXRlby5jb20vdjEvZm9yZWNhc3Q/bGF0aXR1ZGU9JHtjb29yZGluYXRlRGF0YS5sYXRpdHVkZX0mbG9uZ2l0dWRlPSR7Y29vcmRpbmF0ZURhdGEubG9uZ2l0dWRlfSZkYWlseT13ZWF0aGVyX2NvZGUsdGVtcGVyYXR1cmVfMm1fbWF4LHRlbXBlcmF0dXJlXzJtX21pbiZmb3JlY2FzdF9kYXlzPTgmdGltZXpvbmU9JHtjb29yZGluYXRlRGF0YS50aW1lem9uZX1gO1xyXG5cclxuICAgIC8vIEZvcmVjYXN0IGRhdGEgaW4gRmFocmVuaGVpdFxyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBjdXJyZW50T3JGb3JlY2FzdCA9PT0gXCJGb3JlY2FzdFwiICYmXHJcbiAgICBjZWxjaXVzT3JGYWhyZW5oZWl0ID09PSBcIkZhaHJlbmhlaXRcIlxyXG4gICkge1xyXG4gICAgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW4tbWV0ZW8uY29tL3YxL2ZvcmVjYXN0P2xhdGl0dWRlPSR7Y29vcmRpbmF0ZURhdGEubGF0aXR1ZGV9JmxvbmdpdHVkZT0ke2Nvb3JkaW5hdGVEYXRhLmxvbmdpdHVkZX0mZGFpbHk9d2VhdGhlcl9jb2RlLHRlbXBlcmF0dXJlXzJtX21heCx0ZW1wZXJhdHVyZV8ybV9taW4mZm9yZWNhc3RfZGF5cz04JnRpbWV6b25lPSR7Y29vcmRpbmF0ZURhdGEudGltZXpvbmV9JnRlbXBlcmF0dXJlX3VuaXQ9ZmFocmVuaGVpdCZ3aW5kX3NwZWVkX3VuaXQ9bXBoJnByZWNpcGl0YXRpb25fdW5pdD1pbmNoYDtcclxuICB9XHJcbiAgcmV0dXJuIHVybDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsUHJvbWlzZSkge1xyXG4gIGNvbnN0IHVybCA9IGF3YWl0IHVybFByb21pc2U7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHdlYXRoZXJEYXRhUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbW9kZTogXCJjb3JzXCIgfSk7XHJcbiAgICBpZiAoIXdlYXRoZXJEYXRhUmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgY29uc3Qgd2VhdGhlckRhdGFKU09OID0gYXdhaXQgd2VhdGhlckRhdGFSZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIHJldHVybiB3ZWF0aGVyRGF0YUpTT047XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciB3aGlsZSBmZXRjaGluZyB3ZWF0aGVyIGRhdGFcIik7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGZldGNoaW5nIHdlYXRoZXIgZGF0YVwiLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGdldExvY2F0aW9uQ29vcmRpbmF0ZXMobG9jYXRpb24pO1xyXG4gICAgY29uc3QgdXJsMSA9IGJ1aWxkRmV0Y2hVUkwoY29vcmRpbmF0ZXMsIFwiQ3VycmVudFwiLCBcIkNlbGNpdXNcIik7XHJcbiAgICBjb25zdCB1cmwyID0gYnVpbGRGZXRjaFVSTChjb29yZGluYXRlcywgXCJDdXJyZW50XCIsIFwiRmFocmVuaGVpdFwiKTtcclxuICAgIGNvbnN0IHVybDMgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkZvcmVjYXN0XCIsIFwiQ2VsY2l1c1wiKTtcclxuICAgIGNvbnN0IHVybDQgPSBidWlsZEZldGNoVVJMKGNvb3JkaW5hdGVzLCBcIkZvcmVjYXN0XCIsIFwiRmFocmVuaGVpdFwiKTtcclxuXHJcbiAgICBjb25zdCBhbGxXZWF0aGVyRGF0YSA9IGF3YWl0IFByb21pc2UuYWxsKFtcclxuICAgICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsMSksXHJcbiAgICAgIGZldGNoQ3VycmVudFdlYXRoZXJEYXRhKHVybDIpLFxyXG4gICAgICBmZXRjaEN1cnJlbnRXZWF0aGVyRGF0YSh1cmwzKSxcclxuICAgICAgZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEodXJsNCksXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IG1hcHBlZFdlYXRoZXJEYXRhID0ge1xyXG4gICAgICBjdXJyZW50Q2VsY2l1czogW2FsbFdlYXRoZXJEYXRhWzBdLCBjb29yZGluYXRlcy5uYW1lXSxcclxuICAgICAgY3VycmVudEZhaHJlbmhlaXQ6IFthbGxXZWF0aGVyRGF0YVsxXSwgY29vcmRpbmF0ZXMubmFtZV0sXHJcbiAgICAgIGZvcmVjYXN0Q2VsY2l1czogYWxsV2VhdGhlckRhdGFbMl0sXHJcbiAgICAgIGZvcmVjYXN0RmFocmVuaGVpdDogYWxsV2VhdGhlckRhdGFbM10sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG1hcHBlZFdlYXRoZXJEYXRhO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoaWxlIGdldHRpbmcgd2VhdGhlciBkYXRhXCIsIGVycm9yKTtcclxuICAgIHJldHVybiBlcnJvcjtcclxuICAgIC8vIHRocm93IG5ldyBFcnJvcihcIkVycm9yIHdoaWxlIGdldHRpbmcgd2VhdGhlciBkYXRhXCIsIGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGludGVycHJldFdlYXRoZXJDb2RlKGNvZGUpIHtcclxuICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgIGNhc2UgMDpcclxuICAgICAgcmV0dXJuIFwiQ2xlYXIgU2t5XCI7XHJcbiAgICBjYXNlIDE6XHJcbiAgICAgIHJldHVybiBcIk1haW5seSBDbGVhciBTa3lcIjtcclxuICAgIGNhc2UgMjpcclxuICAgICAgcmV0dXJuIFwiUGFydGx5IENsb3VkeVwiO1xyXG4gICAgY2FzZSAzOlxyXG4gICAgICByZXR1cm4gXCJPdmVyY2FzdCBDbG91ZHNcIjtcclxuICAgIGNhc2UgNDU6XHJcbiAgICAgIHJldHVybiBcIk5vbi1Gcm96ZW4gRm9nXCI7XHJcbiAgICBjYXNlIDQ4OlxyXG4gICAgICByZXR1cm4gXCJGcmVlemluZyBGb2dcIjtcclxuICAgIGNhc2UgNTE6XHJcbiAgICAgIHJldHVybiBcIkxpZ2h0IERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTM6XHJcbiAgICAgIHJldHVybiBcIk1vZGVyYXRlIERyaXp6bGVcIjtcclxuICAgIGNhc2UgNTU6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgRHJpenpsZVwiO1xyXG4gICAgY2FzZSA1NjpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgRnJlZXppbmcgRHJpenpsZVwiO1xyXG4gICAgY2FzZSA1NzpcclxuICAgICAgcmV0dXJuIFwiRGVuc2UgRnJlZXppbmcgRHJpenpsZVwiO1xyXG4gICAgY2FzZSA2MTpcclxuICAgICAgcmV0dXJuIFwiU2xpZ2h0IFJhaW5cIjtcclxuICAgIGNhc2UgNjM6XHJcbiAgICAgIHJldHVybiBcIk1vZGVyYXRlIFJhaW5cIjtcclxuICAgIGNhc2UgNjU6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgUmFpblwiO1xyXG4gICAgY2FzZSA2NjpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgRnJlZXppbmcgUmFpblwiO1xyXG4gICAgY2FzZSA2NzpcclxuICAgICAgcmV0dXJuIFwiSW50ZW5zZSBGcmVlemluZyBSYWluXCI7XHJcbiAgICBjYXNlIDcxOlxyXG4gICAgICByZXR1cm4gXCJMaWdodCBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgNzM6XHJcbiAgICAgIHJldHVybiBcIk1vZGVyYXRlIFNub3cgRmFsbFwiO1xyXG4gICAgY2FzZSA3NTpcclxuICAgICAgcmV0dXJuIFwiSW50ZW5zZSBTbm93IEZhbGxcIjtcclxuICAgIGNhc2UgNzc6XHJcbiAgICAgIHJldHVybiBcIkdyYW51bGFyIFNub3cgRmFsbFwiO1xyXG4gICAgY2FzZSA4MDpcclxuICAgICAgcmV0dXJuIFwiTGlnaHQgUmFpbiBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDgxOlxyXG4gICAgICByZXR1cm4gXCJNb2RlcmF0ZSBSYWluIFNob3dlcnNcIjtcclxuICAgIGNhc2UgODI6XHJcbiAgICAgIHJldHVybiBcIlZpb2xlbnQgUmFpbiBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDg1OlxyXG4gICAgICByZXR1cm4gXCJMaWdodCBTbm93IFNob3dlcnNcIjtcclxuICAgIGNhc2UgODY6XHJcbiAgICAgIHJldHVybiBcIkludGVuc2UgU25vdyBTaG93ZXJzXCI7XHJcbiAgICBjYXNlIDk1OlxyXG4gICAgICByZXR1cm4gXCJUaHVuZGVyc3Rvcm1cIjtcclxuICAgIGNhc2UgOTY6XHJcbiAgICAgIHJldHVybiBcIk1vZGVyYXRlIFRodW5kZXJzdG9ybVwiO1xyXG4gICAgY2FzZSA5OTpcclxuICAgICAgcmV0dXJuIFwiVGh1bmRlcnN0b3JtIFdpdGggSGVhdnkgSGFpbFwiO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIFwiQ2xlYXIgU2t5XCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtYXREYXRlKHN0cmluZykge1xyXG4gIGNvbnN0IHV0Y0RhdGUgPSBuZXcgRGF0ZShgJHtzdHJpbmd9WmApO1xyXG4gIGNvbnN0IGZvcm1hdHRlZFV0Y0RhdGUgPSB1dGNEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLXVzXCIsIHtcclxuICAgIHdlZWtkYXk6IFwibG9uZ1wiLFxyXG4gICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgZGF5OiBcIm51bWVyaWNcIixcclxuICB9KTtcclxuICByZXR1cm4gZm9ybWF0dGVkVXRjRGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lWm9uZSwgc2hvcnRlbmVkLCB0aW1lKSB7XHJcbiAgbGV0IHV0Y0RhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gIGlmICh0aW1lKSB7XHJcbiAgICB1dGNEYXRlID0gbmV3IERhdGUodGltZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2hvcnRlbmVkKSB7XHJcbiAgICB1dGNEYXRlLnNldE1pbnV0ZXMoTWF0aC5yb3VuZCh1dGNEYXRlLmdldE1pbnV0ZXMoKSAvIDYwKSAqIDYwKTtcclxuICB9XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIGhvdXI6IFwibnVtZXJpY1wiLFxyXG4gICAgbWludXRlOiBcIm51bWVyaWNcIixcclxuICAgIHRpbWVab25lLFxyXG4gIH07XHJcbiAgY29uc3QgZm9ybWF0dGVkVGltZSA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KFwiZW4tVVNcIiwgb3B0aW9ucykuZm9ybWF0KFxyXG4gICAgdXRjRGF0ZSxcclxuICApO1xyXG4gIHJldHVybiBmb3JtYXR0ZWRUaW1lO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBleHRyYWN0VXBwZXJMZWZ0RGF0YSh3ZWF0aGVyRGF0YVByb21pc2UpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgd2VhdGhlckRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IG1haW5Gb3JlY2FzdCA9IGludGVycHJldFdlYXRoZXJDb2RlKGRhdGFbMF0uY3VycmVudC53ZWF0aGVyX2NvZGUpO1xyXG4gIGNvbnN0IHVwcGVyTGVmdERhdGEgPSB7XHJcbiAgICBtYWluRm9yZWNhc3QsXHJcbiAgICBsb2NhdGlvbjogZGF0YVsxXSxcclxuICAgIGRhdGU6IGZvcm1hdERhdGUoZGF0YVswXS5jdXJyZW50LnRpbWUpLFxyXG4gICAgdGltZTogZm9ybWF0VGltZShkYXRhWzBdLmN1cnJlbnQudGltZXpvbmUsIGZhbHNlKSxcclxuICAgIHRlbXBlcmF0dXJlOiBgJHtkYXRhWzBdLmN1cnJlbnQudGVtcGVyYXR1cmVfMm19ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLnRlbXBlcmF0dXJlXzJtfWAsXHJcbiAgfTtcclxuICByZXR1cm4gdXBwZXJMZWZ0RGF0YTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFVwcGVyUmlnaHREYXRhKHdlYXRoZXJEYXRhUHJvbWlzZSkge1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCB3ZWF0aGVyRGF0YVByb21pc2U7XHJcbiAgY29uc3QgdXBwZXJSaWdodERhdGEgPSB7XHJcbiAgICBmZWVsc0xpa2U6IGAke2RhdGFbMF0uY3VycmVudC5hcHBhcmVudF90ZW1wZXJhdHVyZX0gJHtkYXRhWzBdLmN1cnJlbnRfdW5pdHMuYXBwYXJlbnRfdGVtcGVyYXR1cmV9YCxcclxuICAgIGh1bWlkaXR5OiBgJHtkYXRhWzBdLmN1cnJlbnQucmVsYXRpdmVfaHVtaWRpdHlfMm19ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLnJlbGF0aXZlX2h1bWlkaXR5XzJtfWAsXHJcbiAgICBwcmVjaXBpdGF0aW9uOiBgJHtkYXRhWzBdLmN1cnJlbnQucHJlY2lwaXRhdGlvbn0gJHtkYXRhWzBdLmN1cnJlbnRfdW5pdHMucHJlY2lwaXRhdGlvbn1gLFxyXG4gICAgd2luZFNwZWVkOiBgJHtkYXRhWzBdLmN1cnJlbnQud2luZF9zcGVlZF8xMG19ICR7ZGF0YVswXS5jdXJyZW50X3VuaXRzLndpbmRfc3BlZWRfMTBtfWAsXHJcbiAgfTtcclxuICByZXR1cm4gdXBwZXJSaWdodERhdGE7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RGb290ZXJkYXRhKGRhaWx5RGF0YVByb21pc2UsIGhvdXJseURhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gYXdhaXQgZGFpbHlEYXRhUHJvbWlzZTtcclxuICBjb25zdCBob3VybHlEYXRhID0gYXdhaXQgaG91cmx5RGF0YVByb21pc2U7XHJcbiAgLy8gRmlsbCBpbiBhbmQgcmV0dXJuIHRoaXMgb2JqZWN0XHJcbiAgY29uc3QgZm9vdGVyRGF0YSA9IHtcclxuICAgIGRhaWx5OiBbXSxcclxuICAgIGhvdXJseTogW10sXHJcbiAgfTtcclxuICAvLyBGaWxsIGluIGRhaWx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhaWx5RGF0YS5kYWlseS50ZW1wZXJhdHVyZV8ybV9tYXgubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGNvbXBpbGVkRGF0YSA9IHtcclxuICAgICAgbWF4VGVtcDogZGFpbHlEYXRhLmRhaWx5LnRlbXBlcmF0dXJlXzJtX21heFtpXSxcclxuICAgICAgbWluVGVtcDogZGFpbHlEYXRhLmRhaWx5LnRlbXBlcmF0dXJlXzJtX21pbltpXSxcclxuICAgICAgd2VhdGhlckNvZGU6IGRhaWx5RGF0YS5kYWlseS53ZWF0aGVyX2NvZGVbaV0sXHJcbiAgICB9O1xyXG4gICAgZm9vdGVyRGF0YS5kYWlseS5wdXNoKGNvbXBpbGVkRGF0YSk7XHJcbiAgfVxyXG4gIC8vIEZpbGwgaW4gaG91cmx5IGRhdGFcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJseURhdGFbMF0uaG91cmx5LnRlbXBlcmF0dXJlXzJtLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBjb25zdCBjb21waWxlZERhdGEgPSB7XHJcbiAgICAgIHRpbWU6IGZvcm1hdFRpbWUoXHJcbiAgICAgICAgaG91cmx5RGF0YVswXS50aW1lem9uZSxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICAgIGhvdXJseURhdGFbMF0uaG91cmx5LnRpbWVbaV0sXHJcbiAgICAgICksXHJcbiAgICAgIHRlbXBlcmF0dXJlOiBgJHtob3VybHlEYXRhWzBdLmhvdXJseS50ZW1wZXJhdHVyZV8ybVtpXX0gJHtob3VybHlEYXRhWzBdLmhvdXJseV91bml0cy50ZW1wZXJhdHVyZV8ybX1gLFxyXG4gICAgICB3ZWF0aGVyQ29kZTogaG91cmx5RGF0YVswXS5ob3VybHkud2VhdGhlcl9jb2RlW2ldLFxyXG4gICAgfTtcclxuICAgIGZvb3RlckRhdGEuaG91cmx5LnB1c2goY29tcGlsZWREYXRhKTtcclxuICB9XHJcbiAgcmV0dXJuIGZvb3RlckRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgZ2V0V2VhdGhlckRhdGEsXHJcbiAgZXh0cmFjdFVwcGVyTGVmdERhdGEsXHJcbiAgZXh0cmFjdFVwcGVyUmlnaHREYXRhLFxyXG4gIGV4dHJhY3RGb290ZXJkYXRhLFxyXG59O1xyXG4iLCIvLyBPdGhlciBJY29uc1xyXG5pbXBvcnQgc2VhcmNoSWNvbiBmcm9tIFwiLi9pbWFnZXMvc2VhcmNoSWNvbi5zdmdcIjtcclxuaW1wb3J0IGZlZWxzTGlrZUljb24gZnJvbSBcIi4vaW1hZ2VzL2ZlZWxzTGlrZUljb24uc3ZnXCI7XHJcbmltcG9ydCBodW1pZGl0eUljb24gZnJvbSBcIi4vaW1hZ2VzL2h1bWlkaXR5SWNvbi5zdmdcIjtcclxuaW1wb3J0IHByZWNpcGl0YXRpb25JY29uIGZyb20gXCIuL2ltYWdlcy9wcmVjaXBpdGF0aW9uSWNvbi5zdmdcIjtcclxuaW1wb3J0IHdpbmRTcGVlZEljb24gZnJvbSBcIi4vaW1hZ2VzL3dpbmRJY29uLnN2Z1wiO1xyXG5pbXBvcnQgbGVmdEFycm93SWNvbiBmcm9tIFwiLi9pbWFnZXMvYXJyb3dMZWZ0LnN2Z1wiO1xyXG5pbXBvcnQgcmlnaHRBcnJvd0ljb24gZnJvbSBcIi4vaW1hZ2VzL2Fycm93UmlnaHQuc3ZnXCI7XHJcblxyXG4vLyBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9jbGVhclNreS5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9wYXJ0bHlDbG91ZHkuc3ZnXCI7XHJcbmltcG9ydCBmb2dneSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mb2dneS5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGUgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZHJpenpsZS5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZSBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9mcmVlemluZ0RyaXp6bGUuc3ZnXCI7XHJcbmltcG9ydCByYWluIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3JhaW4uc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW4gZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvZnJlZXppbmdSYWluLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGwgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnMvc25vd2ZhbGwuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dHcmFpbnMuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2VycyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy9yYWluU2hvd2Vycy5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zL3Nub3dTaG93ZXJzLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aCBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29ucy90aHVuZGVyU3Rvcm1Cb3RoLnN2Z1wiO1xyXG5cclxuLy8gQ3JvcHBlZCBXZWF0aGVyIEljb25zXHJcbmltcG9ydCBjbGVhclNreUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2NsZWFyU2t5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHBhcnRseUNsb3VkeUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3BhcnRseUNsb3VkeUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmb2dneUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZvZ2d5Q3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGRyaXp6bGVDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9kcml6emxlQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IGZyZWV6aW5nRHJpenpsZUMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL2ZyZWV6aW5nRHJpenpsZUNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvcmFpbkNyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBmcmVlemluZ1JhaW5DIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9mcmVlemluZ1JhaW5Dcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgc25vd2ZhbGxDIGZyb20gXCIuL2ltYWdlcy93ZWF0aGVyQ29kZUljb25zQ3JvcHBlZC9zbm93ZmFsbENyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCBzbm93R3JhaW5zQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd0dyYWluc0Nyb3BwZWQuc3ZnXCI7XHJcbmltcG9ydCByYWluU2hvd2Vyc0MgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3JhaW5TaG93ZXJzQ3JvcHBlZC5zdmdcIjtcclxuaW1wb3J0IHNub3dTaG93ZXJzQyBmcm9tIFwiLi9pbWFnZXMvd2VhdGhlckNvZGVJY29uc0Nyb3BwZWQvc25vd1Nob3dlcnNDcm9wcGVkLnN2Z1wiO1xyXG5pbXBvcnQgdGh1bmRlclN0b3JtQm90aEMgZnJvbSBcIi4vaW1hZ2VzL3dlYXRoZXJDb2RlSWNvbnNDcm9wcGVkL3RodW5kZXJTdG9ybUJvdGhDcm9wcGVkLnN2Z1wiO1xyXG5cclxuLy8gaW1wb3J0IGdldFdlYXRoZXJEYXRhIGZyb20gXCIuL2FwaUhhbmRsZXJcIjtcclxuXHJcbmNvbnN0IHdlYXRoZXJJY29ucyA9IFtcclxuICBjbGVhclNreSxcclxuICBwYXJ0bHlDbG91ZHksXHJcbiAgZm9nZ3ksXHJcbiAgZHJpenpsZSxcclxuICBmcmVlemluZ0RyaXp6bGUsXHJcbiAgcmFpbixcclxuICBmcmVlemluZ1JhaW4sXHJcbiAgc25vd2ZhbGwsXHJcbiAgc25vd0dyYWlucyxcclxuICByYWluU2hvd2VycyxcclxuICBzbm93U2hvd2VycyxcclxuICB0aHVuZGVyU3Rvcm1Cb3RoLFxyXG5dO1xyXG5cclxuY29uc3Qgd2VhdGhlckljb25zQ3JvcHBlZCA9IFtcclxuICBjbGVhclNreUMsXHJcbiAgcGFydGx5Q2xvdWR5QyxcclxuICBmb2dneUMsXHJcbiAgZHJpenpsZUMsXHJcbiAgZnJlZXppbmdEcml6emxlQyxcclxuICByYWluQyxcclxuICBmcmVlemluZ1JhaW5DLFxyXG4gIHNub3dmYWxsQyxcclxuICBzbm93R3JhaW5zQyxcclxuICByYWluU2hvd2Vyc0MsXHJcbiAgc25vd1Nob3dlcnNDLFxyXG4gIHRodW5kZXJTdG9ybUJvdGhDLFxyXG5dO1xyXG5cclxuLy8gZnVuY3Rpb24gY29tcG9uZW50KCkge1xyXG4vLyAgIC8vIFRlc3QgQ1NTXHJcbi8vICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlRlc3RpbmcuLi5cIjtcclxuLy8gICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoZWxsb1wiKTtcclxuXHJcbi8vICAgLy8gVGVzdCBBc3NldCBsb2FkZXJcclxuLy8gICBjb25zdCBpbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKTtcclxuLy8gICBpbWFnZUVsZW1lbnQuc3JjID0gdGVzdEltYWdlO1xyXG4vLyAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcclxuXHJcbi8vICAgLy8gVGVzdCBzb3VyY2UgbWFwIC0tPiB1bmNvbW1lbnQgdG8gdGVzdCB0cmFja2luZ1xyXG4vLyAgIC8vIGNvc25vbGUubG9nKCdJIGdldCBjYWxsZWQgZnJvbSBwcmludC5qcyEnKTtcclxuXHJcbi8vICAgLy8gVGVzdCBFc2xpbnQgLS0+IHVuY29tbWVudCB0byBzZWUgc3VnZ2VzdGlvbnNcclxuLy8gICAvLyBpZiAodHJ1ZSkge31cclxuXHJcbi8vICAgcmV0dXJuIGVsZW1lbnQ7XHJcbi8vIH1cclxuLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnQoKSk7XHJcblxyXG5mdW5jdGlvbiByZW5kZXJJbWFnZShwYXJlbnQsIGltYWdlKSB7XHJcbiAgY29uc3QgaW1hZ2VFbGVtZW50ID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlO1xyXG4gIC8vIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGVzdEJvcmRlclwiKTtcclxuICBwYXJlbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySWNvbnMoKSB7XHJcbiAgLy8gU2VhcmNoYmFyIGljb25cclxuICBjb25zdCBzZWFyY2hJY29uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hJY29uQ29udGFpbmVyXCIpO1xyXG4gIHJlbmRlckltYWdlKHNlYXJjaEljb25Db250YWluZXIsIHNlYXJjaEljb24pO1xyXG5cclxuICAvLyBVcHBlciByaWdodCBpY29uc1xyXG4gIGNvbnN0IGZlZWxzTGlrZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlbHNMaWtlSWNvblwiKTtcclxuICByZW5kZXJJbWFnZShmZWVsc0xpa2VDb250YWluZXIsIGZlZWxzTGlrZUljb24pO1xyXG5cclxuICBjb25zdCBodW1pZGl0eUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaHVtaWRpdHlJY29uXCIpO1xyXG4gIHJlbmRlckltYWdlKGh1bWlkaXR5Q29udGFpbmVyLCBodW1pZGl0eUljb24pO1xyXG5cclxuICBjb25zdCBwcmVjaXBpdGF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uSWNvblwiKTtcclxuICByZW5kZXJJbWFnZShwcmVjaXBpdGF0aW9uQ29udGFpbmVyLCBwcmVjaXBpdGF0aW9uSWNvbik7XHJcblxyXG4gIGNvbnN0IHdpbmRTcGVlZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luZFNwZWVkSWNvblwiKTtcclxuICByZW5kZXJJbWFnZSh3aW5kU3BlZWRDb250YWluZXIsIHdpbmRTcGVlZEljb24pO1xyXG5cclxuICAvLyBIb3VybHkgZm9yZWNhc3QgYXJyb3dzXHJcbiAgY29uc3QgbGVmdEljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRBcnJvd1wiKTtcclxuICByZW5kZXJJbWFnZShsZWZ0SWNvbkNvbnRhaW5lciwgbGVmdEFycm93SWNvbik7XHJcblxyXG4gIGNvbnN0IHJpZ2h0SWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHRBcnJvd1wiKTtcclxuICByZW5kZXJJbWFnZShyaWdodEljb25Db250YWluZXIsIHJpZ2h0QXJyb3dJY29uKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW50ZXJwcmV0V2VhdGhlckNvZGUoY29kZSwgY3JvcHBlZCkge1xyXG4gIGxldCBpbWFnZXNUb1VzZSA9IHdlYXRoZXJJY29ucztcclxuICBpZiAoY3JvcHBlZCkge1xyXG4gICAgaW1hZ2VzVG9Vc2UgPSB3ZWF0aGVySWNvbnNDcm9wcGVkO1xyXG4gIH1cclxuXHJcbiAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVswXTtcclxuICAgIGNhc2UgMTpcclxuICAgIGNhc2UgMjpcclxuICAgIGNhc2UgMzpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzFdO1xyXG4gICAgY2FzZSA0NTpcclxuICAgIGNhc2UgNDg6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVsyXTtcclxuICAgIGNhc2UgNTE6XHJcbiAgICBjYXNlIDUzOlxyXG4gICAgY2FzZSA1NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzNdO1xyXG4gICAgY2FzZSA1NjpcclxuICAgIGNhc2UgNTc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs0XTtcclxuICAgIGNhc2UgNjE6XHJcbiAgICBjYXNlIDYzOlxyXG4gICAgY2FzZSA2NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzVdO1xyXG4gICAgY2FzZSA2NjpcclxuICAgIGNhc2UgNjc6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVs2XTtcclxuICAgIGNhc2UgNzE6XHJcbiAgICBjYXNlIDczOlxyXG4gICAgY2FzZSA3NTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzddO1xyXG4gICAgY2FzZSA3NzpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzhdO1xyXG4gICAgY2FzZSA4MDpcclxuICAgIGNhc2UgODE6XHJcbiAgICBjYXNlIDgyOlxyXG4gICAgICByZXR1cm4gaW1hZ2VzVG9Vc2VbOV07XHJcbiAgICBjYXNlIDg1OlxyXG4gICAgY2FzZSA4NjpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzEwXTtcclxuICAgIGNhc2UgOTU6XHJcbiAgICBjYXNlIDk2OlxyXG4gICAgY2FzZSA5OTpcclxuICAgICAgcmV0dXJuIGltYWdlc1RvVXNlWzExXTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBpbWFnZXNUb1VzZVswXTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckZvcmVjYXN0SWNvbnMoaWNvbkNvZGVzLCBob3VybHkpIHtcclxuICBsZXQgY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRheUNhcmRcIik7XHJcbiAgaWYgKGhvdXJseSkge1xyXG4gICAgY2FyZHNDb2xsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhvdXJDYXJkXCIpO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkc0NvbGxlY3Rpb24ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGNvbnN0IGRheUljb25Db250YWluZXIgPVxyXG4gICAgICBjYXJkc0NvbGxlY3Rpb25baV0uY2hpbGRyZW5bY2FyZHNDb2xsZWN0aW9uW2ldLmNoaWxkcmVuLmxlbmd0aCAtIDFdO1xyXG4gICAgcmVuZGVySW1hZ2UoZGF5SWNvbkNvbnRhaW5lciwgaW50ZXJwcmV0V2VhdGhlckNvZGUoaWNvbkNvZGVzW2ldLCBmYWxzZSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQ3VycmVudEljb24oaWNvbkNvZGUpIHtcclxuICBjb25zdCBtYWluSWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkljb25cIik7XHJcbiAgcmVuZGVySW1hZ2UobWFpbkljb25Db250YWluZXIsIGludGVycHJldFdlYXRoZXJDb2RlKGljb25Db2RlLCB0cnVlKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZvcmVjYXN0Q2FyZHModG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICBjb25zdCBkYWlseUZvcmVjYXN0Q2FyZHNHcmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYWlseUZvcmVjYXN0R3JpZFwiKTtcclxuICBjb25zdCBob3VybHlGb3JlY2FzdENhcmRzR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG91cmx5Rm9yZWNhc3RHcmlkXCIpO1xyXG4gIGNvbnN0IGRhaWx5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYWlseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3VybHlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhvdXJseUJ1dHRvblwiKTtcclxuICBjb25zdCBob3Vyc1NlbGVjdGlvbkJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiaG91cnNTZWxlY3Rpb25Db250YWluZXJcIixcclxuICApO1xyXG5cclxuICBpZiAodG9nZ2xlSG91cmx5Q2FyZHMpIHtcclxuICAgIGRhaWx5Rm9yZWNhc3RDYXJkc0dyaWQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcbiAgICBob3VybHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGRhaWx5QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJib3JkZXJcIik7XHJcbiAgICBob3VybHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJzU2VsZWN0aW9uQnV0dG9ucy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGFpbHlGb3JlY2FzdENhcmRzR3JpZC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuICAgIGhvdXJseUZvcmVjYXN0Q2FyZHNHcmlkLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gICAgZGFpbHlCdXR0b24uY2xhc3NMaXN0LmFkZChcImJvcmRlclwiKTtcclxuICAgIGhvdXJseUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYm9yZGVyXCIpO1xyXG4gICAgaG91cnNTZWxlY3Rpb25CdXR0b25zLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0dXBMaXN0ZW5lcnMoKSB7XHJcbiAgY29uc3QgZGFpbHlGb3JlY2FzdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFpbHlCdXR0b25cIik7XHJcbiAgZGFpbHlGb3JlY2FzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgdG9nZ2xlRm9yZWNhc3RDYXJkcyhmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhvdXJseUZvcmVjYXN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJob3VybHlCdXR0b25cIik7XHJcbiAgaG91cmx5Rm9yZWNhc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHRvZ2dsZUZvcmVjYXN0Q2FyZHModHJ1ZSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIHJlUmVuZGVySW5DZWxjaXVzT3JGYWhyZW5oZWl0KCkge1xyXG5cclxuLy8gfVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gcmVuZGVyVXBwZXJMZWZ0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IG1haW5Gb3JlY2FzdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5Gb3JlY2FzdFwiKTtcclxuICBjb25zdCBsb2NhdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvY2F0aW9uXCIpO1xyXG4gIGNvbnN0IGRhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRlXCIpO1xyXG4gIGNvbnN0IHRpbWVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lXCIpO1xyXG4gIGNvbnN0IHRlbXBlcmF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblRlbXBlcmF0dXJlXCIpO1xyXG5cclxuICBtYWluRm9yZWNhc3RFbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5tYWluRm9yZWNhc3Q7XHJcbiAgbG9jYXRpb25FbGVtZW50LnRleHRDb250ZW50ID0gZGF0YS5sb2NhdGlvbjtcclxuICBkYXRlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZGF0ZTtcclxuICB0aW1lRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEudGltZTtcclxuICB0ZW1wZXJhdHVyZUVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnRlbXBlcmF0dXJlO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKGRhdGFQcm9taXNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGRhdGFQcm9taXNlO1xyXG4gIGNvbnN0IGZlZWxzTGlrZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzTGlrZVwiKTtcclxuICBjb25zdCBodW1pZGl0eUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5XCIpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVjaXBpdGF0aW9uXCIpO1xyXG4gIGNvbnN0IHdpbmRTcGVlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRTcGVlZFwiKTtcclxuXHJcbiAgZmVlbHNMaWtlRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuZmVlbHNMaWtlO1xyXG4gIGh1bWlkaXR5RWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEuaHVtaWRpdHk7XHJcbiAgcHJlY2lwaXRhdGlvbkVsZW1lbnQudGV4dENvbnRlbnQgPSBkYXRhLnByZWNpcGl0YXRpb247XHJcbiAgd2luZFNwZWVkRWxlbWVudC50ZXh0Q29udGVudCA9IGRhdGEud2luZFNwZWVkO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiByZW5kZXJGb290ZXIoZm9yZWNhc3RQcm9taXNlLCBjdXJyZW50UHJvbWlzZSkge1xyXG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGZvcmVjYXN0UHJvbWlzZTtcclxuICBjb25zdCBjdXJyZW50RGF0YSA9IGF3YWl0IGN1cnJlbnRQcm9taXNlO1xyXG5cclxuICBjb25zdCBkYXlDYXJkRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZGF5Q2FyZFwiKTtcclxuICBjb25zb2xlLmxvZyhmb3JlY2FzdERhdGEpO1xyXG4gIGNvbnNvbGUubG9nKGRheUNhcmRFbGVtZW50cyk7XHJcblxyXG4gIC8vIFJlbmRlciBmb3JlY2FzdC9kYWlseSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBmb3JlY2FzdERhdGEubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGNvbnNvbGUubG9nKGRheUNhcmRFbGVtZW50c1tpIC0gMV0uY2hpbGRyZW4pO1xyXG5cclxuICAgIC8vIE5FRUQgVE8gR0VUIFRIRSBEQVkgTkFNRSAtLT4gRVhUUkFDVCBEQVkgTkFNRSBGUk9NIFRIRSBFWFRSQUNURk9PVEVSREFUQUZVTkNUSU9OXHJcbiAgICAvLyBJTiBBUElIQU5ETEVSIERPIElUVFRUVFRUVFRUVFRUVFRcclxuXHJcbiAgICAvLyBkYXlDYXJkRWxlbWVudHNbaSAtIDFdLmNoaWxkcmVuWzBdID1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXlDYXJkRWxlbWVudHNbaSAtIDFdKTtcclxuICB9XHJcblxyXG4gIC8vIFJlbmRlciBjdXJyZW50L2hvdXJseSBkYXRhXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlcldlYXRoZXJEYXRhKCkge1xyXG4gIC8vIEdldCB3ZWF0aGVyIGRhdGEgZm9yIGVhY2ggY29ybmVyIGFuZCByZW5kZXIgaXRcclxuXHJcbiAgLy8gVXBwZXIgbGVmdCBjb3JuZXJcclxuICByZW5kZXJDdXJyZW50SWNvbig1Nik7XHJcblxyXG4gIC8vIFVwcGVyIHJpZ2h0IGNvcm5lclxyXG5cclxuICAvLyBGb290ZXJcclxuICByZW5kZXJGb3JlY2FzdEljb25zKFs3MSwgNzcsIDgwLCA4NSwgOTUsIDYxLCA2Nl0sIGZhbHNlKTtcclxuICByZW5kZXJGb3JlY2FzdEljb25zKFs3MSwgNzcsIDgwLCA4NSwgOTUsIDYxLCA2NiwgMF0sIHRydWUpO1xyXG59XHJcblxyXG4vLyBDQUxMIFRISVMgT04gUEFHRSBSRU5ERVIgT1IgV0hFTiBUSEUgVVNFUiBTRUFSQ0hFUyBXSVRIIEEgVkFMSUQgSU5QVVRcclxuZnVuY3Rpb24gc2V0dXBQYWdlKCkge1xyXG4gIHJlbmRlckljb25zKCk7XHJcbiAgc2V0dXBMaXN0ZW5lcnMoKTtcclxuICAvLyBSRU1PVkUgVEhJUyBPTkNFIFlPVSBHRVQgUkVOREVSSU5HIFdPUktJTkchXHJcbiAgcmVuZGVyV2VhdGhlckRhdGEoKTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBzZXR1cFBhZ2UsXHJcbiAgcmVuZGVyVXBwZXJMZWZ0Q29ybmVyLFxyXG4gIHJlbmRlclVwcGVyUmlnaHRDb3JuZXIsXHJcbiAgcmVuZGVyRm9vdGVyLFxyXG59O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi9pbWFnZXMvd2VhdGhlckJhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAqIHtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgZm9udC1mYW1pbHk6IG1vbnRzZXJyYXQsc2Fucy1zZXJpZjtcclxufVxyXG5cclxuaHRtbCwgYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdnc7XHJcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbmh0bWwge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XHJcbn1cclxuXHJcbiNiYWNrZ3JvdW5kQ29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgei1pbmRleDogLTE7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuICB3aWR0aDogMTAwdnc7XHJcblxyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcclxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNjQpLCBcclxuICAgIHJnYmEoMCwgMCwgMCwgMC43KVxyXG4gICksXHJcbiAgdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbn1cclxuXHJcbiNtYWluQ29udGFpbmVyIHtcclxuICBoZWlnaHQ6IDkwJTtcclxuICB3aWR0aDogOTAlO1xyXG5cclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6IDJmciAxZnIgLyAxZnIgMWZyO1xyXG59XHJcblxyXG4vKiBVcHBlciBMZWZ0IERpc3BsYXkgKi9cclxuXHJcbiN1cHBlckxlZnQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXHJcbiAgZ2FwOiAxNXB4O1xyXG59XHJcblxyXG4jbWFpbkZvcmVjYXN0LCAjbWFpblRlbXBlcmF0dXJlIHtcclxuICBmb250LXNpemU6IDNyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNtYWluVGVtcGVyYXR1cmUge1xyXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xyXG59XHJcblxyXG4jbG9jYXRpb24sICNkYXRlLCAjdGltZSB7XHJcbiAgZm9udC1zaXplOiAxLjFyZW07XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcblx0YmFja2dyb3VuZDogbm9uZTtcclxuXHRjb2xvcjogaW5oZXJpdDtcclxuXHRib3JkZXI6IG5vbmU7XHJcblx0cGFkZGluZzogMDtcclxuXHRmb250OiBpbmhlcml0O1xyXG5cdGN1cnNvcjogcG9pbnRlcjtcclxuXHRvdXRsaW5lOiBpbmhlcml0O1xyXG59XHJcblxyXG4jc3dpdGNoVGVtcGVyYXR1cmVCdXR0b24ge1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4jbWFpbkljb24ge1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGhlaWdodDogNjBweDtcclxuICBwYWRkaW5nOiAxMHB4IDBweDtcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTsgKi9cclxufVxyXG5cclxuI3NlYXJjaENvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xyXG4gIHdpZHRoOiAyMDBweDtcclxufVxyXG5cclxuI3NlYXJjaEljb25Db250YWluZXIge1xyXG4gIHdpZHRoOiAxLjNyZW07XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdIHtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxLjFyZW07XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIC8qIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTsgKi9cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICB0ZXh0LWluZGVudDogN3B4O1xyXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gIHBhZGRpbmc6IDJweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInRleHRcIl06OnBsYWNlaG9sZGVyIHtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJ0ZXh0XCJdOmZvY3VzIHtcclxuICBvdXRsaW5lLXdpZHRoOiAwO1xyXG59XHJcblxyXG4vKiBVcHBlciBSaWdodCBEaXNwbGF5ICovXHJcblxyXG4jdXBwZXJSaWdodCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxufVxyXG5cclxuI2FsaWduUmlnaHQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDMwcHg7XHJcbn1cclxuXHJcbi51cHBlclJpZ2h0Q29udGFpbmVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTBweDtcclxuICAvKiBib3JkZXI6IDFweCBzb2xpZCByZWQ7ICovXHJcbn1cclxuXHJcbi51cHBlclJpZ2h0Q29udGFpbmVyID4gZGl2ID4gcCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG4uaWNvbkNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDNyZW07XHJcbn1cclxuXHJcbi51cHBlckxlZnRUZXh0IHtcclxuICBmb250LXNpemU6IDEuMXJlbTtcclxufVxyXG5cclxuLyogRm9vdGVyICovXHJcblxyXG4jZm9vdGVyIHtcclxuICBncmlkLWNvbHVtbjogMSAvIDM7XHJcbiAgLyogYm9yZGVyOiAxcHggc29saWQgYmx1ZTsgKi9cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG59XHJcblxyXG4jZGFpbHlIb3VybHlDb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMHB4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcblxyXG4jZGFpbHlIb3VybHlDb250YWluZXIgYnV0dG9uIHtcclxuICBwYWRkaW5nOiA2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4jZGFpbHlCdXR0b24uYm9yZGVyLCAjaG91cmx5QnV0dG9uLmJvcmRlciB7XHJcbiAgLyogYm9yZGVyOiAycHggc29saWQgd2hpdGU7ICovXHJcbiAgLXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcclxuICAtbW96LWJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xyXG4gIGJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xyXG59XHJcblxyXG4uZGFpbHlGb3JlY2FzdEdyaWQuc2hvdywgLmhvdXJseUZvcmVjYXN0R3JpZC5zaG93IHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG59XHJcblxyXG4jaG91cnNTZWxlY3Rpb25Db250YWluZXIge1xyXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogMTBweDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmctdG9wOiA0cHg7XHJcbn1cclxuXHJcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lci5zaG93IHtcclxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xyXG59XHJcblxyXG4uYXJyb3cge1xyXG4gIHdpZHRoOiAzN3B4O1xyXG59XHJcblxyXG4uZG90IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgdG9wOiAtMXB4O1xyXG4gIGhlaWdodDogN3B4O1xyXG4gIHdpZHRoOiA3cHg7XHJcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDAsMCwwKTsgKi9cclxuICBib3JkZXI6IDFweCBzb2xpZCAjZjVmNWY1O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kYWlseUZvcmVjYXN0R3JpZCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoNywgMWZyKTtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuXHJcbi5kYXlDYXJkIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlOiAzLjVyZW0gMS41cmVtIDAuOXJlbSA2MHB4IC8gMWZyO1xyXG4gIGdhcDogNXB4O1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cclxuXHJcbiAgLyogZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxMHB4OyAqL1xyXG59XHJcblxyXG4jZGF5TmFtZSwgI2hvdXJOYW1lIHtcclxuICBmb250LXNpemU6IDEuNHJlbTtcclxufVxyXG5cclxuI2RheU1heFRlbXAsICNob3VyVGVtcCB7XHJcbiAgZm9udC1zaXplOiAxLjZyZW07XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbiNkYXlNaW5UZW1wIHtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG5cclxuI2RheUljb24sICNob3VySWNvbiB7XHJcbiAgd2lkdGg6IDcwcHg7XHJcbn1cclxuXHJcbi50ZXN0Qm9yZGVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcclxufVxyXG5cclxuLmhvdXJseUZvcmVjYXN0R3JpZCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoOCwgMWZyKTtcclxuICBmbGV4OiAxO1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xyXG59XHJcblxyXG4uaG91ckNhcmQge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGU6IDMuNXJlbSAxLjVyZW0gMC45cmVtIDYwcHggLyAxZnI7XHJcbiAgZ2FwOiA1cHg7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbiNob3VySWNvbiB7XHJcbiAgZ3JpZC1yb3c6IDQgLyA1O1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixZQUFZO0VBQ1osa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixZQUFZOztFQUVaOzs7O3lDQUlxQztFQUNyQyxzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFdBQVc7RUFDWCxVQUFVOztFQUVWLGFBQWE7RUFDYixnQ0FBZ0M7QUFDbEM7O0FBRUEsdUJBQXVCOztBQUV2QjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7Q0FDQyxnQkFBZ0I7Q0FDaEIsY0FBYztDQUNkLFlBQVk7Q0FDWixVQUFVO0NBQ1YsYUFBYTtDQUNiLGVBQWU7Q0FDZixnQkFBZ0I7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLDhCQUE4QjtFQUM5QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFlBQVk7RUFDWixjQUFjO0VBQ2QsWUFBWTtFQUNaLG9DQUFvQztFQUNwQyw2QkFBNkI7RUFDN0IsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUEsd0JBQXdCOztBQUV4QjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQSxXQUFXOztBQUVYO0VBQ0Usa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixhQUFhO0VBQ2Isc0JBQXNCOztBQUV4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsOENBQThDO0VBQzlDLDJDQUEyQztFQUMzQyxzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFNBQVM7RUFDVCxtQkFBbUI7RUFDbkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxXQUFXO0VBQ1gsVUFBVTtFQUNWLHFDQUFxQztFQUNyQyx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLE9BQU87RUFDUCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLDhDQUE4QztFQUM5QyxRQUFRO0VBQ1IscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQiwyQkFBMkI7O0VBRTNCOzs7O2NBSVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUNBQW1DO0VBQ25DLE9BQU87RUFDUCxnQkFBZ0I7RUFDaEIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYiw4Q0FBOEM7RUFDOUMsUUFBUTtFQUNSLHFCQUFxQjtFQUNyQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiBtb250c2VycmF0LHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmh0bWwsIGJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHdpZHRoOiAxMDB2dztcXHJcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXHJcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4jYmFja2dyb3VuZENvbnRhaW5lciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgei1pbmRleDogLTE7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgd2lkdGg6IDEwMHZ3O1xcclxcblxcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxcclxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMTY0KSwgXFxyXFxuICAgIHJnYmEoMCwgMCwgMCwgMC43KVxcclxcbiAgKSxcXHJcXG4gIHVybChcXFwiLi9pbWFnZXMvd2VhdGhlckJhY2tncm91bmQuanBnXFxcIik7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5Db250YWluZXIge1xcclxcbiAgaGVpZ2h0OiA5MCU7XFxyXFxuICB3aWR0aDogOTAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IDJmciAxZnIgLyAxZnIgMWZyO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBVcHBlciBMZWZ0IERpc3BsYXkgKi9cXHJcXG5cXHJcXG4jdXBwZXJMZWZ0IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgLyogYm9yZGVyOiAxcHggc29saWQgcmVkOyAqL1xcclxcbiAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpbkZvcmVjYXN0LCAjbWFpblRlbXBlcmF0dXJlIHtcXHJcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4jbWFpblRlbXBlcmF0dXJlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jbG9jYXRpb24sICNkYXRlLCAjdGltZSB7XFxyXFxuICBmb250LXNpemU6IDEuMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG5cXHRiYWNrZ3JvdW5kOiBub25lO1xcclxcblxcdGNvbG9yOiBpbmhlcml0O1xcclxcblxcdGJvcmRlcjogbm9uZTtcXHJcXG5cXHRwYWRkaW5nOiAwO1xcclxcblxcdGZvbnQ6IGluaGVyaXQ7XFxyXFxuXFx0Y3Vyc29yOiBwb2ludGVyO1xcclxcblxcdG91dGxpbmU6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbiNzd2l0Y2hUZW1wZXJhdHVyZUJ1dHRvbiB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuI21haW5JY29uIHtcXHJcXG4gIHdpZHRoOiA2MHB4O1xcclxcbiAgaGVpZ2h0OiA2MHB4O1xcclxcbiAgcGFkZGluZzogMTBweCAwcHg7XFxyXFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuI3NlYXJjaENvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xcclxcbiAgd2lkdGg6IDIwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jc2VhcmNoSWNvbkNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogMS4zcmVtO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgbGVmdDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXHJcXG4gIHdpZHRoOiAxNjBweDtcXHJcXG4gIGhlaWdodDogMS4xcmVtO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgLyogYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlOyAqL1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxyXFxuICB0ZXh0LWluZGVudDogN3B4O1xcclxcbiAgZm9udC1zaXplOiAwLjlyZW07XFxyXFxuICBwYWRkaW5nOiAycHg7XFxyXFxufVxcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTo6cGxhY2Vob2xkZXIge1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl06Zm9jdXMge1xcclxcbiAgb3V0bGluZS13aWR0aDogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogVXBwZXIgUmlnaHQgRGlzcGxheSAqL1xcclxcblxcclxcbiN1cHBlclJpZ2h0IHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcclxcbn1cXHJcXG5cXHJcXG4jYWxpZ25SaWdodCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGdhcDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyUmlnaHRDb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTBweDtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLnVwcGVyUmlnaHRDb250YWluZXIgPiBkaXYgPiBwIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb25Db250YWluZXIge1xcclxcbiAgd2lkdGg6IDNyZW07XFxyXFxufVxcclxcblxcclxcbi51cHBlckxlZnRUZXh0IHtcXHJcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBGb290ZXIgKi9cXHJcXG5cXHJcXG4jZm9vdGVyIHtcXHJcXG4gIGdyaWQtY29sdW1uOiAxIC8gMztcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7ICovXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5SG91cmx5Q29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDEwcHg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4jZGFpbHlIb3VybHlDb250YWluZXIgYnV0dG9uIHtcXHJcXG4gIHBhZGRpbmc6IDZweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuI2RhaWx5QnV0dG9uLmJvcmRlciwgI2hvdXJseUJ1dHRvbi5ib3JkZXIge1xcclxcbiAgLyogYm9yZGVyOiAycHggc29saWQgd2hpdGU7ICovXFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xcclxcbiAgLW1vei1ib3gtc2hhZG93Omluc2V0IDBweCAwcHggMHB4IDJweCB3aGl0ZTtcXHJcXG4gIGJveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAwcHggMnB4IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uZGFpbHlGb3JlY2FzdEdyaWQuc2hvdywgLmhvdXJseUZvcmVjYXN0R3JpZC5zaG93IHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxufVxcclxcblxcclxcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lciB7XFxyXFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxMHB4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBhZGRpbmctdG9wOiA0cHg7XFxyXFxufVxcclxcblxcclxcbiNob3Vyc1NlbGVjdGlvbkNvbnRhaW5lci5zaG93IHtcXHJcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxyXFxufVxcclxcblxcclxcbi5hcnJvdyB7XFxyXFxuICB3aWR0aDogMzdweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRvdCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0b3A6IC0xcHg7XFxyXFxuICBoZWlnaHQ6IDdweDtcXHJcXG4gIHdpZHRoOiA3cHg7XFxyXFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLDApOyAqL1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2Y1ZjVmNTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmRhaWx5Rm9yZWNhc3RHcmlkIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBncmlkLXRlbXBsYXRlOiAxZnIgLyByZXBlYXQoNywgMWZyKTtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGF5Q2FyZCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogMy41cmVtIDEuNXJlbSAwLjlyZW0gNjBweCAvIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXHJcXG5cXHJcXG4gIC8qIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiAxMHB4OyAqL1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5TmFtZSwgI2hvdXJOYW1lIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5TWF4VGVtcCwgI2hvdXJUZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbiNkYXlNaW5UZW1wIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4jZGF5SWNvbiwgI2hvdXJJY29uIHtcXHJcXG4gIHdpZHRoOiA3MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udGVzdEJvcmRlciB7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseUZvcmVjYXN0R3JpZCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogMWZyIC8gcmVwZWF0KDgsIDFmcik7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIHJlZDsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJDYXJkIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlOiAzLjVyZW0gMS41cmVtIDAuOXJlbSA2MHB4IC8gMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4jaG91ckljb24ge1xcclxcbiAgZ3JpZC1yb3c6IDQgLyA1O1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuaW1wb3J0IHtcclxuICBnZXRXZWF0aGVyRGF0YSxcclxuICBleHRyYWN0VXBwZXJMZWZ0RGF0YSxcclxuICBleHRyYWN0VXBwZXJSaWdodERhdGEsXHJcbiAgZXh0cmFjdEZvb3RlcmRhdGEsXHJcbn0gZnJvbSBcIi4vYXBpSGFuZGxlclwiO1xyXG5pbXBvcnQge1xyXG4gIHNldHVwUGFnZSxcclxuICByZW5kZXJVcHBlckxlZnRDb3JuZXIsXHJcbiAgcmVuZGVyVXBwZXJSaWdodENvcm5lcixcclxuICByZW5kZXJGb290ZXIsXHJcbn0gZnJvbSBcIi4vZG9tSGFuZGxlclwiO1xyXG5cclxuLypcclxuLU9ubHkgZ2V0IHdlYXRoZXIgZGF0YTpcclxuICAgIC1vbiBwYWdlIGxvYWRcclxuICAgIC13aGVuIHRoZSBzZWFyY2ggZm9ybSBoYXMgYSB2YWxpZCBpbnB1dFxyXG4qL1xyXG5cclxuLy8gUmVuZGVyIGluaXRhbCBwYWdlIHdpdGggd2VhdGhlciBkYXRhXHJcbmFzeW5jIGZ1bmN0aW9uIHJlbmRlclBhZ2UobG9jYXRpb24sIGNlbGNpdXMpIHtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0V2VhdGhlckRhdGEobG9jYXRpb24pO1xyXG4gIGxldCB1cHBlckxlZnREYXRhO1xyXG4gIGxldCB1cHBlclJpZ2h0RGF0YTtcclxuICBsZXQgZm9vdGVyRGF0YTtcclxuXHJcbiAgaWYgKGNlbGNpdXMpIHtcclxuICAgIHVwcGVyTGVmdERhdGEgPSBhd2FpdCBleHRyYWN0VXBwZXJMZWZ0RGF0YShkYXRhLmN1cnJlbnRDZWxjaXVzKTtcclxuICAgIHVwcGVyUmlnaHREYXRhID0gYXdhaXQgZXh0cmFjdFVwcGVyUmlnaHREYXRhKGRhdGEuY3VycmVudENlbGNpdXMpO1xyXG4gICAgZm9vdGVyRGF0YSA9IGF3YWl0IGV4dHJhY3RGb290ZXJkYXRhKFxyXG4gICAgICBkYXRhLmZvcmVjYXN0Q2VsY2l1cyxcclxuICAgICAgZGF0YS5jdXJyZW50Q2VsY2l1cyxcclxuICAgICk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVwcGVyTGVmdERhdGEgPSBhd2FpdCBleHRyYWN0VXBwZXJMZWZ0RGF0YShkYXRhLmN1cnJlbnRGYWhyZW5oZWl0KTtcclxuICAgIHVwcGVyUmlnaHREYXRhID0gYXdhaXQgZXh0cmFjdFVwcGVyUmlnaHREYXRhKGRhdGEuY3VycmVudEZhaHJlbmhlaXQpO1xyXG4gICAgZm9vdGVyRGF0YSA9IGF3YWl0IGV4dHJhY3RGb290ZXJkYXRhKFxyXG4gICAgICBkYXRhLmZvcmVjYXN0RmFocmVuaGVpdCxcclxuICAgICAgZGF0YS5jdXJyZW50RmFocmVuaGVpdCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHJlbmRlclVwcGVyTGVmdENvcm5lcih1cHBlckxlZnREYXRhKTtcclxuICByZW5kZXJVcHBlclJpZ2h0Q29ybmVyKHVwcGVyUmlnaHREYXRhKTtcclxuICByZW5kZXJGb290ZXIoZm9vdGVyRGF0YS5kYWlseSwgZm9vdGVyRGF0YS5ob3VybHkpO1xyXG59XHJcblxyXG4vLyBTZXQgdXAgcGFnZSAtLT4gTk8gd2VhdGhlciBjYWxsc1xyXG5zZXR1cFBhZ2UoKTtcclxucmVuZGVyUGFnZShcIkNhbGdhcnlcIiwgdHJ1ZSk7XHJcbiJdLCJuYW1lcyI6WyJnZXRMb2NhdGlvbkNvb3JkaW5hdGVzIiwibG9jYXRpb24iLCJjb29yZGluYXRlc1Byb21zZSIsImZldGNoIiwiY29vcmRpbmF0ZXNPYmplY3QiLCJqc29uIiwicmVzdWx0cyIsIm5hbWUiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInRpbWV6b25lIiwiRXJyb3IiLCJlcnJvciIsImJ1aWxkRmV0Y2hVUkwiLCJjb29yZGluYXRlUHJvbWlzZSIsImN1cnJlbnRPckZvcmVjYXN0IiwiY2VsY2l1c09yRmFocmVuaGVpdCIsImNvb3JkaW5hdGVEYXRhIiwidXJsIiwiZmV0Y2hDdXJyZW50V2VhdGhlckRhdGEiLCJ1cmxQcm9taXNlIiwid2VhdGhlckRhdGFSZXNwb25zZSIsIm1vZGUiLCJ3ZWF0aGVyRGF0YUpTT04iLCJnZXRXZWF0aGVyRGF0YSIsImNvb3JkaW5hdGVzIiwidXJsMSIsInVybDIiLCJ1cmwzIiwidXJsNCIsImFsbFdlYXRoZXJEYXRhIiwiUHJvbWlzZSIsImFsbCIsIm1hcHBlZFdlYXRoZXJEYXRhIiwiY3VycmVudENlbGNpdXMiLCJjdXJyZW50RmFocmVuaGVpdCIsImZvcmVjYXN0Q2VsY2l1cyIsImZvcmVjYXN0RmFocmVuaGVpdCIsImNvbnNvbGUiLCJsb2ciLCJpbnRlcnByZXRXZWF0aGVyQ29kZSIsImNvZGUiLCJmb3JtYXREYXRlIiwic3RyaW5nIiwidXRjRGF0ZSIsIkRhdGUiLCJmb3JtYXR0ZWRVdGNEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwid2Vla2RheSIsInllYXIiLCJtb250aCIsImRheSIsImZvcm1hdFRpbWUiLCJ0aW1lWm9uZSIsInNob3J0ZW5lZCIsInRpbWUiLCJzZXRNaW51dGVzIiwiTWF0aCIsInJvdW5kIiwiZ2V0TWludXRlcyIsIm9wdGlvbnMiLCJob3VyIiwibWludXRlIiwiZm9ybWF0dGVkVGltZSIsIkludGwiLCJEYXRlVGltZUZvcm1hdCIsImZvcm1hdCIsImV4dHJhY3RVcHBlckxlZnREYXRhIiwid2VhdGhlckRhdGFQcm9taXNlIiwiZGF0YSIsIm1haW5Gb3JlY2FzdCIsImN1cnJlbnQiLCJ3ZWF0aGVyX2NvZGUiLCJ1cHBlckxlZnREYXRhIiwiZGF0ZSIsInRlbXBlcmF0dXJlIiwidGVtcGVyYXR1cmVfMm0iLCJjdXJyZW50X3VuaXRzIiwiZXh0cmFjdFVwcGVyUmlnaHREYXRhIiwidXBwZXJSaWdodERhdGEiLCJmZWVsc0xpa2UiLCJhcHBhcmVudF90ZW1wZXJhdHVyZSIsImh1bWlkaXR5IiwicmVsYXRpdmVfaHVtaWRpdHlfMm0iLCJwcmVjaXBpdGF0aW9uIiwid2luZFNwZWVkIiwid2luZF9zcGVlZF8xMG0iLCJleHRyYWN0Rm9vdGVyZGF0YSIsImRhaWx5RGF0YVByb21pc2UiLCJob3VybHlEYXRhUHJvbWlzZSIsImRhaWx5RGF0YSIsImhvdXJseURhdGEiLCJmb290ZXJEYXRhIiwiZGFpbHkiLCJob3VybHkiLCJpIiwidGVtcGVyYXR1cmVfMm1fbWF4IiwibGVuZ3RoIiwiY29tcGlsZWREYXRhIiwibWF4VGVtcCIsIm1pblRlbXAiLCJ0ZW1wZXJhdHVyZV8ybV9taW4iLCJ3ZWF0aGVyQ29kZSIsInB1c2giLCJob3VybHlfdW5pdHMiLCJzZWFyY2hJY29uIiwiZmVlbHNMaWtlSWNvbiIsImh1bWlkaXR5SWNvbiIsInByZWNpcGl0YXRpb25JY29uIiwid2luZFNwZWVkSWNvbiIsImxlZnRBcnJvd0ljb24iLCJyaWdodEFycm93SWNvbiIsImNsZWFyU2t5IiwicGFydGx5Q2xvdWR5IiwiZm9nZ3kiLCJkcml6emxlIiwiZnJlZXppbmdEcml6emxlIiwicmFpbiIsImZyZWV6aW5nUmFpbiIsInNub3dmYWxsIiwic25vd0dyYWlucyIsInJhaW5TaG93ZXJzIiwic25vd1Nob3dlcnMiLCJ0aHVuZGVyU3Rvcm1Cb3RoIiwiY2xlYXJTa3lDIiwicGFydGx5Q2xvdWR5QyIsImZvZ2d5QyIsImRyaXp6bGVDIiwiZnJlZXppbmdEcml6emxlQyIsInJhaW5DIiwiZnJlZXppbmdSYWluQyIsInNub3dmYWxsQyIsInNub3dHcmFpbnNDIiwicmFpblNob3dlcnNDIiwic25vd1Nob3dlcnNDIiwidGh1bmRlclN0b3JtQm90aEMiLCJ3ZWF0aGVySWNvbnMiLCJ3ZWF0aGVySWNvbnNDcm9wcGVkIiwicmVuZGVySW1hZ2UiLCJwYXJlbnQiLCJpbWFnZSIsImltYWdlRWxlbWVudCIsIkltYWdlIiwic3JjIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJJY29ucyIsInNlYXJjaEljb25Db250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmVlbHNMaWtlQ29udGFpbmVyIiwiaHVtaWRpdHlDb250YWluZXIiLCJwcmVjaXBpdGF0aW9uQ29udGFpbmVyIiwid2luZFNwZWVkQ29udGFpbmVyIiwibGVmdEljb25Db250YWluZXIiLCJyaWdodEljb25Db250YWluZXIiLCJjcm9wcGVkIiwiaW1hZ2VzVG9Vc2UiLCJyZW5kZXJGb3JlY2FzdEljb25zIiwiaWNvbkNvZGVzIiwiY2FyZHNDb2xsZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRheUljb25Db250YWluZXIiLCJjaGlsZHJlbiIsInJlbmRlckN1cnJlbnRJY29uIiwiaWNvbkNvZGUiLCJtYWluSWNvbkNvbnRhaW5lciIsInRvZ2dsZUZvcmVjYXN0Q2FyZHMiLCJ0b2dnbGVIb3VybHlDYXJkcyIsImRhaWx5Rm9yZWNhc3RDYXJkc0dyaWQiLCJxdWVyeVNlbGVjdG9yIiwiaG91cmx5Rm9yZWNhc3RDYXJkc0dyaWQiLCJkYWlseUJ1dHRvbiIsImhvdXJseUJ1dHRvbiIsImhvdXJzU2VsZWN0aW9uQnV0dG9ucyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldHVwTGlzdGVuZXJzIiwiZGFpbHlGb3JlY2FzdEJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJob3VybHlGb3JlY2FzdEJ1dHRvbiIsInJlbmRlclVwcGVyTGVmdENvcm5lciIsImRhdGFQcm9taXNlIiwibWFpbkZvcmVjYXN0RWxlbWVudCIsImxvY2F0aW9uRWxlbWVudCIsImRhdGVFbGVtZW50IiwidGltZUVsZW1lbnQiLCJ0ZW1wZXJhdHVyZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsInJlbmRlclVwcGVyUmlnaHRDb3JuZXIiLCJmZWVsc0xpa2VFbGVtZW50IiwiaHVtaWRpdHlFbGVtZW50IiwicHJlY2lwaXRhdGlvbkVsZW1lbnQiLCJ3aW5kU3BlZWRFbGVtZW50IiwicmVuZGVyRm9vdGVyIiwiZm9yZWNhc3RQcm9taXNlIiwiY3VycmVudFByb21pc2UiLCJmb3JlY2FzdERhdGEiLCJjdXJyZW50RGF0YSIsImRheUNhcmRFbGVtZW50cyIsInJlbmRlcldlYXRoZXJEYXRhIiwic2V0dXBQYWdlIiwicmVuZGVyUGFnZSIsImNlbGNpdXMiXSwic291cmNlUm9vdCI6IiJ9