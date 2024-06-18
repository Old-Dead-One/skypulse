"use strict";

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://api.weather.gov/stations/ksgu/observations"
  );
  const data = await response.json();
  const currentWeather = data.features[0].properties;

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
});

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch(
    "https://api.weather.gov/gridpoints/SLC/20,19/forecast"
  );
  const data = await response.json();
  const weather7Day = data.properties.periods;

  for (let i = 0; i < 7; i++) {
    const dayIndex = i * 2;
    const nextDayIndex = dayIndex + 1;

    const dayName = weather7Day[dayIndex].name;
    const dayHigh = weather7Day[dayIndex].temperature;
    const dayLow = weather7Day[nextDayIndex].temperature;

    document.getElementById(`day${i + 1}Name`).innerHTML = dayName;
    document.getElementById(`day${i + 1}High`).innerHTML = dayHigh;
    document.getElementById(`day${i + 1}Low`).innerHTML = dayLow;
  }

  // const todayName = weather7Day[0].name;
  // const todayHigh = weather7Day[0].temperature;
  // // const todayLow = weather7Day[1].temperature;
  // const day2Name = weather7Day[1].name;
  // const day2High = weather7Day[1].temperature;
  // const day2Low = weather7Day[2].temperature;
  // const day3Name = weather7Day[3].name;
  // const day3High = weather7Day[3].temperature;
  // const day3Low = weather7Day[4].temperature;
  // const day4Name = weather7Day[5].name;
  // const day4High = weather7Day[5].temperature;
  // const day4Low = weather7Day[6].temperature;
  // const day5Name = weather7Day[7].name;
  // const day5High = weather7Day[7].temperature;
  // const day5Low = weather7Day[8].temperature;
  // const day6Name = weather7Day[9].name;
  // const day6High = weather7Day[9].temperature;
  // const day6Low = weather7Day[10].temperature;
  // const day7Name = weather7Day[11].name;
  // const day7High = weather7Day[11].temperature;
  // const day7Low = weather7Day[12].temperature;

  // document.getElementById("todayName").innerHTML = todayName;
  // document.getElementById("todayHigh").innerHTML = todayHigh;
  // // document.getElementById("todayLow").innerHTML = todayLow;
  // document.getElementById("day2Name").innerHTML = day2Name;
  // document.getElementById("day2High").innerHTML = day2High;
  // document.getElementById("day2Low").innerHTML = day2Low;
  // document.getElementById("day3Name").innerHTML = day3Name;
  // document.getElementById("day3High").innerHTML = day3High;
  // document.getElementById("day3Low").innerHTML = day3Low;
  // document.getElementById("day4Name").innerHTML = day4Name;
  // document.getElementById("day4High").innerHTML = day4High;
  // document.getElementById("day4Low").innerHTML = day4Low;
  // document.getElementById("day5Name").innerHTML = day5Name;
  // document.getElementById("day5High").innerHTML = day5High;
  // document.getElementById("day5Low").innerHTML = day5Low;
  // document.getElementById("day6Name").innerHTML = day6Name;
  // document.getElementById("day6High").innerHTML = day6High;
  // document.getElementById("day6Low").innerHTML = day6Low;
  // document.getElementById("day7Name").innerHTML = day7Name;
  // document.getElementById("day7High").innerHTML = day7High;
  // document.getElementById("day7Low").innerHTML = day7Low;
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
    <p class="alertAreaDesc style= text-info">${alerts.areaDesc}</p>
    <p class="alertEvent style= text-warning">${alerts.event}</p>
    <p class="alertInstructions style= text-secondary">${alerts.instruction}</p>`;

  return div;
}

document.addEventListener("DOMContentLoaded", async function () {
  const response = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast");
  const data = await response.json();
  const weather7Day = data.properties.periods;

  let labels = [];
  let dailyHighs = [];
  let dailyLows = [];

  for (let i = 0; i < weather7Day.length / 2; i++) {
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
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});