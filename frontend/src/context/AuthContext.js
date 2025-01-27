import Cookies from "js-cookie";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  userIsLoggedIn: Cookies.get("token") ? true : false,
  setUserIsLoggedIn: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <AuthContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
