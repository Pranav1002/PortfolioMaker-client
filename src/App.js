import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ReactSession } from "react-client-session";
 
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Experiences from "./pages/Experiences";
import PublicProfile from "./templates/template1/Index";
import PageNotFound from "./pages/PageNotFound";

function mainLayout() {
  return (
    <>
      <Sidebar />
      <div className="mt-14 p-4 md:ml-64">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  // ReactSession.setStoreType("sessionStorage");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={mainLayout()}>
          <Route index element={<Home />} />
          <Route path="education" element={<Education />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experiences" element={<Experiences />} />
        </Route>
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
