import React, { useContext } from "react";
import { UserContext } from "../hooks/authHook";

const NoPage = () => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <p>404 Page Not Found</p>; // Replace with your Not Found page content
  }

  return (
    <div>{/* Protected content accessible only to logged-in users */}</div>
  );
};

export default NoPage;
