interface FooterProps {
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

export default function Footer({
  language = "ko",
  onLanguageChange,
}: FooterProps) {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value as "ko" | "en";
    onLanguageChange?.(selectedLanguage);
  };

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