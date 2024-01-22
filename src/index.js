import "./style.css";
import {
  getWeatherData,
  extractUpperLeftData,
  extractUpperRightData,
  extractFooterdata,
  setupSearchBarListener,
} from "./apiHandler";
import { renderIcons, setupListeners, renderPage } from "./domHandler";

async function extractData(data) {
  try {
    const upperLeftDataCelcius = await extractUpperLeftData(
      data.currentCelcius,
    );
    const upperRightDataCelcius = await extractUpperRightData(
      data.currentCelcius,
    );
    const footerDataCelcius = await extractFooterdata(
      data.forecastCelcius,
      data.currentCelcius,
    );

    const upperLeftDataFahrenheit = await extractUpperLeftData(
      data.currentFahrenheit,
    );
    const upperRightDataFahrenheit = await extractUpperRightData(
      data.currentFahrenheit,
    );
    const footerDataFahrenheit = await extractFooterdata(
      data.forecastFahrenheit,
      data.currentFahrenheit,
    );
    return {
      upperLeftDataCelcius,
      upperRightDataCelcius,
      footerDataCelcius,
      upperLeftDataFahrenheit,
      upperRightDataFahrenheit,
      footerDataFahrenheit,
    };
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(new Error("Error extracting weather data"));
    });
  }
}

const renderCelcius = true;
let extractedData;
async function fetchDataAndRenderPage(location) {
  try {
    const fetchedData = await getWeatherData(location);
    extractedData = await extractData(fetchedData);
    renderPage(
      extractedData.upperLeftDataCelcius,
      extractedData.upperRightDataCelcius,
      extractedData.footerDataCelcius,
    );
    return "Good to Go!";
  } catch (error) {
    // Call to render the error modal
    renderPage("", "", "");
    return new Promise((resolve, reject) => {
      reject(
        new Error("Error while fetching and rendering weather data", error),
      );
    });
  }
}
/*
-Only fetch weather data:
    -On page load
    and
    -When the search form has a valid input
    NOT
    -when the page is rerendered in celcius or fahrenheit
*/
renderIcons();
setupListeners();
setupSearchBarListener();
fetchDataAndRenderPage("Calgary")
  .then((success) => {
    console.log(success);
    window.renderCelcius = renderCelcius;
    window.extractedData = extractedData;
  })
  .catch((error) => {
    console.log(error);
  });
