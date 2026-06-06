import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  const { add } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    add(product.id, 1);
    toast.success(lang === "vi" ? `Đã thêm ${product.vi.name} vào giỏ hàng` : `Added ${product.en.name} to cart`);
  };

  return (
    <Link to="/products/$id" params={{ id: String(product.id) }} className="bg-neutral-50 dark:bg-neutral-950 p-4 group block relative flex flex-col h-full">
      {/* 👉 ĐỔI MÀU NỀN CỦA THẺ SẢN PHẨM Ở ĐÂY: Thay 'bg-neutral-50' ở dòng Link trên thành màu bạn thích */}
      <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4 relative">
        <img src={product.image} alt={product[lang].name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-1">{product[lang].categoryLabel}</p>
          <p className="text-sm font-medium leading-snug">{product[lang].name}</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm text-neutral-900 dark:text-neutral-50 tabular-nums">{formatPrice(product.price, lang)}</p>
            {product.originalPrice && (
              <p className="text-xs text-neutral-400 line-through tabular-nums">{formatPrice(product.originalPrice, lang)}</p>
            )}
          </div>
        </div>
      </div>
      {/* 👉 ĐỔI MÀU NÚT THÊM VÀO GIỎ HÀNG: Thay 'bg-white' thành 'bg-blue-500' v.v. */}
      <button
        onClick={handleQuickAdd}
        className="absolute bottom-4 right-4 h-10 w-10 bg-green-500 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer translate-y-2 group-hover:translate-y-0"
        title={lang === "vi" ? "Mua ngay" : "Quick add"}
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </Link>
  );
}
