import React from "react";
import useSWR, { SWRConfig } from "swr";
import debounce from "lodash-es/debounce";
import Search from "../components/search";
import UnitsToggle from "../components/units-toggle";
import WeatherCard from "../components/weather-card";
import {
  getCurrentWeather,
  getForecast,
  mapResponseProperties,
} from "../lib/helpers";
import fetcher from "../lib/fetcher";
import Container from "../components/container";
import { signIn, useSession } from "next-auth/client"

const searchTimeoutInMs = 500;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getStaticProps() {
  const currentWeather = await getCurrentWeather();
  const forecast = await getForecast();

  return {
    props: {
      fallback: {
        currentWeatherApiUrl: currentWeather,
        forecastApiUrl: forecast,
      },
    },
  };
}

function Weather() {
  const [location, setLocation] = React.useState("Eldoret");
  const [units, setUnits] = React.useState("metric");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const endpoint = `?q=${location}&units=${units}&APPID=${apiKey}`;
  const currentWeatherApiUrl = `${apiUrl}/weather/${endpoint}`;
  const forecastApiUrl = `${apiUrl}/forecast/${endpoint}`;

  const { data: currentWeatherData, error: weatherError } = useSWR(
    currentWeatherApiUrl,
    fetcher
  );
  const currentWeather = currentWeatherData
    ? mapResponseProperties(currentWeatherData)
    : null;

  const { data: forecastData, error: forecastError } = useSWR(
    forecastApiUrl,
    fetcher
  );
  const forecast =
    forecastData?.list && Object.entries(forecastData).length
      ? forecastData.list
          .filter((f) => f.dt_txt.match(/09:00:00/))
          .map(mapResponseProperties)
      : null;

  const handleLocationChange = (event) => {
    const query = event.target.value.trim();
    if (query) {
      setIsSearching(true);
    }
    debounceSearch(query);
  };

  const debounceSearch = React.useMemo(
    () =>
      debounce((searchTerm) => {
        setDebouncedSearchTerm(searchTerm);
      }, searchTimeoutInMs),
    []
  );

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
  };

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      setLocation(debouncedSearchTerm);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <Container>
      <Search
        location={location}
        isSearching={isSearching}
        onLocationChange={handleLocationChange}
      />
      <div className="shadow-xl rounded-lg h-auto overflow-hidden max-w-2xl m-auto divide-y-2 divide-light-blue-400">
        <WeatherCard
          error={weatherError || forecastError}
          units={units}
          weather={currentWeather}
          forecast={forecast}
        />
      </div>
      <UnitsToggle units={units} onUnitsChange={handleUnitsChange} />
    </Container>
  );
}

export default function Home({ fallback }) {
    const [session, loading] = useSession()
    if (loading){
      return <></>
    }
    return (
      <>
        {!session && (
          signIn() &&
          <>
          </>
        )}
        {session && (
          <>
             <SWRConfig value={{ fallback }}>
        <Weather />
      </SWRConfig>
          </>
        )}
      </>
    )
  }
