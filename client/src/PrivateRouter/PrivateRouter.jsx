/* eslint-disable react/prop-types */
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthProvider";
// import { useContext } from "react";
// import { useLocation } from "react-router-dom";

// const PrivateRouter = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const location = useLocation()
//   if (user) {
//     return children;
//   }
//   return <Navigate to="/signIn" state={{ from: location }} replace />;
// };
// export default PrivateRouter;

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitBeforeRedirect = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(waitBeforeRedirect);
  }, []);

  useEffect(() => {
    if (user === null) {
      // user is still loading or not logged in
      console.log("Waiting for user...");
    } else if (user !== null) {
      // user is logged in
      console.log("User is logged in:", user);
    } else {
      // user is not logged in
      console.log("Redirecting to /signIn");
      // You can navigate or take other actions here
    }
  }, [user]);

  if (loading) {
    // Show loading spinner or any other loading UI
    return <div className="loading-animation">Loading...</div>;
  }

  if (user) {
    // user is logged in
    return children;
  } else {
    // user is not logged in
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;