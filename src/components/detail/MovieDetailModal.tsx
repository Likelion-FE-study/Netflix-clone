import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getMovieDetail, getTmdbImageUrl } from "../../api/tmdbApi";
import type { MovieDetail } from "../../api/tmdbApi";
import PlayButton from "../common/PlayButton";
import WishlistButton from "../common/WishlistButton";

interface MovieDetailModalProps {
  movieId: number;
  onClose: () => void;
}

// 135 → "2시간 15분"
const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}분`;
  }

  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
};

// 로그인 후 영화를 눌렀을 때 뜨는 상세 모달 (재생 · 찜하기)
export default function MovieDetailModal({ movieId, onClose }: MovieDetailModalProps) {
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

  const imagePath = movie ? (movie.backdropPath ?? movie.posterPath) : null;

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
          className="absolute right-4 top-4 z-20 flex size-9 items-center justify-center rounded-full bg-[#181818] text-white transition hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
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
            {/* 배경 이미지 + 타이틀 로고 + 재생 / 찜 버튼 */}
            <div className="relative aspect-video w-full">
              {imagePath && (
                <img src={getTmdbImageUrl(imagePath)} alt="" className="h-full w-full object-cover" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />

              <div className="absolute bottom-0 left-0 px-8 pb-8 md:px-12 md:pb-10">
                {movie.logoPath ? (
                  <img
                    src={getTmdbImageUrl(movie.logoPath, "w500")}
                    alt={movie.title}
                    className="max-h-24 max-w-[60%] object-contain md:max-h-32 md:max-w-[400px]"
                  />
                ) : (
                  <h2 className="text-3xl font-black md:text-5xl">{movie.title}</h2>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <PlayButton className="h-11 px-7 text-base" />
                  <WishlistButton
                    item={{
                      id: movie.id,
                      mediaType: "movie",
                      title: movie.title,
                      backdropPath: movie.backdropPath,
                      posterPath: movie.posterPath,
                    }}
                    className="size-11"
                  />
                </div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="grid gap-6 px-8 pb-12 pt-2 md:grid-cols-[2fr_1fr] md:gap-10 md:px-12">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[15px] text-neutral-300">
                  {movie.releaseYear && <span>{movie.releaseYear}</span>}
                  {movie.runtime ? <span>{formatRuntime(movie.runtime)}</span> : null}
                  {movie.certification && (
                    <span className="rounded-[3px] border border-neutral-400 px-1.5 text-[13px] leading-5">
                      {movie.certification}
                    </span>
                  )}
                </div>

                {movie.overview && (
                  <p className="mt-5 text-[15px] leading-relaxed md:text-[16px]">{movie.overview}</p>
                )}
              </div>

              <dl className="space-y-3 text-[14px] leading-relaxed">
                {movie.cast.length > 0 && (
                  <div>
                    <dt className="inline text-neutral-500">출연: </dt>
                    <dd className="inline">{movie.cast.join(", ")}</dd>
                  </div>
                )}
                {movie.genres.length > 0 && (
                  <div>
                    <dt className="inline text-neutral-500">장르: </dt>
                    <dd className="inline">{movie.genres.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
