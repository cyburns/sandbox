"use client";

import React, { useEffect, useState } from "react";
import { Sparkline } from "@mantine/charts";

const Page = () => {
  const [username, setUsername] = useState("");
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCommits = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/events`
      );

      const events = await response.json();
      const pushEvents = events.filter(
        (event: any) => event.type === "PushEvent"
      );

      const commitsData = pushEvents.map((event: any) => ({
        repoName: event.repo.name,
        commits: event.payload.commits.map((commit: any) => ({
          message: commit.message,
          sha: commit.sha,
          url: commit.url,
          author: commit.author.name,
          date: commit.author.date,
        })),
      }));

      setCommits(commitsData);
    } catch (error) {
      setError(
        "Error fetching commits. Please check the username and try again."
      );
      console.error("Error fetching commits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <input
        className="bg-gray-200 h-20 w-96 text-black text-2xl"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-900 text-2xl px-10 py-5 rounded-xl m-10"
        onClick={fetchCommits}
      >
        Get Commits
      </button>

      {isLoading && <p className="text-3xl text-white">Loading commits...</p>}

      {error && <p className="text-3xl text-red-500">{error}</p>}

      {commits && commits.length > 0 && (
        <div>
          <Sparkline
            w={200}
            h={60}
            data={[10, 20, 40, 20, 40, 10, 50]}
            curveType="linear"
            color="blue"
            fillOpacity={0.6}
            strokeWidth={2}
          />
          {commits.map((repoCommits, index) => (
            <div key={index} className="mb-4">
              <ul className="text-white">
                {/* @ts-ignore */}
                {repoCommits.commits.map((commit: any, index: number) => (
                  <li key={index}>
                    <p>
                      <strong>Message:</strong> {commit.message}
                    </p>
                    <p>
                      <strong>Author:</strong> {commit.author}
                    </p>
                    <p>
                      <strong>Date:</strong> {commit.date}
                    </p>
                    <a
                      href={commit.url}
                      className="text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Commit
                    </a>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
