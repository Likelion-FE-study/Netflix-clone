import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">홈</Link> | <Link to="/about">소개</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
