import { useRef } from "react";
import type { ReactNode } from "react";

interface ScrollSliderProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollSlider({ children, className = "" }: ScrollSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => scrollByPage(-1)}
        aria-label="이전 콘텐츠"
        className="absolute left-0 top-1/2 z-20 h-28 -translate-y-1/2 rounded bg-neutral-800/90 px-3 text-4xl opacity-0 transition group-hover:opacity-100 hover:bg-neutral-700 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
      >
        ‹
      </button>

      <div
        ref={sliderRef}
        className={`flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByPage(1)}
        aria-label="다음 콘텐츠"
        className="absolute right-0 top-1/2 z-20 h-28 -translate-y-1/2 rounded bg-neutral-800/90 px-3 text-4xl opacity-0 transition group-hover:opacity-100 hover:bg-neutral-700 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-white"
      >
        ›
      </button>
    </div>
  );
}
