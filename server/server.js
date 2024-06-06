import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy/email/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const response = await fetch(`https://ciphersprint.pulley.com/${email}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/proxy/encrypted/:encryptedPath", async (req, res) => {
  const { encryptedPath } = req.params;
  try {
    const response = await fetch(
      `https://ciphersprint.pulley.com/${encryptedPath}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/proxy/encoded/:encodedPath", async (req, res) => {
  const { encodedPath } = req.params;
  try {
    const response = await fetch(
      `https://ciphersprint.pulley.com/${encodedPath}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server is running on port 3001");
});
