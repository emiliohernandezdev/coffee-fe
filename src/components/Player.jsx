import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";

const SpotifyPlayerSDK = () => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
  
    if (!token) {
      setError("No hay token de acceso.");
      setLoading(false);
      return;
    }
  
    if (!window.Spotify) {
      setError("El SDK de Spotify no está cargado.");
      setLoading(false);
      return;
    }
  
    // Inicializar el reproductor
    const player = new window.Spotify.Player({
      name: "Mi Reproductor",
      getOAuthToken: (cb) => { cb(token); },
      volume: 0.5,
    });
  
    // Manejar eventos
    player.addListener("ready", ({ device_id }) => {
      console.log("Reproductor listo con el ID:", device_id);
      setLoading(false);
    });
  
    player.addListener("player_state_changed", (state) => {
      if (state) {
        setIsPlaying(!state.paused);
        setCurrentTrack(state.track_window.current_track);
      }
    });
  
    player.addListener("authentication_error", ({ message }) => {
      setError(`Error de autenticación: ${message}`);
      setLoading(false);
    });
  
    player.addListener("initialization_error", ({ message }) => {
      setError(`Error de inicialización: ${message}`);
      setLoading(false);
    });
  
    player.addListener("account_error", ({ message }) => {
      setError(`Error de cuenta: ${message}`);
      setLoading(false);
    });
  
    player.addListener("playback_error", ({ message }) => {
      setError(`Error de reproducción: ${message}`);
    });
  
    // Conectar el reproductor
    player.connect();
    setPlayer(player);
  
    // Limpiar al desmontar el componente
    return () => {
      player.disconnect();
    };
  }, []);

  const controlPlayback = (action) => {
    if (!player) {
      setError("El reproductor no está listo.");
      return;
    }

    switch (action) {
      case "play":
        player.resume();
        break;
      case "pause":
        player.pause();
        break;
      case "next":
        player.nextTrack();
        break;
      case "previous":
        player.previousTrack();
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <CardContent>
        {currentTrack ? (
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src={currentTrack.album.images[0].url}
              alt={currentTrack.album.name}
              style={{ width: 80, height: 80, borderRadius: 8, marginRight: 16 }}
            />
            <Box>
              <Typography variant="h6">{currentTrack.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Álbum: {currentTrack.album.name}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1">
            No se está reproduciendo nada en este momento.
          </Typography>
        )}
        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton onClick={() => controlPlayback("previous")}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={() => controlPlayback(isPlaying ? "pause" : "play")}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={() => controlPlayback("next")}>
            <SkipNext />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpotifyPlayerSDK;