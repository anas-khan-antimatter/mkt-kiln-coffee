"use client";

import Link from "next/link";
import { roasts } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featured = roasts.filter((r) => r.featured && r.available).slice(0, 4);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-industrial">
      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            Kiln <span className="text-accent">Roastery</span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/roasts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Roasts
            </Link>
            <Link
              href="/subscription"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Subscription
            </Link>
            <Link
              href="#story"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Our Story
            </Link>
          </nav>
          <Link href="/roasts">
            <Button size="sm" className="hidden sm:inline-flex">
              Shop Now
            </Button>
          </Link>
          {/* mobile menu toggle — simplified */}
          <details className="sm:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-muted-foreground">
              Menu
            </summary>
            <div className="absolute left-0 right-0 top-full mt-0 border-t border-border/40 bg-background p-4 shadow-lg">
              <nav className="flex flex-col gap-3">
                <Link href="/roasts" className="text-sm font-medium hover:text-accent">Roasts</Link>
                <Link href="/subscription" className="text-sm font-medium hover:text-accent">Subscription</Link>
                <Link href="#story" className="text-sm font-medium hover:text-accent">Our Story</Link>
                <Link href="/roasts">
                  <Button size="sm" className="w-full">Shop Now</Button>
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 text-sm">
              Small-Batch · Portland Roasted
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Coffee That
              <span className="text-accent block">Tastes Like Its Origin.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We source directly from producers we know, roast in small batches
              to highlight each lot&apos;s character, and ship within 48 hours of
              your roast date.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/roasts">
                <Button size="lg">Explore Roasts</Button>
              </Link>
              <Link href="/subscription">
                <Button size="lg" variant="outline">Subscribe</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* decorative grain */}
        <div className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 bg-gradient-to-l from-accent/5 to-transparent" />
      </section>

      {/* ── Featured Roasts ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Featured Roasts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our current lineup — limited lots, freshly roasted.
            </p>
          </div>
          <Link href="/roasts">
            <Button variant="outline">View All Roasts</Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((roast) => (
            <Link key={roast.id} href={`/roasts/${roast.id}`}>
              <Card className="group h-full overflow-hidden border-border/40 bg-card transition-all hover:shadow-lg hover:-translate-y-0.5">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-1">☕</div>
                    <p className="text-sm font-medium text-muted-foreground">{roast.name}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold text-base leading-tight">
                    {roast.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {roast.origin} · {roast.process}
                  </p>
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
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      From ${roast.price}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{roast.roastLevel} Roast</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="border-t border-border/40 bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center tracking-tight">
            Roasted With Purpose
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            Every decision we make is guided by respect for the people who grow
            our coffee and the planet we all share.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: "🌱",
                title: "Direct Trade",
                desc: "We build long-term relationships with producers, paying well above Fair Trade prices and investing in farm infrastructure.",
              },
              {
                icon: "🔥",
                title: "Small-Batch Roasting",
                desc: "Every lot is cupped and roasted in 12kg batches on a 1952 Probat drum, giving us precision control over each profile.",
              },
              {
                icon: "♻️",
                title: "Zero Waste",
                desc: "Chaff is composted locally, bags are recyclable, and we offset shipping emissions through verified carbon credits.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl border border-accent/20 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="story" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-3 text-sm">Our Story</Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              From a Garage on Division Street
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Kiln Roastery started in 2018 with a 1952 Probat drum roaster,
                a shipping container in southeast Portland, and a stubborn belief
                that great coffee starts with honest relationships.
              </p>
              <p>
                We travel to origin twice a year — cupping with producers,
                touring washing stations, and selecting microlots that tell
                a story. Every bag we roast carries the name of the producer
                and the place it was grown.
              </p>
              <p>
                Today we roast out of a proper warehouse on Powell Boulevard,
                but our approach hasn&apos;t changed: small batches, direct
                relationships, and coffee that tastes exactly like where it
                came from.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-secondary to-muted flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🟤</div>
              <p className="font-heading text-lg font-semibold text-muted-foreground">
                Powell Blvd Warehouse
              </p>
              <p className="text-sm text-muted-foreground/70">Portland, OR</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Subscription CTA ── */}
      <section className="border-t border-border/40 bg-gradient-to-b from-card/60 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-sm">Coming Soon</Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Never Run Out of Great Coffee
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Get freshly roasted beans delivered on your schedule. Pause, skip,
            or cancel anytime — no fees.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/subscription">
              <Button size="lg">See Plans</Button>
            </Link>
            <Link href="/roasts">
              <Button size="lg" variant="outline">Browse Roasts</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/40 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-heading text-lg font-bold">
                Kiln <span className="text-accent">Roastery</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Small-batch specialty coffee roasted in Portland, Oregon.
                Direct trade, freshly roasted, shipped within 48 hours.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/roasts" className="hover:text-foreground transition-colors">All Roasts</Link></li>
                <li><Link href="/roasts" className="hover:text-foreground transition-colors">Single-Origin</Link></li>
                <li><Link href="/subscription" className="hover:text-foreground transition-colors">Subscription</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="cursor-default">Instagram</span></li>
                <li><span className="cursor-default">Twitter / X</span></li>
                <li><span className="cursor-default">hello@kilnroastery.com</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kiln Roastery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}