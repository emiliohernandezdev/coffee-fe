// Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extraer el access_token de la URL
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        if (item) {
          const parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    if (hash.access_token) {
      localStorage.setItem('spotify_token', hash.access_token);
    }

    // Redirigir al usuario a la página principal
    navigate('/');
  }, [navigate]);

  return <div>Cargando...</div>;
};

export default Callback;