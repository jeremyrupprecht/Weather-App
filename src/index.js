import "./style.css";
import searchIcon from "./images/searchIcon.svg";
import feelsLikeIcon from "./images/feelsLikeIcon.svg";
import humidityIcon from "./images/humidityIcon.svg";
import precipitationIcon from "./images/precipitationIcon.svg";
import windSpeedIcon from "./images/windIcon.svg";
// import backgroud from "./images/weatherBackground.jpg";
// import testImage from "./images/testImage.png";
// import getWeatherData from "./apiHandler";
import leftArrowIcon from "./images/arrowLeft.svg";
import rightArrowIcon from "./images/arrowRight.svg";

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

// Move these to dom?

function renderImage(parent, image) {
  const imageElement = new Image();
  imageElement.src = image;
  // imageElement.classList.add("testBorder");
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
    const dayIconContainer =
      cardsCollection[i].children[cardsCollection[i].children.length - 1];
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

renderIcons();
renderCurrentIcon(56);
renderForecastIcons([71, 77, 80, 85, 95, 61, 66], false);
renderForecastIcons([71, 77, 80, 85, 95, 61, 66, 0], true);

setupListeners();
// getWeatherData("new york city");
