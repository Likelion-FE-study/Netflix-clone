import { useCallback, useState } from "react";

import MovieDetailModal from "../components/detail/MovieDetailModal";
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
    <main className="pb-16">
      <TrendingRow onSelect={handleSelect} />

      <WishlistRow onSelect={handleSelect} />

      {selectedMovieId !== null && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
