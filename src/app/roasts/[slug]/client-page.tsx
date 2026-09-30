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
      <div className="min-h-screen bg-industrial flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
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
    <div className="min-h-screen bg-industrial">
      {/* breadcrumb */}
      <div className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/roasts" className="hover:text-foreground transition-colors">
              Roasts
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{roast.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* image */}
          <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center border border-border/40">
            <div className="text-center">
              <div className="text-6xl mb-2">☕</div>
              <p className="text-lg font-heading text-muted-foreground">{roast.name}</p>
            </div>
          </div>

          {/* details */}
          <div>
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <Badge variant="secondary" className="text-xs">
                {roast.process}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {roast.roastLevel} Roast
              </Badge>
              {!roast.available && (
                <Badge variant="destructive" className="text-xs">
                  Sold Out
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {roast.name}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              {roast.origin} · {roast.region}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {roast.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm text-accent-foreground/80 border border-accent/20"
                >
                  {note}
                </span>
              ))}
            </div>

            <Separator className="my-6" />

            {/* tasting notes */}
            <div>
              <h2 className="font-heading text-lg font-semibold mb-2">Tasting Notes</h2>
              <p className="text-muted-foreground leading-relaxed">{roast.tastingNotes}</p>
            </div>

            <Separator className="my-6" />

            {/* specs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Elevation</p>
                <p className="font-medium">{roast.elevation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Body</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${bodyPercent}%` }}
                    />
                  </div>
                  <span className="font-medium text-sm">{roast.body}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Acidity</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${acidPercent}%` }}
                    />
                  </div>
                  <span className="font-medium text-sm">{roast.acidity}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* brew methods */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Best for</p>
              <div className="flex flex-wrap gap-2">
                {roast.brewMethods.map((method) => (
                  <Badge key={method} variant="secondary" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* purchase */}
            <div className="rounded-lg border border-border/40 bg-card p-5">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold font-heading">
                  ${priceOption?.price.toFixed(2) ?? roast.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">/ {size}</span>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Size
                </label>
                <Select value={size} onValueChange={(v) => v && setSelectedSize(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {roast.priceOptions.map((opt) => (
                      <SelectItem key={opt.size} value={opt.size}>
                        {opt.size} — ${opt.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!roast.available}
                onClick={handleAddToCart}
              >
                {addedFeedback
                  ? "✓ Added to Cart"
                  : roast.available
                  ? "Add to Cart"
                  : "Sold Out"}
              </Button>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold mb-3">About This Roast</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {roast.description}
          </p>
        </div>
      </div>
    </div>
  );
}