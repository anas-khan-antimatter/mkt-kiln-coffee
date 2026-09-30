"use client";

import { useState } from "react";

interface TastingWheelProps {
  notes: string[];
  activeNote?: string | null;
  onNoteHover?: (note: string | null) => void;
}

const noteColors: Record<string, string> = {
  Bergamot: "bg-amber-200 text-amber-900",
  Jasmine: "bg-pink-200 text-pink-900",
  "Stone Fruit": "bg-orange-200 text-orange-900",
  "Earl Grey": "bg-stone-200 text-stone-900",
  Caramel: "bg-amber-300 text-amber-950",
  "Red Apple": "bg-red-200 text-red-900",
  "Milk Chocolate": "bg-yellow-200 text-yellow-900",
  Hazelnut: "bg-yellow-300 text-yellow-950",
  "Black Currant": "bg-purple-300 text-purple-950",
  Tomato: "bg-red-300 text-red-950",
  "Brown Sugar": "bg-amber-200 text-amber-900",
  Winey: "bg-rose-300 text-rose-950",
  Blueberry: "bg-indigo-300 text-indigo-950",
  "Wine Gums": "bg-pink-300 text-pink-950",
  "Dark Chocolate": "bg-stone-300 text-stone-950",
  Molasses: "bg-amber-800 text-amber-50",
  Cocoa: "bg-stone-300 text-stone-900",
  "Orange Zest": "bg-orange-200 text-orange-900",
  Almond: "bg-yellow-200 text-yellow-900",
  "Brown Spice": "bg-red-200 text-red-900",
  Cedar: "bg-lime-200 text-lime-900",
  Tobacco: "bg-amber-100 text-amber-900",
  "Dark Cocoa": "bg-stone-400 text-stone-50",
  Cinnamon: "bg-red-100 text-red-900",
  Lemon: "bg-yellow-100 text-yellow-900",
  Cream: "bg-stone-100 text-stone-800",
  Honey: "bg-amber-100 text-amber-900",
  Shortbread: "bg-yellow-100 text-yellow-800",
  Peanut: "bg-amber-200 text-amber-800",
  "Dark Berry": "bg-purple-200 text-purple-900",
  "Cocoa Powder": "bg-stone-200 text-stone-800",
  Raspberry: "bg-rose-200 text-rose-900",
  Vanilla: "bg-stone-100 text-stone-800",
  "Cane Sugar": "bg-yellow-100 text-yellow-800",
  Floral: "bg-pink-100 text-pink-800",
  Cherry: "bg-red-300 text-red-950",
  "Dark Rum": "bg-amber-300 text-amber-950",
  "Cocoa Nib": "bg-stone-300 text-stone-50",
  "Tropical Fruit": "bg-green-200 text-green-900",
  Malt: "bg-yellow-200 text-yellow-900",
  "Roasted Almond": "bg-amber-200 text-amber-900",
};

export default function TastingWheel({ notes, activeNote, onNoteHover }: TastingWheelProps) {
  const [localHover, setLocalHover] = useState<string | null>(null);
  const hovered = activeNote || localHover;

  const segments = notes.length;
  const anglePerSegment = 360 / segments;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring layout */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {notes.map((note, i) => {
            const startAngle = (i * anglePerSegment) - 90;
            const endAngle = startAngle + anglePerSegment;
            const isHovered = hovered === note;
            const r = 38;
            const cx = 50;
            const cy = 50;

            const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
            const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
            const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
            const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);

            const largeArc = anglePerSegment > 180 ? 1 : 0;

            const path = `
              M ${cx} ${cy}
              L ${x1} ${y1}
              A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `;

            const labelAngle = startAngle + anglePerSegment / 2;
            const labelR = 26;
            const lx = cx + labelR * Math.cos((labelAngle * Math.PI) / 180);
            const ly = cy + labelR * Math.sin((labelAngle * Math.PI) / 180);

            const hue = (i * 35 + 20) % 360;

            return (
              <g
                key={note}
                className="wheel-segment"
                onMouseEnter={() => {
                  setLocalHover(note);
                  onNoteHover?.(note);
                }}
                onMouseLeave={() => {
                  setLocalHover(null);
                  onNoteHover?.(null);
                }}
              >
                <path
                  d={path}
                  fill={`oklch(0.6 0.08 ${hue} / ${isHovered ? 0.6 : 0.35})`}
                  stroke={`oklch(0.58 0.10 35 / 0.3)`}
                  strokeWidth="0.5"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="central"
                  transform={`rotate(${labelAngle + 90}, ${lx}, ${ly})`}
                  className="text-[3px] font-bold fill-[#2a1b0e]"
                  style={{ pointerEvents: "none" }}
                >
                  {note.length > 10 ? note.slice(0, 10) + "…" : note}
                </text>
              </g>
            );
          })}
          {/* Center circle */}
          <circle cx="50" cy="50" r="12" fill="oklch(0.92 0.01 60)" stroke="oklch(0.58 0.10 35 / 0.3)" strokeWidth="0.5" />
          <text x="50" y="48" textAnchor="middle" dominantBaseline="central" className="text-[4px] font-bold fill-[#2a1b0e]">
            Flavor
          </text>
          <text x="50" y="54" textAnchor="middle" dominantBaseline="central" className="text-[3px] fill-[#5c3a1e]">
            Wheel
          </text>
        </svg>
      </div>

      {/* Legend below */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
        {notes.map((note) => {
          const colors = noteColors[note] || "bg-secondary text-secondary-foreground";
          return (
            <button
              key={note}
              type="button"
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium border border-border/40 transition-all ${
                hovered === note
                  ? "ring-2 ring-accent scale-105 " + colors
                  : colors + " opacity-70 hover:opacity-100"
              }`}
              onMouseEnter={() => {
                setLocalHover(note);
                onNoteHover?.(note);
              }}
              onMouseLeave={() => {
                setLocalHover(null);
                onNoteHover?.(null);
              }}
            >
              {note}
            </button>
          );
        })}
      </div>

      {hovered && (
        <p className="text-sm text-accent font-medium animate-in fade-in">
          <span className="stamp text-[10px] mr-2">Tasting</span>
          {hovered}
        </p>
      )}
    </div>
  );
}