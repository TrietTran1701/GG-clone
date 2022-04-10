import React, { createContext, useContext, useState } from "react";

// Context provides a way to pass data through the component tree
// without having to pass props down manually at every level

//Context is primarily used when some data needs to be
// accessible by many components at different nesting levels

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (type) => {
    setIsLoading(true);
    const response = fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        "X-RapidAPI-Key": "06ce0e4d42mshbf319892cbdf6d0p14c7a0jsn90522dc2c018",
      },
    });
    const data = await response.json();
    // console.log(data);
    setResults(data);
    setIsLoading(false);

    return (
      <ResultContext.Provider
        value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
      >
        {children}
      </ResultContext.Provider>
    );
  };
};

export const useResultContext = () => useContext(ResultContext);
