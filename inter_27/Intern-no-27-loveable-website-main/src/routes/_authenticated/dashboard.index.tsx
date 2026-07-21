import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, MoreHorizontal, Package, Sparkles, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kpis, revenueData, recentOrders, aiInsights, products } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Good morning, Amelia</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening in your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full">Last 7 days</Button>
          <Button className="rounded-full bg-gradient-brand text-primary-foreground">
            <Sparkles className="h-4 w-4 mr-1.5" /> Ask Vendly AI
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-surface p-5 shadow-card"
          >
            <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums">{k.value}</p>
            <div className={cn("mt-1 flex items-center gap-1 text-xs font-medium", k.positive ? "text-success" : "text-destructive")}>
              {k.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {k.delta}
              <span className="text-muted-foreground font-normal ml-1">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Revenue</p>
              <p className="text-xs text-muted-foreground">Last 7 days · updated live</p>
            </div>
            <Badge className="bg-success/15 text-success border-0 rounded-full">+18.2%</Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="d-rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} fill="url(#d-rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <p className="text-sm font-semibold">Orders</p>
          <p className="text-xs text-muted-foreground">Volume by day</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="o" fill="var(--accent)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live orders + AI + inventory */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Live orders</p>
              <p className="text-xs text-muted-foreground">Streaming in real time</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="py-2 font-medium">Order</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Total</th>
                  <th className="py-2 font-medium">Status</th>
                  <th className="py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 font-mono text-xs">{o.id}</td>
                    <td className="py-3">{o.customer}</td>
                    <td className="py-3 font-semibold tabular-nums">{o.total}</td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full text-[10px] font-medium",
                          o.status === "Paid" && "bg-success/10 text-success border-success/20",
                          o.status === "Fulfilled" && "bg-primary/10 text-primary border-primary/20",
                          o.status === "Refunded" && "bg-destructive/10 text-destructive border-destructive/20",
                        )}
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground text-xs">{o.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-brand text-primary-foreground p-5 shadow-glow relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/40 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-1.5 text-xs font-medium opacity-90">
                <Sparkles className="h-3.5 w-3.5" /> AI recommendations
              </div>
              <ul className="mt-3 space-y-3">
                {aiInsights.map((a) => (
                  <li key={a.title} className="rounded-xl bg-white/10 backdrop-blur p-3">
                    <p className="text-sm font-semibold">{a.title}</p>
                    <p className="text-[11px] opacity-80 mt-0.5">{a.meta}</p>
                  </li>
                ))}
              </ul>
              <Button size="sm" variant="secondary" className="mt-4 w-full rounded-full">
                <Zap className="h-3.5 w-3.5 mr-1.5" /> Review all
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Inventory alerts</p>
                <p className="text-xs text-muted-foreground">Low stock this week</p>
              </div>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
            <ul className="mt-3 space-y-2.5">
              {products.filter((p) => p.stock < 30).slice(0, 3).map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center">
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.stock} in stock</p>
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] bg-accent/10 text-accent-foreground border-accent/30">Restock</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Top products</p>
            <p className="text-xs text-muted-foreground">By units sold this month</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/40 transition-colors">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.sales} sold · {p.price}</p>
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
