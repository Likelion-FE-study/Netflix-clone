import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* 로그인 후 페이지 (상단 Navbar 공통) */}
        <Route element={<MainLayout />}>
          <Route path="main" element={<MainPage />} />
          <Route path="my-list" element={<MyList />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}