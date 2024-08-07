"use client";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "@/lib/apollo-client";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<any>(null);

  useEffect(() => {
    const GET_GAMES = gql`
      query {
        games {
          id
          title
          platform
        }
      }
    `;

    setIsLoading(true);

    const fetchGames = async () => {
      try {
        const { data } = await client.query({
          query: GET_GAMES,
        });

        setGames(data.games);
      } catch (error) {
        console.error("Error getting games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (!games) return <div>Loading...</div>;

  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.map((game: any) => (
          <li key={game.id}>
            {game.title} - {game.platform.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
