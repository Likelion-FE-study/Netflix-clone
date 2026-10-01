import { Link } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h1>페이지를 찾을 수 없어요</h1>
      <Link to="/">홈으로</Link>
    </div>
  );
}
