import React, { createContext, useContext, useState, useEffect } from 'react';

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const CLIENT_ID = '5317c4cfb0fe43448183a30a0ad065e6';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPE = 'user-read-recently-played user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';

  useEffect(() => {
    const getTokenFromUrlHash = () => {
      const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
          if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {});
      return hash.access_token;
    };

    const storedToken = window.localStorage.getItem('spotify_token');
    const urlToken = getTokenFromUrlHash();

    if (!storedToken && urlToken) {
      setToken(urlToken);
      window.localStorage.setItem('spotify_token', urlToken);
      window.location.hash = '';
    } else if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}&show_dialog=true`;
  };

  return (
    <SpotifyContext.Provider value={{ token, setToken, handleLogin }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  return useContext(SpotifyContext);
};
