import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeCard({ title, code, onCopyToast }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onCopyToast) onCopyToast(`Copied code for ${title}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-lg mb-3 text-slate-800 tracking-tight">{title}</h2>
        <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
          <pre className="p-4 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
            <code>{code}</code>
          </pre>
        </div>
      </div>
      <button
        onClick={copyToClipboard}
        className="mt-4 self-start inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-700 transition shadow-xs"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Code</span>
          </>
        )}
      </button>
    </div>
  );
}
