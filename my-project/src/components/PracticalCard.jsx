import React, { useState } from "react";
import {
  Code,
  BookOpen,
  Terminal,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight
} from "lucide-react";

export default function PracticalCard({ practical, globalShowViva, onCopyToast }) {
  const [activeTab, setActiveTab] = useState("code"); // 'code' | 'theory' | 'io' | 'viva'
  const [copied, setCopied] = useState(false);
  const [openVivaIndexes, setOpenVivaIndexes] = useState({});

  const handleCopy = () => {
    navigator.clipboard.writeText(practical.code);
    setCopied(true);
    if (onCopyToast) onCopyToast(`Copied code for ${practical.practicalNum}!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleViva = (index) => {
    setOpenVivaIndexes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isVivaOpen = (index) => {
    if (globalShowViva !== null) {
      return globalShowViva;
    }
    return openVivaIndexes[index] ?? true;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/40">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 tracking-wide uppercase">
              {practical.practicalNum}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <Layers className="w-3 h-3" />
              {practical.layer}
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
            {practical.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {practical.title}
        </h3>

        {/* Tags */}
        {practical.tags && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {practical.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 text-xs font-semibold px-4 pt-2 gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all ${
            activeTab === "code"
              ? "bg-white text-indigo-600 shadow-xs border-t-2 border-indigo-600 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Python Code
        </button>

        <button
          onClick={() => setActiveTab("theory")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all ${
            activeTab === "theory"
              ? "bg-white text-indigo-600 shadow-xs border-t-2 border-indigo-600 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Theory & Working
        </button>

        <button
          onClick={() => setActiveTab("io")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all ${
            activeTab === "io"
              ? "bg-white text-indigo-600 shadow-xs border-t-2 border-indigo-600 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Sample I/O
        </button>

        <button
          onClick={() => setActiveTab("viva")}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-all ${
            activeTab === "viva"
              ? "bg-white text-indigo-600 shadow-xs border-t-2 border-indigo-600 font-bold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Viva Q&A ({practical.viva?.length || 0})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* TAB 1: CODE */}
        {activeTab === "code" && (
          <div className="space-y-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
              <span className="font-mono text-slate-600">
                Language: <strong className="text-slate-800">Python 3</strong>
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs transition"
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

            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner flex-1">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2">script.py</span>
                </span>
                <span className="text-slate-500 text-[10px]">UTF-8</span>
              </div>
              <pre className="p-4 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[460px] scrollbar-thin">
                <code>{practical.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 2: THEORY & WORKING */}
        {activeTab === "theory" && (
          <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-indigo-700">
                <BookOpen className="w-4 h-4" /> Concept & Theory
              </h4>
              <p className="whitespace-pre-line text-slate-700 text-xs sm:text-sm">
                {practical.theory}
              </p>
            </div>

            {practical.working && (
              <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-xs">
                <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-indigo-700">
                  <ArrowRight className="w-4 h-4 text-indigo-600" /> Working & Execution Steps
                </h4>
                <ul className="space-y-2">
                  {practical.working.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200">
                        {idx + 1}
                      </span>
                      <span>{step.replace(/^Step \d+:\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAMPLE I/O */}
        {activeTab === "io" && (
          <div className="space-y-4">
            {practical.sampleInput && practical.sampleInput !== "(None - queries system automatically)" && (
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5">
                  Input format:
                </span>
                <pre className="bg-slate-100 p-3 rounded-lg text-xs font-mono text-slate-800 border border-slate-200 whitespace-pre-wrap">
                  {practical.sampleInput}
                </pre>
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1.5 flex items-center justify-between">
                <span>Terminal Output:</span>
                <span className="text-[11px] text-slate-500 font-normal">Expected Exam Output</span>
              </span>
              <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {practical.sampleOutput}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: VIVA QUESTIONS */}
        {activeTab === "viva" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-semibold text-slate-600">
                Important Viva Voce Questions & Answers
              </span>
              <span className="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-medium">
                Click question to toggle answer
              </span>
            </div>

            <div className="space-y-2.5">
              {practical.viva?.map((item, index) => {
                const open = isVivaOpen(index);
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => toggleViva(index)}
                      className="w-full text-left p-3.5 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold shrink-0">
                          Q{index + 1}.
                        </span>
                        <span>{item.q}</span>
                      </span>
                      {open ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {open && (
                      <div className="p-3.5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">
                          Ans:
                        </span>
                        <div>{item.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
