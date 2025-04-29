import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTokenRequested, setIsTokenRequested] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code && !isTokenRequested) {
      setIsTokenRequested(true);

      // Limpia el código de la URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      exchangeCodeForToken(code, navigate);
    } else if (!code) {
      navigate("/error?message=No se pudo obtener el código de autorización");
    }
  }, [location, navigate, isTokenRequested]);

  return <div>Procesando autenticación de Spotify...</div>;
}

const getCurrentPlayback = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");
  
    if (!accessToken) {
      console.error("No hay token de acceso");
      return;
    }
  
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Reproducción actual:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

const exchangeCodeForToken = async (code, navigate) => {
    const clientId = "";
    const clientSecret = "";
    const redirectUri = "http://192.168.0.12:5173/callback";
  
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
        }
      );
  
      console.log("Respuesta de Spotify:", response.data);
  
      // Guarda los tokens en localStorage
      localStorage.setItem("spotify_access_token", response.data.access_token);
      localStorage.setItem("spotify_refresh_token", response.data.refresh_token);
      localStorage.setItem("spotify_scopes", response.data.scope);
  
      navigate("/");
    } catch (error) {
    //   console.error("Error:", error.response ? error.response.data : error.message);
    //   navigate("/error");
    }
  };

export default Callback;