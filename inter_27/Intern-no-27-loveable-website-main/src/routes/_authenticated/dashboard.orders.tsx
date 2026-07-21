import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recentOrders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/orders")({
  component: OrdersPage,
});

const allOrders = [
  ...recentOrders,
  { id: "V-10418", customer: "Marta Silva", total: "$92.10", status: "Paid" as const, when: "3h ago" },
  { id: "V-10417", customer: "James Chen", total: "$248.50", status: "Fulfilled" as const, when: "5h ago" },
  { id: "V-10416", customer: "Priya Shah", total: "$68.00", status: "Paid" as const, when: "7h ago" },
  { id: "V-10415", customer: "Oskar Nowak", total: "$154.00", status: "Paid" as const, when: "yesterday" },
];

function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">All incoming orders across your storefront and marketplace.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full"><Filter className="h-4 w-4 mr-1.5" />Filter</Button>
          <Button variant="outline" className="rounded-full"><Download className="h-4 w-4 mr-1.5" />Export</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
        <div className="border-b border-border p-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders…" className="pl-9 h-9 bg-muted border-transparent" />
          </div>
          <div className="flex gap-1 text-xs">
            {["All", "Paid", "Fulfilled", "Refunded"].map((s, i) => (
              <button key={s} className={cn("px-3 py-1.5 rounded-full font-medium", i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>{s}</button>
            ))}
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-3 px-4 font-medium">Order</th>
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allOrders.map((o) => (
              <tr key={o.id} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 px-4 font-mono text-xs">{o.id}</td>
                <td className="py-3 px-4 font-medium">{o.customer}</td>
                <td className="py-3 px-4 font-semibold tabular-nums">{o.total}</td>
                <td className="py-3 px-4">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full text-[10px]",
                      o.status === "Paid" && "bg-success/10 text-success border-success/20",
                      o.status === "Fulfilled" && "bg-primary/10 text-primary border-primary/20",
                      o.status === "Refunded" && "bg-destructive/10 text-destructive border-destructive/20",
                    )}
                  >
                    {o.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{o.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
