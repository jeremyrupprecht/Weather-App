// Other Icons
import searchIcon from "./images/searchIcon.svg";
import feelsLikeIcon from "./images/feelsLikeIcon.svg";
import humidityIcon from "./images/humidityIcon.svg";
import precipitationIcon from "./images/precipitationIcon.svg";
import windSpeedIcon from "./images/windIcon.svg";
import leftArrowIcon from "./images/arrowLeft.svg";
import rightArrowIcon from "./images/arrowRight.svg";
import loadingGif from "./images/loading.gif";

// Weather Icons
import clearSky from "./images/weatherCodeIcons/clearSky.svg";
import partlyCloudy from "./images/weatherCodeIcons/partlyCloudy.svg";
import foggy from "./images/weatherCodeIcons/foggy.svg";
import drizzle from "./images/weatherCodeIcons/drizzle.svg";
import freezingDrizzle from "./images/weatherCodeIcons/freezingDrizzle.svg";
import rain from "./images/weatherCodeIcons/rain.svg";
import freezingRain from "./images/weatherCodeIcons/freezingRain.svg";
import snowfall from "./images/weatherCodeIcons/snowfall.svg";
import snowGrains from "./images/weatherCodeIcons/snowGrains.svg";
import rainShowers from "./images/weatherCodeIcons/rainShowers.svg";
import snowShowers from "./images/weatherCodeIcons/snowShowers.svg";
import thunderStormBoth from "./images/weatherCodeIcons/thunderStormBoth.svg";

// Cropped Weather Icons
import clearSkyC from "./images/weatherCodeIconsCropped/clearSkyCropped.svg";
import partlyCloudyC from "./images/weatherCodeIconsCropped/partlyCloudyCropped.svg";
import foggyC from "./images/weatherCodeIconsCropped/foggyCropped.svg";
import drizzleC from "./images/weatherCodeIconsCropped/drizzleCropped.svg";
import freezingDrizzleC from "./images/weatherCodeIconsCropped/freezingDrizzleCropped.svg";
import rainC from "./images/weatherCodeIconsCropped/rainCropped.svg";
import freezingRainC from "./images/weatherCodeIconsCropped/freezingRainCropped.svg";
import snowfallC from "./images/weatherCodeIconsCropped/snowfallCropped.svg";
import snowGrainsC from "./images/weatherCodeIconsCropped/snowGrainsCropped.svg";
import rainShowersC from "./images/weatherCodeIconsCropped/rainShowersCropped.svg";
import snowShowersC from "./images/weatherCodeIconsCropped/snowShowersCropped.svg";
import thunderStormBothC from "./images/weatherCodeIconsCropped/thunderStormBothCropped.svg";

const weatherIcons = [
  clearSky,
  partlyCloudy,
  foggy,
  drizzle,
  freezingDrizzle,
  rain,
  freezingRain,
  snowfall,
  snowGrains,
  rainShowers,
  snowShowers,
  thunderStormBoth,
];

const weatherIconsCropped = [
  clearSkyC,
  partlyCloudyC,
  foggyC,
  drizzleC,
  freezingDrizzleC,
  rainC,
  freezingRainC,
  snowfallC,
  snowGrainsC,
  rainShowersC,
  snowShowersC,
  thunderStormBothC,
];

function renderImage(parent, image) {
  const imageElement = new Image();
  imageElement.src = image;
  parent.appendChild(imageElement);
}

function renderIcons() {
  // Searchbar icon
  const searchIconContainer = document.getElementById("searchIconContainer");
  renderImage(searchIconContainer, searchIcon);

  // Upper right icons
  const feelsLikeContainer = document.getElementById("feelsLikeIcon");
  renderImage(feelsLikeContainer, feelsLikeIcon);

  const humidityContainer = document.getElementById("humidityIcon");
  renderImage(humidityContainer, humidityIcon);

  const precipitationContainer = document.getElementById("precipitationIcon");
  renderImage(precipitationContainer, precipitationIcon);

  const windSpeedContainer = document.getElementById("windSpeedIcon");
  renderImage(windSpeedContainer, windSpeedIcon);

  // Hourly forecast arrows
  const leftIconContainer = document.getElementById("leftArrow");
  renderImage(leftIconContainer, leftArrowIcon);

  const rightIconContainer = document.getElementById("rightArrow");
  renderImage(rightIconContainer, rightArrowIcon);

  // Loading gif
  const container = document.getElementById("loadingModal");
  renderImage(container, loadingGif);
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
    const dayIconContainer =
      cardsCollection[i].children[cardsCollection[i].children.length - 1];
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
  const hoursSelectionButtons = document.getElementById(
    "hoursSelectionContainer",
  );

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
    hourCardElements[i].children[0].textContent =
      currentData[i].time.toLowerCase();
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
  const chunkToShow = document.getElementById(
    `eightHourChunk${eightHourChunkId}`,
  );
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
  const nextDotId =
    (parseInt(currentlyActiveDotId, 10) + (rightArrow ? 1 : 2)) % 3;
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
  const upperLeftData = window.renderCelcius
    ? window.extractedData.upperLeftDataCelcius
    : window.extractedData.upperLeftDataFahrenheit;

  const upperRightData = window.renderCelcius
    ? window.extractedData.upperRightDataCelcius
    : window.extractedData.upperRightDataFahrenheit;

  const footerData = window.renderCelcius
    ? window.extractedData.footerDataCelcius
    : window.extractedData.footerDataFahrenheit;

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
    switchHoursDots[i].addEventListener("click", () =>
      switchHours(switchHoursDots[i]),
    );
  }
  const switchHoursArrowLeft = document.getElementById("leftArrow");
  const switchHoursArrowRight = document.getElementById("rightArrow");
  switchHoursArrowLeft.addEventListener("click", () =>
    switchHourUsingArrow(false),
  );
  switchHoursArrowRight.addEventListener("click", () =>
    switchHourUsingArrow(true),
  );

  const switchCelciusFahrenheit = document.getElementById(
    "switchTemperatureButton",
  );
  switchCelciusFahrenheit.addEventListener("click", () => {
    switchTemperatureUnit();
  });
}

export {
  renderIcons,
  setupListeners,
  renderPage,
  showErrorModal,
  removeErrorModal,
  showInvalidInputModal,
  hideInvalidInputModal,
  showLoadingModal,
  hideLoadingModal,
};
