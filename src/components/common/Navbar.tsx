import type { ReactNode } from "react";

import NetflixLogo from "./NetflixLogo";

export interface NavbarMenuItem {
  id: string;
  label: string;
}

export interface NavbarProps {
  items?: readonly NavbarMenuItem[];
  activeItemId?: string;
  onMenuSelect?: (item: NavbarMenuItem) => void;
  onLogoClick?: () => void;
  searchSlot?: ReactNode;
  profileSlot?: ReactNode;
  onNotificationClick?: () => void;
  className?: string;
}

const defaultItems: readonly NavbarMenuItem[] = [
  { id: "home", label: "홈" },
  { id: "series", label: "시리즈" },
  { id: "movies", label: "영화" },
  { id: "trending", label: "NEW & 인기" },
  { id: "my-list", label: "내가 찜한 리스트" },
];

export default function Navbar({ items = defaultItems, activeItemId, onMenuSelect, onLogoClick, searchSlot, profileSlot, onNotificationClick, className = "" }: NavbarProps) {
  return (
    <header className={`relative z-40 text-white ${className}`}>
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center gap-x-3 px-4 py-3 sm:gap-x-6 sm:px-8 lg:flex-nowrap lg:px-12">
        <button type="button" aria-label="Netflix 홈" disabled={!onLogoClick} onClick={onLogoClick} className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-default">
          <NetflixLogo />
        </button>
        <nav aria-label="주 메뉴" className="order-3 w-full min-w-0 overflow-x-auto pt-3 lg:order-none lg:w-auto lg:flex-1 lg:pt-0">
          <ul className="flex items-center gap-4 pb-1 text-sm whitespace-nowrap lg:gap-5">
            {items.map((item) => (
              <li key={item.id}><button type="button" aria-current={activeItemId === item.id ? "page" : undefined} disabled={!onMenuSelect} onClick={() => onMenuSelect?.(item)} className={`rounded py-1 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default ${activeItemId === item.id ? "font-bold text-white" : "text-neutral-300"}`}>{item.label}</button></li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex w-full min-w-0 items-center justify-end gap-2 pt-2 sm:w-auto sm:gap-4 sm:pt-0">
          {searchSlot}
          <button type="button" aria-label="알림" disabled={!onNotificationClick} onClick={onNotificationClick} className="flex size-9 shrink-0 items-center justify-center text-white transition hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 2V1" /></svg>
          </button>
          {profileSlot}
        </div>
      </div>
    </header>
  );
}
