import React, { useState } from "react";
import { COMMANDS_REFERENCE } from "../data/cnPracticalsData";
import { Terminal, Copy, Check, Info, ShieldAlert } from "lucide-react";

export default function CommandsReference({ onCopyToast }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyCommand = (cmd, index) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    if (onCopyToast) onCopyToast(`Copied: ${cmd}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Network Commands Cheatsheet & Diagnostic Reference
            </h2>
            <p className="text-xs text-indigo-200/80">
              Covers ping, tracert, netstat, pathping, nslookup, and arp for Windows & Linux
            </p>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-200 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="p-3">Command</th>
                <th className="p-3">Primary Purpose</th>
                <th className="p-3">Quick Windows Syntax</th>
                <th className="p-3">Quick Linux Syntax</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {COMMANDS_REFERENCE.map((cmd, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-mono font-bold text-indigo-400">{cmd.name}</td>
                  <td className="p-3 text-slate-300">{cmd.purpose}</td>
                  <td className="p-3 font-mono text-emerald-400">{cmd.windowsSyntax}</td>
                  <td className="p-3 font-mono text-cyan-400">{cmd.linuxSyntax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Command Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {COMMANDS_REFERENCE.map((cmd, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                  {cmd.name}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  OS Diagnostic
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 font-medium mb-3">
                {cmd.purpose}
              </p>

              {/* Windows Syntax */}
              <div className="mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Windows PowerShell / CMD:
                </span>
                <div className="flex items-center justify-between bg-slate-950 text-emerald-400 p-2.5 rounded-xl font-mono text-xs border border-slate-800">
                  <span>{cmd.windowsSyntax}</span>
                  <button
                    onClick={() => copyCommand(cmd.windowsSyntax, `win-${idx}`)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy Windows command"
                  >
                    {copiedIndex === `win-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Linux Syntax */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Linux / macOS Terminal:
                </span>
                <div className="flex items-center justify-between bg-slate-900 text-cyan-400 p-2.5 rounded-xl font-mono text-xs border border-slate-800">
                  <span>{cmd.linuxSyntax}</span>
                  <button
                    onClick={() => copyCommand(cmd.linuxSyntax, `lin-${idx}`)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Copy Linux command"
                  >
                    {copiedIndex === `lin-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Key Flags */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <span className="font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-indigo-600" /> Key Command Flags & Options:
                </span>
                <ul className="space-y-1">
                  {cmd.keyOptions.map((opt, oIdx) => (
                    <li key={oIdx} className="text-slate-600">
                      <code className="text-indigo-700 font-bold bg-indigo-50 px-1 py-0.5 rounded text-[11px]">
                        {opt.flag}
                      </code>
                      : {opt.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Practical Use Case */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
              <strong>Exam / Lab Use Case:</strong> {cmd.useCase}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
