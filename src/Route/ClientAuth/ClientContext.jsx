// src/ClientAuth/ClientContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; // Import your Firebase configuration
import { onAuthStateChanged } from 'firebase/auth';

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists
    });

    return () => unsubscribe();
  }, []);

  return (
    <ClientContext.Provider value={{ isAuthenticated }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
