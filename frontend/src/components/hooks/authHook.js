import React, { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = user !== null;

  const handleLogin = (user) => setUser(user);
  const handleLogout = () => setUser(null);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
