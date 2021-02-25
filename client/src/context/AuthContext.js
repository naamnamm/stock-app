import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

export const AuthContext = createContext();

//export const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState();
//   const [loading, setLoading] = useState(false);
//   const [isAuth, setIsAuth] = useState(false);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged(user => {
//   //     setCurrentUser(user)
//   //     setLoading(false)
//   //   })

//   //   return unsubscribe
//   // }, [])

//   const value = {
//     user,
//     setUser,
//     isAuth,
//     setIsAuth,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }
