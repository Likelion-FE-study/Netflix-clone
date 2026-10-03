import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

interface EmailFormProps {
  language?: "ko" | "en";
}

export default function EmailForm({
  language = "ko",
}: EmailFormProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(event.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage(
        language === "ko"
          ? "이메일 주소는 필수 항목입니다."
          : "Email is required.",
      );
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage(
        language === "ko"
          ? "유효한 이메일 주소를 입력해 주세요."
          : "Please enter a valid email address.",
      );
      return;
    }

    setErrorMessage("");
    localStorage.setItem("signupEmail", trimmedEmail);

    navigate("/main");
  };

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <p className="mb-4 text-center text-[14px] font-medium leading-5 text-white md:text-[16px]">
        {language === "ko"
          ? "시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요."
          : "Ready to watch? Enter your email to create or restart your membership."}
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="min-w-0 flex-1">
          <div
            className={`relative h-[56px] overflow-hidden rounded-[14px] bg-black/60 transition ${
              errorMessage
                ? "border-2 border-red-500"
                : "border border-white/45 focus-within:border-2 focus-within:border-white"
            }`}
          >
            <input
              id="home-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder=" "
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={
                errorMessage ? "home-email-error" : undefined
              }
              className="peer h-full w-full bg-transparent px-4 pb-[6px] pt-[21px] text-[16px] text-white outline-none"
            />

            <label
              htmlFor="home-email"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#b3b3b3] transition-all duration-150 peer-focus:top-[9px] peer-focus:translate-y-0 peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11px]"
            >
              {language === "ko"
                ? "이메일 주소"
                : "Email address"}
            </label>
          </div>

          {errorMessage && (
            <p
              id="home-email-error"
              className="mt-[5px] flex items-center gap-[5px] text-left text-[13px] text-[#eb3942]"
            >
              <span
                aria-hidden="true"
                className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#eb3942] text-[10px] leading-none"
              >
                ×
              </span>

              {errorMessage}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="flex h-[56px] shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-[20px] font-bold text-black transition hover:bg-[#e6e6e6]"
        >
          {language === "ko"
            ? "시작하기"
            : "Get Started"}

          <span
            aria-hidden="true"
            className="text-[34px] font-light leading-none"
          >
            ›
          </span>
        </button>
      </form>
    </div>
  );
}