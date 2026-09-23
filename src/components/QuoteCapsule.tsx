import { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

const quotes = [
  { text: "Small steps every day lead to big results.", author: "Mindset" },
  { text: "Protect your peace and keep growing.", author: "Self Care" },
  { text: "Simplicity is the ultimate sophistication.", author: "Design" },
  { text: "Stay curious, dream big, move forward.", author: "Inspiration" },
];

export function QuoteCapsule() {
  const [index, setIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const nextQuote = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
      setIsSpinning(false);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/40 backdrop-blur-sm transition-all duration-300">
      <div className="w-full flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className="flex items-center gap-1.5 font-medium tracking-wide">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          Daily Note
        </span>
        <button
          onClick={nextQuote}
          className="p-1 rounded-full hover:bg-secondary transition-colors"
          title="Next Note"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${
              isSpinning ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div className="text-center px-2 py-1">
        <p className="text-xs font-serif italic text-foreground/90 leading-relaxed">
          "{quotes[index].text}"
        </p>
        <span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/80 font-semibold">
          — {quotes[index].author}
        </span>
      </div>
    </div>
  );
}
