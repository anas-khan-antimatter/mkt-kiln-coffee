"use client";

import { useState } from "react";
import Link from "next/link";
import { brewGuides } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type BrewMethod = (typeof brewGuides)[number];

const ratioDefaults: Record<string, { ratio: string; dose: number; water: number }> = {
  "Pour Over": { ratio: "1:16", dose: 22, water: 352 },
  "AeroPress": { ratio: "1:15", dose: 15, water: 225 },
  "Chemex": { ratio: "1:16", dose: 30, water: 480 },
  "French Press": { ratio: "1:15", dose: 30, water: 450 },
  "Espresso": { ratio: "1:2", dose: 18, water: 36 },
  "Drip": { ratio: "1:17", dose: 20, water: 340 },
  "Cold Brew": { ratio: "1:8", dose: 100, water: 800 },
  "Moka Pot": { ratio: "1:10", dose: 17, water: 170 },
};

export default function BrewGuidesPage() {
  const [selectedMethod, setSelectedMethod] = useState<string>("Pour Over");
  const [dose, setDose] = useState<number>(22);
  const [ratioPart, setRatioPart] = useState<number>(16);

  const guide = brewGuides.find((g) => g.method === selectedMethod);
  const defaults = ratioDefaults[selectedMethod] || ratioDefaults["Pour Over"];
  const waterOutput = Math.round(dose * ratioPart);

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    const d = ratioDefaults[method];
    if (d) {
      setDose(d.dose);
      setRatioPart(parseInt(d.ratio.split(":")[1]));
    }
  };

  const totalDissolved = Math.round(waterOutput * 0.015); // ~1.5% TDS
  const brewTime = guide?.time || "3:00";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/40 bg-kraft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 text-sm">Brew Guides</Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Brew Better Coffee
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Dial in your technique with our interactive ratio calculator and
            step-by-step guides for every brew method.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Method selector */}
        <div className="mb-10">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Select Brew Method
          </label>
          <div className="flex flex-wrap gap-3">
            {brewGuides.map((g) => (
              <button
                key={g.method}
                type="button"
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  selectedMethod === g.method
                    ? "bg-accent text-accent-foreground border-accent shadow-md"
                    : "bg-card border-border/40 hover:border-accent/50 text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => handleMethodChange(g.method)}
              >
                {g.icon} {g.method}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border/40 bg-card p-6 rip-edge">
              <h2 className="font-heading text-xl font-bold mb-1 flex items-center gap-2">
                <span>⚖️</span> Ratio Calculator
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Adjust dose and ratio to find your perfect brew.
              </p>

              {/* Method: ratio info */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Standard Ratio
                </p>
                <p className="text-2xl font-bold font-heading">
                  {defaults.ratio}
                </p>
              </div>

              {/* Dose slider */}
              <div className="mb-5">
                <label className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Coffee Dose</span>
                  <span className="font-heading font-bold text-accent">{dose}g</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="0.5"
                  value={dose}
                  onChange={(e) => setDose(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, oklch(0.58 0.10 35) 0%, oklch(0.58 0.10 35) ${(dose / 60) * 100}%, oklch(0.85 0.02 50) ${(dose / 60) * 100}%, oklch(0.85 0.02 50) 100%)`,
                    accentColor: "oklch(0.58 0.10 35)",
                  }}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>5g</span>
                  <span>60g</span>
                </div>
              </div>

              {/* Ratio slider */}
              <div className="mb-5">
                <label className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Ratio (1:X)</span>
                  <span className="font-heading font-bold text-accent">1:{ratioPart}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={ratioPart}
                  onChange={(e) => setRatioPart(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, oklch(0.58 0.10 35) 0%, oklch(0.58 0.10 35) ${(ratioPart / 20) * 100}%, oklch(0.85 0.02 50) ${(ratioPart / 20) * 100}%, oklch(0.85 0.02 50) 100%)`,
                    accentColor: "oklch(0.58 0.10 35)",
                  }}
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>1:1 (ristretto)</span>
                  <span>1:20 (light)</span>
                </div>
              </div>

              <Separator className="my-5" />

              {/* Results */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-accent/5 border border-accent/10 p-3">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Water</p>
                  <p className="text-xl font-bold font-heading text-accent">{waterOutput}ml</p>
                </div>
                <div className="rounded-lg bg-accent/5 border border-accent/10 p-3">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">~TDS</p>
                  <p className="text-xl font-bold font-heading text-accent">{totalDissolved}g</p>
                </div>
                <div className="rounded-lg bg-accent/5 border border-accent/10 p-3">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Brew Time</p>
                  <p className="text-xl font-bold font-heading text-accent">{brewTime}</p>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-muted-foreground text-center">
                Target water temp: <span className="font-medium">{defaults?.temperature || "93°C"}</span>
              </p>
            </div>
          </div>

          {/* Guide */}
          <div className="lg:col-span-3">
            {guide && (
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{guide.icon}</div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold">{guide.title}</h2>
                    <p className="text-muted-foreground">{guide.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">{guide.time}</Badge>
                      <Badge variant="outline" className="text-xs">{guide.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">{guide.ratio}</Badge>
                      <Badge variant="outline" className="text-xs">{guide.temperature}</Badge>
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-4 mb-8">
                  {guide.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold border border-accent/20">
                        {i + 1}
                      </div>
                      <div className="pt-0.5 text-sm text-muted-foreground leading-relaxed">{step}</div>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                {guide.tips.length > 0 && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-5">
                    <h3 className="font-heading font-semibold text-sm text-amber-800 mb-2 flex items-center gap-2">
                      <span>💡</span> Pro Tips
                    </h3>
                    <ul className="space-y-1.5">
                      {guide.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}