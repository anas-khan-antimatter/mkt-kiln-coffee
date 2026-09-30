import Link from "next/link";
import { roasts } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubscriptionPage() {
  const subscriptionRoasts = roasts.filter((r) => r.available).slice(0, 3);

  return (
    <div className="min-h-screen bg-industrial">
      {/* hero */}
      <div className="border-b border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-sm">
            Coming Soon
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Coffee, Delivered.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Never run out of great coffee. We&apos;ll send freshly roasted beans
            straight to your door, roasted to order and packed within 48 hours
            of your roast date.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" disabled>
              Get Notified
            </Button>
            <Link href="/roasts">
              <Button size="lg" variant="outline">Browse All Roasts</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* how it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose Your Roast",
              desc: "Pick from our rotating selection of single-origin and blend coffees. Update your preferences anytime.",
            },
            {
              step: "02",
              title: "We Roast & Ship",
              desc: "Your coffee is roasted fresh within 48 hours of your ship date and packed in nitrogen-flushed bags.",
            },
            {
              step: "03",
              title: "Enjoy Fresh Coffee",
              desc: "Receive your coffee within 3–5 days of roasting. Brew with confidence knowing it's at peak freshness.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent border border-accent/20 font-heading text-lg font-bold mb-4">
                {item.step}
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* plans */}
      <section className="border-t border-border/40 bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Subscription Plans
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Flexible plans that fit your rhythm. Pause, skip, or cancel anytime — no fees.
          </p>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: "Explorer",
                freq: "Monthly",
                price: 22,
                desc: "One 12oz bag of a rotating single-origin selection.",
                features: [
                  "Rotating single-origin",
                  "Free shipping",
                  "Skip or pause anytime",
                  "Brew guide included",
                ],
              },
              {
                name: "Adventurer",
                freq: "Biweekly",
                price: 42,
                desc: "Two 12oz bags — pick your origins or let us choose.",
                features: [
                  "Two 12oz bags",
                  "Free shipping",
                  "Priority access to limited lots",
                  "Subscription-only pricing",
                ],
                popular: true,
              },
              {
                name: "House Stock",
                freq: "Quarterly",
                price: 68,
                desc: "Five-pound bag of our House Blend, delivered every 3 months.",
                features: [
                  "5lb House Blend",
                  "Free shipping",
                  "Bulk discount pricing",
                  "Perfect for offices & kitchens",
                ],
              },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border/40 ${
                  plan.popular ? "ring-2 ring-accent shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground text-xs px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 pt-8">
                  <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.freq}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-heading">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{plan.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="text-accent">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.popular ? "default" : "outline"}
                    disabled
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* featured roasts sample */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-center mb-4">
          What&apos;s in a Subscription?
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Subscribers receive access to our rotating selection. Here&apos;s a taste
          of what&apos;s currently on the menu.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {subscriptionRoasts.map((r) => (
            <Link key={r.id} href={`/roasts/${r.id}`}>
              <Card className="h-full border-border/40 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-3xl mb-1">☕</div>
                    <p className="text-sm font-medium text-muted-foreground">{r.name}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold">{r.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {r.origin} · {r.process}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.flavorNotes.slice(0, 3).map((note) => (
                      <span
                        key={note}
                        className="inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent-foreground/70"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/roasts">
            <Button variant="outline">View Full Catalog</Button>
          </Link>
        </div>
      </section>

      {/* faq */}
      <section className="border-t border-border/40 bg-card/60">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">
            Frequently Asked
          </h2>
          <div className="space-y-8">
            {[
              {
                q: "When will coffee ship?",
                a: "We roast every Monday and Wednesday. Subscriptions placed before Sunday at noon ship the following Monday.",
              },
              {
                q: "Can I pause or skip?",
                a: "Absolutely. You can pause, skip, or cancel your subscription anytime from your account dashboard — no fees, no hassle.",
              },
              {
                q: "Can I change my coffee selection?",
                a: "Yes. Log in to your subscription dashboard and swap origins or blends before your next shipment window closes (48 hours before roast day).",
              },
              {
                q: "How is the coffee packaged?",
                a: "Each bag is nitrogen-flushed within hours of roasting to lock in freshness. We use resealable, recyclable bags with a one-way valve.",
              },
              {
                q: "Do you ship to PO boxes or APO?",
                a: "We ship to all 50 states via USPS and UPS. PO boxes and APO/FPO addresses are supported with USPS delivery.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <h3 className="font-heading text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}