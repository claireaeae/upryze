import * as React from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { saveOrder } from "@/lib/orders";
import { Truck, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Upryze" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    email: "", phone: "", name: "", address: "", city: "", note: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "qr">("cod");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (detailed.length === 0) return;
    setSubmitting(true);

    // Save order to Supabase
    try {
      await saveOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          note: form.note || undefined,
        },
        items: detailed.map((d) => ({ id: d.product.id, qty: d.qty })),
        total: subtotal,
        paymentMethod: paymentMethod,
      });
    } catch (error) {
      console.error("Failed to save order", error);
      alert("Failed to submit order. Please try again.");
      setSubmitting(false);
      return;
    }

    clear();
    // Small delay for UX feel
    await new Promise((r) => setTimeout(r, 800));
    navigate({ to: "/checkout-success" });
  };

  const inputCls = "w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50 transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-600";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-[0.2em]">UPRYZE</Link>
          <Link to="/products" className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">← {t("nav_products")}</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 grid lg:grid-cols-[1fr_420px] gap-12">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t("checkout_title")}</h1>

          {/* Payment method selection */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">Phương thức thanh toán</p>
            
            {/* COD Option */}
            <label className={`border p-5 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-neutral-900 dark:border-neutral-50 bg-neutral-100 dark:bg-neutral-900" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="sr-only" />
              <Truck className="h-5 w-5 flex-shrink-0 text-neutral-600 dark:text-neutral-400" />
              <div>
                <p className="text-sm font-medium">{lang === "vi" ? "Thanh toán khi nhận hàng (COD)" : "Cash on Delivery (COD)"}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {lang === "vi" ? "Kiểm tra hàng trước khi thanh toán." : "Inspect your order before paying."}
                </p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-neutral-900 dark:border-neutral-50 flex items-center justify-center flex-shrink-0">
                {paymentMethod === "cod" && <div className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-neutral-50" />}
              </div>
            </label>

            {/* QR Code Option */}
            <label className={`border p-5 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === "qr" ? "border-neutral-900 dark:border-neutral-50 bg-neutral-100 dark:bg-neutral-900" : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"}`}>
              <input type="radio" name="payment" value="qr" checked={paymentMethod === "qr"} onChange={() => setPaymentMethod("qr")} className="sr-only" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-neutral-600 dark:text-neutral-400"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
              <div>
                <p className="text-sm font-medium">{lang === "vi" ? "Chuyển khoản QR Code" : "QR Code Transfer"}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {lang === "vi" ? "Quét mã để thanh toán ngay." : "Scan to pay instantly."}
                </p>
              </div>
              <div className="ml-auto h-4 w-4 rounded-full border-2 border-neutral-900 dark:border-neutral-50 flex items-center justify-center flex-shrink-0">
                {paymentMethod === "qr" && <div className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-neutral-50" />}
              </div>
            </label>

            {/* QR Image Display */}
            {paymentMethod === "qr" && (
              <div className="border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-center animate-in fade-in slide-in-from-top-2">
                <p className="text-sm font-medium mb-4">{lang === "vi" ? "Quét mã QR dưới đây để thanh toán" : "Scan the QR code below to pay"}</p>
                {/* 👉 HƯỚNG DẪN THÊM MÃ QR: Lưu ảnh QR của bạn vào thư mục 'public' với tên 'qr-code.png' */}
                <div className="w-48 h-48 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden">
                  <img src="/qr-code.png" alt="Payment QR Code" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('after:content-["[Ảnh_QR_chưa_có]"]', 'after:text-xs', 'after:text-neutral-400'); }} />
                </div>
                <p className="text-xs text-neutral-500 mt-4 max-w-sm leading-relaxed">
                  {lang === "vi" ? "Nội dung chuyển khoản: SĐT của bạn. Vui lòng bấm Đặt Hàng sau khi đã chuyển thành công." : "Transfer note: Your phone number. Please click Place Order after successful transfer."}
                </p>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">{t("contact_info")}</p>
            <input required type="email" placeholder={t("f_email")} value={form.email} onChange={set("email")} className={inputCls} />
            <input required placeholder={t("phone")} value={form.phone} onChange={set("phone")} className={inputCls} />
          </div>

          {/* Shipping */}
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">{t("shipping")}</p>
            <input required placeholder={t("full_name")} value={form.name} onChange={set("name")} className={inputCls} />
            <input required placeholder={t("address")} value={form.address} onChange={set("address")} className={inputCls} />
            <input required placeholder={t("city")} value={form.city} onChange={set("city")} className={inputCls} />
            <textarea
              placeholder={lang === "vi" ? "Ghi chú thêm (tuỳ chọn)" : "Additional notes (optional)"}
              value={form.note}
              onChange={set("note")}
              rows={3}
              className={inputCls + " resize-none"}
            />
          </div>

          <button
            type="submit"
            disabled={detailed.length === 0 || submitting}
            className="w-full bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 py-4 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span className="animate-pulse">{lang === "vi" ? "Đang xử lý..." : "Processing..."}</span>
            ) : t("btn_place_order")}
          </button>

          {/* Trust row */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            {[
              { icon: ShieldCheck, label: lang === "vi" ? "Bảo mật 100%" : "100% Secure" },
              { icon: Truck, label: lang === "vi" ? "Giao toàn quốc" : "Ships Nationwide" },
              { icon: Clock, label: lang === "vi" ? "Đổi trả 30 ngày" : "30-Day Returns" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-4 w-4 text-neutral-400" />
                <span className="text-[10px] tracking-wide text-neutral-500 dark:text-neutral-400">{label}</span>
              </div>
            ))}
          </div>
        </form>

        {/* Order summary */}
        <aside className="border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 h-fit lg:sticky lg:top-8">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mb-6">{t("order_summary")}</p>
          {detailed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t("cart_empty")}</p>
              <Link to="/products" className="mt-4 inline-block text-xs tracking-widest uppercase underline underline-offset-4">{t("nav_products")}</Link>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {detailed.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
                    <div className="h-16 w-16 flex-shrink-0 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                      <img src={product.image} alt={product[lang].name} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug line-clamp-2">{product[lang].name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">× {qty}</p>
                    </div>
                    <p className="text-sm tabular-nums flex-shrink-0">{formatPrice(product.price * qty)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">{lang === "vi" ? "Tạm tính" : "Subtotal"}</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 dark:text-neutral-400">{lang === "vi" ? "Vận chuyển" : "Shipping"}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{lang === "vi" ? "Miễn phí" : "Free"}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span>{t("total")}</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}