import { createContext } from 'react';

const DarkModeContext = createContext({
  isDarkModeEnabled: false,
  setIsDarkModeEnabled: () => {},
});

export default DarkModeContext;
