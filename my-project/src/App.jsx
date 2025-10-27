import { JAVA_CODES } from "./data/aoaCodes";
import CodeCard from "./components/CodeCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
       
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {JAVA_CODES.map((item, i) => (
          <CodeCard key={i} title={item.title} code={item.code} />
        ))}
      </div>
    </div>
  );
}
