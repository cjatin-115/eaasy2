import React, { useState, useMemo } from "react";
import { PRACTICALS_DATA } from "./data/cnPracticalsData";
import PracticalCard from "./components/PracticalCard";
import CommandsReference from "./components/CommandsReference";
import FtpSection from "./components/FtpSection";
import RevisionSection from "./components/RevisionSection";
import PrerequisitesSection from "./components/PrerequisitesSection";
import {
  Network,
  Search,
  BookOpen,
  Terminal,
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  Wrench,
  Server,
  Zap,
  Eye,
  EyeOff,
  Filter
} from "lucide-react";

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState("practicals"); // 'practicals' | 'commands' | 'ftp' | 'revision' | 'setup'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayer, setSelectedLayer] = useState("All");
  const [globalShowViva, setGlobalShowViva] = useState(null); // null = per card, true = all show, false = all hide
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // Filtered practicals based on search and layer filter
  const filteredPracticals = useMemo(() => {
    return PRACTICALS_DATA.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.practicalNum.toLowerCase().includes(q) ||
        item.layer.toLowerCase().includes(q) ||
        item.theory.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
        (item.viva && item.viva.some((v) => v.q.toLowerCase().includes(q) || v.a.toLowerCase().includes(q)));

      const matchesLayer =
        selectedLayer === "All" ||
        item.layer.toLowerCase().includes(selectedLayer.toLowerCase());

      return matchesSearch && matchesLayer;
    });
  }, [searchQuery, selectedLayer]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-indigo-100">
              Exam-Ready Manual: 10 Practical Questions with Theory, Python Codes, Sample Output & Viva Answers
            </span>
          </div>
          <div className="flex items-center gap-3 text-indigo-200">
            <span className="hidden sm:inline">Windows 10/11 & Linux Compatible</span>
            <span className="bg-indigo-700/60 px-2 py-0.5 rounded text-[11px] font-mono border border-indigo-500/40">
              Python 3.12+
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Computer Networks Practical Exam
                  <span className="hidden sm:inline-block text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                    Tomorrow Prep
                  </span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Complete Practical Manual & Viva Voce Quick Revision Guide
                </p>
              </div>
            </div>

            {/* Quick Mode Stats */}
            <div className="flex items-center gap-2 text-xs">
              <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="font-semibold text-slate-700">10 Practicals</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-700">50+ Viva Q&A</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-slate-700">OS Cheatsheet</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 mt-4 pt-2 border-t border-slate-100 overflow-x-auto text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveMainTab("practicals")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeMainTab === "practicals"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Network className="w-4 h-4" />
              <span>All Practicals (1–10)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
                10
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab("commands")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeMainTab === "commands"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Network Commands Suite</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-normal">
                Sec 11
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab("ftp")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeMainTab === "ftp"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Server className="w-4 h-4" />
              <span>FTP & DNS Programs</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-normal">
                Sec 10, 12
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab("revision")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeMainTab === "revision"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Last-Minute Revision</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                Tonight
              </span>
            </button>

            <button
              onClick={() => setActiveMainTab("setup")}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeMainTab === "setup"
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Prerequisites & Setup</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {/* VIEW 1: PRACTICALS LIST */}
        {activeMainTab === "practicals" && (
          <div className="space-y-6">
            {/* Filter and Search Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search practicals by name, theory concept, viva question, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              {/* Layer Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Layer:
                </span>
                {["All", "Data Link", "Network", "Transport"].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setSelectedLayer(layer)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      selectedLayer === layer
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>

              {/* Flashcard Viva Mode toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs self-start md:self-auto">
                <span className="text-[11px] font-bold text-slate-500 px-2">Viva Mode:</span>
                <button
                  onClick={() => setGlobalShowViva(true)}
                  className={`px-2 py-1 rounded-lg font-medium flex items-center gap-1 ${
                    globalShowViva === true
                      ? "bg-white text-indigo-700 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Reveal all viva answers"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Show All
                </button>
                <button
                  onClick={() => setGlobalShowViva(false)}
                  className={`px-2 py-1 rounded-lg font-medium flex items-center gap-1 ${
                    globalShowViva === false
                      ? "bg-white text-indigo-700 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Hide all viva answers for flashcard practice"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Hide All
                </button>
              </div>
            </div>

            {/* Results count banner */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <strong>{filteredPracticals.length}</strong> of{" "}
                <strong>{PRACTICALS_DATA.length}</strong> experiments
                {selectedLayer !== "All" && ` in ${selectedLayer} layer`}
              </span>
              <span className="text-slate-400">
                Click any tab inside cards: [Python Code] | [Theory & Working] | [Sample I/O] | [Viva Q&A]
              </span>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPracticals.map((item) => (
                <PracticalCard
                  key={item.id}
                  practical={item}
                  globalShowViva={globalShowViva}
                  onCopyToast={triggerToast}
                />
              ))}
            </div>

            {filteredPracticals.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <p className="text-slate-500 text-sm">
                  No practicals matched your search query: "<strong>{searchQuery}</strong>"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLayer("All");
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: NETWORK COMMANDS */}
        {activeMainTab === "commands" && (
          <CommandsReference onCopyToast={triggerToast} />
        )}

        {/* VIEW 3: FTP & DNS */}
        {activeMainTab === "ftp" && (
          <FtpSection onCopyToast={triggerToast} />
        )}

        {/* VIEW 4: LAST-MINUTE REVISION */}
        {activeMainTab === "revision" && (
          <RevisionSection />
        )}

        {/* VIEW 5: SETUP & PREREQUISITES */}
        {activeMainTab === "setup" && (
          <PrerequisitesSection onCopyToast={triggerToast} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-700">
              Computer Networks Practical Exam Complete Preparation Guide
            </p>
            <p className="text-[11px] text-slate-400">
              Exam tip: Examiners love line-by-line explanation of loops, socket primitives sequence, and framing rules.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-600">All 10 Lab Programs Ready & Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
