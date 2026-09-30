"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roasts } from "@/data";
import type { RoastProduct } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";

/* ── Tasting Wheel colour map ── */
const NOTE_COLORS: Record<string, string> = {
  Bergamot: "bg-amber-200 border-amber-400",
  Jasmine: "bg-sky-200 border-sky-400",
  "Stone Fruit": "bg-orange-200 border-orange-400",
  "Earl Grey": "bg-stone-300 border-stone-500",
  Caramel: "bg-amber-300 border-amber-500",
  "Red Apple": "bg-red-200 border-red-400",
  "Milk Chocolate": "bg-brown-200 border-brown-400",
  Hazelnut: "bg-yellow-200 border-yellow-400",
  "Black Currant": "bg-violet-200 border-violet-400",
  Tomato: "bg-rose-200 border-rose-400",
  "Brown Sugar": "bg-amber-100 border-amber-300",
  Winey: "bg-fuchsia-200 border-fuchsia-400",
  Blueberry: "bg-indigo-200 border-indigo-400",
  "Wine Gums": "bg-pink-200 border-pink-400",
  "Dark Chocolate": "bg-stone-400 border-stone-600",
  Molasses: "bg-amber-400 border-amber-600",
  Cocoa: "bg-stone-200 border-stone-400",
  "Orange Zest": "bg-orange-100 border-orange-300",
  Almond: "bg-yellow-100 border-yellow-300",
  "Brown Spice": "bg-red-100 border-red-300",
  Cedar: "bg-green-200 border-green-400",
  Tobacco: "bg-stone-300 border-stone-500",
  "Dark Cocoa": "bg-stone-400 border-stone-600",
  Cinnamon: "bg-orange-200 border-orange-400",
  Lemon: "bg-lime-100 border-lime-300",
  Cream: "bg-slate-100 border-slate-300",
  Honey: "bg-yellow-200 border-yellow-400",
  Shortbread: "bg-amber-100 border-amber-300",
  Peanut: "bg-yellow-200 border-yellow-400",
  "Dark Berry": "bg-purple-200 border-purple-400",
  "Cocoa Powder": "bg-stone-200 border-stone-400",
  Raspberry: "bg-rose-100 border-rose-300",
  Vanilla: "bg-slate-100 border-slate-300",
  "Cane Sugar": "bg-amber-50 border-amber-200",
  Floral: "bg-pink-100 border-pink-300",
  Cherry: "bg-red-200 border-red-400",
  "Dark Rum": "bg-amber-300 border-amber-500",
  "Cocoa Nib": "bg-stone-300 border-stone-500",
  "Tropical Fruit": "bg-lime-200 border-lime-400",
  Malt: "bg-yellow-200 border-yellow-400",
  "Roasted Almond": "bg-orange-200 border-orange-400",
};

function getNoteColor(note: string): string {
  return NOTE_COLORS[note] || "bg-muted border-border/50";
}

/* ── Tasting wheel component ── */
function TastingWheel({ notes }: { notes: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const displayNotes = expanded ? notes : notes.slice(0, 4);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm font-lot tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-3"
      >
        <span className="lot-badge text-[0.45rem]">FLAVOR WHEEL</span>
        <span className="text-[0.55rem]">{expanded ? "▲ COLLAPSE" : "▼ EXPAND ALL"}</span>
      </button>
      <div className="flex flex-wrap gap-2">
        {displayNotes.map((note, i) => (
          <div
            key={note}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-lot tracking-wider ${getNoteColor(note)}`}
            title={`Flavor note: ${note}`}
          >
            <span className="w-2 h-2 rounded-full bg-foreground/40" />
            {note}
          </div>
        ))}
        {!expanded && notes.length > 4 && (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs font-lot tracking-wider text-accent hover:underline"
          >
            +{notes.length - 4} more
          </button>
        )}
      </div>
    </div>
  );
}

export default function RoastProductClient({
  slugPromise,
}: {
  slugPromise: Promise<{ slug: string }>;
}) {
  const { addItem } = useCart();
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    slugPromise.then((v) => setSlug(v.slug));
  }, [slugPromise]);

  if (!slug) {
    return (
      <div className="min-h-screen bg-kraft flex items-center justify-center">
        <p className="text-muted-foreground font-lot text-xs tracking-widest">Loading...</p>
      </div>
    );
  }

  const roast = roasts.find((r) => r.id === slug);
  if (!roast) notFound();

  const defaultSize = roast.priceOptions[0]?.size ?? "";
  const size = selectedSize || defaultSize;
  const priceOption = roast.priceOptions.find((opt) => opt.size === size);

  const bodyLevels = ["Light", "Medium-Light", "Medium", "Medium-Full", "Full"];
  const bodyIndex = bodyLevels.indexOf(roast.body);
  const bodyPercent = bodyIndex >= 0 ? ((bodyIndex + 1) / bodyLevels.length) * 100 : 50;

  const acidLevels = ["Low", "Medium-Low", "Medium", "Medium-High", "High"];
  const acidIndex = acidLevels.indexOf(roast.acidity);
  const acidPercent = acidIndex >= 0 ? ((acidIndex + 1) / acidLevels.length) * 100 : 50;

  const handleAddToCart = () => {
    addItem(roast, size, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-kraft">
      {/* breadcrumb */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 font-lot text-[0.6rem] tracking-widest text-muted-foreground uppercase">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/roasts" className="hover:text-foreground transition-colors">Roasts</Link>
            <span>/</span>
            <span className="text-foreground">{roast.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* image + tasting wheel */}
          <div>
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center border-2 border-double border-border/50 rough-edge relative">
              <span className="lot-badge text-[0.45rem] absolute top-3 left-3 z-10">LOT #{roast.id.toUpperCase().slice(0, 8)}</span>
              <div className="text-center">
                <div className="text-6xl mb-2">☕</div>
                <p className="font-heading text-xl text-muted-foreground">{roast.name}</p>
              </div>
            </div>

            {/* tasting notes wheel section */}
            <div className="mt-8 p-5 border border-border/40 bg-card/50 rough-edge">
              <TastingWheel notes={roast.flavorNotes} />
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {roast.tastingNotes}
              </p>
            </div>
          </div>

          {/* details */}
          <div>
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <Badge variant="secondary" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">{roast.process}</Badge>
              <Badge variant="outline" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">{roast.roastLevel} Roast</Badge>
              {!roast.available && (
                <Badge variant="destructive" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">Sold Out</Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mt-3">
              {roast.name}
            </h1>

            <p className="mt-1 font-lot text-[0.65rem] tracking-widest text-muted-foreground uppercase">
              {roast.origin} &middot; {roast.region}
            </p>

            <Separator className="my-6" />

            {/* specs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase">Elevation</p>
                <p className="font-lot text-xs tracking-wider mt-0.5">{roast.elevation}</p>
              </div>
              <div>
                <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase">Body</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${bodyPercent}%` }} />
                  </div>
                  <span className="font-lot text-[0.55rem] tracking-wider">{roast.body}</span>
                </div>
              </div>
              <div>
                <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase">Acidity</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${acidPercent}%` }} />
                  </div>
                  <span className="font-lot text-[0.55rem] tracking-wider">{roast.acidity}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* brew methods */}
            <div>
              <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase mb-2">Best For</p>
              <div className="flex flex-wrap gap-2">
                {roast.brewMethods.map((method) => (
                  <Badge key={method} variant="secondary" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">{method}</Badge>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* description */}
            <div>
              <h2 className="font-heading text-lg font-bold mb-2">About This Roast</h2>
              <p className="text-muted-foreground leading-relaxed text-sm font-sans">
                {roast.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* purchase */}
            <div className="border border-border/60 bg-card p-5 rough-edge">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold font-heading">
                  ${priceOption?.price.toFixed(2) ?? roast.price.toFixed(2)}
                </span>
                <span className="font-lot text-[0.55rem] tracking-wider text-muted-foreground uppercase">/ {size}</span>
              </div>

              <div className="mb-4">
                <label className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase mb-1.5 block">
                  Size
                </label>
                <Select value={size} onValueChange={(v) => v && setSelectedSize(v)}>
                  <SelectTrigger className="w-full bg-card border-border/60">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {roast.priceOptions.map((opt) => (
                      <SelectItem key={opt.size} value={opt.size}>
                        {opt.size} &mdash; ${opt.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full font-mono text-xs uppercase tracking-wider"
                size="lg"
                disabled={!roast.available}
                onClick={handleAddToCart}
              >
                {addedFeedback
                  ? "✓ ADDED TO CART"
                  : roast.available
                  ? "ADD TO CART"
                  : "SOLD OUT"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}