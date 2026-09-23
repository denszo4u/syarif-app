import React from "react";

interface StatusAvatarProps {
  onProfileClick?: () => void;
  statusText?: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export const StatusAvatar: React.FC<StatusAvatarProps> = ({
  onProfileClick,
  statusText = "Feeling good today!",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  isOnline = true,
}) => {
  return (
    <div
      onClick={onProfileClick}
      className="group relative flex items-center gap-3 p-2 rounded-2xl transition-all duration-200 hover:bg-accent/50 cursor-pointer select-none"
    >
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 transition-transform duration-200 group-hover:scale-105"
        />
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background ${
            isOnline ? "bg-emerald-500" : "bg-muted-foreground/50"
          }`}
        />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Status
        </span>
        <span className="text-sm font-medium text-foreground line-clamp-1">
          {statusText}
        </span>
      </div>
    </div>
  );
};

export default StatusAvatar;
