import { Link } from "react-router";

export default function MainPage() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link
          to="/"
          className="text-3xl font-black tracking-[-2px] text-[#e50914]"
        >
          NETFLIX
        </Link>
      </header>

      <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-4xl font-bold">
            Netflix Clone
          </h1>

          <p className="mt-4 text-gray-400">
            메인 콘텐츠 화면입니다.
          </p>
        </div>
      </section>
    </main>
  );
}