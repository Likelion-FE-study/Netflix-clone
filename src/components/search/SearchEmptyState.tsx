export interface SearchEmptyStateProps {
  query?: string;
  message?: string;
  className?: string;
}

export default function SearchEmptyState({ query, message, className = "" }: SearchEmptyStateProps) {
  return (
    <div role="status" className={`mx-auto max-w-2xl px-4 py-16 text-left text-sm leading-6 text-white sm:py-24 sm:text-base ${className}`}>
      <p className="wrap-anywhere">{message ?? (query?.trim() ? `입력하신 검색어 '${query.trim()}'(와)과 일치하는 결과가 없습니다.` : "입력하신 검색어와 일치하는 결과가 없습니다.")}</p>
      <p className="mt-3">추천 검색어:</p>
      <ul className="mt-1 list-disc pl-6">
        <li>다른 키워드를 입력해 보세요.</li>
        <li>시리즈나 영화를 찾고 계신가요?</li>
        <li>영화 제목, 시리즈 제목, 또는 배우나 감독의 이름으로 검색해 보세요.</li>
        <li>코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로 검색해 보세요.</li>
      </ul>
    </div>
  );
}
