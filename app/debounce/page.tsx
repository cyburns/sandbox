"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [city, setCity] = useState("");
  const [citySuggestions, setCitySuggestions] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [cityData, setCityData] = useState<any>([]);

  const endpoint = `https://jsonmock.hackerrank.com/api/weather?name=${city}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          method: "GET",
        });

        const jsonObj = await response.json();

        if (!selectedCity) {
          jsonObj.data.forEach((city: any) => {
            setCitySuggestions([...citySuggestions, city.name]);
          });
        }
        console.log("jsonObj.data[0] -->", jsonObj.data[0]);
        setCityData(jsonObj.data[0]);
      } catch (error) {
        console.error("Error getting weather data:", error);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className="h-screen flex pt-20 items-center bg-black flex-col">
      <h1 className="text-4xl font-bold text-center">Debounce</h1>
      <p className="text-center text-lg mt-5">
        This is a page for the debounce example
      </p>
      <input
        type="text"
        name="Search..."
        id="1"
        className="bg-white rounded-lg p-3 mt-10 text-black"
        placeholder="Search..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />

      {selectedCity ? (
        <div className="mt-10">
          <p className="text-white">Selected City: {selectedCity}</p>
          <p className="text-white">{cityData.weather}</p>
          {cityData.status.map((stat, i) => (
            <p key={i} className="text-white">
              {stat}
            </p>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {citySuggestions.map((city: any, index: number) => (
            <p
              key={index}
              className="text-white"
              onClick={() => {
                setCitySuggestions([]);
                setCity(city);
                setSelectedCity(city);
              }}
            >
              {city}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
