import { useState } from "react";
import { BubblySidebar } from "@/components/BubblySidebar";
import { StatusAvatar } from "@/components/StatusAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FocusStatusPicker } from "@/components/FocusStatusPicker";
import { QuoteCapsule } from "@/components/QuoteCapsule";
import { AestheticGame } from "@/components/AestheticGame";
import { ProfilePage } from "@/components/ProfilePage";
import { HealthPage } from "@/components/HealthPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="relative min-h-screen bg-background text-foreground flex p-4 md:p-6 gap-6 transition-colors duration-300 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none" />

      {/* Glossy Bubbly Sidebar */}
      <BubblySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="relative flex-1 flex flex-col items-center justify-center p-6 md:p-10 rounded-[2.5rem] bg-card/40 backdrop-blur-2xl border border-border/50 shadow-2xl overflow-y-auto">
        {/* Top Gloss Highlight Line */}
        <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent pointer-events-none" />

        {/* 1. HOME TAB */}
        {activeTab === "home" && (
          <div className="relative flex flex-col items-center gap-5 p-6 md:p-8 rounded-[2rem] bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border shadow-xl w-full max-w-md my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent pointer-events-none" />

            <StatusAvatar onProfileClick={() => setActiveTab("profile")} />
            <FocusStatusPicker />
            <AestheticGame />
            <QuoteCapsule />

            <div className="w-full border-t border-border/60 pt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* 2. PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <ProfilePage />
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* 3. HEALTH TAB */}
        {activeTab === "health" && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <HealthPage />
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* 4. SECURITY TAB (Placeholder) */}
        {activeTab === "security" && (
          <div className="relative flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-foreground">
              Security Center
            </h2>
            <p className="text-xs text-muted-foreground">
              Manage your credentials, encryption keys, and active sessions.
            </p>
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* 5. SETTINGS TAB (Placeholder) */}
        {activeTab === "settings" && (
          <div className="relative flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-foreground">App Settings</h2>
            <p className="text-xs text-muted-foreground">
              Configure global preferences, notifications, and app theme.
            </p>
            <div className="mt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
