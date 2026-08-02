"use client";

import React, { useState } from "react";
import { MndaFormData } from "@/types/nda";
import { Download, Copy, Check, Eye, Code } from "lucide-react";
import confetti from "canvas-confetti";

interface PreviewProps {
  data: MndaFormData;
  markdown: string;
}

export const MndaPreview: React.FC<PreviewProps> = ({ data, markdown }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"formatted" | "markdown">("formatted");

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `Mutual_NDA_${data.party1Company.replace(/\s+/g, "_")}_${data.party2Company.replace(/\s+/g, "_")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode("formatted")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewMode === "formatted"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Formatted
          </button>
          <button
            onClick={() => setViewMode("markdown")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewMode === "markdown"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Raw Markdown
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/80 hover:bg-slate-600 text-slate-200 border border-slate-600 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-indigo-500/25 transition"
          >
            <Download className="w-3.5 h-3.5" /> Download .md
          </button>
        </div>
      </div>

      {/* Document Paper Container */}
      <div className="bg-slate-950/60 p-1 rounded-2xl border border-slate-800 shadow-2xl">
        <div id="printable-document" className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-inner min-h-[680px] font-sans text-sm leading-relaxed overflow-y-auto max-h-[750px]">
          {viewMode === "markdown" ? (
            <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {markdown}
            </pre>
          ) : (
            <div className="space-y-6">
              {/* Document Title */}
              <div className="border-b border-slate-300 pb-4 text-center">
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
                  Mutual Non-Disclosure Agreement
                </h1>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  Common Paper Standard Terms Version 1.0 Incorporated
                </p>
              </div>

              {/* Cover Page Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
                <h2 className="text-base font-bold text-slate-800 uppercase tracking-wide border-b border-slate-200 pb-2">
                  1. Cover Page
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">Purpose:</span>
                    <p className="text-slate-900 mt-0.5">{data.purpose || "[Purpose]"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">Effective Date:</span>
                    <p className="text-slate-900 mt-0.5">{data.effectiveDate || "[Effective Date]"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">MNDA Term:</span>
                    <p className="text-slate-900 mt-0.5">
                      {data.mndaTermType === "fixed"
                        ? `Expires ${data.mndaTermYears} from Effective Date`
                        : "Continues until terminated"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">Term of Confidentiality:</span>
                    <p className="text-slate-900 mt-0.5">
                      {data.confidentialityTermType === "fixed"
                        ? `${data.confidentialityTermYears} from Effective Date`
                        : "In perpetuity"}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">Governing Law:</span>
                    <p className="text-slate-900 mt-0.5">{data.governingLaw || "[Governing Law]"}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-600 block uppercase">Jurisdiction:</span>
                    <p className="text-slate-900 mt-0.5">{data.jurisdiction || "[Jurisdiction]"}</p>
                  </div>
                </div>

                {data.modifications && data.modifications !== "None" && (
                  <div className="text-xs pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-600 block uppercase">Modifications:</span>
                    <p className="text-slate-900 mt-0.5">{data.modifications}</p>
                  </div>
                )}
              </div>

              {/* Signatures Table */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Signatures
                </h3>
                <table className="w-full border-collapse border border-slate-300 text-xs">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-2 text-left text-slate-700">Field</th>
                      <th className="border border-slate-300 p-2 text-left text-slate-700">Party 1</th>
                      <th className="border border-slate-300 p-2 text-left text-slate-700">Party 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Company</td>
                      <td className="border border-slate-300 p-2 text-indigo-700 font-medium">{data.party1Company}</td>
                      <td className="border border-slate-300 p-2 text-indigo-700 font-medium">{data.party2Company}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Print Name</td>
                      <td className="border border-slate-300 p-2">{data.party1Name}</td>
                      <td className="border border-slate-300 p-2">{data.party2Name}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Title</td>
                      <td className="border border-slate-300 p-2">{data.party1Title}</td>
                      <td className="border border-slate-300 p-2">{data.party2Title}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Notice Address</td>
                      <td className="border border-slate-300 p-2">{data.party1Address}</td>
                      <td className="border border-slate-300 p-2">{data.party2Address}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Date</td>
                      <td className="border border-slate-300 p-2">{data.effectiveDate}</td>
                      <td className="border border-slate-300 p-2">{data.effectiveDate}</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-2 font-semibold bg-slate-50">Signature</td>
                      <td className="border border-slate-300 p-4 italic text-slate-400">________________________</td>
                      <td className="border border-slate-300 p-4 italic text-slate-400">________________________</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Standard Terms Summary */}
              <div className="border-t border-slate-300 pt-4 space-y-3 text-xs text-slate-700">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  2. Standard Terms (Common Paper Version 1.0)
                </h2>
                <ol className="list-decimal pl-5 space-y-2 leading-normal">
                  <li><strong>Introduction:</strong> Governs treatment of Confidential Information between Disclosing Party and Receiving Party.</li>
                  <li><strong>Use and Protection:</strong> Information must be used solely for the stated Purpose and protected with at least reasonable care.</li>
                  <li><strong>Exceptions:</strong> Obligations do not apply to publicly available, pre-existing, or independently developed information.</li>
                  <li><strong>Disclosures Required by Law:</strong> Legal compelled disclosures permitted with prior notice.</li>
                  <li><strong>Term and Termination:</strong> Commences on Effective Date and survives for the Term of Confidentiality.</li>
                  <li><strong>Return or Destruction:</strong> Requires prompt return or destruction of Confidential Information upon request.</li>
                  <li><strong>Governing Law:</strong> Governed under the laws of {data.governingLaw || "specified state"} with jurisdiction in {data.jurisdiction || "specified courts"}.</li>
                </ol>
              </div>

              {/* Footer Attribution */}
              <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-400">
                Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under Creative Commons Attribution 4.0 International (CC BY 4.0).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
