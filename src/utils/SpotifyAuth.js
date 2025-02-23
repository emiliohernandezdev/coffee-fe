import axios from "axios";

// Configuración de Spotify
const CLIENT_ID = "71ee94f03f164016b9a3770d5375e3ef"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

// Generar la URL de autorización para que el usuario inicie sesión
export const getSpotifyAuthURL = () => {
  const scope = "user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative";
  return `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
};

// Obtener el token de acceso usando el código de autorización
export const getSpotifyToken = async (code) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el token:", error);
    return null;
  }
};
