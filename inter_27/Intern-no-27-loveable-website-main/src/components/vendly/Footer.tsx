import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Github, Instagram, Twitter } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      ["Marketplace", "/marketplace"],
      ["Dashboard", "/dashboard"],
      ["Storefront demo", "/store/artisan-co"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    title: "Solutions",
    links: [
      ["For creators", "/"],
      ["For brands", "/"],
      ["For agencies", "/"],
      ["Enterprise", "/"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Docs", "/"],
      ["API reference", "/"],
      ["Changelog", "/"],
      ["Status", "/"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/"],
      ["Careers", "/"],
      ["Contact", "/"],
      ["Press kit", "/"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo size={32} />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The complete commerce platform for modern sellers. One dashboard, endless possibilities.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-muted transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2026 Vendly, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
