const express = require("express");
const dotenv = require("dotenv");
const { getAccessToken } = require("./config/spotify");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/api/test", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    res.json({
      message: "Successfully connected to Spotify API",
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to connect to Spotify API` });
    console.log(`error:`, error);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to Music Apparatus");
  console.log("req:", req);
  console.log("result:", res);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
