import { AOA_CODES } from "./data/aoaCodes";
import CodeCard from "./components/CodeCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🧩 AOA Internal Exam Codes
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AOA_CODES.map((item, i) => (
          <CodeCard key={i} title={item.title} code={item.code} />
        ))}
      </div>
    </div>
  );
}
