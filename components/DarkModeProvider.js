import React, { useState } from 'react';
import DarkModeContext from './DarkModeContext';

const DarkModeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkModeEnabled, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
