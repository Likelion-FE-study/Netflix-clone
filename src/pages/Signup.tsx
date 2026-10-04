import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

import { saveUser } from "../utils/authStorage";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    localStorage.getItem("signupEmail") ?? "",
  );
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveUser({
      email,
      password,
    });

    localStorage.removeItem("signupEmail");

    navigate("/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md p-8">
        <h1 className="mb-3 text-3xl font-bold">회원가입</h1>

        <p className="mb-8 text-gray-400">
          이메일과 비밀번호를 입력하여 계정을 만들어 주세요.
        </p>

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
            minLength={4}
            required
            className="w-full rounded bg-neutral-800 px-4 py-4 outline-none focus:ring-2 focus:ring-white"
          />

          <button
            type="submit"
            className="w-full rounded bg-red-600 py-3 font-bold transition hover:bg-red-700"
          >
            가입하기
          </button>
        </form>
      </div>
    </main>
  );
}