import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
import * as recommendations from "./recommendations.json";
import * as weatherIcons from "./icons.json";

const iconPrefix = "wi wi-";
const location = "Eldoret";
const units = "metric";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiEndpoint = `?q=${location}&units=${units}&APPID=${apiKey}`;

export async function getCurrentWeather() {
  let data = await fetch(`${apiUrl}/weather/${apiEndpoint}`).then((r) =>
    r.json()
  );

  return {
    currentWeather: data ? mapResponseProperties(data) : null,
  };
}

export async function getForecast() {
  let data = await fetch(`${apiUrl}/forecast/${apiEndpoint}`).then((r) =>
    r.json()
  );
  return {
    forecast:
      data?.list && Object.entries(data).length
        ? data.list
            .filter((f) => f.dt_txt.match(/09:00:00/))
            .map(mapResponseProperties)
        : null,
  };
}

export function mapResponseProperties(data) {
  const mapped = {
    location: data.name,
    condition: data.cod,
    country: data.sys.country,
    date: data.dt,
    description: data.weather[0].description,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    temperature: Math.round(data.main.temp),
    timezone: data.timezone / 3600, // convert from seconds to hours
    wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
  };

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
    mapped.forecastIcon =
      iconPrefix + weatherIcons.default["day"][mapped.icon_id].icon;
  }

  if (mapped.sunset || mapped.sunrise) {
    mapped.currentTime = dayjs
      .utc(dayjs.unix(mapped.date))
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunrise = dayjs
      .utc(dayjs.unix(mapped.sunrise))
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunset = dayjs
      .utc(dayjs.unix(mapped.sunset))
      .utcOffset(mapped.timezone)
      .format();
    mapped.isDay =
      mapped.currentTime > mapped.sunrise && mapped.currentTime < mapped.sunset
        ? true
        : false;

    mapped.weatherIcon =
      iconPrefix +
      weatherIcons.default[mapped.isDay ? "day" : "night"][mapped.icon_id].icon;
    mapped.weatherRecommendation =
      recommendations.default[mapped.isDay ? "day" : "night"][
        mapped.icon_id
      ].recommendation;
  }

  if (data.weather[0].description) {
    mapped.description =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = Math.round(data.main.temp_max);
    mapped.min = Math.round(data.main.temp_min);
  }

  // remove undefined fields
  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key]
  );

  return mapped;
}