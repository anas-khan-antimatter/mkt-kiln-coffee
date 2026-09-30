"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brewGuides } from "@/data";
import type { BrewGuide } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function BrewGuideDetail({
  slugPromise,
}: {
  slugPromise: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);

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

  const guide = brewGuides.find((g) => g.id === slug);
  if (!guide) notFound();

  return (
    <div className="min-h-screen bg-kraft">
      {/* breadcrumb */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 font-lot text-[0.6rem] tracking-widest text-muted-foreground uppercase">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brew-guides" className="hover:text-foreground transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-foreground">{guide.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* guide header */}
        <div className="border border-border/60 bg-card p-6 sm:p-8 rough-edge">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{getIcon(guide.icon)}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">
                  {guide.method}
                </Badge>
                <Badge variant="secondary" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">
                  {guide.difficulty}
                </Badge>
                <Badge variant="outline" className="font-lot text-[0.5rem] tracking-wider uppercase rounded-none">
                  {guide.time}
                </Badge>
              </div>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {guide.title}
              </h1>
              <p className="mt-2 text-muted-foreground font-sans">{guide.subtitle}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="border border-border/40 p-3 text-center rough-edge">
              <p className="font-lot text-[0.45rem] tracking-widest text-muted-foreground uppercase">Ratio</p>
              <p className="font-lot text-xs tracking-wider mt-1">{guide.ratio}</p>
            </div>
            <div className="border border-border/40 p-3 text-center rough-edge">
              <p className="font-lot text-[0.45rem] tracking-widest text-muted-foreground uppercase">Temperature</p>
              <p className="font-lot text-xs tracking-wider mt-1">{guide.temperature}</p>
            </div>
            <div className="border border-border/40 p-3 text-center rough-edge sm:col-span-1">
              <p className="font-lot text-[0.45rem] tracking-widest text-muted-foreground uppercase">Difficulty</p>
              <p className="font-lot text-xs tracking-wider mt-1">{guide.difficulty}</p>
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="mt-10">
          <span className="lot-badge text-[0.5rem] mb-4 inline-block">STEPS</span>
          <h2 className="font-heading text-2xl font-bold tracking-tight mt-2">Brewing Steps</h2>
          <ol className="mt-6 space-y-4">
            {guide.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="lot-badge text-[0.45rem] mt-0.5 shrink-0">STEP {i + 1}</span>
                <span className="text-sm text-muted-foreground font-sans leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* tips */}
        <div className="mt-10 border border-border/40 bg-card/50 p-6 rough-edge">
          <span className="lot-badge text-[0.5rem] mb-3 inline-block">TIPS</span>
          <h2 className="font-heading text-xl font-bold tracking-tight mt-1">Pro Tips</h2>
          <ul className="mt-4 space-y-3">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-accent font-mono text-xs mt-0.5">*</span>
                <span className="text-sm text-muted-foreground font-sans leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/brew">
            <Button className="font-mono text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90">
              Interactive Timer &rarr;
            </Button>
          </Link>
          <Link href="/brew-guides">
            <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-foreground/40">
              All Guides
            </Button>
          </Link>
          <Link href="/roasts">
            <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-foreground/40">
              Shop Roasts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    drop: "💧",
    cup: "☕",
    press: "🔻",
    flask: "⚗️",
    bolt: "⚡",
    snow: "❄️",
  };
  return icons[iconName] || "☕";
}