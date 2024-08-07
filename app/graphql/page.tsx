"use client";

import React, { useEffect, useState } from "react";
import client from "@/lib/apollo-client";
import { gql, ApolloError } from "@apollo/client";

const GET_GAMES = gql`
  query GetGames {
    games {
      title
      platform
      reviews {
        rating
        content
      }
    }
  }
`;

interface Game {
  id: string;
  title: string;
  platform: string[];
  reviews: {
    rating: number;
    content: string;
  }[];
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<Game[] | null>(null);
  const [error, setError] = useState<ApolloError | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await client.query({
          query: GET_GAMES,
          fetchPolicy: "cache-first",
        });
        setGames(data.games);
      } catch (error: any) {
        setError(error);
        console.error("Error getting games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games.</div>;
  if (!games) return <div>No games found.</div>;

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1>Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="m-3 rounded-lg bg-slate-800 p-10">
            {game.title} - {game.platform.join(", ")}
            {game.reviews.length > 0 && `(${game.reviews.length} reviews)`}
            {game.reviews.reduce((acc, review) => acc + review.rating, 0) /
              game.reviews.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
