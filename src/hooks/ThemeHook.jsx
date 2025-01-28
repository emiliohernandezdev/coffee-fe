// src/hooks/ThemeHook.jsx

import { useState, useEffect } from 'react';

const usePersistedTheme = () => {
  // Inicia con null para que podamos verificar si ya hay un valor en localStorage
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    // Recuperar el tema guardado desde localStorage
    const savedTheme = localStorage.getItem('theme');

    // Si hay un valor guardado, usa ese valor para el estado
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Si no hay un valor guardado, deja el tema como 'light' por defecto
      setDarkMode(false); // 'false' representa el tema claro
    }
  }, []); // Se ejecuta solo una vez al inicio

  useEffect(() => {
    // Persistir el tema cuando darkMode cambie
    if (darkMode !== null) { // Solo persistir si darkMode tiene un valor (no es null)
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode]); // Ejecuta cuando darkMode cambie

  return [darkMode, setDarkMode];
};

export { usePersistedTheme };
