import { useWishlistStore } from "../../store/useWishlistStore";
import type { WishlistItem } from "../../store/useWishlistStore";
import ContentCard from "../common/ContentCard";
import ScrollSlider from "../common/ScrollSlider";

interface WishlistRowProps {
  onSelect?: (item: WishlistItem) => void;
}

// 메인 페이지의 "내가 찜한 리스트" 줄 (찜한 콘텐츠가 없으면 표시하지 않음)
export default function WishlistRow({ onSelect }: WishlistRowProps) {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <h2 className="mb-4 px-4 text-[22px] font-bold sm:px-8 md:text-[24px] lg:px-12">
        내가 찜한 리스트
      </h2>

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
    </section>
  );
}
