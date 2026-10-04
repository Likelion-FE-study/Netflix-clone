import { useIsWished, useWishlistStore } from "../../store/useWishlistStore";
import type { WishlistItem } from "../../store/useWishlistStore";

interface WishlistButtonProps {
  item: WishlistItem;
  className?: string;
}

// 카드·상세 모달 어디에든 붙여 쓰는 찜(+ / ✓) 토글 버튼
export default function WishlistButton({ item, className = "" }: WishlistButtonProps) {
  const isWished = useIsWished(item.id, item.mediaType);
  const toggleItem = useWishlistStore((s) => s.toggleItem);

  return (
    <button
      type="button"
      aria-label={isWished ? `${item.title} 찜 해제` : `${item.title} 찜하기`}
      aria-pressed={isWished}
      onClick={(event) => {
        event.stopPropagation();
        toggleItem(item);
      }}
      className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-400 bg-neutral-900/60 text-white transition hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
        {isWished ? <path d="M5 12l5 5 9-10" /> : <path d="M12 5v14M5 12h14" />}
      </svg>
    </button>
  );
}
