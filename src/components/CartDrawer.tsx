import { Link } from "@tanstack/react-router";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal } = useCart();
  const { t, lang } = useI18n();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-neutral-50 dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-sm tracking-[0.2em] font-medium uppercase">{t("cart")}</h2>
          <button onClick={() => setOpen(false)} className="p-2 cursor-pointer" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {detailed.length === 0 ? (
            <p className="p-6 text-sm text-neutral-500 dark:text-neutral-400">{t("cart_empty")}</p>
          ) : (
            <ul>
              {detailed.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <img src={product.image} alt={product[lang].name} className="w-20 h-20 object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product[lang].name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 tabular-nums">{formatPrice(product.price)}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-800">
                        <button onClick={() => setQty(product.id, qty - 1)} className="p-1.5 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="Decrease">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-sm tabular-nums">{qty}</span>
                        <button onClick={() => setQty(product.id, qty + 1)} className="p-1.5 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="Increase">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(product.id)} className="p-1.5 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50" aria-label="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">{t("subtotal")}</span>
            <span className="font-medium tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          {/* 👉 ĐỔI MÀU NÚT THANH TOÁN (CHECKOUT) TRONG GIỎ HÀNG: Thay 'bg-neutral-900' thành màu khác (ví dụ: 'bg-green-600') */}
          <Link
            to="/checkout"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 py-3 text-sm tracking-wider hover:opacity-90 transition-opacity aria-disabled:opacity-40 aria-disabled:pointer-events-none uppercase"
            aria-disabled={detailed.length === 0}
          >
            {t("btn_checkout")}
          </Link>
        </div>
      </aside>
    </>
  );
}