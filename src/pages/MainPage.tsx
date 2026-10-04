import { useCallback, useState } from "react";

import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularSeries,
} from "../api/tmdbApi";
import MovieDetailModal from "../components/detail/MovieDetailModal";
import Trending from "../components/home/Trending";
import HeroBanner from "../components/main/HeroBanner";
import TrendingRow from "../components/main/TrendingRow";
import WishlistRow from "../components/wishlist/WishlistRow";
import type { WishlistItem } from "../store/useWishlistStore";

export default function MainPage() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  // 상세 모달은 현재 영화만 지원
  const handleSelect = (item: WishlistItem) => {
    if (item.mediaType === "movie") {
      setSelectedMovieId(item.id);
    }
  };

  const handleCloseModal = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  return (
    <main>
      <HeroBanner onSelectMovie={setSelectedMovieId} />

      <div className="relative z-10 pt-2">
        <Trending
          title="오늘 한국 Top 10"
          onSelect={setSelectedMovieId}
          className="px-4 py-6 sm:px-8 lg:px-12"
        />
        <TrendingRow
          title="시청 중인 콘텐츠"
          fetchItems={getNowPlayingMovies}
          onSelect={handleSelect}
        />
        <WishlistRow onSelect={handleSelect} />
        <TrendingRow
          title="인기 영화"
          fetchItems={getPopularMovies}
          onSelect={handleSelect}
        />
        <TrendingRow
          title="인기 시리즈"
          fetchItems={getPopularSeries}
          onSelect={handleSelect}
        />
      </div>

      {selectedMovieId !== null && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
