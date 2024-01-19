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

function formatTime(timeZone, shortened, time) {
  let utcDate = new Date();
  if (time) {
    utcDate = new Date(time);
  }

  if (shortened) {
    utcDate.setMinutes(Math.round(utcDate.getMinutes() / 60) * 60);
  }
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone,
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
    utcDate,
  );
  return formattedTime;
}

async function extractUpperLeftData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const mainForecast = interpretWeatherCode(data[0].current.weather_code);
  const upperLeftData = {
    mainForecast,
    location: data[1],
    date: formatDate(data[0].current.time),
    time: formatTime(data[0].current.timezone, false),
    temperature: `${data[0].current.temperature_2m} ${data[0].current_units.temperature_2m}`,
  };
  return upperLeftData;
}

async function extractUpperRightData(weatherDataPromise) {
  const data = await weatherDataPromise;
  const upperRightData = {
    feelsLike: `${data[0].current.apparent_temperature} ${data[0].current_units.apparent_temperature}`,
    humidity: `${data[0].current.relative_humidity_2m} ${data[0].current_units.relative_humidity_2m}`,
    precipitation: `${data[0].current.precipitation} ${data[0].current_units.precipitation}`,
    windSpeed: `${data[0].current.wind_speed_10m} ${data[0].current_units.wind_speed_10m}`,
  };
  return upperRightData;
}

async function extractFooterdata(dailyDataPromise, hourlyDataPromise) {
  const dailyData = await dailyDataPromise;
  const hourlyData = await hourlyDataPromise;
  // Fill in and return this object
  const footerData = {
    daily: [],
    hourly: [],
  };
  // Fill in daily data
  for (let i = 0; i < dailyData.daily.temperature_2m_max.length; i += 1) {
    const compiledData = {
      maxTemp: dailyData.daily.temperature_2m_max[i],
      minTemp: dailyData.daily.temperature_2m_min[i],
      weatherCode: dailyData.daily.weather_code[i],
    };
    footerData.daily.push(compiledData);
  }
  // Fill in hourly data
  for (let i = 0; i < hourlyData[0].hourly.temperature_2m.length; i += 1) {
    const compiledData = {
      time: formatTime(
        hourlyData[0].timezone,
        true,
        hourlyData[0].hourly.time[i],
      ),
      temperature: `${hourlyData[0].hourly.temperature_2m[i]} ${hourlyData[0].hourly_units.temperature_2m}`,
      weatherCode: hourlyData[0].hourly.weather_code[i],
    };
    footerData.hourly.push(compiledData);
  }
  return footerData;
}

export {
  getWeatherData,
  extractUpperLeftData,
  extractUpperRightData,
  extractFooterdata,
};
