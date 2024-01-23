import "./style.css";
import {
  getWeatherData,
  extractUpperLeftData,
  extractUpperRightData,
  extractFooterdata,
  searchLocation,
} from "./apiHandler";
import {
  renderIcons,
  setupListeners,
  renderPage,
  showErrorModal,
  removeErrorModal,
  showInvalidInputModal,
  hideInvalidInputModal,
  showLoadingModal,
  hideLoadingModal,
} from "./domHandler";
import handle from "./errorHandler";

async function extractData(data) {
  // Extract both the Celecius and Fahrenheit data only once, then just
  // display/reredender the desired temperature value in domHandler
  const [upperLeftDataCelcius, error1] = await handle(
    extractUpperLeftData(data.currentCelcius),
  );
  const [upperRightDataCelcius, error2] = await handle(
    extractUpperRightData(data.currentCelcius),
  );
  const [footerDataCelcius, error3] = await handle(
    extractFooterdata(data.forecastCelcius, data.currentCelcius),
  );

  const [upperLeftDataFahrenheit, error4] = await handle(
    extractUpperLeftData(data.currentFahrenheit),
  );
  const [upperRightDataFahrenheit, error5] = await handle(
    extractUpperRightData(data.currentFahrenheit),
  );
  const [footerDataFahrenheit, error6] = await handle(
    extractFooterdata(data.forecastFahrenheit, data.currentFahrenheit),
  );

  if (error1 || error2 || error3 || error4 || error5 || error6) {
    throw new Error("Error while extracting weather data");
  }

  return {
    upperLeftDataCelcius,
    upperRightDataCelcius,
    footerDataCelcius,
    upperLeftDataFahrenheit,
    upperRightDataFahrenheit,
    footerDataFahrenheit,
  };
}

const renderCelcius = true;
let extractedData;

async function fetchDataAndRenderPage(location) {
  // Fetch data
  const [fetchedData, fetchingError] = await handle(getWeatherData(location));
  if (fetchingError) throw new Error(fetchingError);

  // Extract data
  const [extractedDataLocal, extractingError] = await handle(
    extractData(fetchedData),
  );
  if (extractingError) throw new Error(extractingError);
  extractedData = extractedDataLocal;

  // Render data
  renderPage(
    extractedData.upperLeftDataCelcius,
    extractedData.upperRightDataCelcius,
    extractedData.footerDataCelcius,
  );
  return "Fetch and render success!";
}

function clearSearchBar() {
  const searchBarInput = document.getElementById("searchBar");
  searchBarInput.value = "";
}

function executeSearch(locationString) {
  fetchDataAndRenderPage(locationString)
    .then(() => {
      window.renderCelcius = renderCelcius;
      window.extractedData = extractedData;
      hideInvalidInputModal();
    })
    .catch(() => {
      showInvalidInputModal();
    });
  clearSearchBar();
}

function setupSearchBarListener() {
  const form = document.getElementById("searchContainer");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const locationString = searchLocation();
    if (locationString) {
      executeSearch(locationString);
    }
  });

  const searchBarSubmitButton = document.getElementById("searchIconContainer");
  searchBarSubmitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const locationString = searchLocation();
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

showLoadingModal();
renderIcons();
setupListeners();
setupSearchBarListener();
fetchDataAndRenderPage("Calgary")
  .then(() => {
    console.log("Inital fetch and render success!");
    window.renderCelcius = renderCelcius;
    window.extractedData = extractedData;
    removeErrorModal();
    hideLoadingModal();
  })
  .catch((error) => {
    console.log(error);
    showErrorModal();
  });
