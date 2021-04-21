import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

export const AuthContext = React.createContext();

//export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  //const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
  };

  const verifyToken = async () => {
    try {
      //setLoading(true);
      const response = await fetch('/api/auth/verify-token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem('accessToken')
          )}`,
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (data.isVerified === true) {
        setUser(data);
        setIsAuth(true);
        //setLoading(false);
      } else {
        setIsAuth(false);
        setUser('');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  );
}
