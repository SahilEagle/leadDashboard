import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
