import React, { useState } from "react";
import { FTP_PRACTICAL_DATA, NSLOOKUP_PRACTICAL_DATA } from "../data/cnPracticalsData";
import { Server, Terminal, Copy, Check, HelpCircle, Layers, ArrowRight, Download } from "lucide-react";

export default function FtpSection({ onCopyToast }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onCopyToast) onCopyToast("Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* SECTION 10: FTP PROTOCOL */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded">
                Section 10 • Lab Practical
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                FTP Protocol and File Transfer Between Client and Server
              </h2>
            </div>
          </div>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Application Layer • TCP Port 21 / 2121
          </span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
          {FTP_PRACTICAL_DATA.overview}
          <br />
          <strong className="text-slate-900">Architecture:</strong> FTP maintains two separate connections — a <em>Control connection</em> (port 21 or 2121) for commands (USER, PASS, STOR, RETR) and a separate <em>Data connection</em> for sending binary payload bytes.
        </p>

        {/* Step 1: Install pyftpdlib */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            Step 1: Install the FTP Server Library in PowerShell
          </h4>
          <div className="flex items-center justify-between bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-xs border border-slate-800">
            <span>{FTP_PRACTICAL_DATA.installation}</span>
            <button
              onClick={() => handleCopy(FTP_PRACTICAL_DATA.installation, "pip")}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs flex items-center gap-1"
            >
              {copiedKey === "pip" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Server & Client Code Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Server */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono font-bold text-amber-400">Step 2: ftp_server.py</span>
              <button
                onClick={() => handleCopy(FTP_PRACTICAL_DATA.serverCode, "server")}
                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1"
              >
                {copiedKey === "server" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Server
              </button>
            </div>
            <pre className="p-4 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
              <code>{FTP_PRACTICAL_DATA.serverCode}</code>
            </pre>
          </div>

          {/* Client */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono font-bold text-cyan-400">Step 3: ftp_client.py (Upload)</span>
              <button
                onClick={() => handleCopy(FTP_PRACTICAL_DATA.clientCode, "client")}
                className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1"
              >
                {copiedKey === "client" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Client
              </button>
            </div>
            <pre className="p-4 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
              <code>{FTP_PRACTICAL_DATA.clientCode}</code>
            </pre>
          </div>
        </div>

        {/* Step 4: Execution walkthrough & Download Snippet */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-600" /> Step 4: How to Demonstrate in Lab
            </h4>
            <ol className="text-xs text-slate-700 space-y-1.5 list-decimal pl-4">
              <li>Open Terminal 1: Run <code className="bg-slate-200 px-1 rounded">python ftp_server.py</code></li>
              <li>Create a dummy test file <code className="bg-slate-200 px-1 rounded">sample.txt</code></li>
              <li>Open Terminal 2: Run <code className="bg-slate-200 px-1 rounded">python ftp_client.py</code></li>
              <li>Enter <code className="bg-slate-200 px-1 rounded">sample.txt</code> when prompted</li>
              <li>Verify that <code className="bg-slate-200 px-1 rounded">sample.txt</code> appears inside the newly generated <code className="bg-slate-200 px-1 rounded">ftp_files</code> folder!</li>
            </ol>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-indigo-600" /> Downloading Snippet (Optional Demo)
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                Examiner may ask: <em>"How do you download instead of upload?"</em> Use <code className="text-indigo-700 font-mono">retrbinary()</code>:
              </p>
              <pre className="bg-slate-950 text-amber-300 p-2.5 rounded-lg text-xs font-mono overflow-x-auto">
                <code>{FTP_PRACTICAL_DATA.downloadCode}</code>
              </pre>
            </div>
            <button
              onClick={() => handleCopy(FTP_PRACTICAL_DATA.downloadCode, "download")}
              className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-semibold self-start flex items-center gap-1"
            >
              {copiedKey === "download" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              Copy Download Snippet
            </button>
          </div>
        </div>

        {/* FTP Viva Voce */}
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-700" /> Important FTP Viva Questions & Answers
          </h4>
          <div className="space-y-2">
            {FTP_PRACTICAL_DATA.viva.map((v, i) => (
              <div key={i} className="text-xs bg-white p-3 rounded-lg border border-amber-100">
                <span className="font-bold text-slate-900 block mb-0.5">Q: {v.q}</span>
                <span className="text-slate-700">Ans: {v.a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 12: NSLOOKUP PYTHON PROGRAM */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded">
                Section 12 • Python Program
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Python Program to Demonstrate Nslookup (DNS Resolution)
              </h2>
            </div>
          </div>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
            Application Layer • DNS Port 53
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono font-bold text-cyan-300">nslookup.py</span>
              <button
                onClick={() => handleCopy(NSLOOKUP_PRACTICAL_DATA.code, "nslookup")}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium flex items-center gap-1"
              >
                {copiedKey === "nslookup" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Script
              </button>
            </div>
            <pre className="p-4 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[320px]">
              <code>{NSLOOKUP_PRACTICAL_DATA.code}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                Sample Execution Output:
              </span>
              <pre className="bg-slate-950 text-emerald-300 p-3.5 rounded-xl text-xs font-mono border border-slate-800 whitespace-pre-wrap">
                {NSLOOKUP_PRACTICAL_DATA.sampleOutput}
              </pre>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Nslookup Viva Points:
              </span>
              <div className="space-y-2 text-xs">
                {NSLOOKUP_PRACTICAL_DATA.viva.map((v, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Q: {v.q}</strong>
                    <span className="text-slate-700">Ans: {v.a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
