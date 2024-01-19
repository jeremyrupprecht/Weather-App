async function getLocationCoordinates(location) {
  try {
    const coordinatesPromse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`,
    );
    const coordinatesObject = await coordinatesPromse.json();
    if (coordinatesObject.results) {
      const { name, latitude, longitude, timezone } =
        coordinatesObject.results[0];
      return { name, latitude, longitude, timezone };
    }
    throw new Error("Error fetching location coordiantes");
  } catch (error) {
    throw new Error("Error fetching location coordiantes", error);
  }
}

async function buildFetchURL(
  coordinatePromise,
  currentOrForecast,
  celciusOrFahrenheit,
) {
  const coordinateData = await coordinatePromise;

  // Current data in Celcius
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}`;

  // Current data in Fahrenheit
  if (currentOrForecast === "Current" && celciusOrFahrenheit === "Fahrenheit") {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&forecast_days=1&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;

    // Forecast data in Celcius
  } else if (
    currentOrForecast === "Forecast" &&
    celciusOrFahrenheit === "Celcius"
  ) {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=${coordinateData.timezone}`;

    // Forecast data in Fahrenheit
  } else if (
    currentOrForecast === "Forecast" &&
    celciusOrFahrenheit === "Fahrenheit"
  ) {
    url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinateData.latitude}&longitude=${coordinateData.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=8&timezone=${coordinateData.timezone}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`;
  }
  return url;
}

async function fetchCurrentWeatherData(urlPromise) {
  const url = await urlPromise;
  try {
    const weatherDataResponse = await fetch(url, { mode: "cors" });
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

    const allWeatherData = await Promise.all([
      fetchCurrentWeatherData(url1),
      fetchCurrentWeatherData(url2),
      fetchCurrentWeatherData(url3),
      fetchCurrentWeatherData(url4),
    ]);
    const mappedWeatherData = {
      currentCelcius: [allWeatherData[0], coordinates.name],
      currentFahrenheit: [allWeatherData[1], coordinates.name],
      forecastCelcius: allWeatherData[2],
      forecastFahrenheit: allWeatherData[3],
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
    day: "numeric",
  });
  return formattedUtcDate;
}

function formatTime(timeZone) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone,
  };
  const utcDate = new Date();
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
    utcDate,
  );
  return formattedTime;
}

async function extractUpperLeftData(weatherDataPromise) {
  const data = await weatherDataPromise;
  console.log(data);
  const mainForecast = interpretWeatherCode(data[0].current.weather_code);
  const upperLeftData = {
    mainForecast,
    location: data[1],
    date: formatDate(data[0].current.time),
    time: formatTime(data[0].current.timezone),
    temperature: `${data[0].current.temperature_2m} ${data[0].current_units.temperature_2m}`,
  };
  return upperLeftData;
}

async function extractUpperRightData() {
  // console.log("upper right data!");
}

async function extractFooterdata() {
  // console.log("footer data!");
}

export {
  getWeatherData,
  extractUpperLeftData,
  extractUpperRightData,
  extractFooterdata,
};
