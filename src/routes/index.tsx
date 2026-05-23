import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, formatPrice, getProduct } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Upryze — Protect your health. Elevate your focus." },
      { name: "description", content: "Ergonomic gear for Deep Work — standing desks, chairs, posture braces, monitor light bars." },
    ],
  }),
  component: Home,
});

type Answers = { q1: "A" | "B" | null; q2: "A" | "B" | "C" | null; q3: "A" | "B" | null };

function Scorecard() {
  const { t, lang } = useI18n();
  const [a, setA] = React.useState<Answers>({ q1: null, q2: null, q3: null });
  const done = a.q1 && a.q2 && a.q3;

  const score =
    (a.q1 === "B" ? 10 : 0) +
    (a.q2 === "C" ? 10 : a.q2 === "B" ? 5 : 0) +
    (a.q3 === "B" ? 10 : 0);

  const needsStand = a.q1 === "A";
  const needsChair = a.q2 === "A" || a.q2 === "B";
  const needsMassager = a.q3 === "A";

  const recommendIds: number[] = [];
  if (needsStand) recommendIds.push(3);
  if (needsChair) recommendIds.push(4);
  if (needsMassager) recommendIds.push(8);

  const Opt = ({ qKey, value, label }: { qKey: keyof Answers; value: "A" | "B" | "C"; label: string }) => {
    const selected = a[qKey] === value;
    return (
      <button
        onClick={() => setA((p) => ({ ...p, [qKey]: value }))}
        className={`w-full text-left px-4 py-3 border text-sm cursor-pointer transition-colors ${
          selected
            ? "border-neutral-900 dark:border-neutral-50 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900"
            : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-50"
        }`}
      >
        <span className="inline-block w-5 text-xs tracking-widest opacity-60">{value}</span>
        {label}
      </button>
    );
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 p-8 lg:p-12">
      <p className="text-xs tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-2 uppercase">{t("sc_kicker")}</p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("sc_title")}</h2>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{t("sc_sub")}</p>

      <div className="mt-10 grid lg:grid-cols-3 gap-8">
        <div className="space-y-3">
          <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">01 — {t("sc_q1")}</p>
          <Opt qKey="q1" value="A" label={t("sc_q1a")} />
          <Opt qKey="q1" value="B" label={t("sc_q1b")} />
        </div>
        <div className="space-y-3">
          <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">02 — {t("sc_q2")}</p>
          <Opt qKey="q2" value="A" label={t("sc_q2a")} />
          <Opt qKey="q2" value="B" label={t("sc_q2b")} />
          <Opt qKey="q2" value="C" label={t("sc_q2c")} />
        </div>
        <div className="space-y-3">
          <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">03 — {t("sc_q3")}</p>
          <Opt qKey="q3" value="A" label={t("sc_q3a")} />
          <Opt qKey="q3" value="B" label={t("sc_q3b")} />
        </div>
      </div>

      {done && (
        <div className="mt-12 pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">{t("sc_result")}</p>
              <p className="text-5xl md:text-6xl font-semibold tracking-tight mt-2 tabular-nums">{score}<span className="text-neutral-400">/30</span></p>
            </div>
            <button
              onClick={() => setA({ q1: null, q2: null, q3: null })}
              className="text-xs tracking-widest uppercase border border-neutral-200 dark:border-neutral-800 px-4 py-2 hover:border-neutral-900 dark:hover:border-neutral-50 cursor-pointer"
            >
              {t("sc_restart")}
            </button>
          </div>

          {recommendIds.length > 0 && (
            <>
              <div className="mt-8">
                <p className="text-xs tracking-widest uppercase text-red-600 dark:text-red-400">{t("sc_vuln")}</p>
                <ul className="mt-2 text-sm text-red-600 dark:text-red-400 space-y-1">
                  {needsStand && <li>— Screen below eye-level</li>}
                  {needsChair && <li>— Non-ergonomic seating</li>}
                  {needsMassager && <li>— Reported neck/eye fatigue</li>}
                </ul>
              </div>
              <p className="mt-8 text-sm font-medium">{t("sc_fixes")}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
                {recommendIds.map((id) => {
                  const p = getProduct(id)!;
                  return (
                    <Link key={id} to="/products/$id" params={{ id: String(id) }} className="bg-neutral-50 dark:bg-neutral-950 p-4 group">
                      <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-3">
                        <img src={p.image} alt={p[lang].name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      </div>
                      <p className="text-sm font-medium">{p[lang].name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 tabular-nums">{formatPrice(p.price)}</p>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Home() {
  const { t, lang } = useI18n();
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-32">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] whitespace-pre-line">
          {t("hero_title")}
        </h1>
        <p className="mt-8 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl">{t("hero_sub")}</p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-8 py-4 text-sm tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            {t("btn_shop")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mb-2">{t("stories_kicker")}</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("stories_title")}</h2>
          </div>
          <div className="lg:col-span-8 lg:pt-8">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">{t("stories_body")}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <Scorecard />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("featured")}</h2>
          <Link to="/products" className="text-sm underline underline-offset-4">{t("btn_view_all")}</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
          {featured.map((p) => (
            <Link key={p.id} to="/products/$id" params={{ id: String(p.id) }} className="bg-neutral-50 dark:bg-neutral-950 p-4 group">
              <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
                <img src={p.image} alt={p[lang].name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
              </div>
              <p className="text-sm font-medium leading-snug">{p[lang].name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 tabular-nums">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}