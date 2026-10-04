import { Link } from "react-router";

import NetflixLogo from "../common/NetflixLogo";

interface HeaderProps {
  language: "ko" | "en";
  onLanguageChange: (language: "ko" | "en") => void;
}

export default function Header({
  language,
  onLanguageChange,
}: HeaderProps) {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onLanguageChange(event.target.value as "ko" | "en");
  };

  return (
    <header className="mx-auto flex min-h-16 w-full max-w-screen-2xl items-center justify-between gap-x-4 px-4 py-3 sm:px-8 lg:px-12">
      <Link
        to="/"
        aria-label="Netflix"
        className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <NetflixLogo />
      </Link>

      <div className="flex items-center gap-3">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-white"
          >
            文
          </span>

          <select
            value={language}
            onChange={handleLanguageChange}
            aria-label="언어 선택"
            className="h-9 appearance-none rounded border border-gray-500 bg-black/60 py-1 pl-9 pr-9 text-sm font-medium text-white outline-none transition focus:border-white"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white"
          >
            ▼
          </span>
        </div>

        <Link
          to="/login"
          className="flex h-9 items-center rounded bg-[#e50914] px-4 text-sm font-bold text-white transition hover:bg-[#c11119]"
        >
          {language === "ko" ? "로그인" : "Sign In"}
        </Link>
      </div>
    </header>
  );
}