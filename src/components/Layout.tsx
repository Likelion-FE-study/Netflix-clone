import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">홈</Link> | <Link to="/login">로그인</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
