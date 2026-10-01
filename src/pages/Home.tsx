import { useCountStore } from "../store/useCountStore.ts";

export default function Home() {
  const count = useCountStore((s) => s.count);
  const increase = useCountStore((s) => s.increase);

  return (
    <div>
      <h1 className="text-4xl font-bold text-red-600">Netflix</h1>
    </div>
  );
}
