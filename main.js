"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  const currentWeatherResponse = await fetch(
    "https://api.weather.gov/stations/ksgu/observations"
  );
  const currentWeatherData = await currentWeatherResponse.json();
  const currentWeather = currentWeatherData.features[0].properties;

  const shortForecast = currentWeather.textDescription;
  const currentTemp = Math.round(
    (currentWeather.temperature.value * 9) / 5 + 32
  );

  const relativeHumidity = Math.round(currentWeather.relativeHumidity.value);
  const windSpeed = Math.round(currentWeather.windSpeed.value);
  const heatIndex = Math.round((currentWeather.heatIndex.value * 9) / 5 + 32);

  document.getElementById("shortForecast").innerHTML = shortForecast;
  document.getElementById("currentTemp").innerHTML = currentTemp;
  document.getElementById("relativeHumidity").innerHTML = relativeHumidity;
  document.getElementById("windSpeed").innerHTML = windSpeed;
  document.getElementById("heatIndex").innerHTML = heatIndex;

  const baseUrl = "https://api.weather.gov/alerts/active?area=UT";

  const alertResponse = await fetch(baseUrl);
  const alertData = await alertResponse.json();
  const currentAlerts = alertData.features;

  const locationTitle = alertData.title;
  document.getElementById("locationTitle").innerHTML = locationTitle;

  const contentElement = document.getElementById("alerts");

  for (let i = 0; i < currentAlerts.length; i++) {
    const alertElement = createAlertElement(currentAlerts[i].properties);
    contentElement.appendChild(alertElement);
  }

  const weather7DayResponse = await fetch(
    "https://api.weather.gov/gridpoints/SLC/20,19/forecast"
  );
  const weather7dayData = await weather7DayResponse.json();
  const weather7Day = weather7dayData.properties.periods;

  let labels = [];
  let dailyHighs = [];
  let dailyLows = [];

  for (let i = 0; i < weather7Day.length; i++) {
    const dayIndex = i * 2;
    const nextDayIndex = dayIndex + 1;

    if (weather7Day[dayIndex] && weather7Day[nextDayIndex]) {
      labels.push(weather7Day[dayIndex].name);
      dailyHighs.push(weather7Day[dayIndex].temperature);
      dailyLows.push(weather7Day[nextDayIndex].temperature);
    }
  }

  const ctx = document.getElementById("weatherTrend").getContext("2d");

  const weatherChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "High Temperatures",
          data: dailyHighs,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Low Temperatures",
          data: dailyLows,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

function createAlertElement(alerts) {
  const div = document.createElement("div");
  div.className = "alerts";

  div.innerHTML = `
    <p class="alertTitle style= text-primary"<${alerts.title}</p>
    <p class="alertAreaDesc style= text-info">${alerts.areaDesc}</p>
    <p class="alertEvent style= text-warning">${alerts.event}</p>
    <p class="alertInstructions style= text-secondary">${alerts.instruction}</p>`;

  return div;
}
