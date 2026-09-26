"use client";

import { useState } from "react";
import { X, MapPin, Check, Search } from "lucide-react";

const popularCities = [
  { name: "Vijayawada", pincode: "520001", state: "Andhra Pradesh" },
  { name: "Guntur", pincode: "522001", state: "Andhra Pradesh" },
  { name: "Visakhapatnam", pincode: "530001", state: "Andhra Pradesh" },
  { name: "Amaravati", pincode: "522020", state: "Andhra Pradesh" },
  { name: "Hyderabad", pincode: "500001", state: "Telangana" },
  { name: "Bengaluru", pincode: "560001", state: "Karnataka" },
  { name: "Chennai", pincode: "600001", state: "Tamil Nadu" },
  { name: "Mumbai", pincode: "400001", state: "Maharashtra" },
];

export default function LocationModal({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: { city: string; pincode: string };
  onSelectLocation: (loc: { city: string; pincode: string }) => void;
}) {
  const [pincodeInput, setPincodeInput] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincodeInput.trim())) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setError("");
    onSelectLocation({
      city: "Custom Location",
      pincode: pincodeInput.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Select Delivery Location
            </h3>
            <p className="text-xs text-slate-500">
              Check medicine availability & same-day dispatch
            </p>
          </div>
        </div>

        {/* PIN Code Form */}
        <form onSubmit={handlePincodeSubmit} className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
            Enter 6-digit PIN code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => {
                  setPincodeInput(e.target.value.replace(/\D/g, ""));
                  setError("");
                }}
                placeholder="e.g. 520001"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors shadow-sm"
            >
              Check
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        </form>

        {/* Popular Cities */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            Popular Cities
          </p>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {popularCities.map((city) => {
              const isSelected =
                currentLocation.pincode === city.pincode ||
                currentLocation.city === city.name;
              return (
                <button
                  key={city.pincode}
                  onClick={() => {
                    onSelectLocation({
                      city: city.name,
                      pincode: city.pincode,
                    });
                    onClose();
                  }}
                  className={`flex items-center justify-between rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/60 text-emerald-900"
                      : "border-slate-100 bg-slate-50/70 hover:border-slate-300 hover:bg-white text-slate-700"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{city.name}</p>
                    <p className="text-[11px] text-slate-400">
                      PIN: {city.pincode}
                    </p>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-emerald-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-3 text-center">
          <p className="text-xs text-slate-500">
            ✓ Express delivery available for confirmed locations
          </p>
        </div>
      </div>
    </div>
  );
}
