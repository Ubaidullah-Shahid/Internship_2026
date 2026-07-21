import { createFileRoute } from "@tanstack/react-router";
import { Package, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard/products")({
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Choose whether each product appears in your Store, the Marketplace, or both.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full"><Sparkles className="h-4 w-4 mr-1.5" />AI generate</Button>
          <Button className="rounded-full bg-gradient-brand text-primary-foreground"><Plus className="h-4 w-4 mr-1.5" />New product</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="group rounded-2xl border border-border bg-surface p-4 shadow-card hover-lift">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 grid place-items-center">
              <Package className="h-12 w-12 text-primary/70" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.stock} in stock · {p.sales} sold</p>
              </div>
              <p className="font-bold tabular-nums">{p.price}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="outline" className="rounded-full text-[10px] bg-primary/10 text-primary border-primary/20">Store</Badge>
              {p.id % 2 === 0 && (
                <Badge variant="outline" className="rounded-full text-[10px] bg-accent/10 text-accent-foreground border-accent/30">Marketplace</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
