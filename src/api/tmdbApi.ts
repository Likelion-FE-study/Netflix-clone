const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface TrendingMovie {
  id: number;
  title: string;
  poster_path: string | null;
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