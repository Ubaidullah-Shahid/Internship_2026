import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingBag, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: LayoutGrid, label: "Market", to: "/marketplace" },
  { icon: Sparkles, label: "AI", to: "/dashboard/ai" },
  { icon: ShoppingBag, label: "Store", to: "/store/artisan-co" },
  { icon: User, label: "Me", to: "/dashboard" },
] as const;

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <div className="mx-3 mb-3 rounded-2xl glass-strong shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.15)]">
        <ul className="grid grid-cols-5">
          {items.map(({ icon: Icon, label, to }) => {
            const active = pathname === to || (to !== "/" && pathname.startsWith(to));
            return (
              <li key={label}>
                <Link
                  to={to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
