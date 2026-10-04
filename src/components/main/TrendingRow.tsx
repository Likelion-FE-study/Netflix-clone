import { useEffect, useState } from "react";

import { getTrendingMovies } from "../../api/tmdbApi";
import type { WishlistItem } from "../../store/useWishlistStore";
import ContentCard from "../common/ContentCard";

interface TrendingRowProps {
  onSelect?: (item: WishlistItem) => void;
}

// 메인 페이지의 "지금 뜨는 콘텐츠" 줄 (TMDB 주간 트렌딩 영화)
export default function TrendingRow({ onSelect }: TrendingRowProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();

        setItems(
          movies
            .filter((movie) => movie.backdrop_path)
            .map((movie) => ({
              id: movie.id,
              mediaType: "movie",
              title: movie.title,
              backdropPath: movie.backdrop_path,
              posterPath: movie.poster_path,
            })),
        );
      } catch {
        setErrorMessage("지금 뜨는 콘텐츠를 불러오지 못했습니다.");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className="py-6">
      <h2 className="mb-4 px-4 text-[22px] font-bold sm:px-8 md:text-[24px] lg:px-12">
        지금 뜨는 콘텐츠
      </h2>

      {errorMessage ? (
        <p className="px-4 text-neutral-400 sm:px-8 lg:px-12">{errorMessage}</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onSelect={onSelect}
              className="w-[260px] shrink-0 sm:w-[320px] lg:w-[390px]"
            />
          ))}
        </div>
      )}
    </section>
  );
}
