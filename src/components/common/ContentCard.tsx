import { getTmdbImageUrl } from "../../api/tmdbApi";
import type { WishlistItem } from "../../store/useWishlistStore";
import WishlistButton from "./WishlistButton";

interface ContentCardProps {
  item: WishlistItem;
  onSelect?: (item: WishlistItem) => void;
  className?: string;
}

// 가로형 썸네일 + 좌측 하단 제목 카드 (호버 시 찜 버튼 노출)
export default function ContentCard({ item, onSelect, className = "" }: ContentCardProps) {
  const imagePath = item.backdropPath ?? item.posterPath;

  return (
    <article className={`group relative aspect-video overflow-hidden rounded-md bg-neutral-800 ${className}`}>
      <button
        type="button"
        aria-label={`${item.title} 상세 정보 보기`}
        disabled={!onSelect}
        onClick={() => onSelect?.(item)}
        className="block h-full w-full text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white disabled:cursor-default"
      >
        {imagePath && (
          <img
            src={getTmdbImageUrl(imagePath, "w780")}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute bottom-3 left-3 right-14 truncate text-[15px] font-semibold text-white drop-shadow md:text-[17px]">
          {item.title}
        </span>
      </button>

      <WishlistButton
        item={item}
        className="absolute bottom-2 right-2 size-8 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100"
      />
    </article>
  );
}
