import { useState, useEffect } from "react";
import {
  Mail,
  ShieldCheck,
  KeyRound,
  Bell,
  ExternalLink,
  Sparkles,
  Camera,
  Check,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DEFAULT_PROFILE = {
  fullName: "Syarif",
  username: "@syarif",
  role: "Web Security Application",
  email: "syarif@example.com",
  bio: "Web security student & application security analyst.",
  avatarUrl: "https://github.com/shadcn.png",
};

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Load saved profile from localStorage or fallback to default
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [formData, setFormData] = useState(profile);

  // Sync formData whenever profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData({
            ...formData,
            avatarUrl: result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem("user_profile", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 p-6 md:p-8 rounded-[2rem] bg-card/80 dark:bg-card/40 backdrop-blur-xl border border-border shadow-xl w-full max-w-lg my-auto animate-in fade-in duration-200">
      {/* Top Reflection Highlight */}
      <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent pointer-events-none" />

      {/* Header Banner & Avatar */}
      <div className="flex flex-col items-center text-center gap-3 w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full blur-md opacity-40 animate-pulse" />
          <Avatar className="h-24 w-24 border-2 border-border/80 shadow-lg relative">
            <AvatarImage
              src={isEditing ? formData.avatarUrl : profile.avatarUrl}
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {isEditing ? (
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all"
              title="Change Photo"
            >
              <Camera className="h-4 w-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          ) : (
            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          )}
        </div>

        {!isEditing ? (
          <>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center justify-center gap-1.5">
                {profile.fullName}
                <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {profile.username} • {profile.role}
              </p>
            </div>

            <p className="text-xs text-muted-foreground px-4 text-center">
              "{profile.bio}"
            </p>

            <div className="flex gap-2 mt-1">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold">
                Pro Member
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border text-[11px] font-medium">
                Security Admin
              </span>
            </div>
          </>
        ) : (
          <div className="text-xs font-semibold text-primary uppercase tracking-wider">
            Editing Profile Details
          </div>
        )}
      </div>

      {!isEditing ? (
        /* READ-ONLY VIEW */
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Account Information
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-[11px] text-primary hover:underline font-semibold"
              >
                Edit Profile
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/50 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-400" />
                <div>
                  <p className="font-medium text-foreground">Email Address</p>
                  <p className="text-[11px] text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/50 text-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <div>
                  <p className="font-medium text-foreground">Two-Factor Auth</p>
                  <p className="text-[11px] text-muted-foreground">
                    Enabled (Authenticator App)
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-md font-semibold">
                Active
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              Preferences
            </span>

            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/20 hover:bg-secondary/60 border border-border/40 text-xs font-medium transition-all group">
              <span className="flex items-center gap-2.5 text-foreground">
                <KeyRound className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Change Password
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/20 hover:bg-secondary/60 border border-border/40 text-xs font-medium transition-all group">
              <span className="flex items-center gap-2.5 text-foreground">
                <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                Notification Settings
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      ) : (
        /* EDIT FORM VIEW */
        <div className="w-full flex flex-col gap-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-secondary/60 border border-border/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-secondary/60 border border-border/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-secondary/60 border border-border/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
              Bio
            </label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-secondary/60 border border-border/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2 border-t border-border/60">
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/70 text-foreground font-semibold transition-all active:scale-95"
            >
              <X className="h-4 w-4" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md transition-all hover:opacity-90 active:scale-95"
            >
              <Check className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
