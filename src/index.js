import "./style.css";
import searchIcon from "./images/searchIcon.svg";
import feelsLikeIcon from "./images/feelsLikeIcon.svg";
import humidityIcon from "./images/humidityIcon.svg";
import precipitationIcon from "./images/precipitationIcon.svg";
import windSpeedIcon from "./images/windIcon.svg";
// import backgroud from "./images/weatherBackground.jpg";
// import testImage from "./images/testImage.png";
import getWeatherData from "./apiHandler";

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
}
renderIcons();
getWeatherData("new york city");
