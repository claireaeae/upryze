import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type SearchParams = { orderId?: string };

export const Route = createFileRoute("/checkout-success")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return { orderId: search.orderId as string | undefined };
  },
  head: () => ({ meta: [{ title: "Order placed — Upryze" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { t, lang } = useI18n();
  const { orderId } = Route.useSearch();
  
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 border border-neutral-900 dark:border-neutral-50 mb-8 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("success_title")}</h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">{t("success_sub")}</p>
        
        {orderId && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 mb-8 text-left">
            <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-2">{lang === "vi" ? "Mã đơn hàng của bạn" : "Your Order ID"}</p>
            <p className="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-50 select-all">{orderId}</p>
            <p className="text-xs text-neutral-500 mt-3">
              {lang === "vi" 
                ? "Lưu lại mã này để tra cứu tình trạng đơn hàng bất cứ lúc nào tại trang Tra Cứu." 
                : "Save this code to track your order status at any time on the Track Order page."}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/track"
            className="w-full sm:w-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-50 px-8 py-3 text-sm tracking-widest uppercase hover:border-neutral-900 dark:hover:border-neutral-50 transition-colors"
          >
            {lang === "vi" ? "Tra cứu đơn" : "Track Order"}
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-8 py-3 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            {t("back_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}