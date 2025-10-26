import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} caseSensitive />
        <Route path="/login" element={<Login />} caseSensitive />
        <Route path="/profile" element={<Profile />} caseSensitive />
      </Routes>
    </div>
  );
};

export default App;
