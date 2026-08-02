"use client";

import React from "react";
import { MndaFormData } from "@/types/nda";
import { Building2, User, FileText, Calendar, Scale } from "lucide-react";

interface FormProps {
  data: MndaFormData;
  onChange: (newData: MndaFormData) => void;
  onReset: () => void;
}

export const MndaForm: React.FC<FormProps> = ({ data, onChange, onReset }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            Agreement Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the details below to generate your customized Mutual NDA.
          </p>
        </div>
        <button
          onClick={onReset}
          type="button"
          className="text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
        >
          Reset Defaults
        </button>
      </div>

      {/* Purpose & Dates */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Purpose & Effective Date
        </h3>
        
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Agreement Purpose <span className="text-rose-400">*</span>
          </label>
          <textarea
            name="purpose"
            value={data.purpose || ""}
            onChange={handleChange}
            rows={2}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            placeholder="e.g., Evaluating a potential business transaction or partnership..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Effective Date</label>
            <input
              type="date"
              name="effectiveDate"
              value={data.effectiveDate || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">MNDA Duration</label>
            <select
              name="mndaTermType"
              value={data.mndaTermType}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            >
              <option value="fixed">Fixed Term (Expires in years)</option>
              <option value="until_terminated">Continues until terminated</option>
            </select>
          </div>
        </div>

        {data.mndaTermType === "fixed" && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">MNDA Term Length</label>
            <input
              type="text"
              name="mndaTermYears"
              value={data.mndaTermYears || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
              placeholder="1 year(s)"
            />
          </div>
        )}
      </div>

      {/* Confidentiality & Legal Terms */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-4 h-4" /> Confidentiality & Jurisdiction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Term of Confidentiality</label>
            <select
              name="confidentialityTermType"
              value={data.confidentialityTermType}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            >
              <option value="fixed">Fixed Duration</option>
              <option value="in_perpetuity">In Perpetuity</option>
            </select>
          </div>

          {data.confidentialityTermType === "fixed" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Confidentiality Protection Years</label>
              <input
                type="text"
                name="confidentialityTermYears"
                value={data.confidentialityTermYears || ""}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                placeholder="1 year(s)"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Governing Law (State/Country)</label>
            <input
              type="text"
              name="governingLaw"
              value={data.governingLaw || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
              placeholder="e.g. Delaware"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Jurisdiction (Courts)</label>
            <input
              type="text"
              name="jurisdiction"
              value={data.jurisdiction || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
              placeholder="e.g. courts located in New Castle County, Delaware"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Modifications to Standard Terms</label>
          <input
            type="text"
            name="modifications"
            value={data.modifications || ""}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            placeholder="None or custom clauses..."
          />
        </div>
      </div>

      {/* Party 1 Details */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Party 1 Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Company Name</label>
            <input
              type="text"
              name="party1Company"
              value={data.party1Company || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Authorized Signatory Name</label>
            <input
              type="text"
              name="party1Name"
              value={data.party1Name || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Title</label>
            <input
              type="text"
              name="party1Title"
              value={data.party1Title || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Notice Address / Email</label>
            <input
              type="text"
              name="party1Address"
              value={data.party1Address || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Party 2 Details */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-4 h-4" /> Party 2 Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Company Name</label>
            <input
              type="text"
              name="party2Company"
              value={data.party2Company || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Authorized Signatory Name</label>
            <input
              type="text"
              name="party2Name"
              value={data.party2Name || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Title</label>
            <input
              type="text"
              name="party2Title"
              value={data.party2Title || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Notice Address / Email</label>
            <input
              type="text"
              name="party2Address"
              value={data.party2Address || ""}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
