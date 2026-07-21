import { createFileRoute } from "@tanstack/react-router";
import { customers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Mail, Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/customers")({
  component: CustomersPage,
});

function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">Your buyers and their lifetime value.</p>
        </div>
        <Button className="rounded-full bg-gradient-brand text-primary-foreground"><Plus className="h-4 w-4 mr-1.5" />Invite</Button>
      </div>

      <div className="rounded-2xl border border-border bg-surface shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-3 px-4 font-medium">Customer</th>
              <th className="py-3 px-4 font-medium">Total spend</th>
              <th className="py-3 px-4 font-medium">Orders</th>
              <th className="py-3 px-4 font-medium">Since</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((c) => (
              <tr key={c.email} className="hover:bg-muted/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary-soft grid place-items-center text-xs font-semibold text-primary">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold tabular-nums">{c.spend}</td>
                <td className="py-3 px-4 tabular-nums">{c.orders}</td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{c.since}</td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="icon" className="rounded-full"><Mail className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
