// src/hooks/ThemeHook.jsx

import { useState, useEffect } from 'react';

const usePersistedTheme = () => {
  const [darkMode, setDarkMode] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export { usePersistedTheme };
