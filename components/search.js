export default function Search({ isSearching, onLocationChange }) {
  return (
    <div className="flex mx-2 p-2 justify-start border-b border-gray-300 dark:border-white">
      <svg
        width="24"
        height="24"
        fill="none"
        className="mr-6 group-hover:text-gray-500 text-indigo-600 dark:text-white transition-colors duration-200"
      >
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <input
        type="search"
        role="search"
        onChange={onLocationChange}
        placeholder="Search for a location"
        className="w-2/3 dark:bg-black dark:text-white text-lg outline-none text-gray-600 placeholder-gray-500 focus:placeholder-gray-400 dark:placeholder-white"
      />
      {isSearching ? (
        <svg
          className="animate-spin mt-1 ml-6 h-5 w-5 text-indigo-700 dark:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <title>Search for a location</title>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            role="progressbar"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
    </div>
  );
}
