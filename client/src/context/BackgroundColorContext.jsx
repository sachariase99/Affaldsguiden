import { createContext, useState, useContext } from 'react';

// Create a context for background color state
const BackgroundColorContext = createContext();

// Provider component to manage and provide background color state
export const BackgroundColorProvider = ({ children }) => {
  // State to hold the current background color
  const [bgColor, setBgColor] = useState('#06682D');

  return (
    // Provide the background color state and updater function to children
    <BackgroundColorContext.Provider value={{ bgColor, setBgColor }}>
      {children} {/* Render child components with access to background color context */}
    </BackgroundColorContext.Provider>
  );
};

// Custom hook to access the background color context
export const useBackgroundColor = () => {
  // Use the context to get background color state and updater function
  return useContext(BackgroundColorContext);
};
