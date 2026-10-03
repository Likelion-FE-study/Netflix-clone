import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="main" element={<MainPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}