import {
  Home,
  User,
  Activity,
  Shield,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

interface BubblySidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "profile", label: "Profile", icon: User },
  { id: "health", label: "Health", icon: Activity },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BubblySidebar({ activeTab, setActiveTab }: BubblySidebarProps) {
  return (
    <aside className="relative group w-20 md:w-64 h-[calc(100vh-3rem)] my-auto flex flex-col justify-between p-4 transition-all duration-500">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative h-full w-full flex flex-col justify-between p-4 rounded-[2.5rem] bg-card/80 dark:bg-card/40 backdrop-blur-2xl border border-border shadow-xl overflow-hidden">
        <div className="flex flex-col gap-6 relative z-10">
          {/* Header Branding */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/30">
              :)
              <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-foreground">
                Syarif
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                APP
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 transform active:scale-95 group/btn ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md scale-105 border border-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover/btn:scale-110"
                    }`}
                  />
                  <span className="hidden md:block tracking-wide">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute right-3 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7] animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="border-t border-border/60 pt-4 relative z-10">
          <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition-all">
            <LogOut className="h-5 w-5" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
