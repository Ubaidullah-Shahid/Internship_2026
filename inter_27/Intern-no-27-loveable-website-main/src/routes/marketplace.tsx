import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Filter, Search, Star } from "lucide-react";
import { Navbar } from "@/components/vendly/Navbar";
import { Footer } from "@/components/vendly/Footer";
import { MobileBottomNav } from "@/components/vendly/MobileBottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { marketplaceStores } from "@/lib/mock-data";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Vendly Marketplace — Discover independent brands" },
      { name: "description", content: "Shop thousands of independent brands on the Vendly Marketplace. Home, design, coffee, wellness and more." },
      { property: "og:title", content: "Vendly Marketplace" },
      { property: "og:description", content: "Discover independent brands. One checkout, endless discovery." },
    ],
  }),
  component: MarketplacePage,
});

const categories = ["All", "Home", "Design", "Food", "Wellness", "Accessories", "Fashion"];

function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-aurora opacity-60" />
          <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
            <Badge variant="outline" className="rounded-full glass">Vendly Marketplace</Badge>
            <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
              Discover independent brands.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              One checkout, endless discovery. Every store here is run by a real seller on Vendly.
            </p>
            <div className="mt-6 mx-auto max-w-lg relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search stores, products, categories…" className="pl-11 h-12 rounded-full glass-strong border-border" />
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <div className="border-b border-border bg-surface/50 sticky top-20 z-30 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-2 overflow-x-auto">
            {categories.map((c, i) => (
              <button
                key={c}
                className={
                  "shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors " +
                  (i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
            <Button variant="outline" size="sm" className="ml-auto rounded-full shrink-0"><Filter className="h-3.5 w-3.5 mr-1.5" />Filter</Button>
          </div>
        </div>

        {/* Store grid */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketplaceStores.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to="/store/$brand"
                  params={{ brand: s.slug }}
                  className="group block rounded-2xl border border-border bg-surface overflow-hidden hover-lift shadow-card"
                >
                  <div className={"h-48 bg-gradient-to-br " + gradientFor(i)} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-lg">{s.name}</p>
                        <p className="text-sm text-muted-foreground">{s.tagline}</p>
                      </div>
                      <Badge variant="outline" className="rounded-full text-[10px]">{s.category}</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{s.rating}</span>
                      </span>
                      <span>{s.products} products</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
      <div className="h-20 md:hidden" />
    </div>
  );
}

function gradientFor(i: number) {
  const grads = [
    "from-primary/30 via-primary/10 to-accent/20",
    "from-accent/30 via-accent/10 to-primary/20",
    "from-primary/25 via-accent/15 to-primary/10",
    "from-accent/25 via-primary/15 to-accent/10",
    "from-primary/20 to-accent/25",
    "from-accent/20 to-primary/25",
  ];
  return grads[i % grads.length];
}
