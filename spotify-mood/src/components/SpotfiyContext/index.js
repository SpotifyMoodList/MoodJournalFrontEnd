import React, { createContext, useContext, useState } from 'react';

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <SpotifyContext.Provider value={{ token, setToken }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};