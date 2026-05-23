import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { formatPrice, type Category, getProducts } from "@/lib/products";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Upryze" },
      { name: "description", content: "Shop ergonomic desks, chairs, posture braces, and focus accessories." },
    ],
  }),
  component: ProductsPage,
});

type PriceFilter = "all" | "under" | "mid" | "over";

function ProductsPage() {
  const { t, lang } = useI18n();
  const [cat, setCat] = React.useState<Category | "all">("all");
  const [price, setPrice] = React.useState<"all" | "under" | "mid" | "over">("all");

  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const filtered = products.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (price === "under" && p.price >= 500000) return false;
    if (price === "mid" && (p.price < 500000 || p.price > 2000000)) return false;
    if (price === "over" && p.price <= 2000000) return false;
    return true;
  });

  const cats: { v: Category | "all"; label: string }[] = [
    { v: "all", label: t("cat_all") },
    { v: "posture", label: t("cat_posture") },
    { v: "sensory", label: t("cat_sensory") },
    { v: "care", label: t("cat_care") },
  ];

  const prices: { v: PriceFilter; label: string }[] = [
    { v: "all", label: t("cat_all") },
    { v: "under", label: t("price_under") },
    { v: "mid", label: t("price_mid") },
    { v: "over", label: t("price_over") },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{t("products_title")}</h1>

      <div className="mt-12 grid lg:grid-cols-4 gap-8 lg:gap-12">
        <aside className="lg:col-span-1 space-y-10">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">{t("p_categories")}</p>
            <ul className="space-y-2 text-sm">
              {cats.map((c) => (
                <li key={c.v}>
                  <button
                    onClick={() => setCat(c.v)}
                    className={`w-full text-left py-1 transition-colors cursor-pointer ${
                      cat === c.v ? "text-neutral-900 dark:text-neutral-50 font-medium" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
                    }`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4">{t("p_price")}</p>
            <ul className="space-y-3 text-sm">
              {prices.map((p) => (
                <li key={p.v}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <span
                      className={`relative h-3.5 w-3.5 border ${
                        price === p.v ? "border-neutral-900 dark:border-neutral-50" : "border-neutral-300 dark:border-neutral-700"
                      }`}
                    >
                      {price === p.v && <span className="absolute inset-0.5 bg-neutral-900 dark:bg-neutral-50" />}
                    </span>
                    <input
                      type="radio"
                      name="price"
                      className="sr-only"
                      checked={price === p.v}
                      onChange={() => setPrice(p.v)}
                    />
                    <span className={price === p.v ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-50"}>
                      {p.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-neutral-50 dark:bg-neutral-950 p-4 h-[420px] flex flex-col">
                  <div className="w-full aspect-square bg-neutral-200 dark:bg-neutral-900 animate-pulse mb-4"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-900 w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-900 w-2/3 mb-4 animate-pulse"></div>
                  <div className="mt-auto h-10 bg-neutral-200 dark:bg-neutral-900 w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {t("no_products")}
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}