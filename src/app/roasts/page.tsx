"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { roasts, getOrigins, getProcesses } from "@/data";
import type { RoastProduct } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bodyOrder: Record<string, number> = {
  Light: 0,
  "Medium-Light": 1,
  Medium: 2,
  "Medium-Full": 3,
  Full: 4,
};

export default function RoastsPage() {
  const [originFilter, setOriginFilter] = useState<string>("all");
  const [processFilter, setProcessFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const origins = getOrigins();
  const processes = getProcesses();

  const filtered = useMemo(() => {
    let result = [...roasts].filter((r) => r.available);

    if (originFilter !== "all") {
      result = result.filter((r) => r.origin === originFilter);
    }
    if (processFilter !== "all") {
      result = result.filter((r) => r.process === processFilter);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "body":
        result.sort(
          (a, b) => (bodyOrder[a.body] ?? 3) - (bodyOrder[b.body] ?? 3)
        );
        break;
      case "origin":
        result.sort((a, b) => a.origin.localeCompare(b.origin));
        break;
    }

    return result;
  }, [originFilter, processFilter, sortBy]);

  return (
    <div className="min-h-screen bg-industrial">
      {/* header */}
      <div className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Our Roasts
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Small-batch roasts sourced directly from producers we know.
            Every lot is cupped, graded, and roasted to highlight its origin character.
          </p>
        </div>
      </div>

      {/* filters */}
      <div className="sticky top-0 z-10 border-b border-border/40 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Origin</span>
              <Select value={originFilter} onValueChange={(v) => v && setOriginFilter(v)}>
                <SelectTrigger className="w-44 bg-card">
                  <SelectValue placeholder="All Origins" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Origins</SelectItem>
                  {origins.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Process</span>
              <Select value={processFilter} onValueChange={setProcessFilter}>
                <SelectTrigger className="w-44 bg-card">
                  <SelectValue placeholder="All Processes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Processes</SelectItem>
                  {processes.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-card">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="origin">Origin</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="body">Body</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-sm text-muted-foreground">
              {filtered.length} roast{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground">
              No roasts match your filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setOriginFilter("all");
                setProcessFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((roast) => (
              <RoastCard key={roast.id} roast={roast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoastCard({ roast }: { roast: RoastProduct }) {
  return (
    <Link href={`/roasts/${roast.id}`}>
      <Card className="group h-full overflow-hidden border-border/40 bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
        {/* image placeholder */}
        <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
          <div className="text-center p-4">
            <div className="text-4xl mb-1">☕</div>
            <p className="text-sm font-medium text-muted-foreground">{roast.name}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-semibold text-base leading-tight">
                {roast.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {roast.origin} · {roast.process}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 text-xs">
              ${roast.price}
            </Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {roast.flavorNotes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent-foreground/70"
              >
                {note}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-medium">Roast:</span> {roast.roastLevel}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Body:</span> {roast.body}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}