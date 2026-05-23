import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/checkout-success")({
  head: () => ({ meta: [{ title: "Order placed — Upryze" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 border border-neutral-900 dark:border-neutral-50 mb-8">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("success_title")}</h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{t("success_sub")}</p>
        <Link
          to="/"
          className="inline-block mt-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-8 py-3 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          {t("back_home")}
        </Link>
      </div>
    </div>
  );
}