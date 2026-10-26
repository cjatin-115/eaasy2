import React, { useState } from "react";
import { PREREQUISITES_DATA } from "../data/cnPracticalsData";
import { Wrench, Terminal, Check, Copy, ExternalLink, Monitor, Laptop } from "lucide-react";

export default function PrerequisitesSection({ onCopyToast }) {
  const [copiedCmd, setCopiedCmd] = useState(null);

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopiedCmd(txt);
    if (onCopyToast) onCopyToast(`Copied: ${txt}`);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Section 1
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Prerequisites, Software & Environment Setup
            </h2>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Almost all practicals run on a standard Windows machine without specialized hardware. Follow these setup steps to test your local environment ahead of tomorrow's exam.
        </p>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {PREREQUISITES_DATA.tools.map((tool, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{tool.name}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.badge === "Required"
                        ? "bg-rose-100 text-rose-700"
                        : tool.badge === "Recommended"
                        ? "bg-indigo-100 text-indigo-700"
                        : tool.badge === "Built-in"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tool.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {tool.command && (
                <div className="flex items-center justify-between bg-slate-900 text-emerald-400 px-2.5 py-1.5 rounded-lg text-xs font-mono">
                  <span>{tool.command}</span>
                  <button
                    onClick={() => copyText(tool.command)}
                    className="text-slate-400 hover:text-white ml-2"
                  >
                    {copiedCmd === tool.command ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Online vs Local Environment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-base text-slate-900 mb-2 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-indigo-600" />
          Can you run these online? (Environment Comparison)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Online compilers usually cannot run dual-terminal sockets, open listening ports, or run low-level OS diagnostic commands.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
              <tr>
                <th className="p-3">Environment</th>
                <th className="p-3">Suitability</th>
                <th className="p-3">Supported Capabilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PREREQUISITES_DATA.environmentTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-semibold text-slate-900">{row.env}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        row.status === "Recommended"
                          ? "bg-emerald-100 text-emerald-800"
                          : row.status === "Basic"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{row.capability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* One-time setup walkthrough */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800">
        <h3 className="font-bold text-base text-emerald-400 mb-3 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          One-Time PowerShell Setup Commands
        </h3>
        <div className="space-y-3 font-mono text-xs">
          {PREREQUISITES_DATA.setupSteps.map((step, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
