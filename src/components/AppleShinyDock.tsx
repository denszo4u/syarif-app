import { useState } from "react";
import { Home, Compass, Heart, Bell, User, Sparkles } from "lucide-react";

const dockItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "profile", label: "Profile", icon: User },
];

export function AppleShinyDock() {
  const [active, setActive] = useState("home");

  return (
    <div className="relative group flex items-center justify-center py-2">
      {/* Glowing Backlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shiny Glass Container */}
      <nav className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ring-1 ring-white/20">
        {/* Top Reflection Highlight line */}
        <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />

        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={item.label}
              className={`relative p-3 rounded-full transition-all duration-300 transform hover:-translate-y-2.5 active:scale-95 group/icon ${
                isActive
                  ? "bg-white/80 dark:bg-white/20 text-foreground shadow-md scale-110"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10"
              }`}
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover/icon:scale-110" />

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-foreground shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              )}

              {/* Shiny Hover Sparkle */}
              <span className="absolute top-1 right-1 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200">
                <Sparkles className="h-2 w-2 text-amber-400 fill-amber-400" />
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
