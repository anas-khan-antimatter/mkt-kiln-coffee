"use client";

import { useState } from "react";
import Link from "next/link";
import { brewGuides } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BrewGuidesPage() {
  const [coffeeGrams, setCoffeeGrams] = useState(18);
  const [ratio, setRatio] = useState(16); // water:coffee ratio
  const waterMl = Math.round(coffeeGrams * ratio);

  return (
    <div className="min-h-screen bg-kraft">
      {/* header */}
      <div className="border-b border-border/60 bg-card/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 font-lot text-[0.6rem] tracking-[0.15em] rounded-none border-2 border-double px-3 py-1">
            RATIO CALCULATOR
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Brew Ratio Calculator
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl font-sans">
            Dial in your perfect brew. Adjust coffee dose and ratio to find your ideal
            water volume — then check our guides below for method-specific tips.
          </p>
        </div>
      </div>

      {/* calculator */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="border border-border/60 bg-card p-6 sm:p-8 rough-edge">
          <span className="lot-badge text-[0.45rem] mb-3">CALCULATOR</span>
          <h2 className="font-heading text-2xl font-bold mt-2">Find Your Ratio</h2>

          <div className="mt-8 space-y-6">
            {/* Coffee dose */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">
                  Coffee Dose
                </label>
                <span className="font-lot text-sm tracking-wider">{coffeeGrams}g</span>
              </div>
              <input
                type="range"
                min={8}
                max={30}
                step={0.5}
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(parseFloat(e.target.value))}
                className="mt-2 w-full accent-foreground"
              />
              <div className="flex justify-between font-lot text-[0.45rem] tracking-widest text-muted-foreground">
                <span>8g</span>
                <span>30g</span>
              </div>
            </div>

            {/* Ratio */}
            <div>
              <div className="flex justify-between items-center">
                <label className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">
                  Ratio (water:coffee)
                </label>
                <span className="font-lot text-sm tracking-wider">1:{ratio}</span>
              </div>
              <input
                type="range"
                min={13}
                max={20}
                step={0.5}
                value={ratio}
                onChange={(e) => setRatio(parseFloat(e.target.value))}
                className="mt-2 w-full accent-foreground"
              />
              <div className="flex justify-between font-lot text-[0.45rem] tracking-widest text-muted-foreground">
                <span>1:13 (Strong)</span>
                <span>1:20 (Light)</span>
              </div>
            </div>
          </div>

          {/* result */}
          <div className="mt-8 border-t border-border/40 pt-6 text-center">
            <span className="lot-badge text-[0.45rem] mb-2">RESULT</span>
            <div className="mt-2 flex items-baseline justify-center gap-3">
              <span className="font-heading text-5xl font-bold">{waterMl}</span>
              <span className="font-lot text-sm tracking-wider text-muted-foreground">ml water</span>
            </div>
            <p className="mt-2 font-lot text-[0.55rem] tracking-widest text-muted-foreground">
              {coffeeGrams}g coffee &times; 1:{ratio} ratio
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="font-lot text-[0.45rem] tracking-wider uppercase rounded-none">
                {ratio <= 14 ? "Strong" : ratio >= 18 ? "Light" : "Balanced"}
              </Badge>
              <Badge variant="secondary" className="font-lot text-[0.45rem] tracking-wider uppercase rounded-none">
                ~{Math.round(waterMl / 250)} cup{Math.round(waterMl / 250) !== 1 ? "s" : ""}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* brew guides cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="lot-badge text-[0.5rem] mb-2">METHOD GUIDES</span>
          <h2 className="font-heading text-3xl font-bold tracking-tight mt-2">Brewing Methods</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brewGuides.map((guide) => (
            <Card key={guide.id} className="border-border/60 bg-card stamp-border">
              <div className="aspect-[3/2] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                <span className="lot-badge text-[0.45rem] absolute top-3 left-3">{guide.method}</span>
                <div className="text-center p-4">
                  <div className="text-5xl mb-2">{guide.icon}</div>
                  <p className="font-heading text-lg font-bold">{guide.title}</p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="font-lot text-[0.45rem] tracking-wider uppercase rounded-none">
                    {guide.time}
                  </Badge>
                  <Badge variant="secondary" className="font-lot text-[0.45rem] tracking-wider uppercase rounded-none">
                    {guide.difficulty}
                  </Badge>
                </div>
                <p className="font-lot text-[0.55rem] tracking-wider text-muted-foreground uppercase">
                  Ratio: {guide.ratio} &middot; {guide.temperature}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-sans line-clamp-2">{guide.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {guide.tips.slice(0, 2).map((tip) => (
                    <span key={tip} className="border border-border/30 px-2 py-0.5 font-lot text-[0.4rem] tracking-wider text-muted-foreground">
                      {tip}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full font-mono text-xs uppercase tracking-wider" asChild>
                  <Link href={`/brew-guides/${guide.id}`}>Full Guide</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="font-mono text-xs uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link href="/brew">Interactive Brew Timer →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}