import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router";

import { getMovieDetail, getTmdbImageUrl } from "../../api/tmdbApi";
import type { MovieDetail } from "../../api/tmdbApi";

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

// 로그인 전 랜딩 페이지에서 영화를 눌렀을 때 뜨는 상세 모달
export default function MovieModal({ movieId, onClose }: MovieModalProps) {
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const movieDetail = await getMovieDetail(movieId);

        if (!ignore) {
          setMovie(movieDetail);
        }
      } catch {
        if (!ignore) {
          setErrorMessage("콘텐츠 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetail();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  // ESC로 닫기 + 모달이 열린 동안 뒤 페이지 스크롤 막기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleStart = () => {
    onClose();
    navigate("/signup");
  };

  const badges = movie
    ? [movie.releaseYear, movie.certification, "영화", ...movie.genres].filter(
        Boolean,
      )
    : [];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10 md:py-16"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={movie?.title ?? "콘텐츠 상세 정보"}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[880px] overflow-hidden rounded-lg bg-[#181818] text-white shadow-2xl"
      >
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center text-white transition hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        {isLoading && (
          <div className="flex aspect-video items-center justify-center text-gray-400">
            콘텐츠 정보를 불러오는 중입니다.
          </div>
        )}

        {!isLoading && errorMessage && (
          <div className="flex aspect-video items-center justify-center text-gray-400">
            {errorMessage}
          </div>
        )}

        {!isLoading && movie && (
          <>
            {/* 배경 이미지 + 타이틀 로고 */}
            <div className="relative aspect-video w-full">
              {(movie.backdropPath ?? movie.posterPath) && (
                <img
                  src={getTmdbImageUrl((movie.backdropPath ?? movie.posterPath)!)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 px-8 pb-2 md:px-12">
                {movie.logoPath ? (
                  <img
                    src={getTmdbImageUrl(movie.logoPath, "w500")}
                    alt={movie.title}
                    className="max-h-28 max-w-[60%] object-contain md:max-h-36 md:max-w-[480px]"
                  />
                ) : (
                  <h2 className="text-4xl font-black md:text-5xl">
                    {movie.title}
                  </h2>
                )}
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="px-8 pb-12 pt-6 md:px-12">
              <ul className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <li
                    key={badge}
                    className="rounded bg-neutral-700/80 px-2 py-1 text-[14px] font-medium text-neutral-200"
                  >
                    {badge}
                  </li>
                ))}
              </ul>

              {movie.overview && (
                <p className="mt-8 max-w-[740px] text-[16px] leading-relaxed md:text-[17px]">
                  {movie.overview}
                </p>
              )}

              <button
                type="button"
                onClick={handleStart}
                className="mt-10 inline-flex items-center gap-3 rounded bg-netflix-red px-5 py-3 text-[18px] font-bold transition hover:bg-[#c11119] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                시작하기
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
