import { Upload, MessageCircle, FileText, CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";

export default function PrescriptionBanner({
  onOpenUpload,
}: {
  onOpenUpload: () => void;
}) {
  return (
    <section className="bg-slate-50/70 py-12 sm:py-16 border-t border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063325] via-[#074734] to-[#04281d] p-8 sm:p-12 lg:p-14 text-white shadow-xl">
          {/* Subtle background decoration */}
          <div
            className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-white/20">
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                Hassle-Free Prescription Ordering
              </span>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-white">
                Have a Prescription? <br />
                <span className="text-emerald-300">
                  Let Our Pharmacists Take Care of It.
                </span>
              </h2>

              <p className="text-sm text-emerald-100/80 max-w-xl leading-relaxed">
                Simply upload your doctor&apos;s prescription or send a quick photo on WhatsApp.
                Our registered clinical pharmacist verifies your dosages, checks compatibility, and dispatches your order.
              </p>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                  <div className="text-xs font-bold text-emerald-300 mb-0.5">1. Upload or Share</div>
                  <p className="text-[11px] text-emerald-100/70">Send photo of valid prescription</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                  <div className="text-xs font-bold text-emerald-300 mb-0.5">2. Pharmacist Review</div>
                  <p className="text-[11px] text-emerald-100/70">Verified within 15 minutes</p>
                </div>
                <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                  <div className="text-xs font-bold text-emerald-300 mb-0.5">3. Doorstep Delivery</div>
                  <p className="text-[11px] text-emerald-100/70">Packed with batch test records</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onOpenUpload}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  <Upload className="h-4 w-4 text-emerald-800" />
                  <span>Upload Prescription Form</span>
                </button>

                <a
                  href="https://wa.me/919493504671?text=Hi%20Briven%2C%20I%20want%20to%20order%20medicines%20with%20my%20prescription"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:bg-[#20ba59] transition-colors shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send via WhatsApp (+91 94935 04671)</span>
                </a>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-white space-y-4 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <ShieldCheck className="h-7 w-7 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Strict Drug Compliance
                    </h3>
                    <p className="text-xs text-emerald-100/70">
                      Drugs and Cosmetics Act, 1940
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-emerald-100/80 border-t border-white/15 pt-3">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Schedule H and H1 medications require a valid licensed physician&apos;s prescription.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Government accredited batch certification and licensed clinical storage.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Free dosage and medication interaction counseling available via telephone.</span>
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="tel:+919493504671"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/25 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    Direct Pharmacist Line: +91 94935 04671
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
