interface FooterProps {
  variant?: "landing" | "main";
  language?: "ko" | "en";
  onLanguageChange?: (language: "ko" | "en") => void;
}

const footerLinks = [
  {
    label: "자주 묻는 질문",
    href: "https://help.netflix.com/ko/node/412",
  },
  {
    label: "고객 센터",
    href: "https://help.netflix.com/ko/",
  },
  {
    label: "계정",
    href: "https://www.netflix.com/YourAccount",
  },
  {
    label: "미디어 센터",
    href: "https://media.netflix.com/",
  },
  {
    label: "투자 정보(IR)",
    href: "https://ir.netflix.net/",
  },
  {
    label: "인사 정보",
    href: "https://jobs.netflix.com/",
  },
  {
    label: "넷플릭스 지원 디바이스",
    href: "https://help.netflix.com/ko/node/14361",
  },
  {
    label: "이용 약관",
    href: "https://help.netflix.com/legal/termsofuse",
  },
  {
    label: "개인정보 처리방침",
    href: "https://help.netflix.com/legal/privacy",
  },
  {
    label: "쿠키 설정",
    href: "https://www.netflix.com/kr/",
  },
  {
    label: "회사 정보",
    href: "https://help.netflix.com/legal/corpinfo",
  },
  {
    label: "문의하기",
    href: "https://help.netflix.com/ko/contactus",
  },
  {
    label: "속도 테스트",
    href: "https://fast.com/",
  },
  {
    label: "법적 고지",
    href: "https://help.netflix.com/legal/notices",
  },
  {
    label: "오직 넷플릭스에서",
    href: "https://www.netflix.com/kr/browse/genre/839338",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/NetflixKR",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/netflixkr/",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </g>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/netflixkr",
    icon: (
      <path
        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw",
    icon: (
      <path
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z"
        fill="currentColor"
        fillRule="evenodd"
      />
    ),
  },
];

const mainFooterLinks = [
  { label: "화면 해설", href: "https://www.netflix.com/browse/audio-description" },
  { label: "고객센터", href: "https://help.netflix.com/ko/" },
  { label: "기프트카드", href: "https://www.netflix.com/gift-cards" },
  { label: "미디어 센터", href: "https://media.netflix.com/" },
  { label: "투자 정보(IR)", href: "https://ir.netflix.net/" },
  { label: "입사 정보", href: "https://jobs.netflix.com/" },
  { label: "이용약관", href: "https://help.netflix.com/legal/termsofuse" },
  { label: "개인정보", href: "https://help.netflix.com/legal/privacy" },
  { label: "법적 고지", href: "https://help.netflix.com/legal/notices" },
  { label: "쿠키 설정", href: "https://www.netflix.com/kr/" },
  { label: "회사 정보", href: "https://help.netflix.com/legal/corpinfo" },
  { label: "문의하기", href: "https://help.netflix.com/ko/contactus" },
];

export default function Footer({
  variant = "landing",
  language = "ko",
  onLanguageChange,
}: FooterProps) {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value as "ko" | "en";
    onLanguageChange?.(selectedLanguage);
  };

  if (variant === "main") {
    return (
      <footer className="mx-auto w-full max-w-[980px] px-4 pb-12 pt-16 text-neutral-500 sm:px-8 md:pt-24">
        <ul className="mb-6 flex items-center gap-6 text-white">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="block transition hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                  {link.icon}
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 text-[13px] md:grid-cols-4">
          {mainFooterLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[11px]">Netflix 클론 코딩 프로젝트 · 학습용</p>
      </footer>
    );
  }

  return (
    <footer className="bg-black px-6 pb-24 pt-14 text-[#b3b3b3]">
      <div className="mx-auto max-w-[1180px]">
        {/* 문의 전화 */}
        <p className="text-[16px] md:text-[17px]">
          질문이 있으신가요? 문의 전화:{" "}
          <a
            href="tel:00-308-321-0161"
            className="underline underline-offset-2"
          >
            00-308-321-0161 (수신자 부담)
          </a>
        </p>

        {/* 링크 */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 text-[14px] md:grid-cols-4 md:text-[15px]">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* 언어 선택 */}
        <div className="mt-14">
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[16px] text-white"
            >
              文
            </span>

            <select
              aria-label="언어 선택"
              value={language}
              onChange={handleLanguageChange}
              className="h-[46px] min-w-[178px] appearance-none rounded-[5px] border border-[#5e5e5e] bg-[#0f0f0f] py-2 pl-12 pr-11 text-[16px] text-white outline-none"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
            </select>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-white"
            >
              ▼
            </span>
          </div>
        </div>

        {/* Netflix 대한민국 */}
        <p className="mt-14 text-[14px] md:text-[15px]">
          넷플릭스 대한민국
        </p>

        {/* 사업자 정보 */}
        <div className="mt-12 text-[12px] leading-[1.5] md:text-[13px]">
          <p>
            넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
            제2018-서울종로-0426호 전화번호: 00-308-321-0161
            (수신자 부담)
          </p>

          <p>대표: 레지널드 숀 톰슨</p>

          <p>이메일 주소: korea@netflix.com</p>

          <p>
            주소: 대한민국 서울특별시 종로구 우정국로 26,
            센트로폴리스 A동 20층 우편번호 03161
          </p>

          <p>사업자등록번호: 165-87-00119</p>

          <p>클라우드 호스팅: Amazon Web Services Inc.</p>

          <a
            href="https://www.ftc.go.kr/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            공정거래위원회 웹사이트
          </a>
        </div>

        {/* reCAPTCHA */}
        <p className="mt-12 text-[12px] leading-5 text-[#737373] md:text-[13px]">
          이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가
          로봇이 아님을 확인합니다.
        </p>
      </div>
    </footer>
  );
}