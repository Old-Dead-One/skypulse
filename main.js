"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly"
  );
  const data = await response.json();
  const currentWeather = data.properties.periods[0];

  const shortForecast = currentWeather.shortForecast;
  const currentTemp = currentWeather.temperature;
  const relativeHumidity = currentWeather.relativeHumidity.value;
  const windSpeed = currentWeather.windSpeed;
  const windDirection = currentWeather.windDirection;
  console.log(shortForecast);

  document.getElementById("shortForecast").innerHTML = shortForecast;
  document.getElementById("currentTemp").innerHTML = currentTemp;
  document.getElementById("relativeHumidity").innerHTML = relativeHumidity;
  document.getElementById("windSpeed").innerHTML = windSpeed;
  document.getElementById("windDirection").innerHTML = windDirection;
});

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://api.weather.gov/gridpoints/SLC/20,19/forecast"
  );
  const data = await response.json();
  const weather7Day = data.properties.periods;

  const todayName = weather7Day[0].name;
  const todayHigh = weather7Day[0].temperature;
  const todayLow = weather7Day[1].temperature;
  const day2Name = weather7Day[2].name;
  const day2High = weather7Day[2].temperature;
  const day2Low = weather7Day[3].temperature;
  const day3Name = weather7Day[4].name;
  const day3High = weather7Day[4].temperature;
  const day3Low = weather7Day[5].temperature;
  const day4Name = weather7Day[6].name;
  const day4High = weather7Day[6].temperature;
  const day4Low = weather7Day[7].temperature;
  const day5Name = weather7Day[8].name;
  const day5High = weather7Day[8].temperature;
  const day5Low = weather7Day[9].temperature;
  const day6Name = weather7Day[10].name;
  const day6High = weather7Day[10].temperature;
  const day6Low = weather7Day[11].temperature;
  const day7Name = weather7Day[12].name;
  const day7High = weather7Day[12].temperature;
  const day7Low = weather7Day[13].temperature;

  document.getElementById("todayName").innerHTML = todayName;
  document.getElementById("todayHigh").innerHTML = todayHigh;
  document.getElementById("todayLow").innerHTML = todayLow;
  document.getElementById("day2Name").innerHTML = day2Name;
  document.getElementById("day2High").innerHTML = day2High;
  document.getElementById("day2Low").innerHTML = day2Low;
  document.getElementById("day3Name").innerHTML = day3Name;
  document.getElementById("day3High").innerHTML = day3High;
  document.getElementById("day3Low").innerHTML = day3Low;
  document.getElementById("day4Name").innerHTML = day4Name;
  document.getElementById("day4High").innerHTML = day4High;
  document.getElementById("day4Low").innerHTML = day4Low;
  document.getElementById("day5Name").innerHTML = day5Name;
  document.getElementById("day5High").innerHTML = day5High;
  document.getElementById("day5Low").innerHTML = day5Low;
  document.getElementById("day6Name").innerHTML = day6Name;
  document.getElementById("day6High").innerHTML = day6High;
  document.getElementById("day6Low").innerHTML = day6Low;
  document.getElementById("day7Name").innerHTML = day7Name;
  document.getElementById("day7High").innerHTML = day7High;
  document.getElementById("day7Low").innerHTML = day7Low;
});

document.addEventListener("DOMContentLoaded", async function () {
  const baseUrl = "https://api.weather.gov/alerts/active?area=UT";

  const response = await fetch(baseUrl);
  const data = await response.json();
  const currentAlerts = data.features;

  const contentElement = document.getElementById("alerts");

  for (let i = 0; i < currentAlerts.length; i++) {
    const alertElement = createAlertElement(currentAlerts[i].properties);
    contentElement.appendChild(alertElement);
  }
});

function createAlertElement(alerts) {
  const div = document.createElement("div");
  div.className = "alerts";

  div.innerHTML = `
    <p class="text-secondary">${alerts.areaDesc}</p>
    <p class="text-warning">${alerts.headline}</p>`;

  return div;
};