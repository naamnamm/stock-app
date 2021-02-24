import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     setCurrentUser(user)
  //     setLoading(false)
  //   })

  //   return unsubscribe
  // }, [])

  const verifyToken = async () => {
    try {
      const response = await fetch('/verify-token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('accessToken')
          )}`,
        },
      });

      const data = await response.json();

      if (data.isVerified === true) {
        setIsAuth(true);
        setUser(data);
        setLoading(false);
      } else {
        setIsAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    JSON.parse(localStorage.getItem('accessToken')) ? verifyToken() : null;
  }, []);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
