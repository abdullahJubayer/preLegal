"use client";

import React, { useState } from "react";
import { MndaFormData, initialFormData } from "@/types/nda";
import { generateMndaMarkdown } from "@/utils/generateMnda";
import { MndaForm } from "@/components/MndaForm";
import { MndaPreview } from "@/components/MndaPreview";
import { Scale, Sparkles } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState<MndaFormData>(initialFormData);

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const markdownContent = generateMndaMarkdown(formData);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  preLegal
                </h1>
                <span className="text-[10px] font-semibold tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full uppercase">
                  MNDA Prototype
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Instant Mutual Non-Disclosure Agreement Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by Common Paper
            </span>
          </div>
        </div>
      </header>

      {/* Main Split Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-slate-900/70 backdrop-blur-lg p-6 rounded-2xl border border-slate-800 shadow-xl h-fit">
            <MndaForm data={formData} onChange={setFormData} onReset={handleReset} />
          </div>

          {/* Right Column: Live Document Preview */}
          <div className="lg:col-span-7">
            <MndaPreview data={formData} markdown={markdownContent} />
          </div>
        </div>
      </div>
    </main>
  );
}
