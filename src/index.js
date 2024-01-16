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

async function getWeatherForLocation(location) {
  try {
    const weatherDataResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=ba28fb17cfeb4cddac8203519241301&q=${location}`,
      { mode: "cors" },
    );
    const weatherDataJSON = await weatherDataResponse.json();
    console.log(weatherDataJSON);
    return weatherDataJSON;
  } catch (error) {
    console.log("Error while fetching weather data", error);
    return error;
  }
}

const promise = getWeatherForLocation("Calgary");
console.log(promise);

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
