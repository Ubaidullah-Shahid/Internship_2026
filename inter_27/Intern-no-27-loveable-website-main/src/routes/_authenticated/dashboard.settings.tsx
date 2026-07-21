import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Account, workspace, and preferences.</p>
      </div>

      <Section title="Profile">
        <Row label="Full name"><Input defaultValue="Amelia Ross" /></Row>
        <Row label="Email"><Input defaultValue="amelia@ross.co" /></Row>
        <Row label="Store URL"><Input defaultValue="vendly.com/store/artisan-co" /></Row>
      </Section>

      <Section title="Preferences">
        <Toggle label="Email me weekly summary" defaultChecked />
        <Toggle label="Enable AI auto-replies for customers" defaultChecked />
        <Toggle label="Show my products on Vendly Marketplace by default" />
        <Toggle label="Two-factor authentication" defaultChecked />
      </Section>

      <Section title="Team">
        <p className="text-sm text-muted-foreground">Invite staff and assign roles.</p>
        <Button className="mt-3 rounded-full">Invite teammate</Button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-card space-y-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3 sm:items-center">
      <Label className="text-sm">{label}</Label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
