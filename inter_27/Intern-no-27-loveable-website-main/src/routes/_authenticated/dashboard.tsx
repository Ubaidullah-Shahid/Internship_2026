import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  BarChart3,
  Bot,
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Palette,
  Search,
  Settings,
  ShoppingBag,
  Store,
  User as UserIcon,
  Users,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Logo } from "@/components/vendly/Logo";
import { ThemeToggle } from "@/components/vendly/ThemeToggle";
import { MobileBottomNav } from "@/components/vendly/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Vendly" },
      { name: "description", content: "Your Vendly command center: revenue, orders, inventory, customers, AI." },
    ],
  }),
  component: DashboardLayout,
});

const nav = [
  { icon: LayoutDashboard, label: "Overview", to: "/dashboard" },
  { icon: ShoppingBag, label: "Orders", to: "/dashboard/orders" },
  { icon: Package, label: "Products", to: "/dashboard/products" },
  { icon: Users, label: "Customers", to: "/dashboard/customers" },
  { icon: BarChart3, label: "Analytics", to: "/dashboard/analytics" },
  { icon: Bot, label: "AI Assistant", to: "/dashboard/ai" },
  { icon: Palette, label: "Theme Editor", to: "/dashboard/theme" },
  { icon: CreditCard, label: "Billing", to: "/dashboard/billing" },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" },
] as const;

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initial = (user?.email ?? "U").charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-surface/50 sticky top-0 h-screen">
        <div className="px-5 py-5 flex items-center gap-2">
          <Logo size={26} />
        </div>
        <nav className="px-3 flex-1 space-y-0.5">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <Link
            to="/store/$brand"
            params={{ brand: "artisan-co" }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Store className="h-4 w-4" />
            View storefront
          </Link>
          <div className="mt-3 rounded-xl border border-border bg-surface p-3">
            <p className="text-xs font-semibold">Growth plan</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">62% of monthly quota used</p>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[62%] bg-gradient-brand" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-lg px-4 md:px-8 h-14">
          <div className="md:hidden">
            <Logo size={22} />
          </div>
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders, products, customers…" className="pl-9 h-9 rounded-full bg-muted border-transparent focus-visible:bg-background" />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Calendar">
              <Calendar className="h-[18px] w-[18px]" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Notifications">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-7 w-7 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground text-xs font-bold ml-1 hover:opacity-90 transition-opacity" aria-label="Account">
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings"><UserIcon className="h-4 w-4 mr-2" /> Account settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 p-4 md:p-8 pb-24 md:pb-8"
        >
          <Outlet />
        </motion.main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
