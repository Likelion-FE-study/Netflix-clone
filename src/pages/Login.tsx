import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import NetflixLogo from "../components/common/NetflixLogo";
import { getUser, loginUser } from "../utils/authStorage";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getUser();

    if (!user) {
      setErrorMessage("등록된 계정이 없습니다.");
      return;
    }

    if (user.email !== email || user.password !== password) {
      setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    loginUser();

    // 로그인 성공 시 MainPage로 이동
    navigate("/main");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <header className="absolute inset-x-0 top-0 mx-auto w-full max-w-[1280px] px-6 py-6 md:px-12">
        <Link
          to="/"
          aria-label="Netflix 홈"
          className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <NetflixLogo className="w-[90px] md:w-[148px]" />
        </Link>
      </header>

      <div className="w-full max-w-md rounded bg-black/80 p-10">
        <h1 className="mb-8 text-3xl font-bold">로그인</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="이메일 주소"
            required
            className="w-full rounded bg-neutral-800 px-4 py-4 outline-none focus:ring-2 focus:ring-white"
          />

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호"
            required
            className="w-full rounded bg-neutral-800 px-4 py-4 outline-none focus:ring-2 focus:ring-white"
          />

          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full rounded bg-red-600 py-3 font-bold transition hover:bg-red-700"
          >
            로그인
          </button>
        </form>

        <p className="mt-8 text-gray-400">
          Netflix 회원이 아닌가요?{" "}
          <Link to="/signup" className="text-white hover:underline">
            지금 가입하세요.
          </Link>
        </p>
      </div>
    </main>
  );
}