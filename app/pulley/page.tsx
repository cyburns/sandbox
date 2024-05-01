"use client";

import React, { useState } from "react";

const Page = () => {
  const [encryptedPath, setEncryptedPath] = useState("");

  const getEmailEndpoint = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/proxy/cyrusburns@gmail.com"
      );

      const json = await response.json();
      console.log("Response ONe---->", json.encrypted_path);
      setEncryptedPath(json.encrypted_path);
      secondPath();
    } catch (error) {
      console.log("Error getting email endpoint");
    }
  };

  const secondPath = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/proxy/${encryptedPath}`
      );

      const json = await response.json();

      console.log("Response TWo---->", json);
    } catch (error) {
      console.log("Error in encrypted endpoint", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button className="bg-blue-500 p-5 rounded-xl" onClick={getEmailEndpoint}>
        Get Email Endpoint
      </button>
    </div>
  );
};

export default Page;
