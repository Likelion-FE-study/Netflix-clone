import { useState } from "react";

import EmailForm from "../components/home/EmailForm";
import Faq from "../components/home/Faq";
import Footer from "../components/home/Footer";
import Header from "../components/home/Header";
import ReasonCard from "../components/home/ReasonCard";
import Trending from "../components/home/Trending";

import heroBg from "../assets/images/home/hero.jpg";
import popcorn from "../assets/images/home/popcorn.png";
import reasonTv from "../assets/images/home/reason-tv.png";
import reasonDownload from "../assets/images/home/reason-download.png";
import reasonDevices from "../assets/images/home/reason-devices.png";
import reasonKids from "../assets/images/home/reason-kids.png";

const koreanReasons = [
  {
    title: "TV로 즐기세요",
    description:
      "스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.",
    icon: reasonTv,
  },
  {
    title: "즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요",
    description: "간편하게 저장하고 빈틈없이 즐겨보세요.",
    icon: reasonDownload,
  },
  {
    title: "다양한 디바이스로 시청하세요",
    description:
      "각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요.",
    icon: reasonDevices,
  },
  {
    title: "어린이 전용 프로필을 만들어 보세요",
    description:
      "자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.",
    icon: reasonKids,
  },
];

const englishReasons = [
  {
    title: "Enjoy on your TV",
    description:
      "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: reasonTv,
  },
  {
    title: "Download your shows to watch offline",
    description:
      "Save your favorites easily and always have something to watch.",
    icon: reasonDownload,
  },
  {
    title: "Watch everywhere",
    description:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
    icon: reasonDevices,
  },
  {
    title: "Create profiles for kids",
    description:
      "Send kids on adventures with their favorite characters in a space made just for them.",
    icon: reasonKids,
  },
];

export default function Home() {
  const [language, setLanguage] = useState<"ko" | "en">("ko");

  const isKorean = language === "ko";
  const reasons = isKorean ? koreanReasons : englishReasons;

  const handleLanguageChange = (
    selectedLanguage: "ko" | "en",
  ) => {
    setLanguage(selectedLanguage);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* HERO */}
      <div className="relative">
        <section
          className="relative min-h-[640px] overflow-hidden bg-cover bg-center md:min-h-[680px]"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          {/* 배경 어둡게 */}
          <div className="absolute inset-0 bg-black/60" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/85" />

          <div className="relative z-10">
            <Header
              language={language}
              onLanguageChange={handleLanguageChange}
            />

            <div className="mx-auto flex min-h-[550px] max-w-[850px] flex-col items-center justify-center px-6 pb-20 text-center">
              <h1 className="max-w-[760px] text-[34px] font-black leading-[1.15] md:text-[42px] lg:text-[46px]">
                {isKorean ? (
                  <>
                    깜짝 소식! 새로운 화제작이
                    <br />
                    매주 쏟아집니다
                  </>
                ) : (
                  <>
                    Unlimited movies, TV shows,
                    <br />
                    and more
                  </>
                )}
              </h1>

              <p className="mt-5 text-[17px] font-semibold md:text-[19px]">
                {isKorean
                  ? "7,000원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다."
                  : "Starts at ₩7,000. Cancel anytime."}
              </p>

              <div className="mt-7 w-full">
                <EmailForm language={language} />
              </div>
            </div>
          </div>
        </section>

        {/* Netflix 스타일 하단 곡선 */}
        <div className="pointer-events-none absolute -bottom-[38px] left-1/2 z-30 h-[125px] w-[125%] -translate-x-1/2 overflow-hidden">
          {/* 그라데이션 타원 */}
          <div
            className="absolute left-1/2 top-0 h-[180px] w-full -translate-x-1/2 rounded-[50%]"
            style={{
              background:
                "linear-gradient(90deg, #6d1b48 0%, #b51f5a 18%, #e50914 42%, #e50914 58%, #b51f5a 82%, #6d1b48 100%)",
            }}
          />
          {/* 위 타원을 덮어서 얇은 곡선만 남김 */}
          <div className="absolute left-1/2 top-[5px] h-[180px] w-full -translate-x-1/2 rounded-[50%] bg-[#02030b]" />
        </div>
      </div>

      {/* 광고형 멤버십 */}
      <section className="relative z-40 mx-auto max-w-[1180px] px-6 pb-6 pt-16">
        <div className="flex items-center gap-5 rounded-[20px] bg-gradient-to-r from-[#192247] to-[#210e17] px-6 py-5 md:px-9">
          <img
            src={popcorn}
            alt=""
            aria-hidden="true"
            className="hidden h-[72px] w-[72px] shrink-0 object-contain sm:block"
          />

          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-bold md:text-[20px]">
              {isKorean
                ? "7,000원이면 만날 수 있는 넷플릭스."
                : "The Netflix you love for just ₩7,000."}
            </h2>

            <p className="mt-1 text-[15px] text-[#b3b3b3]">
              {isKorean
                ? "가장 경제적인 광고형 멤버십을 이용해 보세요."
                : "Choose our most affordable ad-supported plan."}
            </p>
          </div>

          <button
            type="button"
            className="shrink-0 rounded bg-white/20 px-5 py-2.5 text-[14px] font-semibold transition hover:bg-white/30"
          >
            {isKorean ? "자세히 알아보기" : "Learn More"}
          </button>
        </div>
      </section>

      {/* 지금 뜨는 콘텐츠 */}
      <Trending />

      {/* 가입해야 하는 또 다른 이유 */}
      <section className="mx-auto max-w-[1180px] px-6 py-12">
        <h2 className="mb-6 text-[24px] font-bold md:text-[26px]">
          {isKorean
            ? "가입해야 하는 또 다른 이유"
            : "More Reasons to Join"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map((reason) => (
            <ReasonCard
              key={reason.title}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
            />
          ))}
        </div>
      </section>

      {/* 자주 묻는 질문 */}
      <Faq />

      {/* 하단 이메일 */}
      <section className="mx-auto max-w-[850px] px-6 py-14">
        <EmailForm language={language} />
      </section>

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    </main>
  );
}