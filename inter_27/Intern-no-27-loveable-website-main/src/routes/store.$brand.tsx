import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Instagram, Mail, MessageCircle, Package, Star } from "lucide-react";
import { Navbar } from "@/components/vendly/Navbar";
import { Footer } from "@/components/vendly/Footer";
import { MobileBottomNav } from "@/components/vendly/MobileBottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { marketplaceStores, products } from "@/lib/mock-data";

export const Route = createFileRoute("/store/$brand")({
  head: ({ params }) => {
    const s = marketplaceStores.find((x) => x.slug === params.brand);
    const name = s?.name ?? params.brand;
    return {
      meta: [
        { title: `${name} — on Vendly` },
        { name: "description", content: s?.tagline ?? "An independent brand on Vendly." },
        { property: "og:title", content: `${name} — on Vendly` },
        { property: "og:description", content: s?.tagline ?? "An independent brand on Vendly." },
      ],
    };
  },
  loader: ({ params }) => {
    const store = marketplaceStores.find((s) => s.slug === params.brand);
    if (!store) {
      // Show a soft fallback rather than 404 for demo purposes
      return { store: { slug: params.brand, name: params.brand, tagline: "An independent brand", category: "Store", rating: 5, products: 0 } };
    }
    return { store };
  },
  notFoundComponent: () => <div className="p-20 text-center">Store not found.</div>,
  component: StorefrontPage,
});

function StorefrontPage() {
  const { store } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero banner */}
        <section className="relative h-80 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-6 h-full flex items-end pb-10 text-primary-foreground">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Badge variant="outline" className="rounded-full bg-white/15 text-primary-foreground border-white/30">{store.category}</Badge>
              <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight">{store.name}</h1>
              <p className="mt-2 text-lg opacity-90">{store.tagline}</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent text-accent" /> {store.rating} · 428 reviews</span>
                <span>{store.products || 24} products</span>
                <span>Ships worldwide</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sub-nav */}
        <div className="sticky top-20 z-30 border-b border-border bg-background/85 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
            <nav className="flex items-center gap-6 text-sm">
              {["Shop", "New arrivals", "Best sellers", "About", "Reviews", "Contact"].map((l, i) => (
                <a key={l} href="#" className={i === 0 ? "font-semibold" : "text-muted-foreground hover:text-foreground"}>{l}</a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full"><Heart className="h-3.5 w-3.5 mr-1.5" />Follow</Button>
              <Button size="sm" className="rounded-full bg-success hover:bg-success/90 text-success-foreground">
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Featured products */}
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Featured</p>
              <h2 className="mt-1 text-3xl font-bold">The collection</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 grid place-items-center overflow-hidden">
                  <Package className="h-16 w-16 text-primary/60 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Ships in 2 days</p>
                  </div>
                  <p className="font-semibold tabular-nums">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About + Contact */}
        <section className="border-t border-border bg-surface-2/40">
          <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
              <h2 className="mt-2 text-3xl font-bold">Made slowly, honestly.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {store.name} is a small studio of makers producing objects for daily life. Every piece is made
                in small batches from natural materials, in workshops we know by name.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="rounded-full"><Instagram className="h-4 w-4 mr-1.5" />Instagram</Button>
                <Button variant="outline" className="rounded-full"><Mail className="h-4 w-4 mr-1.5" />Email us</Button>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-brand text-primary-foreground p-8 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent/40 blur-3xl" />
              <p className="text-xs uppercase tracking-widest opacity-80">Newsletter</p>
              <h3 className="mt-2 text-2xl font-bold">Get the drops first.</h3>
              <p className="mt-2 text-sm opacity-90">Small-batch launches, once a month. No spam.</p>
              <form className="mt-6 flex gap-2">
                <Input placeholder="you@email.com" className="rounded-full bg-white/15 border-white/30 placeholder:text-white/70 text-primary-foreground" />
                <Button variant="secondary" className="rounded-full shrink-0">Subscribe</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
      <div className="h-20 md:hidden" />
    </div>
  );
}
