import { useEffect, useState } from "react";

import { getTrendingMovies } from "../../api/tmdbApi";
import type { WishlistItem } from "../../store/useWishlistStore";
import ContentCard from "../common/ContentCard";
import ScrollSlider from "../common/ScrollSlider";

const fetchTrendingItems = async (): Promise<WishlistItem[]> => {
  const movies = await getTrendingMovies();

  return movies.map((movie) => ({
    id: movie.id,
    mediaType: "movie",
    title: movie.title,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
  }));
};

interface TrendingRowProps {
  title?: string;
  fetchItems?: () => Promise<WishlistItem[]>;
  onSelect?: (item: WishlistItem) => void;
}

// 메인 페이지의 "지금 뜨는 콘텐츠" 줄 (TMDB 주간 트렌딩 영화)
export default function TrendingRow({
  title = "지금 뜨는 콘텐츠",
  fetchItems = fetchTrendingItems,
  onSelect,
}: TrendingRowProps) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadItems = async () => {
      try {
        const contents = await fetchItems();

        if (!ignore) {
          setItems(contents.filter((item) => item.backdropPath));
        }
      } catch {
        if (!ignore) {
          setErrorMessage(`${title}을(를) 불러오지 못했습니다.`);
        }
      }
    };

    loadItems();

    return () => {
      ignore = true;
    };
  }, [fetchItems, title]);

  return (
    <section className="py-6">
      <h2 className="mb-4 px-4 text-[22px] font-bold sm:px-8 md:text-[24px] lg:px-12">
        {title}
      </h2>

      {errorMessage ? (
        <p className="px-4 text-neutral-400 sm:px-8 lg:px-12">{errorMessage}</p>
      ) : (
        <ScrollSlider className="px-12">
          {items.map((item) => (
            <ContentCard
              key={`${item.mediaType}-${item.id}`}
              item={item}
              onSelect={onSelect}
              className="w-[260px] shrink-0 sm:w-[320px] lg:w-[390px]"
            />
          ))}
        </ScrollSlider>
      )}
    </section>
  );
}
