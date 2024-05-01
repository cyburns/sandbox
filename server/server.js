// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const response = await fetch(`https://ciphersprint.pulley.com/${email}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/proxy/:encryptedPath", async (req, res) => {
  const { encryptedPath } = req.params;
  console.log(encryptedPath);
  try {
    // Make a request to the external API using the encrypted path
    const response = await fetch(
      `https://ciphersprint.pulley.com/${encryptedPath}`
    );
    const data = await response.json();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server is running on port 3001");
});