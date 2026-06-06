import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { submitQuestion } from "@/lib/questions";
import { getFaqs } from "@/lib/faqs";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Upryze" },
      { name: "description", content: "Frequently asked questions about Upryze ergonomic products." },
    ],
  }),
  component: FaqPage,
});



function FaqPage() {
  const { t, lang } = useI18n();
  const [open, setOpen] = React.useState<number | null>(0);
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  const { data: faqs = [], isLoading: loadingFaqs } = useQuery({ queryKey: ["faqs"], queryFn: getFaqs });

  const items = faqs.map(f => ({
    q: lang === "vi" ? f.q_vi : f.q_en,
    a: lang === "vi" ? f.a_vi : f.a_en,
  }));

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-16 pb-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{t("faq_title")}</h1>

      <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800">
        {loadingFaqs ? (
          <div className="py-12 text-center text-sm text-neutral-500 animate-pulse">Loading FAQs...</div>
        ) : (
          items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between text-left py-6 cursor-pointer"
              >
                <span className="text-base md:text-lg font-medium">{item.q}</span>
                {isOpen ? <Minus className="h-4 w-4 shrink-0" /> : <Plus className="h-4 w-4 shrink-0" />}
              </button>
              {isOpen && (
                <p className="pb-6 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-prose">
                  {item.a}
                </p>
              )}
            </div>
          );
        }))}
      </div>

      <section className="mt-24 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("feedback_title")}</h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{t("feedback_sub")}</p>

        {sent ? (
          <p className="mt-8 text-sm">{t("feedback_thanks")}</p>
        ) : (
          <form
            onSubmit={async (e) => { 
              e.preventDefault(); 
              setLoading(true);
              try {
                await submitQuestion(form.name, form.email, form.message);
                setSent(true);
              } catch (err) {
                alert("Failed to send message. Please try again.");
              } finally {
                setLoading(false);
              }
            }}
            className="mt-8 space-y-4"
          >
            <input
              required placeholder={t("f_name")}
              value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <input
              required type="email" placeholder={t("f_email")}
              value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <textarea
              required placeholder={t("f_message")} rows={5}
              value={form.message} onChange={(e) => setForm({...form, message: e.target.value})}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-8 py-3 text-sm tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : t("btn_submit")}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}