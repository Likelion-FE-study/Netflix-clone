import { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router";

import { searchMovies } from "../api/tmdbApi";
import ContentCard from "../components/common/ContentCard";
import MovieDetailModal from "../components/detail/MovieDetailModal";
import SearchEmptyState from "../components/search/SearchEmptyState";
import type { WishlistItem } from "../store/useWishlistStore";

type SearchState =
  | { status: "loading" }
  | { status: "success"; items: WishlistItem[] }
  | { status: "error"; message: string };

function SearchResults({ query }: { query: string }) {
  const [state, setState] = useState<SearchState>({ status: "loading" });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const handleCloseModal = useCallback(() => setSelectedMovieId(null), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const movies = await searchMovies(query, controller.signal);
        if (controller.signal.aborted) return;

        setState({
          status: "success",
          items: movies.map((movie) => ({
            id: movie.id,
            mediaType: movie.media_type,
            title: movie.media_type === "movie" ? movie.title : movie.name,
            backdropPath: movie.backdrop_path,
            posterPath: movie.poster_path,
          })),
        });
      } catch {
        if (!controller.signal.aborted) {
          setState({
            status: "error",
            message: "콘텐츠 검색에 실패했습니다. 잠시 후 다시 검색해 주세요.",
          });
        }
      }
    };

    void fetchMovies();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <h1 className="mb-6 wrap-anywhere text-[26px] font-bold md:text-[30px]">
        '{query}' 검색 결과
      </h1>
      {state.status === "loading" && (
        <p role="status" className="text-neutral-400">콘텐츠를 불러오는 중입니다.</p>
      )}
      {state.status === "error" && (
        <p role="alert" className="text-neutral-400">{state.message}</p>
      )}
      {state.status === "success" && (
        state.items.length === 0 ? <SearchEmptyState query={query} /> : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {state.items.map((item) => (
              <ContentCard
                key={`${item.mediaType}-${item.id}`}
                item={item}
                onSelect={item.mediaType === "movie" ? (movie) => setSelectedMovieId(movie.id) : undefined}
              />
            ))}
          </div>
        )
      )}
      {selectedMovieId !== null && (
        <MovieDetailModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const { key } = useLocation();
  const query = searchParams.get("q")?.trim() ?? "";

  return (
    <main className="px-4 pb-16 pt-4 sm:px-8 lg:px-12">
      {query ? <SearchResults key={`${key}:${query}`} query={query} /> : (
        <p className="text-neutral-400">검색창에 영화나 시리즈 제목을 입력하고 Enter를 눌러 주세요.</p>
      )}
    </main>
  );
}
