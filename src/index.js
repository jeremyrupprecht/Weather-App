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

function showErrorModal() {
  const errorModal = document.getElementById("errorModal");
  errorModal.classList.add("show");
}

// Render inital page with weather data
async function renderPage(dataPromise, celcius) {
  try {
    const data = await dataPromise;
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

    // Hide everything but the background until the fetched api data loads, if the
    // fetch call fails, then show an error message
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.classList.add("show");
    return "All good";
  } catch (error) {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.classList.remove("show");
    showErrorModal();
    return new Promise((resolve, reject) => {
      reject(new Error("Error rendering weather data"));
    });
  }
}

async function fetchDataOnPageLoad(location) {
  try {
    const data = await getWeatherData(location);
    return data;
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(new Error("Error while fetching weather data", error));
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
setupPage();
const fetchedData = fetchDataOnPageLoad("Calgary");
// Render initial page in celcius
renderPage(fetchedData, true)
  .then(() => {
    console.log("Render successful!");
  })
  .catch((error) => {
    console.log("Render falure!", error);
  });
