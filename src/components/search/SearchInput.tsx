import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ value, defaultValue = "", onChange, onSubmit, onOpenChange, placeholder = "제목, 사람, 장르", className = "" }: SearchInputProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();
  const query = value ?? internalValue;

  function changeValue(next: string) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function changeOpen(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
    if (!next) toggleRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      changeOpen(false);
    }
  }

  return (
    <div onKeyDown={handleKeyDown} className={`flex min-w-0 items-center text-white ${className}`}>
      <button ref={toggleRef} type="button" aria-label={open ? "검색창 닫기" : "검색창 열기"} aria-expanded={open} aria-controls={inputId} onClick={() => changeOpen(!open)} className={`flex size-10 shrink-0 items-center justify-center outline-none ring-0 focus-visible:bg-neutral-700 ${open ? "border-y border-l border-white bg-netflix-black" : "rounded hover:bg-white/10"}`}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
      </button>
      {open && (
        <form role="search" aria-label="콘텐츠 검색" className="flex h-10 min-w-0 items-center border-y border-r border-white bg-netflix-black has-[:focus-visible]:bg-neutral-900" onSubmit={(event) => { event.preventDefault(); onSubmit?.(query.trim()); }}>
          <label htmlFor={inputId} className="sr-only">콘텐츠 검색어</label>
          <input id={inputId} ref={inputRef} autoFocus type="text" value={query} placeholder={placeholder} onChange={(event) => changeValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && event.nativeEvent.isComposing) event.preventDefault(); }} className="w-28 min-w-0 border-0 bg-transparent px-2 text-sm outline-none ring-0 placeholder:text-neutral-400 sm:w-48" />
          <button type="button" aria-label="검색어 지우기" disabled={!query} onClick={() => { changeValue(""); inputRef.current?.focus(); }} className="flex size-9 shrink-0 items-center justify-center outline-none ring-0 hover:bg-white/10 focus-visible:bg-neutral-700 disabled:opacity-30">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </form>
      )}
    </div>
  );
}
