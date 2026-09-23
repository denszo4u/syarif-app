import { useState } from "react";
import { Laptop, Code2, Coffee, Sparkles, Sliders } from "lucide-react";

type FocusMode = {
  id: string;
  label: string;
  statusText: string;
  icon: typeof Laptop;
  badgeStyle: string;
};

const focusModes: FocusMode[] = [
  {
    id: "deep-work",
    label: "Deep Work",
    statusText: "Focused on core deliverables",
    icon: Laptop,
    badgeStyle: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "development",
    label: "Dev Mode",
    statusText: "Building & debugging features",
    icon: Code2,
    badgeStyle: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "break",
    label: "Recharging",
    statusText: "Away for a quick break",
    icon: Coffee,
    badgeStyle: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "creative",
    label: "Creative",
    statusText: "Exploring design ideas",
    icon: Sparkles,
    badgeStyle: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
];

export function FocusStatusPicker() {
  const [selected, setSelected] = useState<FocusMode>(focusModes[0]);

  return (
    <div className="w-full flex flex-col items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      {/* Header */}
      <div className="w-full flex items-center justify-between text-xs font-medium text-slate-400 px-1">
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-semibold">
          <Sliders className="h-3 w-3 text-indigo-400" />
          Focus State
        </span>
        <span className="text-[11px] text-slate-500 font-mono">
          {selected.label}
        </span>
      </div>

      {/* Active Mode Status Badge */}
      <div
        className={`w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 ${selected.badgeStyle}`}
      >
        <selected.icon className="h-3.5 w-3.5" />
        <span className="truncate">{selected.statusText}</span>
      </div>

      {/* Mode Selector Segmented Buttons */}
      <div className="grid grid-cols-4 gap-1.5 w-full pt-0.5">
        {focusModes.map((mode) => {
          const Icon = mode.icon;
          const isActive = selected.id === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => setSelected(mode)}
              title={mode.label}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/15 text-white shadow-sm border border-white/20 scale-102"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-indigo-300" : ""}`}
              />
              <span className="text-[10px] tracking-tight truncate w-full text-center">
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
