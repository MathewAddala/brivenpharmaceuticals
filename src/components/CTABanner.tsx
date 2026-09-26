import { Upload, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-8 sm:py-16 bg-briven-surface-alt">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-briven-deep to-briven-primary p-5 sm:p-10">
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-lg sm:text-3xl font-bold text-white">
                Have a Prescription?
              </h2>
              <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-base text-briven-100/90 max-w-md">
                Upload your prescription or share it on WhatsApp. We&apos;ll
                prepare and deliver your order.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/919493504671?text=Hi%2C%20I%20want%20to%20share%20my%20prescription"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-briven-deep hover:bg-briven-50 transition-colors shadow-lg w-full sm:w-auto"
              >
                <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Send Prescription
              </a>
              <a
                href="tel:+919493504671"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Call Pharmacist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
