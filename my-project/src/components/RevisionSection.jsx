import React from "react";
import { LAST_MINUTE_REVISION } from "../data/cnPracticalsData";
import { Zap, Clock, CheckCircle2, Bookmark, Flame } from "lucide-react";

export default function RevisionSection() {
  return (
    <div className="space-y-8">
      {/* Tonight's Recommended Study Plan Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-xs">
            <Flame className="w-6 h-6 text-yellow-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Recommended Exam Preparation Plan For Tonight
            </h2>
            <p className="text-xs text-orange-100">
              Exam tomorrow? Follow this proven 3-hour fast-track timeline to cover 100% of the syllabus.
            </p>
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LAST_MINUTE_REVISION.studyPlan.map((step, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/20 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-yellow-200 uppercase tracking-wider mb-1">
                  <Clock className="w-3 h-3" />
                  {step.time}
                </span>
                <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-orange-100 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-yellow-100 font-medium">
                Step {idx + 1} of 5
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Revision Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Column 1: Algorithm Concepts in 1 Line */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Core Algorithm Fast Recap (Questions 1–5)
              </h3>
              <p className="text-xs text-slate-500">
                One-sentence memory hooks for quick viva responses
              </p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {LAST_MINUTE_REVISION.algorithmSummaries.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 pl-4">
                  {item.concept}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Networking Concepts in 1 Line */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Networking & Sockets Fast Recap (Questions 6–10)
              </h3>
              <p className="text-xs text-slate-500">
                Essential socket, IP, and command fundamentals
              </p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {LAST_MINUTE_REVISION.networkingSummaries.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-200 transition"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 pl-4">
                  {item.concept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pro Viva Tips from the Examiner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800">
        <h4 className="font-bold text-base text-indigo-100 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Examiner's Golden Tips for Practical Exams
        </h4>
        <ul className="grid md:grid-cols-2 gap-3 text-xs sm:text-sm text-indigo-200">
          <li className="flex items-start gap-2 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>Explain line-by-line:</strong> Examiners frequently point to loops (e.g. Bellman-Ford triple loop or byte stuffing loop) and ask what each variable does.</span>
          </li>
          <li className="flex items-start gap-2 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>Know your ports:</strong> FTP (21, 20), HTTP (80), HTTPS (443), DNS (53), SSH/SFTP (22).</span>
          </li>
          <li className="flex items-start gap-2 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>Two-terminal trick:</strong> Always start the server FIRST in one terminal before running the client script in the second terminal.</span>
          </li>
          <li className="flex items-start gap-2 bg-indigo-950/60 p-3 rounded-xl border border-indigo-800">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>Binary vs Text:</strong> Always remember that binary mode (<code>rb</code>/<code>wb</code>) preserves exact bytes without encoding distortion for file transfers.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
