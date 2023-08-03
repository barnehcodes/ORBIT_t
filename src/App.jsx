import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Log from "./pages/Log";
import Profile from "./pages/Profile";
import Preview from "./pages/Preview";
import Explore2 from "./pages/Explore2";
import Home from "./pages/Home";
import Palace from "./pages/Palace";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  // const { currentUser } = false;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/Log" replace />;
  };
  console.log(currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Log" element={<Log />} />
        <Route
          path="/Palace"
          element={
            <RequireAuth>
              <Palace />
            </RequireAuth>
          }
        />
        <Route
          path="/Profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/preview/:id/:suid"
          element={
            <RequireAuth>
              <Preview />
            </RequireAuth>
          }
        />
        <Route
          path="/Explore2"
          element={
            <RequireAuth>
              <Explore2 />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
