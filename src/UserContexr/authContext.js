import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username'); 
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, setIsLoggedIn, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
