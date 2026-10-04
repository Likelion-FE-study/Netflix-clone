import { useCallback, useState } from "react";

import ContentCard from "../components/common/ContentCard";
import MovieDetailModal from "../components/detail/MovieDetailModal";
import { useWishlistStore } from "../store/useWishlistStore";
import type { WishlistItem } from "../store/useWishlistStore";

// "내가 찜한 리스트" 페이지
export default function MyList() {
  const items = useWishlistStore((s) => s.items);
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
    <main className="px-4 pb-16 pt-4 sm:px-8 lg:px-12">
      <h1 className="mb-6 text-[26px] font-bold md:text-[30px]">
        내가 찜한 리스트
      </h1>

      {items.length === 0 ? (
        <p className="mt-20 text-center text-neutral-400">
          아직 찜한 콘텐츠가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <ContentCard
              key={`${item.mediaType}-${item.id}`}
              item={item}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {selectedMovieId !== null && (
        <MovieDetailModal
          movieId={selectedMovieId}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
