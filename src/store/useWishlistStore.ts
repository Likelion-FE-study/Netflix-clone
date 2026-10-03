import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  mediaType: "movie" | "tv";
  title: string;
  backdropPath: string | null;
  posterPath: string | null;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number, mediaType: WishlistItem["mediaType"]) => void;
  toggleItem: (item: WishlistItem) => void;
}

const isSameItem = (
  item: WishlistItem,
  id: number,
  mediaType: WishlistItem["mediaType"],
) => item.id === id && item.mediaType === mediaType;

// 찜 목록 (새로고침해도 유지되도록 localStorage에 저장)
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      // 가장 최근에 찜한 콘텐츠가 앞에 오도록 추가
      addItem: (item) =>
        set((s) =>
          s.items.some((i) => isSameItem(i, item.id, item.mediaType))
            ? s
            : { items: [item, ...s.items] },
        ),
      removeItem: (id, mediaType) =>
        set((s) => ({
          items: s.items.filter((i) => !isSameItem(i, id, mediaType)),
        })),
      toggleItem: (item) => {
        const { items, addItem, removeItem } = get();

        if (items.some((i) => isSameItem(i, item.id, item.mediaType))) {
          removeItem(item.id, item.mediaType);
        } else {
          addItem(item);
        }
      },
    }),
    { name: "netflix-wishlist" },
  ),
);

export const useIsWished = (
  id: number,
  mediaType: WishlistItem["mediaType"],
) =>
  useWishlistStore((s) =>
    s.items.some((i) => isSameItem(i, id, mediaType)),
  );
