import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setuserData] = useState(null);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedIn,
    userData,
    setuserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
