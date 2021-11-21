import React from "react";
import useSWR from "swr";
import NextLink from "next/link";
import UnitsToggle from "../components/units-toggle";
import WeatherCard from "../components/weather-card";
import { mapResponseProperties } from "../lib/helpers";
import fetcher from "../lib/fetcher";
import Container from "../components/container";
import { signIn, useSession } from "next-auth/client";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function multiFetcher(...urls) {
  const f = (u) => fetch(u).then((r) => r.json());

  if (urls.length > 1) {
    return Promise.all(urls.map(f));
  }
  return f(urls);
}

function Dashboard() {
  const [units, setUnits] = React.useState("metric");
  const { data: pinnedLocations } = useSWR("/api/getAllPinned", fetcher);
  const { data: currentWeatherInfo } = useSWR(
    () =>
      pinnedLocations.locations.map(
        (location) =>
          `${apiUrl}/weather/?q=${location}&units=${units}&APPID=${apiKey}`
      ),
    multiFetcher
  );
  const { data: currentForcastInfo } = useSWR(
    () =>
      pinnedLocations.locations.map(
        (location) =>
          `${apiUrl}/forecast/?q=${location}&units=${units}&APPID=${apiKey}`
      ),
    multiFetcher
  );
  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
  };

  return (
    <Container fluid>
      <div className="flex flex-wrap my-2">
        <p className="flex-auto tracking-tight text-2xl dark:text-white font-bold font-custom bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-gray-500 to-green-300">
          <UnitsToggle units={units} onUnitsChange={handleUnitsChange} />
        </p>
        <NextLink href="/search">
          <a className="text-indigo-500 hover:text-indigo-700 text-lg font-medium">
            + Add New Location
          </a>
        </NextLink>
      </div>
      <div class="grid grid-cols-2 gap-4">
        {pinnedLocations?.locations?.length == 1 && (
          <div className="shadow-xl rounded-lg h-auto overflow-hidden max-w-2xl m-auto divide-y-2 divide-light-blue-400">
            <WeatherCard
              disablePins
              units={units}
              weather={
                currentWeatherInfo
                  ? mapResponseProperties(currentWeatherInfo)
                  : null
              }
              forecast={
                currentForcastInfo ?.list &&
                Object.entries(currentForcastInfo).length
                  ? currentForcastInfo.list
                      .filter((f) => f.dt_txt.match(/09:00:00/))
                      .map(mapResponseProperties)
                  : null
              }
            />
          </div>
        )}
        {pinnedLocations?.locations?.length > 1 &&
          pinnedLocations.locations.map((location, index) => {
            return (
              <div className="shadow-xl rounded-lg h-auto overflow-hidden max-w-2xl m-auto divide-y-2 divide-light-blue-400">
                <WeatherCard
                  disablePins
                  units={units}
                  weather={
                    currentWeatherInfo && currentWeatherInfo[index]
                      ? mapResponseProperties(currentWeatherInfo[index])
                      : null
                  }
                  forecast={
                    currentForcastInfo &&
                    currentForcastInfo[index]?.list &&
                    Object.entries(currentForcastInfo[index]).length
                      ? currentForcastInfo[index].list
                          .filter((f) => f.dt_txt.match(/09:00:00/))
                          .map(mapResponseProperties)
                      : null
                  }
                />
              </div>
            );
          })}
        {}
      </div>
    </Container>
  );
}

export default function Home() {
  const [session, loading] = useSession();
  if (loading) {
    return <></>;
  }
  return (
    <>
      {!session && signIn() && <></>}
      {session && <Dashboard />}
    </>
  );
}
