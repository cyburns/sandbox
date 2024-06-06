"use client";

import React, { useState } from "react";

const Page = () => {
  const [encryptedPath, setEncryptedPath] = useState("");

  const getEmailEndpoint = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/proxy/email/cyrusburns@gmail.com"
      );

      const json = await response.json();
      console.log("Response One ---->", json);
      setEncryptedPath(json.encrypted_path);
      secondPath(json.encrypted_path);
    } catch (error) {
      console.log("Error getting email endpoint", error);
    }
  };

  const secondPath = async (path) => {
    try {
      const response = await fetch(
        `http://localhost:3001/proxy/encrypted/${path}`
      );

      const json = await response.json();
      console.log("Response Two ---->", json);
      setEncryptedPath(json.encrypted_path);

      fetchNextChallenge(json.encrypted_path);
    } catch (error) {
      console.log("Error in encrypted endpoint", error);
    }
  };

  function encodeBase64Url(str) {
    const base64 = Buffer.from(str).toString("base64");
    const base64Url = base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Url;
  }

  async function fetchNextChallenge(path) {
    const encodedPath = encodeBase64Url(path);
    console.log("Path ---->", path, "Encoded Path ---->", encodedPath);

    try {
      const response = await fetch(
        `http://localhost:3001/proxy/encoded/${encodeURIComponent(encodedPath)}`
      );

      const data = await response.json();
      console.log("Next Challenge Data -------->", data);
    } catch (error) {
      console.error("Error fetching the next challenge:", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button className="bg-blue-500 p-5 rounded-xl" onClick={getEmailEndpoint}>
        Get Email Endpoint
      </button>
    </div>
  );
};

export default Page;
