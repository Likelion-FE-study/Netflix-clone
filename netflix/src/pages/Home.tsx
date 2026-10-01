import { useCountStore } from "../store/useCountStore.ts";

export default function Home() {
  const count = useCountStore((s) => s.count);
  const increase = useCountStore((s) => s.increase);

  return (
    <div>
      <h1>홈</h1>
      <p>카운트: {count}</p>
      <button onClick={increase}>+1</button>
    </div>
  );
}
