import type { WishlistItem } from "../store/useWishlistStore";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface TrendingMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface TrendingMovieResponse {
  results: TrendingMovie[];
}

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  if (!API_KEY) {
    throw new Error("TMDB API Key가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("지금 뜨는 콘텐츠를 불러오지 못했습니다.");
  }

  const data: TrendingMovieResponse = await response.json();

  return data.results;
};

export const getTmdbPosterUrl = (posterPath: string) => {
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
};

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieReleaseDates {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
    }[];
  }[];
}

interface MovieImages {
  logos: {
    file_path: string;
    iso_639_1: string | null;
  }[];
}

interface MovieCredits {
  cast: {
    name: string;
  }[];
}

interface MovieTranslations {
  translations: {
    iso_639_1: string;
    data: {
      overview: string;
    };
  }[];
}

interface MovieDetailResponse {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: MovieGenre[];
  release_dates: MovieReleaseDates;
  images: MovieImages;
  credits: MovieCredits;
  translations: MovieTranslations;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  releaseYear: string;
  certification: string;
  runtime: number | null;
  backdropPath: string | null;
  posterPath: string | null;
  logoPath: string | null;
  genres: string[];
  cast: string[];
}

// 한국 관람 등급을 넷플릭스 표기("15+", "ALL")로 변환
const getKoreanCertification = (releaseDates: MovieReleaseDates) => {
  const koreanRelease = releaseDates.results.find(
    (result) => result.iso_3166_1 === "KR",
  );

  const certification = koreanRelease?.release_dates.find(
    (releaseDate) => releaseDate.certification,
  )?.certification;

  if (!certification) {
    return "";
  }

  if (certification === "ALL" || certification === "All") {
    return "ALL";
  }

  return /^\d+$/.test(certification)
    ? `${certification}+`
    : certification;
};

// 한국어 줄거리가 비어 있으면 영어 줄거리로 대체
const getOverview = (
  koreanOverview: string,
  translations: MovieTranslations,
) => {
  if (koreanOverview) {
    return koreanOverview;
  }

  const englishTranslation = translations.translations.find(
    (translation) =>
      translation.iso_639_1 === "en" && translation.data.overview,
  );

  return englishTranslation?.data.overview ?? "";
};

// 한국어 로고 → 영어 로고 → 언어 없는 로고 순으로 선택
const getTitleLogoPath = (images: MovieImages) => {
  const logo =
    images.logos.find((item) => item.iso_639_1 === "ko") ??
    images.logos.find((item) => item.iso_639_1 === "en") ??
    images.logos.find((item) => item.iso_639_1 === null);

  return logo?.file_path ?? null;
};

export const getMovieDetail = async (
  movieId: number,
): Promise<MovieDetail> => {
  if (!API_KEY) {
    throw new Error("TMDB API Key가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    append_to_response: "release_dates,images,credits,translations",
    include_image_language: "ko,en,null",
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("콘텐츠 정보를 불러오지 못했습니다.");
  }

  const data: MovieDetailResponse = await response.json();

  return {
    id: data.id,
    title: data.title,
    overview: getOverview(data.overview, data.translations),
    releaseYear: data.release_date.slice(0, 4),
    certification: getKoreanCertification(data.release_dates),
    runtime: data.runtime,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    logoPath: getTitleLogoPath(data.images),
    genres: data.genres.map((genre) => genre.name),
    cast: data.credits.cast.slice(0, 4).map((person) => person.name),
  };
};

export const getTmdbImageUrl = (
  imagePath: string,
  size: "w500" | "w780" | "w1280" | "original" = "w1280",
) => {
  return `https://image.tmdb.org/t/p/${size}${imagePath}`;
};

type SearchContent =
  | (TrendingMovie & { media_type: "movie" })
  | (Omit<TrendingMovie, "title"> & { media_type: "tv"; name: string });

interface MultiSearchResponse {
  results: (SearchContent | { media_type: "person"; id: number; name: string })[];
}

export const searchMovies = async (
  query: string,
  signal?: AbortSignal,
): Promise<SearchContent[]> => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  if (!API_KEY) {
    throw new Error("TMDB API Key가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    query: trimmedQuery,
    include_adult: "false",
  });
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?${params.toString()}`,
    { signal },
  );
  if (!response.ok) {
    throw new Error("콘텐츠 검색에 실패했습니다. 잠시 후 다시 검색해 주세요.");
  }

  const data: MultiSearchResponse = await response.json();
  return data.results.filter(
    (item): item is SearchContent => item.media_type === "movie" || item.media_type === "tv",
  );
};

interface ContentListResult {
  id: number;
  media_type?: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface ContentListResponse {
  results: ContentListResult[];
}

const fetchContentList = async (
  path: string,
  defaultMediaType?: WishlistItem["mediaType"],
  extraParams: Record<string, string> = {},
): Promise<WishlistItem[]> => {
  if (!API_KEY) {
    throw new Error("TMDB API Key가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    ...extraParams,
  });

  const response = await fetch(`${TMDB_BASE_URL}${path}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("콘텐츠 목록을 불러오지 못했습니다.");
  }

  const data: ContentListResponse = await response.json();

  return data.results.flatMap((result): WishlistItem[] => {
    const mediaType = result.media_type ?? defaultMediaType;

    if (mediaType !== "movie" && mediaType !== "tv") {
      return [];
    }

    return [
      {
        id: result.id,
        mediaType,
        title: result.title ?? result.name ?? "",
        backdropPath: result.backdrop_path,
        posterPath: result.poster_path,
      },
    ];
  });
};

export const getNowPlayingMovies = () =>
  fetchContentList("/movie/now_playing", "movie", { region: "KR" });

export const getPopularMovies = () =>
  fetchContentList("/movie/popular", "movie", { region: "KR" });

export const getPopularSeries = () => fetchContentList("/tv/popular", "tv");

interface MovieVideo {
  key: string;
  site: string;
  type: string;
  iso_639_1: string;
}

interface MovieVideosResponse {
  results: MovieVideo[];
}

export const getMovieTrailerKey = async (
  movieId: number,
): Promise<string | null> => {
  if (!API_KEY) {
    throw new Error("TMDB API Key가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: "ko-KR",
    include_video_language: "ko,en,null",
  });

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/videos?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("예고편을 불러오지 못했습니다.");
  }

  const data: MovieVideosResponse = await response.json();
  const youtubeVideos = data.results.filter((video) => video.site === "YouTube");

  const trailer =
    youtubeVideos.find((video) => video.type === "Trailer" && video.iso_639_1 === "ko") ??
    youtubeVideos.find((video) => video.type === "Trailer") ??
    youtubeVideos.find((video) => video.type === "Teaser");

  return trailer?.key ?? null;
};
