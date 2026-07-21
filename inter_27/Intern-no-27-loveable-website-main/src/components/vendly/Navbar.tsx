import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bell, ChevronDown, Globe, Menu, Search, Sparkles, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Platform", to: "/", featured: "Everything a modern seller needs" },
  { label: "Marketplace", to: "/marketplace" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Storefront", to: "/store/artisan-co" },
  { label: "Pricing", to: "/pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 sm:px-4 sm:py-2.5",
          scrolled ? "glass-strong shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]" : "glass",
        )}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0 pl-1 pr-2">
          <Logo size={28} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {item.featured && (
                  <ChevronDown className="inline ml-1 h-3 w-3 opacity-60" />
                )}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-muted"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Language">
            <Globe className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </Button>
          <ThemeToggle />
          <div className="mx-1 h-6 w-px bg-border" />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/auth">Log in</Link>
          </Button>
          <Button size="sm" className="rounded-full bg-gradient-brand text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/50 hover:opacity-95">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Start free
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-7xl rounded-2xl glass-strong p-3 lg:hidden"
        >
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="outline" asChild><Link to="/auth">Log in</Link></Button>
              <Button className="bg-gradient-brand text-primary-foreground">Start free</Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
