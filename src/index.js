import "./style.css";
import {
  getWeatherData,
  extractUpperLeftData,
  extractUpperRightData,
  extractFooterdata,
} from "./apiHandler";
import {
  setupPage,
  renderUpperLeftCorner,
  renderUpperRightCorner,
  renderFooter,
} from "./domHandler";

/*
-Only get weather data:
    -on page load
    -when the search form has a valid input
*/

// Render inital page with weather data
async function renderPage(location, celcius) {
  const data = await getWeatherData(location);
  let upperLeftData;
  let upperRightData;
  let footerData;

  if (celcius) {
    upperLeftData = await extractUpperLeftData(data.currentCelcius);
    upperRightData = await extractUpperRightData(data.currentCelcius);
    footerData = await extractFooterdata(
      data.forecastCelcius,
      data.currentCelcius,
    );
  } else {
    upperLeftData = await extractUpperLeftData(data.currentFahrenheit);
    upperRightData = await extractUpperRightData(data.currentFahrenheit);
    footerData = await extractFooterdata(
      data.forecastFahrenheit,
      data.currentFahrenheit,
    );
  }
  renderUpperLeftCorner(upperLeftData);
  renderUpperRightCorner(upperRightData);
  renderFooter(footerData.daily, footerData.hourly);
}

// Set up page --> NO weather calls
setupPage();
renderPage("Vancouver", true);
