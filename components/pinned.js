import { BsPinAngleFill, BsPinFill } from "react-icons/bs";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Pinned({ weatherKey }) {
  // Check card status
  const { data, error, mutate } = useSWR(
    "/api/isPinned?weatherKey=" + weatherKey,
    fetcher
  );

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const isPinned = data.isPinned;
  
  // Pin the weather card
  async function pinWeatherCard() {
    const res = await fetch("/api/pinWeather", {
      method: "POST",
      body: JSON.stringify({ weatherKey: weatherKey }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();

    if (res.ok && result) {
      alert("Location has been pinned to dashboard")
      mutate()
    }
  }
  
  // Unpin the weather card
  async function unpinWeatherCard() {
    const res = await fetch("/api/unpinWeather", {
      method: "POST",
      body: JSON.stringify({ weatherKey: weatherKey }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();

    if (res.ok && result) {
      alert("Location has been unpinned from dashboard")
      mutate()
    }
  }
  if (isPinned) {
    return (
      <div className="text-2xl sm:text-3xl text-indigo-700 dark:text-white">
      <button
        type="button"
        id="toggle-units"
        aria-expanded="false"
        aria-haspopup="true"
        onClick={unpinWeatherCard}
      >
        <span className="sr-only">Unpin This Location</span>
        <span title="Unpin This Location">
          <BsPinAngleFill />
        </span>
      </button>
      </div>
    );
  } else {
    return (
      <div className="text-2xl sm:text-3xl text-indigo-700 dark:text-white">
        <button
          type="button"
          id="toggle-units"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={pinWeatherCard}
        >
          <span className="sr-only">Pin This Location</span>
          <span title="Pin This Location">
            <BsPinFill />
          </span>
        </button>
      </div>
    );
  }
}
