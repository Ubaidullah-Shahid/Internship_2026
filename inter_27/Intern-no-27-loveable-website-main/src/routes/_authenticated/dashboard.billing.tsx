import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/billing")({
  component: BillingPage,
});

const plans = [
  { name: "Free", price: "$0", features: ["1 store", "20 products", "Marketplace opt-in"] },
  { name: "Starter", price: "$14", features: ["3 stores", "500 products", "Basic AI"] },
  { name: "Growth", price: "$29", current: true, features: ["Custom domain", "Unlimited products", "Full AI suite", "Team of 3"] },
  { name: "Enterprise", price: "Custom", features: ["SSO & audit logs", "API & webhooks", "Dedicated support"] },
];

function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, usage, and invoices.</p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Current plan</p>
            <p className="mt-1 text-2xl font-bold">Growth — $29/mo</p>
            <p className="text-sm text-muted-foreground">Next invoice on May 12, 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">Manage payment</Button>
            <Button variant="outline" className="rounded-full">View invoices</Button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { l: "AI credits", v: "6,240 / 10,000" },
            { l: "Products", v: "812 / ∞" },
            { l: "Team seats", v: "2 / 3" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">{m.l}</p>
              <p className="mt-1 font-semibold">{m.v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {plans.map((p) => (
          <div key={p.name} className={cn("rounded-2xl border p-5 bg-surface shadow-card", p.current && "border-primary ring-brand")}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{p.name}</p>
              {p.current && <Badge className="bg-primary/15 text-primary border-0 rounded-full text-[10px]">Current</Badge>}
            </div>
            <p className="mt-3 text-3xl font-black tracking-tight">{p.price}<span className="text-sm font-medium opacity-70">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>
            <Button variant={p.current ? "outline" : "default"} className="mt-5 w-full rounded-full">
              {p.current ? "Manage" : p.name === "Enterprise" ? "Contact sales" : "Upgrade"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
