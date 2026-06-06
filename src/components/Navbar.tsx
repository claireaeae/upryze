import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { count, setOpen } = useCart();
  const { t } = useI18n();
  const [mobile, setMobile] = React.useState(false);

  const NAV = [
    { to: "/" as const, label: t("nav_home"), exact: true },
    { to: "/products" as const, label: t("nav_products"), exact: false },
    { to: "/track" as const, label: t("nav_track"), exact: false },
    { to: "/faq" as const, label: t("nav_faq"), exact: false },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* 👉 ĐỔI TÊN LOGO Ở ĐÂY: Thay chữ "UPRYZE" thành tên tuỳ thích. Nếu muốn đổi màu logo, thêm 'text-red-500' vào className */}
        <Link to="/" className="text-lg font-semibold tracking-[0.2em]">UPRYZE</Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {NAV.map((n) => (
            <React.Fragment key={n.to}>
              {/* 👉 ĐỔI MÀU CHỮ MENU Ở ĐÂY: Sửa màu ở dòng 'className' bên dưới */}
              <Link
                to={n.to}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
              activeProps={{ className: "text-neutral-900 dark:text-neutral-50 font-medium" }}
              activeOptions={{ exact: n.exact }}
            >
              {n.label}
            </Link>
            </React.Fragment>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative p-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 text-[10px] h-4 min-w-4 px-1 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 cursor-pointer" onClick={() => setMobile((v) => !v)} aria-label="Toggle menu">
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobile && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMobile(false)} className="text-neutral-600 dark:text-neutral-400" activeProps={{ className: "text-neutral-900 dark:text-neutral-50 font-medium" }} activeOptions={{ exact: n.exact }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}