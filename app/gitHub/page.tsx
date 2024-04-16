"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [count, setCount] = useState(0);
  const [randomUserData, setRandomUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [isDataFound, setIsDataFound] = useState<null | string>(null);

  const GITHUB_API_URL = `https://api.github.com/users/${username}/repos`;

  const getRandomUserApi = async () => {
    setIsLoading(true);

    try {
      const resposne = await fetch(GITHUB_API_URL, {
        method: "GET",
      });

      const jsonObj = await resposne.json();

      if (!jsonObj) {
        setIsDataFound("No data found please try another username.");
      }

      setRandomUserData(randomUserData.concat(jsonObj));
    } catch (error) {
      console.error("Error getting random user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen flex-col">
      <input
        className="bg-gray-200 h-20 w-96 text-black text-2xl"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="">
        <button
          className="bg-blue-900 text-2xl px-10 py-5 rounded-xl m-10"
          onClick={getRandomUserApi}
        >
          Get repos
        </button>
      </div>

      {isDataFound && (
        <div>
          <p className="text-3xl text-white">{isDataFound}</p>
        </div>
      )}

      {isLoading ? (
        <div>
          <p className="text-3xl text-white">Loading repos...</p>
        </div>
      ) : (
        <div>
          {randomUserData.length > 1 && (
            <img
              src={randomUserData[0].owner.avatar_url}
              alt="avatar"
              width={200}
              height={200}
              className="rounded-full"
            />
          )}
          {randomUserData.map((repo, index) => (
            <div key={index}>
              <p className="text-3xl text-white">{repo.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
