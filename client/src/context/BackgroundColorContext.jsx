import { createContext, useState, useContext } from 'react';

const BackgroundColorContext = createContext();

export const BackgroundColorProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState('#06682D');

  return (
    <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => useContext(BackgroundColorContext);
