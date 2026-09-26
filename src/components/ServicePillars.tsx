import { Pill, Leaf, Layers, LifeBuoy } from "lucide-react";

export default function ServicePillars() {
  const pillars = [
    {
      icon: Pill,
      title: "Medicine",
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },
    {
      icon: Leaf,
      title: "Wellness",
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      icon: Layers,
      title: "Diagnostic",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      icon: LifeBuoy,
      title: "Health",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <section className="bg-white py-3 sm:py-6 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        {/* Blinkit-style: horizontal icon row with labels */}
        <div className="flex items-center justify-around sm:justify-center sm:gap-10 lg:gap-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center gap-1 sm:gap-1.5 group cursor-pointer"
            >
              <div
                className={`flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl ${pillar.iconBg} ${pillar.iconColor} group-hover:scale-110 transition-transform duration-200`}
              >
                <pillar.icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 text-center">
                {pillar.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
