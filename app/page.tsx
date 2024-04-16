"use client";

import UserProfile from "@/components/UserProfile";
import { useEffect, useState } from "react";

const API_URL = "https://randomuser.me/api";

export default function Home() {
  const [count, setCount] = useState(0);
  const [randomUserData, setRandomUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRandomUserApi = async () => {
      setIsLoading(true);

      try {
        const resposne = await fetch(`${API_URL}/?page=${count}`, {
          method: "GET",
        });

        const jsonObj = await resposne.json();
        setRandomUserData(randomUserData.concat(jsonObj.results));
      } catch (error) {
        console.error("Error getting random user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRandomUserApi();
  }, [API_URL, count]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="">
        <p className="">
          The count is: <code className="font-mono font-bold">{count}</code>
        </p>
      </div>

      <div>
        {randomUserData.map((user, index) => (
          <UserProfile user={user} key={index} />
        ))}
      </div>
      <div className="mb-56">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-900 px-10 py-5 rounded-lg m-7"
        >
          Increase count
        </button>
        <button className="bg-blue-900 px-10 py-5 rounded-lg m-7">
          <a href="/gitHub">GitHub</a>
        </button>
        <button className="bg-blue-900 px-10 py-5 rounded-lg m-7">
          <a href="/test2">Test 2</a>
        </button>
      </div>
    </main>
  );
}
