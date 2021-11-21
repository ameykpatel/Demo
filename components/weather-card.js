import React from "react";
import dayjs from "dayjs";
import Loading from "./loading";
import Pinned from "./pinned";
import ErrorIllustration from "./error-illustration";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

export default function WeatherCard({ error, units, weather, forecast, disablePins }) {
  const isMetric = units.match(/metric/i) ? true : false;
  if (!weather || !forecast) return <Loading />;
  if (error)
    return (
      <p>
        <ErrorIllustration />
        <p className="font-extrabold bg-clip-text text-2xl text-center m-1 mt-0 text-transparent bg-gradient-to-r from-indigo-700 to-green-300">
          {error.message}
        </p>
      </p>
    );
  if (
    (weather && Object.keys(weather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <>
        <div className="m-5">
          <div className="sm mt-6 my-10">

            <div className="flex flex-wrap my-2">
              <p className="flex-auto tracking-tight text-2xl dark:text-white font-bold font-custom bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-gray-500 to-green-300">
              {weather.location}, {weather.country}
              </p>
              <Pinned weatherKey={weather.location+","+weather.country}/>
            </div>
            <div className="flex flex-wrap my-2">
              <p className="flex-auto text-gray-500 dark:text-gray-400 tracking-wide font-bold">
                {weather.description}
              </p>
              <p className="text-gray-500 dark:text-gray-400 tracking-wide">
                {dayjs(dayjs.unix(weather.date)).format("dddd")},{" "}
                {dayjs
                  .utc(dayjs.unix(weather.date))
                  .utcOffset(weather.timezone)
                  .format("h:mm A")}
              </p>
            </div>
          </div>
          <div className="flex my-6 h-auto tracking-wide">
            <div className="text-gray-500 text-left flex-auto m-auto">
              <span className="text-5xl sm:text-6xl dark:text-white font-mono bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-indigo-700">
                {weather.temperature}&deg;
                <span className="text-xl sm:text-3xl font-bold">
                  {isMetric ? `C` : `F`}
                </span>
              </span>
              <span className="mt-2 flex flex-col dark:text-gray-400 tracking-wide">
                Feels like {weather.feels_like}&deg;
              </span>{" "}
            </div>
            <div className="text-7xl sm:text-9xl text-indigo-700 dark:text-white">
              <span className={weather.weatherIcon}></span>
            </div>
          </div>
          <div className="flex my-2 text-gray-500">
            <span className="dark:text-white tracking-wide mr-4">
              <span className="wi wi-strong-wind text-indigo-700 text-xl mr-2"></span>
              {weather.wind_speed}
              {isMetric ? `m/s` : `mph`} winds
            </span>
            <span className="dark:text-white tracking-wide">
              <span className="wi wi-humidity text-indigo-700 text-xl mr-2"></span>
              {weather.humidity}% humidity
            </span>
          </div>
          <div className="text-center text-2xl text-gray-500 dark:text-white tracking-wide my-8 font-sans">
            {weather.weatherRecommendation}
          </div>
        </div>
        <div className="m-4">
          {forecast?.map((item, index) => {
            return (
              <ul className="mt-4" key={index}>
                <li className="flex flex-row text-gray-500 dark:text-white p-1">
                  <span className="flex-1 text-left">
                    {dayjs(item.dt_txt).format("dddd")}
                  </span>
                  <span className="text-indigo-700 dark:text-white text-2xl">
                    <span className={item.forecastIcon}></span>
                  </span>
                  <span className="flex-1 text-right">
                    {item.min}&deg; / {item.max}&deg;
                  </span>
                </li>
              </ul>
            );
          })}
        </div>
      </>
    );
  }
}
