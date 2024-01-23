function formatDate(timeZone) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone,
  };
  const formattedDate = new Date().toLocaleString("en-US", options);
  return formattedDate;
}

function getTimeInTimezone(timeZone) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    timeZone,
    timeZoneName: "short",
  };
  const adjustedTime = new Date().toLocaleString("en-US", options);
  return adjustedTime;
}

function formatTime(time) {
  const militaryTime = new Date(time);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = militaryTime.toLocaleString("en-US", options);
  return formattedTime;
}

// Function to get the suffix for the day (e.g., "st", "nd", "rd", "th")
function getNumberSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDay(inputString, timezone) {
  const inputDate = new Date(`${inputString}T00:00:00`);
  const options = {
    weekday: "long",
    timeZone: timezone,
  };
  const formattedDate = inputDate.toLocaleString("en-US", options);
  const dayOfMonth = inputDate.getDate();
  const suffix = getNumberSuffix(dayOfMonth);
  const formattedDateWithTh = `${formattedDate} ${dayOfMonth}${suffix}`;
  return formattedDateWithTh;
}

function isolateCurrentHourIndex(timeZone) {
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    timeZone,
    hour12: false, // Ensure 24-hour format
  });

  const hour = parseInt(currentTime, 10);
  return hour;
}

export {
  formatDate,
  getTimeInTimezone,
  formatTime,
  formatDay,
  isolateCurrentHourIndex,
};
