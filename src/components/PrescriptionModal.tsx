"use client";

import { useState } from "react";
import { X, Upload, FileText, CheckCircle2, ShieldAlert, MessageCircle, Phone } from "lucide-react";

export default function PrescriptionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Briven Pharmacist, I want to order medicines with my prescription.${patientName ? ` Patient: ${patientName}.` : ""}`
    );
    window.open(`https://wa.me/919493504671?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
                  Rx Required
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 leading-snug">
                  Upload Valid Prescription
                </h3>
                <p className="text-xs text-slate-500">
                  Our certified pharmacist will review and verify within 15 mins
                </p>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="mb-5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-5 w-5 text-emerald-700 shrink-0" />
                <div className="text-xs text-emerald-950 font-medium leading-tight">
                  <span className="font-bold">Fastest Way:</span> Send photo directly on WhatsApp for immediate review
                </div>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="shrink-0 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors"
              >
                Send via WA
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File upload zone */}
              <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center hover:bg-slate-100/60 hover:border-emerald-600 transition-all cursor-pointer">
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <span className="text-sm font-semibold text-slate-800">
                  {file ? file.name : "Click to select or drag Rx photo / PDF"}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Supported formats: JPG, PNG, PDF (Max 10MB)
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* Patient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </div>

              {/* Prescription Guidelines */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-1.5 text-xs text-slate-600">
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                  Prescription Checklist:
                </p>
                <p>• Doctor\u2019s name, clinic details & registration number must be visible</p>
                <p>• Patient name, age & prescription date must be legible</p>
                <p>• Dosage instructions & duration must be specified</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-800 py-3 text-sm font-bold text-white hover:bg-emerald-900 transition-colors shadow-md"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Prescription Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <span className="font-semibold">{patientName}</span>. Our registered clinical pharmacist has received your request.
            </p>
            <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500 max-w-sm mx-auto text-left space-y-1">
              <p>• Verification time: <strong>~10-15 minutes</strong></p>
              <p>• Confirmation will be sent to: <strong>{patientPhone}</strong></p>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Notify Pharmacist via WhatsApp
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
