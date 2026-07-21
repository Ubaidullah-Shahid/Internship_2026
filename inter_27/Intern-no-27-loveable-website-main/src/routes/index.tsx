import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CreditCard,
  Globe,
  Layers,
  Package,
  Play,
  Sparkles,
  Store,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { Navbar } from "@/components/vendly/Navbar";
import { Footer } from "@/components/vendly/Footer";
import { MobileBottomNav } from "@/components/vendly/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { revenueData, recentOrders, aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <LogoStrip />
        <FeatureGrid />
        <DashboardShowcase />
        <MarketplaceStrip />
        <AISection />
        <PricingTeaser />
        <CTA />
      </main>
      <Footer />
      <MobileBottomNav />
      <div className="h-20 md:hidden" />
    </div>
  );
}

/* -------------------------------------------------- HERO */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-70" />
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="outline" className="rounded-full glass px-3 py-1 text-xs font-medium">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success animate-pulse-ring inline-block" />
            Vendly 2026 — now with AI Business Assistant
          </Badge>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[1.02]">
            Everything you need to{" "}
            <span className="text-gradient-brand">sell online.</span>
            <br />
            <span className="text-foreground/90">One platform. Endless possibilities.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            Launch a branded store, join the Vendly Marketplace, and let AI handle descriptions, pricing,
            marketing and support. Payments, shipping, and analytics — built in.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-gradient-brand text-primary-foreground h-12 px-6 shadow-glow hover:opacity-95">
              Start free
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-6">
              <Play className="mr-1.5 h-4 w-4" />
              Book a demo
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full h-12 px-6" asChild>
              <Link to="/marketplace">
                Explore Marketplace
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Free forever plan · No credit card · 2-minute setup
          </p>
        </motion.div>

        <FloatingDashboard />
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <div className="relative mx-auto mt-20 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative rounded-3xl border border-border/60 bg-surface shadow-[0_40px_100px_-30px_rgba(15,118,110,0.35)] overflow-hidden"
      >
        {/* Fake dashboard frame */}
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-4 text-xs text-muted-foreground">vendly.com/dashboard</span>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4 sm:p-6 bg-surface-2/40">
          {/* Revenue chart */}
          <div className="col-span-12 md:col-span-8 rounded-2xl bg-surface border border-border p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Revenue (7d)</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">$38,612</p>
              </div>
              <Badge className="bg-success/15 text-success border-0 rounded-full">+18.2%</Badge>
            </div>
            <div className="mt-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#rev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI insights */}
          <div className="col-span-12 md:col-span-4 rounded-2xl bg-gradient-brand text-primary-foreground p-5 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-accent/40 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-medium opacity-90">
                <Sparkles className="h-3.5 w-3.5" /> AI Insights
              </div>
              <p className="mt-2 text-lg font-semibold leading-snug">
                Bundle Candle + Match Set — likely +$1.2k/mo
              </p>
              <p className="mt-2 text-xs opacity-80">Attach rate 34% among repeat buyers.</p>
              <Button size="sm" variant="secondary" className="mt-4 rounded-full h-8 text-xs">
                Apply suggestion
              </Button>
            </div>
          </div>

          {/* Recent orders */}
          <div className="col-span-12 md:col-span-7 rounded-2xl bg-surface border border-border p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Live orders</p>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                streaming
              </span>
            </div>
            <ul className="mt-3 divide-y divide-border">
              {recentOrders.slice(0, 4).map((o) => (
                <li key={o.id} className="py-2.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-primary-soft grid place-items-center text-[10px] font-semibold text-primary">
                      {o.customer.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{o.customer}</p>
                      <p className="text-[11px] text-muted-foreground">{o.id} · {o.when}</p>
                    </div>
                  </div>
                  <span className="font-semibold tabular-nums">{o.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile store preview */}
          <div className="col-span-12 md:col-span-5 rounded-2xl bg-surface border border-border p-4 flex items-center justify-center">
            <div className="relative w-[180px] rounded-[28px] border-4 border-foreground/90 bg-background overflow-hidden shadow-xl">
              <div className="h-5 bg-foreground/90 rounded-b-xl mx-8" />
              <div className="p-3">
                <div className="h-24 rounded-xl bg-gradient-brand" />
                <p className="mt-2 text-[10px] font-bold">Artisan & Co.</p>
                <p className="text-[8px] text-muted-foreground">Slow-made home goods</p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  <div className="aspect-square rounded-md bg-accent/20" />
                  <div className="aspect-square rounded-md bg-primary/20" />
                  <div className="aspect-square rounded-md bg-primary/15" />
                  <div className="aspect-square rounded-md bg-accent/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="hidden md:flex absolute -left-6 top-16 items-center gap-2 rounded-full glass-strong px-3 py-2 shadow-soft animate-float"
      >
        <div className="h-7 w-7 rounded-full bg-success/15 grid place-items-center">
          <CheckCircle2 className="h-4 w-4 text-success" />
        </div>
        <div className="text-xs">
          <p className="font-semibold">Payment received</p>
          <p className="text-muted-foreground">+$189.90 · Sana Ali</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hidden md:flex absolute -right-4 bottom-24 items-center gap-2 rounded-full glass-strong px-3 py-2 shadow-soft animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="h-7 w-7 rounded-full bg-primary/15 grid place-items-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div className="text-xs">
          <p className="font-semibold">Description drafted</p>
          <p className="text-muted-foreground">Ceramic Mug · in 1.2s</p>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------- LOGO STRIP */
function LogoStrip() {
  const brands = ["ARTISAN", "NORTH", "LUMEN", "FIELD & FERN", "ATELIER 9", "SALTWATER", "CEDAR"];
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Trusted by 12,400+ sellers worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {brands.map((b) => (
            <span key={b} className="text-lg font-black tracking-tight text-muted-foreground">{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- FEATURE GRID */
const features = [
  { icon: Store, title: "Branded Storefront", desc: "Your own store at vendly.com/store/your-brand with themes, custom domains, and drag-and-drop blocks." },
  { icon: Layers, title: "Vendly Marketplace", desc: "Opt-in to reach millions of shoppers browsing the central Vendly Marketplace. You choose per product." },
  { icon: Bot, title: "AI Business Assistant", desc: "Generate descriptions, optimize SEO, forecast sales, and reply to customers — all in your voice." },
  { icon: CreditCard, title: "Payments built in", desc: "Accept cards, wallets, BNPL and local methods with best-in-class conversion." },
  { icon: Truck, title: "Shipping & fulfillment", desc: "Compare carriers, print labels, and track everything from one inbox." },
  { icon: BarChart3, title: "Real-time analytics", desc: "Revenue, cohorts, LTV, product performance — beautifully visualized." },
  { icon: Users, title: "Teams & roles", desc: "Invite staff with granular permissions, audit logs, and SSO on Enterprise." },
  { icon: Globe, title: "Global-ready", desc: "Multi-currency, multi-language, tax automation, and local payment methods." },
];
function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="rounded-full">Platform</Badge>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
          A commerce OS, not a template.
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Every seller gets an independent, branded store — with the option to list into the Vendly Marketplace.
          Isolated data, isolated branding, one dashboard.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group rounded-2xl border border-border bg-surface p-5 hover-lift"
          >
            <div className="h-10 w-10 rounded-xl bg-primary-soft grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------- DASHBOARD SHOWCASE */
function DashboardShowcase() {
  return (
    <section className="relative border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-7xl px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <Badge variant="secondary" className="rounded-full">Dashboard</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            The command center your team will actually love.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Inspired by Shopify's storefront tools, Stripe's data clarity, and Linear's speed.
            Live sales, inventory alerts, customer activity, AI recommendations — all one keystroke away.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Realtime revenue, orders, and cohort analytics",
              "Inventory forecasts and low-stock alerts",
              "AI recommendations for pricing and merchandising",
              "Team tasks, notifications, and audit logs",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8 rounded-full bg-gradient-brand text-primary-foreground h-11 px-5">
            <Link to="/dashboard">Explore the dashboard <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {aiInsights.map((ins, i) => (
            <motion.div
              key={ins.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={
                "rounded-2xl border border-border bg-surface p-5 " +
                (i === 0 ? "col-span-2" : "")
              }
            >
              <Badge variant="outline" className="rounded-full text-[10px]">{ins.tag}</Badge>
              <h4 className="mt-3 font-semibold">{ins.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{ins.meta}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary">
                <Zap className="h-3.5 w-3.5" /> AI suggestion
              </div>
            </motion.div>
          ))}
          <div className="col-span-2 rounded-2xl bg-gradient-brand text-primary-foreground p-6 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
            <p className="text-xs opacity-80 font-medium">This week</p>
            <p className="mt-1 text-4xl font-black tabular-nums">$38,612</p>
            <p className="text-sm opacity-80">Across 307 orders · +18.2% vs last week</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- MARKETPLACE STRIP */
function MarketplaceStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <Badge variant="secondary" className="rounded-full">Marketplace</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Your store. Or a marketplace of stores.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Sellers keep full control of branding and data. Opt any product into the Vendly Marketplace to reach
            millions of shoppers — or keep it exclusive to your store.
          </p>
        </div>
        <Button variant="outline" size="lg" className="rounded-full" asChild>
          <Link to="/marketplace">Browse Marketplace <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Artisan & Co.", tag: "Home", swatch: "from-primary/30 to-primary/10" },
          { name: "North Brew", tag: "Coffee", swatch: "from-accent/30 to-accent/10" },
          { name: "Lumen Studio", tag: "Design", swatch: "from-primary/25 to-accent/15" },
        ].map((s) => (
          <Link
            key={s.name}
            to="/store/$brand"
            params={{ brand: s.name.toLowerCase().replace(/[^a-z]+/g, "-") }}
            className="group rounded-2xl border border-border bg-surface overflow-hidden hover-lift"
          >
            <div className={`h-40 bg-gradient-to-br ${s.swatch}`} />
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.tag}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------- AI SECTION */
function AISection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
        <Badge variant="outline" className="rounded-full glass"><Sparkles className="h-3 w-3 mr-1" /> AI Assistant</Badge>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
          Your AI co-founder for commerce.
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate product descriptions, optimize SEO, forecast inventory, suggest prices, draft marketing
          emails, and reply to customers — trained on your brand voice.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            { icon: Package, title: "Product content", desc: "Descriptions, alt text, SEO — in one click." },
            { icon: BarChart3, title: "Forecasts & pricing", desc: "Elasticity models trained on your sales." },
            { icon: Bot, title: "Customer support", desc: "Draft or auto-send replies in your tone." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl glass-strong p-6 text-left">
              <div className="h-10 w-10 rounded-xl bg-gradient-brand text-primary-foreground grid place-items-center">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- PRICING TEASER */
function PricingTeaser() {
  const tiers = [
    { name: "Free", price: "$0", desc: "For sellers just getting started.", features: ["1 storefront", "Up to 20 products", "Marketplace opt-in", "AI assistant (limited)"], cta: "Start free" },
    { name: "Growth", price: "$29", desc: "For growing brands ready to scale.", features: ["Custom domain", "Unlimited products", "Full AI suite", "Team of 3"], cta: "Start Growth", highlight: true },
    { name: "Enterprise", price: "Custom", desc: "For teams and multi-brand ops.", features: ["SSO & audit logs", "Custom roles", "API & webhooks", "Dedicated support"], cta: "Contact sales" },
  ];
  return (
    <section className="border-y border-border bg-surface-2/40">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="secondary" className="rounded-full">Pricing</Badge>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">Simple, honest pricing.</h2>
          <p className="mt-3 text-lg text-muted-foreground">Start free. Upgrade only when you're growing.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "rounded-2xl p-6 border transition-all " +
                (t.highlight
                  ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow"
                  : "bg-surface border-border")
              }
            >
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="mt-3 text-4xl font-black tracking-tight">{t.price}<span className="text-sm font-medium opacity-70">/mo</span></p>
              <p className={"mt-1 text-sm " + (t.highlight ? "opacity-90" : "text-muted-foreground")}>{t.desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className={"h-4 w-4 mt-0.5 shrink-0 " + (t.highlight ? "opacity-90" : "text-primary")} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={
                  "mt-6 w-full rounded-full " +
                  (t.highlight ? "bg-background text-foreground hover:bg-background/90" : "")
                }
                variant={t.highlight ? "secondary" : "outline"}
              >
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------- CTA */
function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand text-primary-foreground p-10 md:p-16 text-center">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/60 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Start selling in the next 2 minutes.
          </h2>
          <p className="mt-3 text-lg opacity-90 max-w-xl mx-auto">
            Launch your storefront, list on the Marketplace, and turn on AI — all on the free plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary" className="rounded-full h-12 px-6">
              Start free <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full h-12 px-6 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
