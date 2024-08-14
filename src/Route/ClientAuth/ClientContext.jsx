// src/ClientAuth/ClientContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth, database } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import Cookies from 'js-cookie';

export const ClientContext = createContext();

const ClientProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('jwt');
      if (token) {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const userToken = await user.getIdToken();
              if (userToken === token) {
                const userInfoRef = ref(database, 'userInfo');
                const snapshot = await get(userInfoRef);
                if (snapshot.exists()) {
                  const userInfo = snapshot.val();
                  let currentUserData = null;
                  for (const key in userInfo) {
                    if (userInfo[key].uid === user.uid) {
                      currentUserData = userInfo[key];
                      break;
                    }
                  }
                  setUserData(currentUserData);
                  setIsAuthenticated(true);
                }
              } else {
                setIsAuthenticated(false);
                Cookies.remove('jwt');
              }
            } catch (error) {
              console.error('Error verifying token:', error);
              setIsAuthenticated(false);
              Cookies.remove('jwt');
            }
          } else {
            setIsAuthenticated(false);
            setUserData(null);
            Cookies.remove('jwt');
          }
        });
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <ClientContext.Provider value={{ isAuthenticated, userData, setUserData }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
