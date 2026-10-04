import { useEffect, useRef, useState } from "react";

import {
  getMovieDetail,
  getMovieTrailerKey,
  getTmdbImageUrl,
  getTrendingMovies,
} from "../../api/tmdbApi";
import type { MovieDetail } from "../../api/tmdbApi";
import InfoButton from "../common/InfoButton";
import PlayButton from "../common/PlayButton";

const TRAILER_DELAY_MS = 800;
const HERO_MOVIE_ID = 687163;
const YOUTUBE_ORIGIN = "https://www.youtube-nocookie.com";

const getTrailerUrl = (key: string) => {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: key,
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    enablejsapi: "1",
  });

  return `${YOUTUBE_ORIGIN}/embed/${key}?${params.toString()}`;
};

const pickRandomTrendingMovieId = async () => {
  const movies = await getTrendingMovies();
  const candidates = movies
    .filter((item) => item.backdrop_path && item.overview)
    .slice(0, 10);

  if (candidates.length === 0) return null;

  return candidates[Math.floor(Math.random() * candidates.length)].id;
};

interface HeroBannerProps {
  onSelectMovie: (movieId: number) => void;
}

export default function HeroBanner({ onSelectMovie }: HeroBannerProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const hoverTimerRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let ignore = false;

    const loadHeroMovie = async () => {
      try {
        let heroMovieId: number | null = HERO_MOVIE_ID;
        let detail = await getMovieDetail(HERO_MOVIE_ID).catch(() => null);

        if (!detail) {
          heroMovieId = await pickRandomTrendingMovieId();

          if (heroMovieId === null) return;

          detail = await getMovieDetail(heroMovieId);
        }

        if (!ignore) {
          setMovie(detail);
        }

        const key = await getMovieTrailerKey(heroMovieId).catch(() => null);

        if (!ignore) {
          setTrailerKey(key);
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

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!trailerKey) return;

    hoverTimerRef.current = window.setTimeout(() => {
      setIsPlaying(true);
    }, TRAILER_DELAY_MS);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    setIsPlaying(false);
    setIsVideoReady(false);
    setIsMuted(true);
  };

  const handleToggleMute = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: isMuted ? "unMute" : "mute",
        args: [],
      }),
      YOUTUBE_ORIGIN,
    );
    setIsMuted(!isMuted);
  };

  const showTrailer = isPlaying && isVideoReady;

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-[56.25vw] max-h-[860px] min-h-[460px] w-full overflow-hidden bg-neutral-900"
    >
      {movie?.backdropPath && (
        <img
          src={getTmdbImageUrl(movie.backdropPath, "original")}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${showTrailer ? "opacity-0" : "opacity-100"}`}
        />
      )}

      {isPlaying && trailerKey && (
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${showTrailer ? "opacity-100" : "opacity-0"}`}
        >
          <iframe
            ref={iframeRef}
            src={getTrailerUrl(trailerKey)}
            title={`${movie?.title ?? ""} 예고편`}
            allow="autoplay; encrypted-media"
            onLoad={() => setIsVideoReady(true)}
            className="absolute left-1/2 top-1/2 aspect-video w-full min-w-[818px] -translate-x-1/2 -translate-y-1/2 scale-125"
          />
        </div>
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

      {showTrailer && (
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isMuted ? "소리 켜기" : "소리 끄기"}
          className="absolute bottom-[18%] right-4 z-10 flex size-11 items-center justify-center rounded-full border-2 border-white/70 bg-black/30 text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 lg:right-12"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
            {isMuted ? <path d="m16 9 5 6M21 9l-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
        </button>
      )}
    </section>
  );
}
