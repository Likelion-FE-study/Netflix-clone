import { Link } from "react-router";

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
    <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-6 md:px-12">
      <Link
        to="/"
        className="text-3xl font-black tracking-[-2px] text-[#e50914] md:text-4xl"
        aria-label="Netflix"
      >
        NETFLIX
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