import { Outlet, useLocation, useNavigate } from "react-router";

import { getUser, logoutUser } from "../utils/authStorage";
import Navbar from "./common/Navbar";
import type { NavbarMenuItem } from "./common/Navbar";
import ProfileMenu from "./common/ProfileMenu";
import SearchInput from "./search/SearchInput";

// 메뉴 id → 이동할 주소 (아직 페이지가 없는 메뉴는 여기에 추가하면 됩니다)
const menuPaths: Record<string, string> = {
  home: "/main",
  "my-list": "/my-list",
};

// 로그인 후 페이지 공통 틀: 상단 Navbar + 페이지 내용(<Outlet />)
export default function MainLayout() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const submittedQuery = pathname === "/search"
    ? new URLSearchParams(search).get("q")?.trim() ?? ""
    : "";
  const user = getUser();

  const activeItemId = Object.keys(menuPaths).find(
    (id) => menuPaths[id] === pathname,
  );

  const handleMenuSelect = (item: NavbarMenuItem) => {
    const path = menuPaths[item.id];

    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar
        activeItemId={activeItemId}
        onMenuSelect={handleMenuSelect}
        onLogoClick={() => navigate("/main")}
        searchSlot={
          <SearchInput
            key={submittedQuery}
            defaultValue={submittedQuery}
            onSubmit={(value) => {
              const query = value.trim();
              if (query) navigate(`/search?${new URLSearchParams({ q: query })}`);
            }}
          />
        }
        profileSlot={<ProfileMenu email={user?.email} onLogout={handleLogout} />}
        className="bg-gradient-to-b from-black/80 to-transparent"
      />

      <Outlet />
    </div>
  );
}
