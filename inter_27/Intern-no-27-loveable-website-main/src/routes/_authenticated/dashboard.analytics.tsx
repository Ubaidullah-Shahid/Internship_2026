import { createFileRoute } from "@tanstack/react-router";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Revenue, orders, visitors, conversion.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: "Revenue trend", key: "v", color: "var(--primary)", prefix: "$" },
          { title: "Orders trend", key: "o", color: "var(--accent)", prefix: "" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
            <p className="text-sm font-semibold">{c.title}</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                  <Line type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
