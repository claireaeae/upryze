import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Minus } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Upryze" },
      { name: "description", content: "Frequently asked questions about Upryze ergonomic products." },
    ],
  }),
  component: FaqPage,
});

const FAQ = {
  en: [
    { q: "Does this help with posture?", a: "Yes — every product is heavily researched and designed to support healthy spine alignment over long work sessions." },
    { q: "Delivery time?", a: "Orders ship within 24 hours. Standard delivery is 3–4 business days within Vietnam." },
    { q: "Do you offer warranty?", a: "All Upryze products include a 12-month manufacturer warranty against defects." },
    { q: "How do I choose the right product?", a: "Take the Workspace Setup Scorecard on the homepage — we'll recommend the right essentials for your setup." },
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for eligible non-customized items in original condition." },
  ],
  vi: [
    { q: "Sản phẩm có giúp chỉnh tư thế?", a: "Có — mỗi sản phẩm đều được nghiên cứu kỹ và thiết kế để hỗ trợ cột sống trong các phiên làm việc dài." },
    { q: "Thời gian giao hàng?", a: "Đơn hàng giao trong 24 giờ. Giao tiêu chuẩn 3–4 ngày làm việc trong nước." },
    { q: "Bảo hành như thế nào?", a: "Tất cả sản phẩm Upryze được bảo hành 12 tháng chính hãng." },
    { q: "Làm sao chọn sản phẩm phù hợp?", a: "Hãy thử Chấm điểm Không gian làm việc ở trang chủ — chúng tôi sẽ đề xuất phù hợp." },
    { q: "Chính sách đổi trả?", a: "Chấp nhận đổi trả trong 7 ngày với sản phẩm không tùy chỉnh và còn nguyên trạng." },
  ],
};

function FaqPage() {
  const { t, lang } = useI18n();
  const [open, setOpen] = React.useState<number | null>(0);
  const [sent, setSent] = React.useState(false);

  const items = FAQ[lang];

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-16 pb-24">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{t("faq_title")}</h1>

      <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800">
        {items.map((item, i) => {
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
        })}
      </div>

      <section className="mt-24 border border-neutral-200 dark:border-neutral-800 p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("feedback_title")}</h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{t("feedback_sub")}</p>

        {sent ? (
          <p className="mt-8 text-sm">{t("feedback_thanks")}</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-8 space-y-4"
          >
            <input
              required placeholder={t("f_name")}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <input
              required type="email" placeholder={t("f_email")}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <textarea
              required placeholder={t("f_message")} rows={5}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <button
              type="submit"
              className="bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-8 py-3 text-sm tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer"
            >
              {t("btn_submit")}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}