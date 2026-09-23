import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Minus, Clock } from "lucide-react";

type Status = "online" | "busy" | "offline";

export function StatusAvatar() {
  const [status, setStatus] = useState<Status>("online");

  const statusConfig = {
    online: { bg: "bg-green-500", icon: Check, label: "Online" },
    busy: { bg: "bg-red-500", icon: Minus, label: "Busy" },
    offline: { bg: "bg-amber-500", icon: Clock, label: "Away" },
  };

  const CurrentIcon = statusConfig[status].icon;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Clicking avatar navigates to /profile route */}
      <Link
        to="/profile"
        className="relative inline-block group transition-transform duration-200 hover:scale-105 cursor-pointer"
        title="View Profile"
      >
        <Avatar className="h-16 w-16 border-2 border-border/60 group-hover:border-primary/60 transition-colors">
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full ${statusConfig[status].bg} ring-2 ring-background transition-colors duration-200`}
        >
          <CurrentIcon className="h-3 w-3 text-white" />
        </span>
      </Link>

      <div className="flex gap-2">
        {(["online", "busy", "offline"] as Status[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
              status === s
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80"
            }`}
          >
            {statusConfig[s].label}
          </button>
        ))}
      </div>
    </div>
  );
}
