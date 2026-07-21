import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/vendly/Navbar";
import { Footer } from "@/components/vendly/Footer";
import { MobileBottomNav } from "@/components/vendly/MobileBottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vendly" },
      { name: "description", content: "Simple, honest pricing. Start free, upgrade as you grow. Free, Starter, Growth, Enterprise." },
      { property: "og:title", content: "Vendly Pricing" },
      { property: "og:description", content: "Start free. Upgrade only when you're growing." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  { name: "Free", price: "$0", desc: "For sellers just getting started.", features: ["1 storefront", "20 products", "Marketplace opt-in", "AI assistant (100 credits)", "Community support"], cta: "Start free" },
  { name: "Starter", price: "$14", desc: "For side-hustles and creators.", features: ["3 storefronts", "500 products", "Custom subdomain", "AI assistant (1k credits)", "Email support"], cta: "Start Starter" },
  { name: "Growth", price: "$29", desc: "For growing brands ready to scale.", features: ["Unlimited products", "Custom domain", "Full AI suite", "Team of 3", "Priority support"], cta: "Start Growth", highlight: true },
  { name: "Enterprise", price: "Custom", desc: "For teams and multi-brand ops.", features: ["SSO & audit logs", "Custom roles", "API + webhooks", "SLA + dedicated CSM", "Custom AI models"], cta: "Contact sales" },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-50" />
          <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
            <Badge variant="outline" className="rounded-full glass">Pricing</Badge>
            <h1 className="mt-4 text-5xl md:text-6xl font-black tracking-tight">Simple, honest pricing.</h1>
            <p className="mt-3 text-lg text-muted-foreground">Start free. Upgrade only when you're growing.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "rounded-2xl p-6 border shadow-card",
                  t.highlight ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow relative" : "bg-surface border-border",
                )}
              >
                {t.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent text-accent-foreground border-0">Most popular</Badge>
                )}
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="mt-3 text-4xl font-black tracking-tight">{t.price}<span className="text-sm font-medium opacity-70">/mo</span></p>
                <p className={cn("mt-1 text-sm", t.highlight ? "opacity-90" : "text-muted-foreground")}>{t.desc}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className={cn("h-4 w-4 mt-0.5 shrink-0", t.highlight ? "opacity-90" : "text-primary")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn("mt-6 w-full rounded-full", t.highlight && "bg-background text-foreground hover:bg-background/90")}
                  variant={t.highlight ? "secondary" : "outline"}
                >
                  {t.cta}
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            All plans include unlimited orders, payments, shipping labels, and 2.9% + $0.30 processing.
          </p>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
      <div className="h-20 md:hidden" />
    </div>
  );
}
