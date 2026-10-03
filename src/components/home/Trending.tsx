import { useCallback, useEffect, useRef, useState } from "react";

import {
  getTmdbPosterUrl,
  getTrendingMovies,
} from "../../api/tmdbApi";
import type { TrendingMovie } from "../../api/tmdbApi";
import MovieModal from "./MovieModal";

export default function Trending() {
  const [movies, setMovies] = useState<TrendingMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();

        const moviesWithPoster = trendingMovies
          .filter((movie) => movie.poster_path)
          .slice(0, 10);

        setMovies(moviesWithPoster);
      } catch {
        setErrorMessage("지금 뜨는 콘텐츠를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const handlePrevious = () => {
    sliderRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    sliderRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">
          지금 뜨는 콘텐츠
        </h2>

        <p className="text-gray-400">
          콘텐츠를 불러오는 중입니다.
        </p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold">
          지금 뜨는 콘텐츠
        </h2>

        <p className="text-gray-400">
          {errorMessage}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="mb-6 text-2xl font-bold">
        지금 뜨는 콘텐츠
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="이전 콘텐츠"
          className="absolute left-0 top-1/2 z-20 h-28 -translate-y-1/2 rounded bg-neutral-800/90 px-3 text-4xl transition hover:bg-neutral-700"
        >
          ‹
        </button>

        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-12 pb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {movies.map((movie, index) => (
            <article
              key={movie.id}
              className="relative min-w-[180px] md:min-w-[200px]"
            >
              <button
                type="button"
                aria-label={`${movie.title} 상세 정보 보기`}
                onClick={() => setSelectedMovieId(movie.id)}
                className="block w-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <img
                  src={getTmdbPosterUrl(movie.poster_path!)}
                  alt={movie.title}
                  className="h-[280px] w-full rounded-lg object-cover transition duration-300 hover:scale-105 md:h-[300px]"
                />
              </button>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -left-5 z-10 text-8xl font-black leading-none text-black [-webkit-text-stroke:2px_white]"
              >
                {index + 1}
              </span>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="다음 콘텐츠"
          className="absolute right-0 top-1/2 z-20 h-28 -translate-y-1/2 rounded bg-neutral-800/90 px-3 text-4xl transition hover:bg-neutral-700"
        >
          ›
        </button>
      </div>

      {selectedMovieId !== null && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}