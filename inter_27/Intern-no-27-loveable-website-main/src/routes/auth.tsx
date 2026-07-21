import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Logo } from "@/components/vendly/Logo";
import { ThemeToggle } from "@/components/vendly/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Vendly" },
      { name: "description", content: "Sign in to your Vendly seller dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const [tab, setTab] = useState<"login" | "signup">("login");

  const goNext = () => navigate({ to: redirect ?? "/dashboard" });

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col p-8">
        <div className="flex items-center justify-between">
          <Link to="/"><Logo size={28} /></Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 grid place-items-center">
          <div className="w-full max-w-sm">
            <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 rounded-full">
                <TabsTrigger value="login" className="rounded-full">Log in</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-full">Sign up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="mt-2 text-sm text-muted-foreground">Log in to your Vendly dashboard.</p>
                <GoogleButton onDone={goNext} />
                <Divider />
                <LoginForm onDone={goNext} />
              </TabsContent>

              <TabsContent value="signup" className="mt-8">
                <h1 className="text-3xl font-bold tracking-tight">Start selling</h1>
                <p className="mt-2 text-sm text-muted-foreground">Create your Vendly seller account.</p>
                <GoogleButton onDone={goNext} />
                <Divider />
                <SignupForm onDone={goNext} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative overflow-hidden bg-gradient-brand text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative h-full flex flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-sm font-medium opacity-90">
            <span className="h-2 w-2 rounded-full bg-accent" /> The commerce OS for modern sellers
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black leading-tight max-w-md">
              "Vendly replaced four tools in our stack. Our revenue is up 34% since we switched."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center font-bold">Z</div>
              <div>
                <p className="text-sm font-semibold">Zara Kim</p>
                <p className="text-xs opacity-80">Founder, Lumen Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
      <div className="flex-1 h-px bg-border" />
      or with email
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function GoogleButton({ onDone }: { onDone: () => void }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="mt-8 grid gap-2">
      <Button
        variant="outline"
        className="w-full rounded-full h-11"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const result = await lovable.auth.signInWithOAuth("google", {
            redirect_uri: window.location.origin,
          });
          if (result.error) {
            toast.error(result.error.message ?? "Google sign-in failed");
            setLoading(false);
            return;
          }
          if (result.redirected) return;
          onDone();
        }}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continue with Google"}
      </Button>
    </div>
  );
}

function LoginForm({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) return toast.error(error.message);
        toast.success("Welcome back!");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" required placeholder="you@company.com" className="h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label>Password</Label>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            onClick={async () => {
              if (!email) return toast.error("Enter your email above first");
              const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
              });
              if (error) return toast.error(error.message);
              toast.success("Reset email sent");
            }}
          >
            Forgot?
          </button>
        </div>
        <Input type="password" required placeholder="••••••••" className="h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-gradient-brand text-primary-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Log in <ArrowRight className="h-4 w-4 ml-1.5" /></>}
      </Button>
    </form>
  );
}

function SignupForm({ onDone }: { onDone: () => void }) {
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { store_name: storeName },
          },
        });
        setLoading(false);
        if (error) return toast.error(error.message);
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          return;
        }
        toast.success("Welcome to Vendly!");
        onDone();
      }}
    >
      <div className="space-y-1.5">
        <Label>Store name</Label>
        <Input required placeholder="Artisan Co." className="h-11" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input type="email" required placeholder="you@company.com" className="h-11" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Password</Label>
        <Input type="password" required minLength={6} placeholder="At least 6 characters" className="h-11" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-gradient-brand text-primary-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4 ml-1.5" /></>}
      </Button>
    </form>
  );
}
