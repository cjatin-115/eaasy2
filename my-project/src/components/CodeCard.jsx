// src/components/CodeCard.jsx
export default function CodeCard({ title, code }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("✅ Code copied!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      <h2 className="font-semibold text-lg mb-2 text-gray-800">{title}</h2>
      <pre className="bg-gray-900 text-white p-3 rounded-lg overflow-x-auto text-sm">
        {code}
      </pre>
      <button
        onClick={copyToClipboard}
        className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
      >
        Copy
      </button>
    </div>
  );
}
