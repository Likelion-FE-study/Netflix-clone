import type { ComponentPropsWithoutRef } from "react";

export type InfoButtonProps = ComponentPropsWithoutRef<"button">;

export default function InfoButton({ children = "상세 정보", className = "", type = "button", ...props }: InfoButtonProps) {
  return (
    <button type={type} className={`inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-neutral-600/80 px-5 py-2 text-sm leading-6 font-semibold text-white transition hover:bg-neutral-600/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props}>
      <svg aria-hidden="true" viewBox="2 2 20 20" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v1" /></svg>
      <span>{children}</span>
    </button>
  );
}
