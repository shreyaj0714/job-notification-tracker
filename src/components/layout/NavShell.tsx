import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Saved", path: "/saved" },
  { label: "Digest", path: "/digest" },
  { label: "Settings", path: "/settings" },
  { label: "Proof", path: "/proof" },
];

const NavShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b px-3 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold text-foreground">
            Job Notification App
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`pb-0 text-sm font-medium transition-colors duration-fast ease-standard ${
                  isActive(item.path)
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-[20px] w-[20px]" /> : <Menu className="h-[20px] w-[20px]" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <nav className="flex flex-col gap-1 border-t pt-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-2 py-1 text-sm font-medium transition-colors duration-fast ease-standard ${
                  isActive(item.path)
                    ? "border-l-2 border-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 px-3 py-4">{children}</main>
    </div>
  );
};

export default NavShell;
