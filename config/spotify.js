const axios = require("axios");
const qs = require("qs");

const getAccessToken = async () => {
  try {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({
      grant_type: "client_credentials",
      client_id: `${client_id}`,
      client_secret: `${client_secret}`,
    });

    const response = await axios.post(token_url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error.message);
    throw error;
  }
};

module.exports = { getAccessToken };
