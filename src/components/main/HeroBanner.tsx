import { useEffect, useState } from "react";

import { getMovieDetail, getTmdbImageUrl, getTrendingMovies } from "../../api/tmdbApi";
import type { MovieDetail } from "../../api/tmdbApi";
import InfoButton from "../common/InfoButton";
import PlayButton from "../common/PlayButton";

interface HeroBannerProps {
  onSelectMovie: (movieId: number) => void;
}

export default function HeroBanner({ onSelectMovie }: HeroBannerProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadHeroMovie = async () => {
      try {
        const movies = await getTrendingMovies();
        const candidates = movies.filter((item) => item.backdrop_path).slice(0, 10);

        if (candidates.length === 0) return;

        const picked = candidates[Math.floor(Math.random() * candidates.length)];

        const detail = await getMovieDetail(picked.id);

        if (!ignore) {
          setMovie(detail);
        }
      } catch {
        setMovie(null);
      }
    };

    loadHeroMovie();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="relative h-[56.25vw] max-h-[860px] min-h-[460px] w-full overflow-hidden bg-neutral-900">
      {movie?.backdropPath && (
        <img
          src={getTmdbImageUrl(movie.backdropPath, "original")}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-netflix-black to-transparent" />

      {movie && (
        <div className="absolute bottom-[18%] left-0 w-full max-w-[720px] px-4 sm:px-8 lg:w-[45%] lg:px-12">
          <h1 className="mb-4 md:mb-6">
            {movie.logoPath ? (
              <img
                src={getTmdbImageUrl(movie.logoPath, "w500")}
                alt={movie.title}
                className="max-h-24 w-auto max-w-[70%] object-contain object-left drop-shadow-lg sm:max-h-36 lg:max-h-44"
              />
            ) : (
              <span className="text-3xl font-black drop-shadow-lg sm:text-5xl lg:text-6xl">
                {movie.title}
              </span>
            )}
          </h1>

          {movie.overview && (
            <p className="line-clamp-3 text-sm leading-relaxed text-white/90 drop-shadow sm:text-base lg:text-lg">
              {movie.overview}
            </p>
          )}

          <div className="mt-5 flex gap-3 md:mt-7">
            <PlayButton
              onClick={() => onSelectMovie(movie.id)}
              className="md:h-12 md:px-7 md:text-base"
            />
            <InfoButton
              onClick={() => onSelectMovie(movie.id)}
              className="md:h-12 md:px-7 md:text-base"
            />
          </div>
        </div>
      )}
    </section>
  );
}
