import "./style.css";
import testImage from "./images/testImage.png";
import getWeatherData from "./apiHandler";

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

function interpretWeatherCode(code) {
  return code;
}

getWeatherData("new york city");
interpretWeatherCode(3);
