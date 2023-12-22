// src/App.js
import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";
import Dashboard from "./components/Dashboard";
import TaskBoard from "./components/Task";
import { UserProvider, UserContext } from "./components/hooks/authHook";
import NoPage from "./components/404";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated } = useContext(UserContext);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginForm onLogin={handleLogin} />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="login" element={<LoginForm onLogin={handleLogin} />} />
            <Route
              path="dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="task/:id"
              element={
                isAuthenticated ? <TaskBoard /> : <Navigate to="/login" />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
