import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Visitors from "./pages/Dashboard/components/Visitors";
import Content from "./pages/Dashboard/components/Content";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSessionRequest } from "./redux/action";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchSessionRequest());
  },[dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home/*"
          element={
              <Dashboard />
          }
        >
          <Route path="" element={<Content />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
