import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Palette, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dashboard/theme")({
  component: ThemeEditorPage,
});

const themes = [
  { name: "Minimal", primary: "#0F766E", accent: "#EAB308" },
  { name: "Editorial", primary: "#1E293B", accent: "#F97316" },
  { name: "Playful", primary: "#7C3AED", accent: "#FBBF24" },
  { name: "Nature", primary: "#166534", accent: "#CA8A04" },
];

function ThemeEditorPage() {
  const [selected, setSelected] = useState(0);
  const theme = themes[selected];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Theme Editor</h1>
          <p className="text-sm text-muted-foreground">Customize your storefront's look — save drafts, preview, publish.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full">Save draft</Button>
          <Button className="rounded-full bg-gradient-brand text-primary-foreground"><Save className="h-4 w-4 mr-1.5" />Publish</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Controls */}
        <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 shadow-card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5"><Palette className="h-3.5 w-3.5" /> Theme preset</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {themes.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all",
                    i === selected ? "border-primary ring-brand" : "border-border hover:border-foreground/20",
                  )}
                >
                  <div className="flex gap-1">
                    <span className="h-4 w-4 rounded-full" style={{ background: t.primary }} />
                    <span className="h-4 w-4 rounded-full" style={{ background: t.accent }} />
                  </div>
                  <p className="mt-2 text-xs font-medium">{t.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Brand name</Label>
            <Input defaultValue="Artisan & Co." />
          </div>
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input defaultValue="Slow-made home goods" />
          </div>
          <div className="space-y-2">
            <Label>Logo</Label>
            <Button variant="outline" className="w-full justify-start"><Upload className="h-4 w-4 mr-2" />Upload logo</Button>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Homepage blocks</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {["Hero banner", "Featured products", "Categories", "About brand", "Reviews", "Newsletter"].map((b) => (
                <li key={b} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                  <span>{b}</span>
                  <span className="text-xs text-muted-foreground cursor-grab">⋮⋮</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-border bg-surface-2 p-4 shadow-card">
          <div className="mx-auto max-w-2xl rounded-xl bg-background overflow-hidden border border-border">
            <div
              className="h-40 flex items-end p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
            >
              <div>
                <p className="text-2xl font-bold">Artisan & Co.</p>
                <p className="text-sm opacity-90">Slow-made home goods</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg" style={{ background: `${theme.primary}22` }} />
              ))}
            </div>
            <div className="px-6 pb-6">
              <button className="w-full rounded-full py-3 text-sm font-semibold text-white" style={{ background: theme.primary }}>
                Shop the collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
