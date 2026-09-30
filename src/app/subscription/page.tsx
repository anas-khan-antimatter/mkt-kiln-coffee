"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { roasts } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type BagSize = "8oz" | "12oz" | "2lb";
type Frequency = "weekly" | "biweekly" | "monthly";
type Grind = "whole-bean" | "coarse" | "medium" | "fine" | "espresso";
type ShipDay = "mon" | "wed" | "fri";

const FREQ_MULTIPLIER: Record<Frequency, number> = {
  weekly: 4.33,
  biweekly: 2.17,
  monthly: 1,
};

const GRIND_LABELS: Record<Grind, string> = {
  "whole-bean": "Whole Bean",
  coarse: "Coarse (French Press)",
  medium: "Medium (Drip)",
  fine: "Fine (Pour Over)",
  espresso: "Extra Fine (Espresso)",
};

export default function SubscriptionPage() {
  const [selectedRoastId, setSelectedRoastId] = useState<string>(roasts[0]?.id ?? "");
  const [bagSize, setBagSize] = useState<BagSize>("12oz");
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [grind, setGrind] = useState<Grind>("whole-bean");
  const [shipDay, setShipDay] = useState<ShipDay>("wed");
  const [submitted, setSubmitted] = useState(false);

  const selectedRoast = roasts.find((r) => r.id === selectedRoastId);
  const priceOption = selectedRoast?.priceOptions.find((o) => o.size === bagSize);
  const basePrice = priceOption?.price ?? selectedRoast?.price ?? 20;

  // Bulk discount: 2lb gets 10% off, biweekly & monthly get additional discount
  const bulkDiscount = bagSize === "2lb" ? 0.9 : 1;
  const freqDiscount = frequency === "monthly" ? 0.95 : frequency === "biweekly" ? 0.97 : 1;
  const effectivePrice = basePrice * bulkDiscount * freqDiscount;
  const monthlyTotal = Math.round(effectivePrice * FREQ_MULTIPLIER[frequency] * 100) / 100;
  const perShipment = Math.round(effectivePrice * 100) / 100;

  const handleSubmit = async () => {
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roastId: selectedRoastId,
          bagSize,
          frequency,
          grind,
          shipDay,
        }),
      });
    } catch {}
    setSubmitted(true);
  };

  const resetBuilder = () => setSubmitted(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-kraft flex items-center justify-center">
        <div className="max-w-lg text-center px-4">
          <div className="text-6xl mb-6 opacity-80">☕</div>
          <span className="lot-badge text-[0.5rem] mb-3">CONFIRMED</span>
          <h1 className="font-heading text-4xl font-bold mt-2">Plan Saved</h1>
          <p className="mt-4 text-muted-foreground font-sans leading-relaxed">
            Your subscription preference has been recorded. We&apos;ll send a confirmation
            email with your first shipment date and a link to manage your plan.
          </p>
          <p className="font-lot text-[0.55rem] tracking-widest text-muted-foreground mt-2 uppercase">
            {perShipment.toFixed(2)}/ship &middot; ~{monthlyTotal.toFixed(2)}/mo &middot; {GRIND_LABELS[grind]}
          </p>
          <Button
            className="mt-8 font-mono text-xs uppercase tracking-wider"
            variant="outline"
            onClick={resetBuilder}
          >
            Build Another Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kraft">
      {/* header */}
      <div className="border-b border-border/60 bg-card/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 font-lot text-[0.6rem] tracking-[0.15em] rounded-none border-2 border-double px-3 py-1">
            SUBSCRIPTION
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Build Your Plan
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl font-sans">
            Pick your roast, choose a size and frequency, and we&apos;ll handle the rest.
            Freshly roasted coffee, delivered on your schedule.
          </p>
        </div>
      </div>

      {/* builder */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* form */}
          <div className="lg:col-span-3 space-y-8">
            {/* 1. Choose Roast */}
            <div className="border border-border/40 p-5 rough-edge">
              <span className="lot-badge text-[0.45rem] mb-2">STEP 1</span>
              <h2 className="font-heading text-xl font-bold mt-2">Choose Your Roast</h2>
              <p className="text-sm text-muted-foreground mt-1 font-sans">
                Pick your primary subscription coffee. You can rotate later.
              </p>
              <div className="mt-4">
                <Select value={selectedRoastId} onValueChange={(v) => v && setSelectedRoastId(v)}>
                  <SelectTrigger className="w-full bg-card border-border/60">
                    <SelectValue placeholder="Select a roast" />
                  </SelectTrigger>
                  <SelectContent>
                    {roasts.filter((r) => r.available).map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name} &mdash; {r.origin} &middot; {r.process}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedRoast && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {selectedRoast.flavorNotes.slice(0, 3).map((n) => (
                    <span key={n} className="border border-border/40 px-2 py-0.5 font-lot text-[0.45rem] tracking-wider uppercase text-muted-foreground">
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Bag Size & Frequency */}
            <div className="border border-border/40 p-5 rough-edge">
              <span className="lot-badge text-[0.45rem] mb-2">STEP 2</span>
              <h2 className="font-heading text-xl font-bold mt-2">Size &amp; Frequency</h2>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {(["8oz", "12oz", "2lb"] as BagSize[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setBagSize(size)}
                    className={`border py-3 text-center transition-all font-lot text-xs tracking-wider uppercase ${
                      bagSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/40 bg-card text-muted-foreground hover:border-border/70"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {(["weekly", "biweekly", "monthly"] as Frequency[]).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`border py-3 text-center transition-all font-lot text-xs tracking-wider uppercase ${
                      frequency === freq
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/40 bg-card text-muted-foreground hover:border-border/70"
                    }`}
                  >
                    {freq === "weekly" ? "Weekly" : freq === "biweekly" ? "Every 2 Wk" : "Monthly"}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Grind */}
            <div className="border border-border/40 p-5 rough-edge">
              <span className="lot-badge text-[0.45rem] mb-2">STEP 3</span>
              <h2 className="font-heading text-xl font-bold mt-2">Grind Preference</h2>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(["whole-bean", "coarse", "medium", "fine", "espresso"] as Grind[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`border py-2 px-3 text-center transition-all font-lot text-[0.5rem] tracking-wider uppercase ${
                      grind === g
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/40 bg-card text-muted-foreground hover:border-border/70"
                    }`}
                  >
                    {GRIND_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ship Day */}
            <div className="border border-border/40 p-5 rough-edge">
              <span className="lot-badge text-[0.45rem] mb-2">STEP 4</span>
              <h2 className="font-heading text-xl font-bold mt-2">Ship Day</h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {(["mon", "wed", "fri"] as ShipDay[]).map((day) => (
                  <button
                    key={day}
                    onClick={() => setShipDay(day)}
                    className={`border py-3 text-center transition-all font-lot text-xs tracking-wider uppercase ${
                      shipDay === day
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/40 bg-card text-muted-foreground hover:border-border/70"
                    }`}
                  >
                    {day === "mon" ? "Monday" : day === "wed" ? "Wednesday" : "Friday"}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 py-4 h-auto"
              size="lg"
              onClick={handleSubmit}
            >
              Confirm Plan &mdash; ${perShipment.toFixed(2)}/shipment
            </Button>
          </div>

          {/* summary sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 border border-border/60 bg-card p-6 rough-edge">
              <span className="lot-badge text-[0.45rem] mb-2">SUMMARY</span>
              <h3 className="font-heading text-xl font-bold mt-2">Your Plan</h3>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Roast</span>
                  <span className="font-lot text-xs tracking-wider text-right">{selectedRoast?.name ?? "—"}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Size</span>
                  <span className="font-lot text-xs tracking-wider">{bagSize}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Frequency</span>
                  <span className="font-lot text-xs tracking-wider capitalize">{frequency}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Grind</span>
                  <span className="font-lot text-xs tracking-wider">{GRIND_LABELS[grind]}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Ship Day</span>
                  <span className="font-lot text-xs tracking-wider capitalize">{shipDay === "mon" ? "Monday" : shipDay === "wed" ? "Wednesday" : "Friday"}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg">
                  <span className="font-heading font-bold">Per Shipment</span>
                  <span className="font-heading font-bold">${perShipment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">Est. Monthly</span>
                  <span className="font-lot text-xs tracking-wider">${monthlyTotal.toFixed(2)}/mo</span>
                </div>
                {bulkDiscount < 1 || freqDiscount < 1 ? (
                  <div className="mt-2">
                    <Badge variant="secondary" className="font-lot text-[0.45rem] tracking-wider uppercase rounded-none">
                      Discount applied
                    </Badge>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <p className="font-lot text-[0.45rem] tracking-widest text-muted-foreground">
                  Free shipping. Pause, skip, or cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}