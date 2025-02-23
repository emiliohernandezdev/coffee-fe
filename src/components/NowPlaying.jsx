import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSpotifyToken } from "../utils/spotifyAuth"; // Ruta al archivo donde está tu lógica de token

const NowPlaying = () => {
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const fetchNowPlaying = async () => {
    try {
      // Obtén el token de acceso sin autorización del usuario
      const accessToken = await getSpotifyToken();

      if (!accessToken) {
        setError("No se pudo obtener el token de acceso.");
        setLoading(false);
        return;
      }

      // Realiza la solicitud para obtener el estado de reproducción
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 && response.data.item) {
        setSong(response.data.item);
      } else {
        setError("No hay canción en reproducción.");
        setSong(null);
      }
    } catch (error) {
      console.error("Error obteniendo la canción:", error);
      setError("Error al obtener la canción.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : song ? (
        <div>
          <h2>{song.name}</h2>
          <p>{song.artists.map((artist) => artist.name).join(", ")}</p>
          <img src={song.album.images[0].url} alt="Cover" />
        </div>
      ) : (
        <p>No hay música en reproducción.</p>
      )}
    </div>
  );
};

export default NowPlaying;
