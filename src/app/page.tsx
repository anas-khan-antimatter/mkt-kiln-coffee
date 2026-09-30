"use client";

import Link from "next/link";
import { roasts } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featured = roasts.filter((r) => r.featured && r.available).slice(0, 4);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-kraft">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-baseline gap-1 tracking-tight">
            <span className="lot-badge text-[0.55rem] self-center mr-1">LOT</span>
            <span className="font-heading text-2xl font-bold">Kiln</span>
            <span className="font-heading text-lg text-accent">Roastery</span>
          </Link>
          <nav className="hidden items-center gap-5 sm:flex">
            <Link href="/roasts" className="font-lot text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors">Roasts</Link>
            <Link href="/subscription" className="font-lot text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors">Subscribe</Link>
            <Link href="/brew" className="font-lot text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors">Brew</Link>
            <Link href="/brew-guides" className="font-lot text-xs tracking-widest text-muted-foreground uppercase hover:text-foreground transition-colors">Guides</Link>
          </nav>
          <Link href="/roasts">
            <Button size="sm" className="hidden sm:inline-flex font-mono text-xs">SHOP NOW</Button>
          </Link>
          <details className="sm:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-1 font-lot text-xs tracking-widest text-muted-foreground">
              Menu
            </summary>
            <div className="absolute left-0 right-0 top-full mt-0 border-t border-border/60 bg-background p-4 shadow-lg">
              <nav className="flex flex-col gap-3">
                <Link href="/roasts" className="font-lot text-xs tracking-widest">ROASTS</Link>
                <Link href="/subscription" className="font-lot text-xs tracking-widest">SUBSCRIBE</Link>
                <Link href="/brew" className="font-lot text-xs tracking-widest">BREW</Link>
                <Link href="/brew-guides" className="font-lot text-xs tracking-widest">GUIDES</Link>
                <Link href="/roasts">
                  <Button size="sm" className="w-full font-mono text-xs">SHOP NOW</Button>
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-kraft opacity-40" />
        <div className="mx-auto max-w-7xl relative px-4 py-28 sm:px-6 sm:py-40 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-6 font-lot text-[0.6rem] tracking-[0.15em] rounded-none border-2 border-double px-3 py-1">
              EST. 2018 &middot; PORTLAND, OR
            </Badge>
            <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-[0.95]">
              Small-Batch
              <span className="block text-accent mt-1">Specialty Coffee.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground font-sans">
              Sourced directly from producers. Roasted in 12kg batches on a 1952
              Probat drum. Packed within 48 hours of roast date.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/roasts">
                <Button size="lg" className="font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90">
                  Explore Roasts
                </Button>
              </Link>
              <Link href="/subscription">
                <Button size="lg" variant="outline" className="font-mono text-sm uppercase tracking-wider border-foreground/40">
                  Subscribe
                </Button>
              </Link>
              <Link href="/brew">
                <Button size="lg" variant="ghost" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Brew Guide &rarr;
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <span className="lot-badge text-[0.5rem]">LOT #KR-2026-09</span>
              <span className="font-lot text-[0.55rem] text-muted-foreground tracking-widest">
                GUJI &middot; ETHIOPIA &middot; WASHED
              </span>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-accent/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-foreground/5 rough-edge" />
      </section>

      {/* Featured Roasts */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="lot-badge text-[0.5rem] mb-2">CURRENT LINEUP</span>
            <h2 className="font-heading text-4xl font-bold tracking-tight mt-2">
              Featured Roasts
            </h2>
            <p className="mt-2 text-muted-foreground font-sans">
              Limited lots &middot; freshly roasted &middot; shipped within 48hrs
            </p>
          </div>
          <Link href="/roasts">
            <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-foreground/30">
              View All &rarr; {roasts.length}
            </Button>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((roast) => (
            <Link key={roast.id} href={`/roasts/${roast.id}`}>
              <Card className="group h-full overflow-hidden border-border/60 bg-card transition-all hover:shadow-xl hover:-translate-y-1 stamp-border">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden relative">
                  <span className="lot-badge text-[0.45rem] absolute top-3 left-3">LOT</span>
                  <div className="text-center p-4">
                    <div className="text-5xl mb-2 opacity-80">☕</div>
                    <p className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">{roast.name}</p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-heading text-lg font-bold leading-tight">
                    {roast.name}
                  </h3>
                  <p className="font-lot text-[0.6rem] tracking-wider text-muted-foreground mt-1 uppercase">
                    {roast.origin} &middot; {roast.process}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {roast.flavorNotes.slice(0, 3).map((note) => (
                      <span key={note}
                        className="inline-block border border-border/50 px-2 py-0.5 font-lot text-[0.5rem] tracking-wider text-muted-foreground uppercase"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                    <span className="font-lot text-xs tracking-wider">From ${roast.price}</span>
                    <span className="font-lot text-[0.55rem] tracking-widest text-muted-foreground uppercase">{roast.roastLevel}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="lot-badge text-[0.5rem]">FOUNDATIONS</span>
            <h2 className="font-heading text-4xl font-bold tracking-tight mt-3">Roasted With Purpose</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto font-sans">
              Every decision guided by respect for the people who grow our coffee and the planet we share.
            </p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {[
              { icon: "🌱", title: "Direct Trade", detail: "Building long-term relationships with producers, paying well above Fair Trade prices." },
              { icon: "🔥", title: "Small-Batch Roasting", detail: "Every lot cupped and roasted in 12kg batches on a 1952 Probat drum for precision control." },
              { icon: "♻️", title: "Zero Waste", detail: "Chaff composted locally, bags recyclable, shipping emissions offset through verified credits." },
            ].map((item) => (
              <div key={item.title} className="text-center border border-border/40 p-6 rough-edge">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-foreground/5 text-2xl border border-foreground/10 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm font-sans">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <span className="lot-badge text-[0.5rem] mb-2">OUR STORY</span>
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mt-2">
              From a Garage on Division Street
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed font-sans text-sm">
              <p>
                Kiln Roastery started in 2018 with a 1952 Probat drum roaster,
                a shipping container in southeast Portland, and a stubborn belief
                that great coffee starts with honest relationships.
              </p>
              <p>
                We travel to origin twice a year &mdash; cupping with producers,
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
            <div className="mt-6 flex items-center gap-3">
              <span className="lot-badge text-[0.5rem]">POWELL BLVD</span>
              <span className="font-lot text-[0.55rem] text-muted-foreground tracking-widest">PORTLAND, OR</span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border-2 border-double border-border/50 bg-gradient-to-br from-primary/20 via-secondary to-muted flex items-center justify-center rough-edge">
            <div className="text-center p-8">
              <div className="text-7xl mb-4 opacity-60">🏭</div>
              <p className="font-heading text-2xl font-semibold text-muted-foreground">
                Powell Blvd Warehouse
              </p>
              <p className="font-lot text-[0.6rem] tracking-widest text-muted-foreground/70 uppercase mt-2">PDX &middot; Since 2018</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="border-t border-border/60 bg-gradient-to-b from-card/40 to-background">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <span className="lot-badge text-[0.5rem] mb-4">NEW</span>
          <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Never Run Out of Great Coffee
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed font-sans">
            Get freshly roasted beans delivered on your schedule. Build your plan <br />
            in under 60 seconds &mdash; pause, skip, or cancel anytime.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/subscription">
              <Button size="lg" className="font-mono text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90">
                Build Your Plan
              </Button>
            </Link>
            <Link href="/brew">
              <Button size="lg" variant="outline" className="font-mono text-xs uppercase tracking-widest border-foreground/40">
                Brew Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <div className="flex items-baseline gap-1">
                <span className="lot-badge text-[0.45rem] self-center">LOT</span>
                <span className="font-heading text-xl font-bold">Kiln</span>
                <span className="font-heading text-base text-accent">Roastery</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs font-sans">
                Small-batch specialty coffee roasted in Portland, Oregon.
                Sourcing directly from producers since 2018.
              </p>
              <span className="lot-badge text-[0.45rem] mt-4 inline-block">EST. 2018</span>
            </div>
            <div>
              <h4 className="font-lot text-[0.55rem] tracking-widest uppercase text-foreground mb-4">Shop</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/roasts" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans">All Roasts</Link>
                <Link href="/subscription" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans">Subscription</Link>
                <Link href="/brew" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans">Brew Timer</Link>
                <Link href="/brew-guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans">Brew Guides</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-lot text-[0.55rem] tracking-widest uppercase text-foreground mb-4">Connect</h4>
              <nav className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground font-sans">Instagram</span>
                <span className="text-sm text-muted-foreground font-sans">Twitter / X</span>
                <span className="text-sm text-muted-foreground font-sans">hello@kilnroastery.com</span>
              </nav>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground">
              &copy; 2026 KILN ROASTERY CO.
            </p>
            <p className="font-lot text-[0.5rem] tracking-widest text-muted-foreground">
              LOT #KR-PDX-001
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}