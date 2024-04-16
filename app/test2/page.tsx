"use client";

import { useEffect, useState } from "react";

const API_URL = "https://randomuser.me/api/?results=20";

const page = () => {
  const [count, setCount] = useState(0);
  const [randomUserData, setRandomUserData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortedAsc, setIsSortedAsc] = useState(false);

  useEffect(() => {
    const getRandomUserApi = async () => {
      setIsLoading(true);

      try {
        const resposne = await fetch(API_URL, {
          method: "GET",
        });

        const jsonObj = await resposne.json();
        const locationArray: any[] = [];

        jsonObj.results.forEach((item: any) => {
          const { location } = item;

          const singleLocal = {
            street: `${location.street.name}, ${location.street.number}`,
            city: location.city,
            state: location.state,
            counry: location.country,
            postcode: location.postcode,
          };

          locationArray.push(singleLocal);
        });

        setRandomUserData(locationArray);
      } catch (error) {
        console.error("Error getting random user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRandomUserApi();
  }, [API_URL]);

  const sortedData = randomUserData?.sort((a: any, b: any) => {
    if (isSortedAsc) {
      return a.city.localeCompare(b.city);
    } else {
      return b.city.localeCompare(a.city);
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="">
        <p className="">
          The count is: <code className="font-mono font-bold">{count}</code>
        </p>
      </div>

      <table className="text-2xl bg-green-500 p-10 m-10">
        <thead>
          <tr>
            <th>Street</th>
            <th>
              City{" "}
              <span
                className="active:text-red-500"
                onClick={() => setIsSortedAsc(!isSortedAsc)}
              >
                (^)
              </span>
            </th>
            <th>State</th>
            <th>Country</th>
            <th>PostCode</th>
          </tr>
        </thead>

        {sortedData && (
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.street}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
                <td>{item.postcode}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="mb-56">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-blue-900 px-10 py-5 rounded-lg m-7"
        >
          Increase count
        </button>
      </div>
    </main>
  );
};

export default page;
