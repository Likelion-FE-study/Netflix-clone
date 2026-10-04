import { useEffect, useId, useRef, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setIsMenuOpen(false);
    }
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  function selectMenu(item: NavbarMenuItem) {
    setIsMenuOpen(false);
    onMenuSelect?.(item);
  }

  return (
    <header className={`relative z-40 text-white ${className}`}>
      <div className="mx-auto flex min-h-16 max-w-screen-2xl items-center gap-x-4 px-4 py-3 sm:gap-x-6 sm:px-8 lg:px-12">
        <button type="button" aria-label="Netflix 홈" disabled={!onLogoClick} onClick={onLogoClick} className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-default">
          <NetflixLogo />
        </button>

        <div ref={menuRef} className="relative lg:hidden">
          <button ref={menuButtonRef} type="button" aria-expanded={isMenuOpen} aria-controls={menuPanelId} onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-1 py-1 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            메뉴
            <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} fill="currentColor"><path d="m5 7 5 6 5-6z" /></svg>
          </button>
          {isMenuOpen && (
            <div id={menuPanelId} className="absolute -left-2 top-full z-50 mt-4 w-[min(260px,calc(100vw-7rem))] border-t-2 border-white bg-black/95 shadow-2xl">
              <span aria-hidden="true" className="absolute -top-[10px] left-7 size-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white" />
              <nav aria-label="주 메뉴">
                <ul className="py-1">
                  {items.map((item) => (
                    <li key={item.id}><button type="button" aria-current={activeItemId === item.id ? "page" : undefined} disabled={!onMenuSelect} onClick={() => selectMenu(item)} className={`block w-full py-3 text-center text-sm transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none disabled:cursor-default ${activeItemId === item.id ? "font-bold text-white" : "text-neutral-300"}`}>{item.label}</button></li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>

        <nav aria-label="주 메뉴" className="hidden min-w-0 flex-1 lg:block">
          <ul className="flex items-center gap-5 text-sm whitespace-nowrap">
            {items.map((item) => (
              <li key={item.id}><button type="button" aria-current={activeItemId === item.id ? "page" : undefined} disabled={!onMenuSelect} onClick={() => onMenuSelect?.(item)} className={`rounded py-1 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default ${activeItemId === item.id ? "font-bold text-white" : "text-neutral-300"}`}>{item.label}</button></li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-4">
          {searchSlot}
          <button type="button" aria-label="알림" disabled={!onNotificationClick} onClick={onNotificationClick} className="hidden size-9 shrink-0 items-center justify-center text-white transition hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default lg:flex">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4M12 2V1" /></svg>
          </button>
          {profileSlot}
        </div>
      </div>
    </header>
  );
}
