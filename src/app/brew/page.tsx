"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type TimerPhase = "idle" | "bloom" | "pour1" | "pour2" | "drawdown" | "done";

const PHASE_CONFIG: Record<TimerPhase, { label: string; duration: number; desc: string }> = {
  idle: { label: "Ready", duration: 0, desc: "Start your brew" },
  bloom: { label: "Bloom", duration: 30, desc: "Pour 2x coffee weight in water, let bloom" },
  pour1: { label: "First Pour", duration: 15, desc: "Slow spiral pour to target weight" },
  pour2: { label: "Second Pour", duration: 15, desc: "Continue spiral pour, maintain temp" },
  drawdown: { label: "Drawdown", duration: 60, desc: "Let water drain through coffee bed" },
  done: { label: "Done", duration: 0, desc: "Enjoy your coffee!" },
};

export default function BrewTimerPage() {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [coffeeGrams, setCoffeeGrams] = useState(18);
  const [waterGrams, setWaterGrams] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToNextPhase = useCallback(() => {
    const order: TimerPhase[] = ["idle", "bloom", "pour1", "pour2", "drawdown", "done"];
    const idx = order.indexOf(phase);
    if (idx < order.length - 1) {
      const next = order[idx + 1];
      setPhase(next);
      setTimeLeft(PHASE_CONFIG[next].duration);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "idle" || phase === "done") {
      clearTimer();
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          goToNextPhase();
          return 0;
        }
        return prev - 1;
      });
      setTotalElapsed((prev) => prev + 1);
    }, 1000);
    return clearTimer;
  }, [phase, clearTimer, goToNextPhase]);

  const startBrew = () => {
    setTotalElapsed(0);
    setPhase("bloom");
    setTimeLeft(PHASE_CONFIG.bloom.duration);
  };

  const skipPhase = () => {
    goToNextPhase();
  };

  const resetTimer = () => {
    clearTimer();
    setPhase("idle");
    setTimeLeft(0);
    setTotalElapsed(0);
  };

  const phaseProgress =
    phase !== "idle" && PHASE_CONFIG[phase].duration > 0
      ? ((PHASE_CONFIG[phase].duration - timeLeft) / PHASE_CONFIG[phase].duration) * 100
      : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-kraft">
      {/* header */}
      <div className="border-b border-border/60 bg-card/70">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-4 font-lot text-[0.6rem] tracking-[0.15em] rounded-none border-2 border-double px-3 py-1">
            INTERACTIVE TIMER
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Interactive Brew Timer
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl font-sans">
            Guided pour-over timer with bloom, pour, and drawdown phases.
            Adjust your dose and water, then tap Start.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {/* timer card */}
        <div className="border border-border/60 bg-card p-8 rough-edge text-center">
          {/* dose controls (only when idle) */}
          {phase === "idle" && (
            <div className="mb-8 grid grid-cols-2 gap-6">
              <div>
                <label className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase block mb-2">
                  Coffee (g)
                </label>
                <input
                  type="number"
                  min={8}
                  max={30}
                  step={0.5}
                  value={coffeeGrams}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setCoffeeGrams(v);
                    setWaterGrams(Math.round(v * 16));
                  }}
                  className="w-full border border-border/50 bg-transparent text-center py-2 font-lot text-lg tracking-wider"
                />
              </div>
              <div>
                <label className="font-lot text-[0.5rem] tracking-widest text-muted-foreground uppercase block mb-2">
                  Water (ml)
                </label>
                <input
                  type="number"
                  min={100}
                  max={600}
                  step={10}
                  value={waterGrams}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setWaterGrams(v);
                    setCoffeeGrams(Math.round(v / 16));
                  }}
                  className="w-full border border-border/50 bg-transparent text-center py-2 font-lot text-lg tracking-wider"
                />
              </div>
            </div>
          )}

          {/* main timer display */}
          <div className="my-8">
            <span className="lot-badge text-[0.5rem] mb-4 inline-block">
              {phase === "idle" ? "SET DOSE" : phase === "done" ? "COMPLETE" : PHASE_CONFIG[phase].label.toUpperCase()}
            </span>
            <div className={`font-heading text-7xl sm:text-8xl font-bold tracking-tight mt-2 transition-colors ${
              phase === "bloom" ? "text-accent" : phase === "drawdown" ? "text-primary" : phase === "done" ? "text-foreground" : ""
            }`}>
              {phase === "idle" ? "--:--" : formatTime(timeLeft)}
            </div>
            <p className="mt-3 text-sm text-muted-foreground font-sans max-w-md mx-auto">
              {PHASE_CONFIG[phase].desc}
            </p>
            {phase !== "idle" && phase !== "done" && (
              <div className="mt-4 w-full max-w-xs mx-auto h-1.5 bg-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${phaseProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* elapsed */}
          {phase !== "idle" && (
            <p className="font-lot text-[0.55rem] tracking-widest text-muted-foreground mb-6">
              Total elapsed: {formatTime(totalElapsed)}
            </p>
          )}

          <Separator className="my-6" />

          {/* controls */}
          <div className="flex flex-wrap justify-center gap-3">
            {phase === "idle" && (
              <Button
                size="lg"
                className="font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90"
                onClick={startBrew}
              >
                Start Brew
              </Button>
            )}
            {(phase === "bloom" || phase === "pour1" || phase === "pour2" || phase === "drawdown") && (
              <>
                <Button
                  size="lg"
                  className="font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90"
                  onClick={skipPhase}
                >
                  Skip to Next
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-mono text-xs uppercase tracking-wider border-foreground/40"
                  onClick={resetTimer}
                >
                  Reset
                </Button>
              </>
            )}
            {phase === "done" && (
              <Button
                size="lg"
                className="font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90"
                onClick={resetTimer}
              >
                Brew Another
              </Button>
            )}
          </div>
        </div>

        {/* phase reference */}
        <div className="mt-10">
          <span className="lot-badge text-[0.45rem] mb-3">PHASES</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {(["bloom", "pour1", "pour2", "drawdown"] as TimerPhase[]).map((p) => (
              <div key={p} className={`border border-border/40 p-3 text-center rough-edge ${
                phase === p ? "bg-foreground/5 border-foreground/30" : ""
              }`}>
                <p className="font-lot text-[0.5rem] tracking-widest uppercase text-muted-foreground">{PHASE_CONFIG[p].label}</p>
                <p className="font-heading text-lg font-bold">{PHASE_CONFIG[p].duration}s</p>
              </div>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/brew-guides">
            <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-foreground/40">
              Brew Guides &rarr;
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