import { useEffect, useId, useRef, useState } from "react";

export interface ProfileMenuProps {
  userName?: string;
  email?: string;
  avatarUrl?: string;
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export default function ProfileMenu({ userName = "프로필", email, avatarUrl, onProfileClick, onLogout, className = "" }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }
    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function select(callback?: () => void) {
    setOpen(false);
    buttonRef.current?.focus();
    callback?.();
  }

  const avatar = avatarUrl ? (
    <img src={avatarUrl} alt="" className="size-8 shrink-0 rounded-sm object-cover" />
  ) : (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8 shrink-0 rounded-sm">
      <rect width="32" height="32" rx="2" fill="#087ea4" />
      <circle cx="10" cy="12" r="2" fill="white" />
      <circle cx="22" cy="12" r="2" fill="white" />
      <path d="M8 20c4 5 12 5 16 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div ref={rootRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} className={`relative shrink-0 text-white ${className}`}>
      <button ref={buttonRef} type="button" aria-label={`${userName} 메뉴`} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)} className="flex min-h-10 items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <span className="relative inline-flex size-8 shrink-0">
          {avatar}
          {open && <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full z-[51] mt-2 size-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-neutral-300" />}
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} fill="currentColor"><path d="m5 7 5 6 5-6z" /></svg>
      </button>
      {open && (
        <div id={panelId} className="absolute right-0 top-full z-50 mt-3 w-64 max-w-[calc(100vw-2rem)] border border-neutral-700 bg-black/95 text-sm shadow-xl">
          {onProfileClick ? (
            <button type="button" onClick={() => select(onProfileClick)} className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
              {avatar}<span className="min-w-0 wrap-anywhere">{email || userName}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-4">{avatar}<p className="min-w-0 wrap-anywhere">{email || userName}</p></div>
          )}
          <button type="button" disabled={!onLogout} onClick={() => select(onLogout)} className="w-full border-t border-neutral-600 px-4 py-4 text-center hover:underline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50">넷플릭스에서 로그아웃</button>
        </div>
      )}
    </div>
  );
}
