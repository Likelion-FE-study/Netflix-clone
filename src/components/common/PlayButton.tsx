import type { ComponentPropsWithoutRef } from "react";

export type PlayButtonProps = ComponentPropsWithoutRef<"button">;

export default function PlayButton({ children = "재생", className = "", type = "button", ...props }: PlayButtonProps) {
  return (
    <button type={type} className={`inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-white px-5 py-2 text-sm leading-6 font-semibold text-netflix-black transition hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>
      <svg aria-hidden="true" viewBox="0 0 14 16" className="h-[14px] w-auto shrink-0" fill="currentColor"><path d="M0 0v16l14-8z" /></svg>
      <span>{children}</span>
    </button>
  );
}
